import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { rateLimit } from '@/lib/rate-limit';
import { createHash } from 'crypto';

export async function POST(request: NextRequest) {
    // Auth check
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limit: 5 verify attempts per 10 minutes per user
    const { success: rlOk } = rateLimit(`otp-verify:${session?.user?.email}`, 5, 10 * 60 * 1000);
    if (!rlOk) {
        return NextResponse.json({ error: 'Too many attempts. Please wait a few minutes.' }, { status: 429 });
    }

    try {
        const body = await request.json();
        const { otp, newEmail } = body;

        if (!otp || !newEmail) {
            return NextResponse.json({ error: 'OTP and email are required.' }, { status: 400 });
        }

        // Use the authenticated session user ID — never trust client-provided userId
        const userId = (session?.user as any)?.id;
        if (!userId) {
            return NextResponse.json({ error: 'Session user ID not found. Please log in again.' }, { status: 401 });
        }

        // Hash the provided OTP to compare against stored hash
        const otpHash = createHash('sha256').update(otp).digest('hex');
        const otpRecord = await db.emailOtp.findFirst({
            where: {
                userId,
                email: newEmail,
                otp: otpHash,
                verified: false,
            },
        });

        if (!otpRecord) {
            return NextResponse.json({ error: 'Invalid verification code.' }, { status: 400 });
        }

        // Check expiry
        if (new Date() > otpRecord.expiresAt) {
            // Clean up expired OTP
            await db.emailOtp.delete({ where: { id: otpRecord.id } });
            return NextResponse.json({ error: 'Verification code has expired. Please request a new one.' }, { status: 400 });
        }

        // Check if email is still available (race condition guard)
        const existing = await db.user.findUnique({ where: { email: newEmail } });
        if (existing && existing.id !== userId) {
            return NextResponse.json({ error: 'This email is already in use.' }, { status: 409 });
        }

        // Update the user's email
        await db.user.update({
            where: { id: userId },
            data: { email: newEmail },
        });

        // Mark OTP as verified and clean up all OTPs for this user
        await db.emailOtp.deleteMany({
            where: { userId },
        });

        return NextResponse.json({ success: true, message: 'Email updated successfully!' });
    } catch (error) {
        console.error('Verify OTP error:', error);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
