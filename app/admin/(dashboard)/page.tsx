import { db } from '@/lib/db';
import { FaNewspaper, FaEnvelope, FaBriefcase, FaUsers, FaCircle, FaBullhorn, FaRegNewspaper } from 'react-icons/fa';
import Link from 'next/link';
import AutoRefresh from '@/components/AutoRefresh';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const postCount = await db.post.count();
    const enquiryCount = await db.enquiry.count();
    const newEnquiryCount = await db.enquiry.count({ where: { status: 'NEW' } });

    let prCount = 0;
    let newsCount = 0;
    try {
        prCount = await db.prPost.count();
        newsCount = await db.newsPost.count();
    } catch (e) { /* tables may not exist yet */ }

    let careerCount = 0;
    let applicationCount = 0;
    let newApplicationCount = 0;
    let recentApplications: any[] = [];

    try {
        careerCount = await db.career.count();
        applicationCount = await db.jobApplication.count();
        newApplicationCount = await db.jobApplication.count({ where: { status: 'NEW' } });
        recentApplications = await db.jobApplication.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
        });
    } catch (e) {
        // Career/JobApplication tables may not exist yet
    }

    const recentEnquiries = await db.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
    });

    return (
        <main>
            <AutoRefresh interval={30000} />
            <h1 className="mb-6 text-xl md:text-2xl font-bold text-gray-900">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Link href="/admin/blog" className="rounded-xl bg-white p-5 shadow-sm border border-gray-200 hover:border-[#ee3425]/30 transition-colors group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                                <FaNewspaper className="h-4 w-4 text-blue-500" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-600">Blog Posts</h3>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{postCount}</p>
                </Link>

                <Link href="/admin/enquiries" className="rounded-xl bg-white p-5 shadow-sm border border-gray-200 hover:border-[#ee3425]/30 transition-colors group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                                <FaEnvelope className="h-4 w-4 text-green-500" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-600">Enquiries</h3>
                        </div>
                        {newEnquiryCount > 0 && (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-[#ee3425] text-xs font-bold animate-pulse">
                                <FaCircle className="w-1.5 h-1.5" /> {newEnquiryCount} new
                            </span>
                        )}
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{enquiryCount}</p>
                </Link>

                <Link href="/admin/pr" className="rounded-xl bg-white p-5 shadow-sm border border-gray-200 hover:border-[#ee3425]/30 transition-colors group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center">
                                <FaBullhorn className="h-4 w-4 text-yellow-600" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-600">PR Posts</h3>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{prCount}</p>
                </Link>

                <Link href="/admin/news" className="rounded-xl bg-white p-5 shadow-sm border border-gray-200 hover:border-[#ee3425]/30 transition-colors group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                                <FaRegNewspaper className="h-4 w-4 text-indigo-500" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-600">News Posts</h3>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{newsCount}</p>
                </Link>

                <Link href="/admin/careers" className="rounded-xl bg-white p-5 shadow-sm border border-gray-200 hover:border-[#ee3425]/30 transition-colors group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                                <FaBriefcase className="h-4 w-4 text-purple-500" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-600">Open Positions</h3>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{careerCount}</p>
                </Link>

                <Link href="/admin/careers?tab=applications" className="rounded-xl bg-white p-5 shadow-sm border border-gray-200 hover:border-[#ee3425]/30 transition-colors group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                                <FaUsers className="h-4 w-4 text-orange-500" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-600">Job Applications</h3>
                        </div>
                        {newApplicationCount > 0 && (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-[#ee3425] text-xs font-bold animate-pulse">
                                <FaCircle className="w-1.5 h-1.5" /> {newApplicationCount} new
                            </span>
                        )}
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{applicationCount}</p>
                </Link>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Recent Enquiries */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Recent Enquiries</h2>
                        <Link href="/admin/enquiries" className="text-xs text-[#ee3425] font-medium hover:underline">View all</Link>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                        {recentEnquiries.length === 0 ? (
                            <p className="p-6 text-gray-500 text-sm">No enquiries yet.</p>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {recentEnquiries.map((enquiry: any) => (
                                    <div key={enquiry.id} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-semibold text-gray-900 truncate">{enquiry.name}</p>
                                                    {enquiry.status === 'NEW' && (
                                                        <span className="w-2 h-2 rounded-full bg-[#ee3425] flex-shrink-0" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 truncate">{enquiry.email}</p>
                                                <p className="text-xs text-gray-400 mt-1 line-clamp-1">{enquiry.message}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0 ml-3">
                                                <p className="text-xs text-gray-400">{enquiry.createdAt.toLocaleDateString()}</p>
                                                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                                                    enquiry.status === 'NEW' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                    {enquiry.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Job Applications */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Recent Applications</h2>
                        <Link href="/admin/careers?tab=applications" className="text-xs text-[#ee3425] font-medium hover:underline">View all</Link>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                        {recentApplications.length === 0 ? (
                            <p className="p-6 text-gray-500 text-sm">No job applications yet.</p>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {recentApplications.map((app: any) => (
                                    <div key={app.id} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-semibold text-gray-900 truncate">{app.name}</p>
                                                    {app.status === 'NEW' && (
                                                        <span className="w-2 h-2 rounded-full bg-[#ee3425] flex-shrink-0" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 truncate">{app.email}</p>
                                                <p className="text-xs text-[#ee3425] font-medium mt-1">{app.careerTitle}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0 ml-3">
                                                <p className="text-xs text-gray-400">{app.createdAt.toLocaleDateString()}</p>
                                                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                                                    app.status === 'NEW' ? 'bg-green-100 text-green-700'
                                                    : app.status === 'SHORTLISTED' ? 'bg-blue-100 text-blue-700'
                                                    : app.status === 'REJECTED' ? 'bg-red-100 text-red-700'
                                                    : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                    {app.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
