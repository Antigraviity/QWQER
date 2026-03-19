import { db } from '@/lib/db';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://qwqer.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
        { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
        { url: `${BASE_URL}/fleet`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
        { url: `${BASE_URL}/express`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
        { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${BASE_URL}/careers`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
        { url: `${BASE_URL}/partner`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${BASE_URL}/resources`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
        { url: `${BASE_URL}/post`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
        { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
        { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    ];

    // Dynamic blog posts
    let blogPages: MetadataRoute.Sitemap = [];
    try {
        const posts = await db.post.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true },
        });
        blogPages = posts.map((post) => ({
            url: `${BASE_URL}/post/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));
    } catch (e) {
        console.error('Sitemap: failed to fetch posts', e);
    }

    // Dynamic career pages
    let careerPages: MetadataRoute.Sitemap = [];
    try {
        const careers = await db.career.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true },
        });
        careerPages = careers.map((career) => ({
            url: `${BASE_URL}/careers/${career.slug}`,
            lastModified: career.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));
    } catch (e) {
        console.error('Sitemap: failed to fetch careers', e);
    }

    return [...staticPages, ...blogPages, ...careerPages];
}
