import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown'; // Assuming we might want markdown, but for now just text or HTML

export const revalidate = 0;

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await db.post.findUnique({
        where: { slug: params.slug },
    });

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#ee3425] selection:text-white">
            <Navbar />

            <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Blog
                </Link>

                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    {post.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-10">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span className="text-[#ee3425]">Logistics</span>
                </div>

                <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 border border-white/10">
                    {post.image ? (
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                    {/* Simple rendering for now. In a real app we might use a markdown renderer */}
                    <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
                </div>
            </article>

            <Footer />
        </main>
    );
}
