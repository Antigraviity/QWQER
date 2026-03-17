import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// These 18 slugs exist in DB but NOT in the Resources page — remove them
const slugsToDelete = [
    "get-your-daily-needs-delivered-at-your-doorstep",
    "vanakkam-coimbatore-bring-everything-home-with-qwqer",
    "feed-your-delivery-needs-with-qwqer",
    "qwqer-grocery-delivery-is-live-in-kochi",
    "qwqer-the-quicker-way-of-online-delivery",
    "qwqer-app-the-one-stop-solution-for-your-daily-needs",
    "a-comprehensive-delivery-app-in-the-epoch-of-home-delivery-online-shopping-doorstep-delivery-app",
    "qwqer-your-hero-in-all-times",
    "the-qwqer-solution-how-to-use-the-app",
    "qwqer-app-your-very-own-personal-assistant",
    "qwqer-the-reliable-friend-you-can-count-on",
    "bengaluru-is-qwqer-than-ever-before",
    "qwqer-the-perfect-business-to-business-partner",
    "qwqer-services-and-its-manifold-advantages",
    "qwqer-hyperlocal-delivery-a-story",
    "the-qwqer-way-to-self-care",
    "qwqer-delivery-boy-a-story",
    "post/qwqer-for-her",
];

export async function GET() {
    try {
        const results = [];

        for (const slug of slugsToDelete) {
            try {
                await db.post.delete({ where: { slug } });
                results.push({ slug, status: "deleted" });
            } catch (e: any) {
                results.push({ slug, status: "not found or error", error: e.message });
            }
        }

        // Also check for any posts with duplicate slugs from Resources
        // (e.g. "-2" suffix versions that are duplicates)
        const allPosts = await db.post.findMany({ select: { id: true, slug: true } });
        const duplicateSuffixPosts = allPosts.filter(p => p.slug.endsWith("-2"));
        
        for (const post of duplicateSuffixPosts) {
            const baseSlug = post.slug.replace(/-2$/, "");
            const baseExists = allPosts.some(p => p.slug === baseSlug && p.id !== post.id);
            if (baseExists) {
                try {
                    await db.post.delete({ where: { id: post.id } });
                    results.push({ slug: post.slug, status: "deleted (duplicate -2)" });
                } catch (e: any) {
                    results.push({ slug: post.slug, status: "error", error: e.message });
                }
            }
        }

        const finalCount = await db.post.count();

        return NextResponse.json({
            success: true,
            deleted: results.filter(r => r.status.startsWith("deleted")).length,
            notFound: results.filter(r => r.status.startsWith("not found")).length,
            details: results,
            finalPostCount: finalCount,
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
