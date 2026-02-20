import { db } from '@/lib/db';
import { FaNewspaper, FaEnvelope } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const postCount = await db.post.count();
    const enquiryCount = await db.enquiry.count();
    const recentEnquiries = await db.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
    });

    return (
        <main>
            <h1 className="mb-4 text-xl md:text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-white p-2 shadow-sm border border-gray-200">
                    <div className="flex p-4">
                        <FaNewspaper className="h-5 w-5 text-gray-500" />
                        <h3 className="ml-2 text-sm font-medium text-gray-600">Total Blogs</h3>
                    </div>
                    <p className="truncate rounded-xl bg-gray-50 px-4 py-8 text-center text-2xl font-bold text-gray-900">
                        {postCount}
                    </p>
                </div>
                <div className="rounded-xl bg-white p-2 shadow-sm border border-gray-200">
                    <div className="flex p-4">
                        <FaEnvelope className="h-5 w-5 text-gray-500" />
                        <h3 className="ml-2 text-sm font-medium text-gray-600">Total Enquiries</h3>
                    </div>
                    <p className="truncate rounded-xl bg-gray-50 px-4 py-8 text-center text-2xl font-bold text-gray-900">
                        {enquiryCount}
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Recent Enquiries</h2>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    {recentEnquiries.length === 0 ? (
                        <p className="p-6 text-gray-500">No enquiries yet.</p>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium text-sm">Name</th>
                                    <th className="p-4 font-medium text-sm">Email</th>
                                    <th className="p-4 font-medium text-sm">Date</th>
                                    <th className="p-4 font-medium text-sm">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentEnquiries.map((enquiry) => (
                                    <tr key={enquiry.id} className="border-b border-gray-100 hover:bg-gray-50 text-gray-800">
                                        <td className="p-4">{enquiry.name}</td>
                                        <td className="p-4">{enquiry.email}</td>
                                        <td className="p-4 text-gray-500">{enquiry.createdAt.toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${enquiry.status === 'NEW' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {enquiry.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </main>
    );
}
