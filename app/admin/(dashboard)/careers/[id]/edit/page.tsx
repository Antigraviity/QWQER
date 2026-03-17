import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import EditCareerForm from './EditCareerForm';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Edit Career | QWQER Admin',
    robots: { index: false, follow: false },
};

export default async function EditCareerPage({ params }: { params: { id: string } }) {
    const career = await db.career.findUnique({
        where: { id: params.id },
    });

    if (!career) {
        notFound();
    }

    return <EditCareerForm career={career} />;
}
