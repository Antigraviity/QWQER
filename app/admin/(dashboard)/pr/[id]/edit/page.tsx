import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import EditPrPostForm from './EditPrPostForm';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Edit PR Post | QWQER Admin', robots: { index: false, follow: false } };

export default async function EditPrPostPage({ params }: { params: { id: string } }) {
    const post = await db.prPost.findUnique({ where: { id: params.id } });
    if (!post) notFound();
    return <EditPrPostForm post={post} />;
}
