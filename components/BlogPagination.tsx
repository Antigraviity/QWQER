"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function BlogPagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    const generatePageNumbers = () => {
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
    };

    return (
        <div className="flex items-center justify-center gap-1 mt-6">
            <Link
                href={createPageURL(currentPage - 1)}
                className={`flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-sm transition-colors ${
                    currentPage <= 1
                        ? 'pointer-events-none text-gray-300 bg-gray-50'
                        : 'text-gray-600 hover:bg-red-50 hover:text-[#ee3425] hover:border-[#ee3425]'
                }`}
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : undefined}
            >
                <FaChevronLeft className="h-3 w-3" />
            </Link>

            {generatePageNumbers().map((page, i) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${i}`} className="flex h-9 w-9 items-center justify-center text-sm text-gray-400">
                            ...
                        </span>
                    );
                }

                const isActive = currentPage === page;
                return (
                    <Link
                        key={page}
                        href={createPageURL(page)}
                        className={`flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
                            isActive
                                ? 'bg-[#ee3425] text-white border-[#ee3425]'
                                : 'border-gray-200 text-gray-600 hover:bg-red-50 hover:text-[#ee3425] hover:border-[#ee3425]'
                        }`}
                    >
                        {page}
                    </Link>
                );
            })}

            <Link
                href={createPageURL(currentPage + 1)}
                className={`flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-sm transition-colors ${
                    currentPage >= totalPages
                        ? 'pointer-events-none text-gray-300 bg-gray-50'
                        : 'text-gray-600 hover:bg-red-50 hover:text-[#ee3425] hover:border-[#ee3425]'
                }`}
                aria-disabled={currentPage >= totalPages}
                tabIndex={currentPage >= totalPages ? -1 : undefined}
            >
                <FaChevronRight className="h-3 w-3" />
            </Link>
        </div>
    );
}
