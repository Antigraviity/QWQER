import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import EditNewsPostForm from './EditNewsPostForm';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Edit News Post | QWQER Admin', robots: { index: false, follow: false } };

export default async function EditNewsPostPage({ params }: { params: { id: string } }) {
    const post = await db.newsPost.findUnique({ where: { id: params.id } });
    if (!post) notFound();
    return <EditNewsPostForm post={post} />;
}
