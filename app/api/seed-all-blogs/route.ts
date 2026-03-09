import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import blogData from "./blog-data.json";

export const maxDuration = 60;

export async function GET() {
    try {
        const results = [];
        
        for (const blog of (blogData as any[])) {
            try {
                const post = await db.post.upsert({
                    where: { slug: blog.slug },
                    update: {
                        title: blog.title,
                        excerpt: blog.excerpt,
                        content: blog.content,
                        image: blog.image,
                        readTime: blog.readTime,
                        date: blog.date,
                        published: true,
                    },
                    create: {
                        slug: blog.slug,
                        title: blog.title,
                        excerpt: blog.excerpt,
                        content: blog.content,
                        image: blog.image,
                        readTime: blog.readTime,
                        date: blog.date,
                        published: true,
                    },
                });
                results.push({ slug: post.slug, status: "ok" });
            } catch (err: any) {
                results.push({ slug: blog.slug, status: "error", error: err.message });
            }
        }
        
        const ok = results.filter(r => r.status === "ok").length;
        const errors = results.filter(r => r.status === "error").length;
        
        return NextResponse.json({ 
            success: true, 
            total: (blogData as any[]).length,
            inserted: ok,
            errors: errors,
            details: results
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
