import { db } from '@/lib/db';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import BlogTable from '@/components/BlogTable';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Blog Posts | QWQER Admin',
    description: 'Manage and publish blog posts for QWQER.',
    robots: { index: false, follow: false },
};

export default async function BlogAdminPage() {
    // Fetch all posts once — client handles search + pagination instantly
    const posts = await db.post.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            title: true,
            slug: true,
            date: true,
        },
    });

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
                <Link
                    href="/admin/blog/create"
                    className="flex h-10 items-center rounded-lg bg-[#ee3425] px-4 text-sm font-medium text-white transition-colors hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                    <span className="hidden md:block">Create Post</span>{' '}
                    <FaPlus className="h-5 md:ml-4" />
                </Link>
            </div>

            <BlogTable posts={posts} />
        </div>
    );
}
