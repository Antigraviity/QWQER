"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import allPosts from "./blog-posts.json";

const POSTS_PER_PAGE = 12;

function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (p: number) => void }) {
    return (
        <div className="flex items-center justify-center gap-2">
            <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 hover:text-[#ee3425] disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-gray-200 rounded-lg hover:border-[#ee3425]/30">
                <FaChevronLeft className="w-3 h-3" /> Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => onPageChange(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${page === currentPage ? "bg-[#ee3425] text-white" : "text-gray-500 hover:bg-gray-100 border border-gray-200"}`}>
                    {page}
                </button>
            ))}
            <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 hover:text-[#ee3425] disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-gray-200 rounded-lg hover:border-[#ee3425]/30">
                Next <FaChevronRight className="w-3 h-3" />
            </button>
        </div>
    );
}

export default function BlogGrid() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const paginatedPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 400, behavior: "smooth" });
    };

    return (
        <section className="pb-16 px-6">
            <div className="max-w-7xl mx-auto">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 mt-8">
                    {paginatedPosts.map((post: any, i: number) => (
                        <Link key={`${post.slug}-${i}`} href={`/post/${post.slug}`} className="group block rounded-2xl overflow-hidden border border-gray-200 bg-white hover:border-[#ee3425]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                            <div className="relative h-44 w-full overflow-hidden">
                                {post.image ? (
                                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                                    <span>{post.date}</span><span>•</span><span>{post.readTime}</span>
                                </div>
                                <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#ee3425] transition-colors">{post.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                                <span className="inline-flex items-center text-[#ee3425] text-xs font-bold gap-1.5">
                                    Read Article <FaArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </section>
    );
}
