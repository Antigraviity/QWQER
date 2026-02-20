'use client';

import { useFormState } from 'react-dom';
import { createPost } from '@/lib/data-actions';
import Link from 'next/link';
import { State } from '@/lib/definitions';

export default function CreatePostPage() {
    const initialState: State = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createPost, initialState);

    return (
        <main className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
                <Link href="/admin/blog" className="text-sm text-gray-500 hover:text-gray-900">Cancel</Link>
            </div>

            <form action={dispatch} className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter post title"
                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm"
                        required
                        aria-describedby="title-error"
                    />
                    <div id="title-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.title &&
                            state.errors.title.map((error: string) => (
                                <p key={error} className="mt-2 text-sm text-red-500">
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Slug */}
                <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                        Slug
                    </label>
                    <input
                        id="slug"
                        name="slug"
                        type="text"
                        placeholder="enter-post-slug"
                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm"
                        required
                        aria-describedby="slug-error"
                    />
                    <div id="slug-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.slug &&
                            state.errors.slug.map((error: string) => (
                                <p key={error} className="mt-2 text-sm text-red-500">
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="text"
                        placeholder="https://example.com/image.jpg"
                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm"
                        aria-describedby="image-error"
                    />
                    <div id="image-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.image &&
                            state.errors.image.map((error: string) => (
                                <p key={error} className="mt-2 text-sm text-red-500">
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Read Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-2">
                            Read Time
                        </label>
                        <input
                            id="readTime"
                            name="readTime"
                            type="text"
                            placeholder="e.g. 5 min read"
                            defaultValue="5 min read"
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                            Date String
                        </label>
                        <input
                            id="date"
                            name="date"
                            type="text"
                            placeholder="e.g. Feb 18, 2026"
                            defaultValue={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm"
                        />
                    </div>
                </div>


                {/* Excerpt */}
                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt
                    </label>
                    <textarea
                        id="excerpt"
                        name="excerpt"
                        placeholder="Short description..."
                        rows={2}
                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm"
                    />
                </div>

                {/* Content */}
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                        Content (Markdown/HTML)
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Write your post content here..."
                        rows={10}
                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm"
                        required
                        aria-describedby="content-error"
                    />
                    <div id="content-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.content &&
                            state.errors.content.map((error: string) => (
                                <p key={error} className="mt-2 text-sm text-red-500">
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Global Error Message */}
                {state.message && (
                    <p className="mt-2 text-sm text-red-500">
                        {state.message}
                    </p>
                )}

                <div className="flex justify-end gap-4 mt-8">
                    <Link
                        href="/admin/blog"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="flex h-10 items-center rounded-lg bg-[#ee3425] px-4 text-sm font-medium text-white transition-colors hover:bg-red-600 border border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Create Post
                    </button>
                </div>
            </form>
        </main>
    );
}
