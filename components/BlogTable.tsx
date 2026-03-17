"use client";

import { useState, useMemo, useTransition } from 'react';
import { FaSearch, FaTrash, FaChevronLeft, FaChevronRight, FaTimes, FaSpinner, FaExclamationTriangle, FaEdit } from 'react-icons/fa';
import Link from 'next/link';
import { deletePost } from '@/lib/data-actions';

type Post = {
    id: string;
    title: string;
    slug: string;
    date: string | null;
};

const POSTS_PER_PAGE = 10;

function DeleteModal({ post, onConfirm, onCancel, isDeleting }: {
    post: Post;
    onConfirm: () => void;
    onCancel: () => void;
    isDeleting: boolean;
}) {
    const [confirmText, setConfirmText] = useState('');
    const isConfirmed = confirmText === 'DELETE';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in">
                <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                        <FaExclamationTriangle className="w-6 h-6 text-[#ee3425]" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Blog Post</h3>

                    {/* Message */}
                    <p className="text-sm text-gray-500 mb-1">Are you sure you want to delete</p>
                    <p className="text-sm font-semibold text-gray-800 mb-4 px-4 leading-relaxed">
                        &ldquo;{post.title}&rdquo;
                    </p>

                    <p className="text-xs text-gray-400 mb-4">This action cannot be undone.</p>

                    {/* Confirm input */}
                    <div className="w-full mb-6">
                        <p className="text-xs text-gray-500 mb-2">Type <span className="font-bold text-gray-900">DELETE</span> to confirm</p>
                        <input
                            type="text"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            placeholder="DELETE"
                            autoFocus
                            className={`w-full px-3 py-2.5 rounded-lg border text-sm text-center font-medium tracking-widest transition-colors outline-none ${
                                isConfirmed
                                    ? 'border-[#ee3425] bg-red-50 text-[#ee3425] ring-1 ring-[#ee3425]'
                                    : 'border-gray-200 text-gray-900 placeholder:text-gray-300 focus:border-gray-300'
                            }`}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 w-full">
                        <button
                            onClick={onCancel}
                            disabled={isDeleting}
                            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={!isConfirmed || isDeleting}
                            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                                isConfirmed && !isDeleting
                                    ? 'bg-[#ee3425] text-white hover:bg-red-600 cursor-pointer'
                                    : 'bg-red-600 text-white cursor-not-allowed opacity-50'
                            }`}
                        >
                            {isDeleting ? (
                                <>
                                    <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <FaTrash className="w-3.5 h-3.5" />
                                    Delete
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes animate-in {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-in { animation: animate-in 0.2s ease-out; }
            `}} />
        </div>
    );
}

export default function BlogTable({ posts: initialPosts }: { posts: Post[] }) {
    const [posts, setPosts] = useState(initialPosts);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPending, startTransition] = useTransition();

    const filtered = useMemo(() => {
        if (!query.trim()) return posts;
        const q = query.toLowerCase();
        return posts.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                p.slug.toLowerCase().includes(q) ||
                (p.date && p.date.toLowerCase().includes(q))
        );
    }, [posts, query]);

    const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
    const paginated = filtered.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    const handleSearch = (value: string) => {
        setQuery(value);
        setCurrentPage(1);
    };

    const clearSearch = () => {
        setQuery('');
        setCurrentPage(1);
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        try {
            startTransition(async () => {
                await deletePost(deleteTarget.id);
                setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
                setDeleteTarget(null);
                setIsDeleting(false);
            });
        } catch (error) {
            console.error('Failed to delete post:', error);
            setIsDeleting(false);
        }
    };

    const pageNumbers = useMemo(() => {
        const pages: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    }, [totalPages, currentPage]);

    return (
        <>
            {/* Delete Confirmation Modal */}
            {deleteTarget && (
                <DeleteModal
                    post={deleteTarget}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => { if (!isDeleting) setDeleteTarget(null); }}
                    isDeleting={isDeleting}
                />
            )}

            {/* Search bar */}
            <div className="mb-4 flex items-center justify-between gap-4">
                <div className="relative flex flex-1 flex-shrink-0 max-w-md">
                    <label htmlFor="blog-search" className="sr-only">Search</label>
                    <input
                        id="blog-search"
                        type="text"
                        className="peer block w-full rounded-lg border border-gray-200 bg-white py-[9px] pl-10 pr-9 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors"
                        placeholder="Search by title, slug, or date..."
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 peer-focus:text-[#ee3425]" />
                    {query && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Clear search"
                        >
                            <FaTimes className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
                <p className="text-sm text-gray-500 whitespace-nowrap">
                    {filtered.length} post{filtered.length !== 1 ? 's' : ''} found
                </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="w-full text-left text-sm md:text-base">
                    <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-medium">Title</th>
                            <th className="p-4 font-medium hidden md:table-cell">Slug</th>
                            <th className="p-4 font-medium hidden md:table-cell">Date</th>
                            <th className="p-4 font-medium relative">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginated.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50 transition-colors text-gray-800">
                                <td className="p-4 max-w-xs truncate">{post.title}</td>
                                <td className="p-4 hidden md:table-cell text-gray-500 max-w-sm truncate">{post.slug}</td>
                                <td className="p-4 hidden md:table-cell text-gray-500 whitespace-nowrap">{post.date}</td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            href={`/admin/blog/${post.id}/edit`}
                                            className="text-gray-400 hover:text-[#ee3425] hover:bg-red-50 p-2 rounded-lg transition-colors"
                                            title="Edit post"
                                        >
                                            <span className="sr-only">Edit</span>
                                            <FaEdit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => setDeleteTarget(post)}
                                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                            title="Delete post"
                                        >
                                            <span className="sr-only">Delete</span>
                                            <FaTrash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {paginated.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-6 text-center text-gray-500">
                                    {query ? `No posts matching "${query}".` : 'No posts found.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 mt-6">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage <= 1}
                        className={`flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-sm transition-colors ${
                            currentPage <= 1
                                ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                                : 'text-gray-600 hover:bg-red-50 hover:text-[#ee3425] hover:border-[#ee3425]'
                        }`}
                    >
                        <FaChevronLeft className="h-3 w-3" />
                    </button>

                    {pageNumbers.map((page, i) => {
                        if (page === '...') {
                            return (
                                <span
                                    key={`ellipsis-${i}`}
                                    className="flex h-9 w-9 items-center justify-center text-sm text-gray-400"
                                >
                                    ...
                                </span>
                            );
                        }
                        const isActive = currentPage === page;
                        return (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page as number)}
                                className={`flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-[#ee3425] text-white border-[#ee3425]'
                                        : 'border-gray-200 text-gray-600 hover:bg-red-50 hover:text-[#ee3425] hover:border-[#ee3425]'
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage >= totalPages}
                        className={`flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-sm transition-colors ${
                            currentPage >= totalPages
                                ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                                : 'text-gray-600 hover:bg-red-50 hover:text-[#ee3425] hover:border-[#ee3425]'
                        }`}
                    >
                        <FaChevronRight className="h-3 w-3" />
                    </button>
                </div>
            )}
        </>
    );
}
