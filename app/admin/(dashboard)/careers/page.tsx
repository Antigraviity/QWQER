import { db } from '@/lib/db';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import CareersAdminTabs from '@/components/CareersAdminTabs';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Careers | QWQER Admin',
    robots: { index: false, follow: false },
};

export default async function CareersAdminPage() {
    const careers = await db.career.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            title: true,
            department: true,
            location: true,
            type: true,
            published: true,
            createdAt: true,
        },
    });

    let applications: any[] = [];
    let newAppCount = 0;
    try {
        applications = await db.jobApplication.findMany({
            orderBy: { createdAt: 'desc' },
        });
        newAppCount = applications.filter((a: any) => a.status === 'NEW').length;
    } catch (e) {}

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Careers</h1>
                <Link
                    href="/admin/careers/create"
                    className="flex h-10 items-center rounded-lg bg-[#ee3425] px-4 text-sm font-medium text-white transition-colors hover:bg-red-600"
                >
                    <span className="hidden md:block">Add Position</span>{' '}
                    <FaPlus className="h-5 md:ml-4" />
                </Link>
            </div>

            <CareersAdminTabs
                careers={careers}
                applications={applications.map((a: any) => ({
                    ...a,
                    createdAt: a.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                }))}
                newAppCount={newAppCount}
            />
        </div>
    );
}
