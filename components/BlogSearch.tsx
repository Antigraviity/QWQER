"use client";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useRef, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function BlogSearch({ placeholder }: { placeholder?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = useCallback((term: string) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            params.set('page', '1');
            if (term) {
                params.set('query', term);
            } else {
                params.delete('query');
            }
            replace(`${pathname}?${params.toString()}`);
        }, 300);
    }, [searchParams, pathname, replace]);

    return (
        <div className="relative flex flex-1 flex-shrink-0 max-w-md">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
                id="search"
                className="peer block w-full rounded-lg border border-gray-200 bg-white py-[9px] pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors"
                placeholder={placeholder || 'Search blog posts...'}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 peer-focus:text-[#ee3425]" />
        </div>
    );
}
