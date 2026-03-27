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
    const post = await db.newsPost.findUnique({
        where: { slug: params.slug },
        select: { title: true, excerpt: true, image: true, slug: true },
    });
    if (!post) return { title: 'Post Not Found | QWQER' };
    const url = `https://qwqer.in/news/${post.slug}`;
    return {
        title: `${post.title} | QWQER News`,
        description: post.excerpt || `Read "${post.title}" — QWQER News.`,
        openGraph: { title: post.title, description: post.excerpt || '', url, type: 'article', ...(post.image && { images: [{ url: post.image }] }) },
        alternates: { canonical: url },
    };
}

export default async function NewsPostPage({ params }: { params: { slug: string } }) {
    const post = await db.newsPost.findUnique({ where: { slug: params.slug } });
    if (!post) notFound();

    return (
        <main className="min-h-screen bg-white text-gray-900 selection:bg-[#ee3425] selection:text-white" data-blog-detail="true">
            <Navbar />
            <div className="pt-28 pb-4 px-6 max-w-[1400px] mx-auto">
                <Link href="/resources" className="inline-flex items-center text-gray-400 hover:text-[#ee3425] transition-colors text-sm font-medium">
                    <FaArrowLeft className="mr-2" /> Back to Resources
                </Link>
            </div>
            <div className="max-w-[1400px] mx-auto px-6 pb-20 flex gap-8">
                <article className="flex-1 min-w-0">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">{post.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
                        <span>{post.date}</span><span>•</span><span>{post.readTime}</span><span>•</span><span className="text-[#ee3425] font-medium">News</span>
                    </div>
                    {post.image && (
                        <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden mb-10 border border-gray-200 shadow-sm">
                            <Image src={post.image} alt={post.title} fill className="object-cover" />
                        </div>
                    )}
                    <style dangerouslySetInnerHTML={{ __html: `.blog-content h2 { font-size: 1.75rem; font-weight: 800; color: #111827; margin-top: 2.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #f3f4f6; line-height: 1.3; } .blog-content h3 { font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-top: 2rem; margin-bottom: 0.75rem; } .blog-content p { font-size: 1rem; color: #4b5563; line-height: 1.85; margin-bottom: 1rem; } .blog-content strong { color: #111827; font-weight: 700; } .blog-content ul { margin-top: 0.75rem; margin-bottom: 1.25rem; padding-left: 1.5rem; } .blog-content ul li { font-size: 1rem; color: #4b5563; line-height: 1.85; margin-bottom: 0.5rem; padding-left: 0.5rem; } .blog-content ul li::marker { color: #ee3425; } .blog-content a { color: #ee3425; text-decoration: underline; }` }} />
                    <div className="blog-content max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(post.content) }} />
                    </div>
                </article>
                <aside className="hidden lg:block w-[280px] shrink-0">
                    <div className="sticky top-32 space-y-5">
                        <SidebarContactForm />
                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <h4 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wide">Quick Links</h4>
                            <div className="space-y-2">
                                <a href="/resources" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#ee3425] transition-colors"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>Resources</a>
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
