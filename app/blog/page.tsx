import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { db } from "@/lib/db";

export const revalidate = 0; // Disable caching for now to see updates immediately

export default async function BlogPage() {
    const posts = await db.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#ee3425] selection:text-white relative">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        Our Blog
                    </h1>
                    <p className="mt-4 text-xl text-gray-400 max-w-2xl">
                        Insights, updates, and stories from the world of logistics and hyperlocal delivery.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="pb-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length > 0 ? (
                        posts.map((post: any) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group relative bg-[#111] rounded-3xl overflow-hidden border border-white/10 hover:border-[#ee3425]/50 transition-colors duration-300">
                                <div className="relative h-60 w-full overflow-hidden">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                                            No Image
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#ee3425] transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-gray-400 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-6 flex items-center text-[#ee3425] text-sm font-semibold gap-2">
                                        Read Article
                                        <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-400 text-lg col-span-full">No blog posts found.</p>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
