import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        // Test 1: Database connection
        const userCount = await db.user.count();

        // Test 2: Can we find the admin user?
        const adminUser = await db.user.findUnique({
            where: { email: 'admin@qwqer.in' },
            select: { id: true, email: true, password: true },
        });

        // Test 3: bcrypt works
        let bcryptWorks = false;
        if (adminUser?.password) {
            try {
                await bcrypt.compare('test', adminUser.password);
                bcryptWorks = true;
            } catch (e) {
                bcryptWorks = false;
            }
        }

        return NextResponse.json({
            success: true,
            dbConnected: true,
            userCount,
            adminUserFound: !!adminUser,
            adminHasPassword: !!adminUser?.password,
            passwordHashPrefix: adminUser?.password?.substring(0, 7) || null,
            bcryptWorks,
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            code: error.code,
        }, { status: 500 });
    }
}
