// TEMPORARY: One-time fix to revert admin email. DELETE THIS FILE after use.
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        // Find the admin user (whatever email it currently has)
        const admin = await db.user.findFirst({
            where: { role: 'ADMIN' },
        });

        if (!admin) {
            return NextResponse.json({ error: 'No admin user found' }, { status: 404 });
        }

        // Revert to original email
        await db.user.update({
            where: { id: admin.id },
            data: { email: 'admin@qwqer.in' },
        });

        return NextResponse.json({
            success: true,
            message: `Email reverted from "${admin.email}" to "admin@qwqer.in"`,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
