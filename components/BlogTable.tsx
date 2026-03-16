"use client";

import { useState, useMemo } from 'react';
import { FaSearch, FaTrash, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

type Post = {
    id: string;
    title: string;
    slug: string;
    date: string | null;
};

const POSTS_PER_PAGE = 10;

export default function BlogTable({ posts }: { posts: Post[] }) {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Instant client-side filtering
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

    // Reset to page 1 when query changes
    const handleSearch = (value: string) => {
        setQuery(value);
        setCurrentPage(1);
    };

    const clearSearch = () => {
        setQuery('');
        setCurrentPage(1);
    };

    // Page numbers with ellipsis
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
                                    <div className="flex justify-end gap-3">
                                        <button
                                            disabled
                                            className="text-gray-300 p-2 rounded cursor-not-allowed"
                                            title="Delete disabled"
                                        >
                                            <span className="sr-only">Delete (disabled)</span>
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
