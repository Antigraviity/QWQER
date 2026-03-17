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
    const currentUser = await db.user.findUnique({
        where: { email: session?.user?.email || '' },
        select: { id: true, name: true, email: true, role: true },
    });

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
            {currentUser && <AdminSettings user={currentUser} />}
        </div>
    );
}
