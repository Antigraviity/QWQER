import { db } from '@/lib/db';
import Link from 'next/link';
import { deletePost } from '@/lib/data-actions';
import { FaTrash, FaPlus } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export default async function BlogAdminPage() {
    const posts = await db.post.findMany({
        orderBy: { createdAt: 'desc' },
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

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="w-full text-left text-sm md:text-base">
                    <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-medium">Title</th>
                            <th className="p-4 font-medium hidden md:table-cell">Slug</th>
                            <th className="p-4 font-medium hidden md:table-cell">Date</th>
                            <th className="p-4 font-medium relative"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {posts.map((post: any) => (
                            <tr key={post.id} className="hover:bg-gray-50 transition-colors text-gray-800">
                                <td className="p-4 max-w-xs truncate">{post.title}</td>
                                <td className="p-4 hidden md:table-cell text-gray-500">{post.slug}</td>
                                <td className="p-4 hidden md:table-cell text-gray-500">{post.date}</td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <form action={deletePost.bind(null, post.id)}>
                                            <button className="text-red-500 hover:text-red-600 p-2 rounded hover:bg-red-50">
                                                <span className="sr-only">Delete</span>
                                                <FaTrash className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-6 text-center text-gray-500">No posts found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
