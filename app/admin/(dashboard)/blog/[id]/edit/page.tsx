import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import EditPostForm from './EditPostForm';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Edit Post | QWQER Admin',
    robots: { index: false, follow: false },
};

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const post = await db.post.findUnique({
        where: { id: params.id },
    });

    if (!post) {
        notFound();
    }

    return <EditPostForm post={post} />;
}
