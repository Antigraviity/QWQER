import { db } from '@/lib/db';
import { FaEnvelope } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export default async function EnquiriesPage() {
    const enquiries = await db.enquiry.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="w-full text-left text-sm md:text-base">
                    <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Email</th>
                            <th className="p-4 font-medium hidden md:table-cell">Phone</th>
                            <th className="p-4 font-medium">Message</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {enquiries.map((enquiry: any) => (
                            <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors text-gray-800">
                                <td className="p-4 font-medium">{enquiry.name}</td>
                                <td className="p-4 text-gray-500">{enquiry.email}</td>
                                <td className="p-4 hidden md:table-cell text-gray-500">{enquiry.phone || '-'}</td>
                                <td className="p-4 max-w-xs truncate text-gray-500" title={enquiry.message}>
                                    {enquiry.message}
                                </td>
                                <td className="p-4 text-gray-500 whitespace-nowrap">
                                    {enquiry.createdAt.toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${enquiry.status === 'NEW' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {enquiry.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {enquiries.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-6 text-center text-gray-500">No enquiries found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
