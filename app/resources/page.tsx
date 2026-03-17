import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourcesHero from "@/components/resources/ResourcesHero";
import BlogGrid from "@/components/resources/BlogGrid";
import { db } from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Resources | QWQER - Insights on Logistics & Delivery',
    description: 'Explore insights, guides, and industry trends to fuel your logistics strategy.',
};

export default async function ResourcesPage() {
    const posts = await db.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        select: {
            title: true,
            slug: true,
            image: true,
            date: true,
            readTime: true,
            excerpt: true,
        },
    });

    return (
        <main className="min-h-screen bg-white text-gray-900 selection:bg-[#ee3425] selection:text-white relative font-sans overflow-x-hidden">
            <Navbar />
            <ResourcesHero />
            <BlogGrid posts={posts} />
            <Footer />
        </main>
    );
}
