import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import SidebarContactForm from "@/components/SidebarContactForm";
import { sanitizeBlogHtml } from "@/lib/sanitize";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await db.post.findUnique({
        where: { slug: params.slug },
        select: { title: true, excerpt: true, image: true, slug: true },
    });

    if (!post) {
        return { title: 'Post Not Found | QWQER' };
    }

    const url = `https://qwqer.in/post/${post.slug}`;

    return {
        title: `${post.title} | QWQER Blog`,
        description: post.excerpt || `Read "${post.title}" on the QWQER blog.`,
        openGraph: {
            title: post.title,
            description: post.excerpt || `Read "${post.title}" on the QWQER blog.`,
            url,
            siteName: 'QWQER',
            type: 'article',
            ...(post.image && { images: [{ url: post.image, width: 1200, height: 630, alt: post.title }] }),
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || `Read "${post.title}" on the QWQER blog.`,
            ...(post.image && { images: [post.image] }),
        },
        alternates: {
            canonical: url,
        },
    };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await db.post.findUnique({
        where: { slug: params.slug },
    });

    if (!post) {
        notFound();
    }

    // JSON-LD structured data for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt || '',
        image: post.image || undefined,
        datePublished: post.createdAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        author: {
            '@type': 'Organization',
            name: 'QWQER',
            url: 'https://qwqer.in',
        },
        publisher: {
            '@type': 'Organization',
            name: 'QWQER',
            url: 'https://qwqer.in',
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://qwqer.in/post/${post.slug}`,
        },
    };

    return (
        <main className="min-h-screen bg-white text-gray-900 selection:bg-[#ee3425] selection:text-white" data-blog-detail="true">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Navbar />

            {/* Back link */}
            <div className="pt-28 pb-4 px-6 max-w-[1400px] mx-auto">
                <Link href="/post" className="inline-flex items-center text-gray-400 hover:text-[#ee3425] transition-colors text-sm font-medium">
                    <FaArrowLeft className="mr-2" /> Back to Blog
                </Link>
            </div>

            {/* 3-column layout */}
            <div className="max-w-[1400px] mx-auto px-6 pb-20 flex gap-8">

                {/* LEFT SIDEBAR */}
                <aside className="hidden lg:block w-[220px] shrink-0">
                    <div className="sticky top-32 space-y-5">
                        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-b from-gray-900 to-gray-800 p-5 text-white">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-[#ee3425] flex items-center justify-center">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                                </div>
                                <span className="text-xs font-bold tracking-wide uppercase">QWQER</span>
                            </div>
                            <h3 className="text-sm font-bold leading-snug mb-2">Deliver with QWQER</h3>
                            <p className="text-[11px] text-white/60 leading-relaxed mb-4">Join India&apos;s fastest-growing delivery network. Start earning today.</p>
                            <a href="/partner" className="block w-full text-center py-2.5 rounded-lg bg-[#ee3425] text-white text-xs font-bold hover:bg-[#d42e20] transition-colors">Become a Partner</a>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <div className="w-10 h-10 rounded-xl bg-[#ee3425]/10 flex items-center justify-center mb-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ee3425" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
                            </div>
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Get the App</h4>
                            <p className="text-[11px] text-gray-400 leading-relaxed mb-3">Download QWQER for fast, reliable deliveries.</p>
                            <a href="#" className="block w-full text-center py-2 rounded-lg border border-gray-200 text-gray-700 text-xs font-semibold hover:border-[#ee3425] hover:text-[#ee3425] transition-colors">Download Now</a>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <h4 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wide">Share Article</h4>
                            <div className="flex gap-2">
                                <a href="#" className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-[#ee3425]/10 transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="#555"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                                <a href="#" className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-[#ee3425]/10 transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="#555"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                                <a href="#" className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-[#ee3425]/10 transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="#555"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg></a>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* CENTER */}
                <article className="flex-1 min-w-0">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">{post.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
                        <span>{post.date}</span><span>•</span><span>{post.readTime}</span><span>•</span><span className="text-[#ee3425] font-medium">Logistics</span>
                    </div>
                    <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden mb-10 border border-gray-200 shadow-sm">
                        {post.image ? (<Image src={post.image} alt={post.title} fill className="object-cover" />) : (<div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>)}
                    </div>
                    <style dangerouslySetInnerHTML={{ __html: `.blog-content h2 { font-size: 1.75rem; font-weight: 800; color: #111827; margin-top: 2.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #f3f4f6; line-height: 1.3; } .blog-content h3 { font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-top: 2rem; margin-bottom: 0.75rem; line-height: 1.4; } .blog-content p { font-size: 1rem; color: #4b5563; line-height: 1.85; margin-bottom: 1rem; } .blog-content strong { color: #111827; font-weight: 700; } .blog-content ul { margin-top: 0.75rem; margin-bottom: 1.25rem; padding-left: 1.5rem; } .blog-content ul li { font-size: 1rem; color: #4b5563; line-height: 1.85; margin-bottom: 0.5rem; padding-left: 0.5rem; } .blog-content ul li::marker { color: #ee3425; } .blog-content a { color: #ee3425; text-decoration: underline; } .blog-content a:hover { color: #d42e20; } .blog-content h2:first-child { margin-top: 0; }` }} />
                    <div className="blog-content max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(post.content) }} />
                    </div>
                </article>

                {/* RIGHT SIDEBAR */}
                <aside className="hidden lg:block w-[280px] shrink-0">
                    <div className="sticky top-32 space-y-5">
                        <SidebarContactForm />
                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <h4 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wide">Quick Links</h4>
                            <div className="space-y-2">
                                <a href="/partner" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#ee3425] transition-colors"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>Become a Partner</a>
                                <a href="/careers" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#ee3425] transition-colors"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>Careers</a>
                                <a href="/resources" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#ee3425] transition-colors"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>More Resources</a>
                                <a href="/contact" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#ee3425] transition-colors"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>Contact Us</a>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
            <Footer />
        </main>
    );
}
