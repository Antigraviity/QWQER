import { redirect } from 'next/navigation';

// Redirect /blog/[slug] to /post/[slug] to avoid duplicate content (SEO)
export default function BlogSlugRedirect({ params }: { params: { slug: string } }) {
    redirect(`/post/${params.slug}`);
}
