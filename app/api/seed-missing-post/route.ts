import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const existing = await db.post.findUnique({
      where: { slug: 'the-best-solution-for-business-with-hyperlocal-delivery' },
    });

    if (existing) {
      const total = await db.post.count();
      return NextResponse.json({ message: 'Post already exists', totalPosts: total });
    }

    await db.post.create({
      data: {
        slug: 'the-best-solution-for-business-with-hyperlocal-delivery',
        title: 'Why QWQER is the Best Solution for Businesses Needing Hyperlocal Delivery',
        excerpt: 'Customer expectations revolve around speed, convenience, and reliability.',
        content: '<h2>Why QWQER is the Best Solution for Businesses Needing Hyperlocal Delivery</h2><p>Customer expectations revolve around speed, convenience, and reliability.</p>',
        image: '/blog/the-best-solution-for-business-with-hyperlocal-delivery.webp',
        readTime: '4 min read',
        published: true,
        date: 'March 5, 2026',
      },
    });

    const total = await db.post.count();
    return NextResponse.json({ message: 'Missing post seeded!', totalPosts: total });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
