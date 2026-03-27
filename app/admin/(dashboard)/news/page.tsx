import { db } from '@/lib/db';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import GenericPostTable from '@/components/GenericPostTable';
import { deleteNewsPost } from '@/lib/data-actions';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'News | QWQER Admin',
    robots: { index: false, follow: false },
};

export default async function NewsAdminPage() {
    const posts = await db.newsPost.findMany({
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, slug: true, date: true },
    });

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">News</h1>
                <Link href="/admin/news/create"
                    className="flex h-10 items-center rounded-lg bg-[#ee3425] px-4 text-sm font-medium text-white transition-colors hover:bg-red-600">
                    <span className="hidden md:block">Create News Post</span> <FaPlus className="h-5 md:ml-4" />
                </Link>
            </div>
            <GenericPostTable posts={posts} editBasePath="/admin/news" deleteAction={deleteNewsPost} label="News Post" />
        </div>
    );
}
