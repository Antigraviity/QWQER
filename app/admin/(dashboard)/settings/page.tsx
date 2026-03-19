import { db } from '@/lib/db';
import { auth } from '@/auth';
import AdminSettings from '@/components/AdminSettings';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Settings | QWQER Admin',
    robots: { index: false, follow: false },
};

export default async function SettingsPage() {
    const session = await auth();

    // Try by email first, then fallback to ID (handles post-email-change session mismatch)
    let currentUser = await db.user.findUnique({
        where: { email: session?.user?.email || '' },
        select: { id: true, name: true, email: true, role: true },
    });

    // Fallback: try by user ID from JWT
    if (!currentUser && (session?.user as any)?.id) {
        currentUser = await db.user.findUnique({
            where: { id: (session.user as any).id },
            select: { id: true, name: true, email: true, role: true },
        });
    }

    // Last resort: if only one admin exists, use that (single-admin setup)
    if (!currentUser && session?.user) {
        const admins = await db.user.findMany({
            where: { role: 'ADMIN' },
            select: { id: true, name: true, email: true, role: true },
            take: 2,
        });
        if (admins.length === 1) {
            currentUser = admins[0];
        }
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
            {currentUser && <AdminSettings user={currentUser} />}
        </div>
    );
}
