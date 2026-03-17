import { db } from '@/lib/db';
import AutoRefresh from '@/components/AutoRefresh';
import EnquiriesTable from '@/components/EnquiriesTable';

export const dynamic = 'force-dynamic';

export default async function EnquiriesPage() {
    const enquiries = await db.enquiry.findMany({
        orderBy: { createdAt: 'desc' },
    });

    const newCount = enquiries.filter(e => e.status === 'NEW').length;

    return (
        <div className="w-full">
            <AutoRefresh interval={30000} />
            <div className="flex w-full items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
                    {newCount > 0 && (
                        <p className="text-sm text-gray-500 mt-1">{newCount} new enquir{newCount === 1 ? 'y' : 'ies'} awaiting review</p>
                    )}
                </div>
            </div>

            <EnquiriesTable enquiries={enquiries.map(e => ({
                ...e,
                createdAt: e.createdAt.toLocaleDateString(),
            }))} />
        </div>
    );
}
