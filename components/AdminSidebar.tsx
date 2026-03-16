"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaChartBar, FaNewspaper, FaEnvelope, FaSignOutAlt, FaUsers, FaBriefcase } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

const navItems = [
    { href: '/admin', label: 'Overview', icon: FaChartBar, exact: true },
    { href: '/admin/blog', label: 'Blogs', icon: FaNewspaper },
    { href: '/admin/careers', label: 'Careers', icon: FaBriefcase },
    { href: '/admin/enquiries', label: 'Enquiries', icon: FaEnvelope },
    { href: '/admin/users', label: 'Users', icon: FaUsers },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (href: string, exact?: boolean) => {
        if (exact) return pathname === href;
        return pathname === href || pathname.startsWith(href + '/');
    };

    const handleSignOut = () => {
        signOut({ callbackUrl: '/admin/login' });
    };

    return (
        <div className="w-full flex-none md:w-64 border-r border-gray-200 bg-white">
            <div className="flex h-full flex-col px-3 py-4 md:px-2">
                <Link
                    className="mb-8 flex h-20 items-end justify-start rounded-md p-4"
                    href="/admin"
                >
                    <div className="w-32 md:w-40 flex items-center gap-2">
                        <Image src="/admin-logo.webp" alt="QWQER Logo" width={160} height={32} className="h-8 w-auto" />
                    </div>
                </Link>
                <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-1">
                    {navItems.map((item) => {
                        const active = isActive(item.href, item.exact);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 transition-colors ${
                                    active
                                        ? 'bg-red-50 text-[#ee3425]'
                                        : 'bg-transparent text-gray-700 hover:bg-red-50 hover:text-red-600'
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <p className="hidden md:block">{item.label}</p>
                            </Link>
                        );
                    })}
                    <div className="hidden h-auto w-full grow md:block"></div>
                    <button
                        onClick={handleSignOut}
                        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-transparent hover:bg-red-50 p-3 text-sm font-medium text-gray-700 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors cursor-pointer"
                    >
                        <FaSignOutAlt className="w-5 h-5" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
