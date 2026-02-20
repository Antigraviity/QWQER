import Link from 'next/link';
import { FaChartBar, FaNewspaper, FaEnvelope, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import { signOut } from '@/auth';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-50 text-gray-900">
            <div className="w-full flex-none md:w-64 border-r border-gray-200 bg-white">
                <div className="flex h-full flex-col px-3 py-4 md:px-2">
                    <Link
                        className="mb-8 flex h-20 items-end justify-start rounded-md p-4"
                        href="/admin"
                    >
                        <div className="w-32 md:w-40 flex items-center gap-2">
                            <img src="/admin-logo.webp" alt="QWQER Logo" className="h-[2rem]" />
                        </div>
                    </Link>
                    <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                        <Link
                            href="/admin"
                            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-transparent hover:bg-red-50 p-3 text-sm font-medium text-gray-700 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors"
                        >
                            <FaChartBar className="w-6" />
                            <p className="hidden md:block">Overview</p>
                        </Link>
                        <Link
                            href="/admin/blog"
                            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-transparent hover:bg-red-50 p-3 text-sm font-medium text-gray-700 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors"
                        >
                            <FaNewspaper className="w-6" />
                            <p className="hidden md:block">Blogs</p>
                        </Link>
                        <Link
                            href="/admin/enquiries"
                            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-transparent hover:bg-red-50 p-3 text-sm font-medium text-gray-700 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors"
                        >
                            <FaEnvelope className="w-6" />
                            <p className="hidden md:block">Enquiries</p>
                        </Link>
                        <Link
                            href="/admin/users"
                            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-transparent hover:bg-red-50 p-3 text-sm font-medium text-gray-700 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors"
                        >
                            <FaUsers className="w-6" />
                            <p className="hidden md:block">Users</p>
                        </Link>
                        <div className="hidden h-auto w-full grow md:block"></div>
                        <form
                            action={async () => {
                                'use server';
                                await signOut();
                            }}
                        >
                            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-transparent hover:bg-gray-100 p-3 text-sm font-medium text-gray-700 hover:text-gray-900 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors">
                                <FaSignOutAlt className="w-6" />
                                <div className="hidden md:block">Sign Out</div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}
