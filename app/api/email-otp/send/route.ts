import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { sendOtpEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

function generateOtp(): string {
    // Generate 6-digit OTP using Math.random as a safe fallback
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
    // Auth check
    let session;
    try {
        session = await auth();
    } catch (authErr) {
        console.error('Auth error in OTP send:', authErr);
        return NextResponse.json({ error: 'Authentication error.' }, { status: 401 });
    }

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limit: 3 OTP sends per 10 minutes per user
    const { success: rlOk } = rateLimit(`otp:${session.user.email}`, 3, 10 * 60 * 1000);
    if (!rlOk) {
        return NextResponse.json({ error: 'Too many attempts. Please wait a few minutes.' }, { status: 429 });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { newEmail, userId } = body;

    if (!newEmail || !userId) {
        return NextResponse.json({ error: 'Email and user ID are required.' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
        return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    try {
        // Check if email is same as current
        const currentUser = await db.user.findUnique({ where: { id: userId } });
        if (!currentUser) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }
        if (currentUser.email === newEmail) {
            return NextResponse.json({ error: 'New email is the same as your current email.' }, { status: 400 });
        }

        // Check if email is already taken
        const existing = await db.user.findUnique({ where: { email: newEmail } });
        if (existing && existing.id !== userId) {
            return NextResponse.json({ error: 'This email is already in use by another account.' }, { status: 409 });
        }

        // Generate 6-digit OTP
        const otp = generateOtp();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Delete any existing OTPs for this user+email
        await db.emailOtp.deleteMany({
            where: { userId, email: newEmail },
        });

        // Store OTP
        await db.emailOtp.create({
            data: {
                userId,
                email: newEmail,
                otp,
                expiresAt,
            },
        });

        // Send OTP email
        const result = await sendOtpEmail(newEmail, otp);
        if (!result.success) {
            console.error('OTP email send failed:', JSON.stringify(result.error));
            // In development, log OTP so the flow can still be tested
            if (process.env.NODE_ENV === 'development') {
                console.log(`\n========================================`);
                console.log(`  DEV OTP for ${newEmail}: ${otp}`);
                console.log(`========================================\n`);
                return NextResponse.json({
                    success: true,
                    message: 'OTP sent! (Dev mode: check server console if email not received)',
                    devOtp: otp,
                });
            }
            return NextResponse.json(
                { error: 'Failed to send verification email. Please verify your domain in Resend (resend.com/domains).' },
                { status: 500 }
            );
        }

        // Also log in dev for convenience
        if (process.env.NODE_ENV === 'development') {
            console.log(`[DEV] OTP for ${newEmail}: ${otp}`);
        }

        return NextResponse.json({ success: true, message: 'OTP sent to your new email address.' });
    } catch (error: any) {
        console.error('Send OTP error:', error?.message || error);
        // Check if it's a Prisma model not found error
        if (error?.message?.includes('emailOtp') || error?.message?.includes('does not exist')) {
            return NextResponse.json(
                { error: 'Database not migrated. Please run: npx prisma db push && npx prisma generate' },
                { status: 500 }
            );
        }
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
