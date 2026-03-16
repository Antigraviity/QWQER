'use client';

import { useFormState } from 'react-dom';
import { createPost } from '@/lib/data-actions';
import Link from 'next/link';
import { State } from '@/lib/definitions';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaCloudUploadAlt, FaTimes, FaSpinner } from 'react-icons/fa';
import RichTextEditor from '@/components/RichTextEditor';

export default function CreatePostPage() {
    const initialState: State = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createPost, initialState);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const slugRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        if (file.type !== 'image/webp') {
            setUploadError('Only .webp format is accepted. Please convert your image to WebP first.');
            return;
        }

        if (file.size > 500 * 1024) {
            setUploadError('File too large. Maximum size is 500KB.');
            return;
        }

        setUploading(true);
        setUploadError('');

        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('slug', slugRef.current?.value || '');

            const res = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setUploadError(data.error || 'Upload failed');
                return;
            }

            setImageUrl(data.imageUrl);
        } catch (err) {
            setUploadError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleUpload(file);
    };

    const removeImage = () => {
        setImageUrl('');
        setUploadError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <main className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
                <Link href="/admin/blog" className="text-sm text-gray-500 hover:text-gray-900">Cancel</Link>
            </div>

            <form action={dispatch} className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                {/* Hidden input to pass image URL */}
                <input type="hidden" name="image" value={imageUrl} />

                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input id="title" name="title" type="text" placeholder="Enter post title" required aria-describedby="title-error"
                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" />
                    <div id="title-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.title?.map((error: string) => (
                            <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
                        ))}
                    </div>
                </div>

                {/* Slug */}
                <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                    <input id="slug" name="slug" type="text" ref={slugRef} placeholder="enter-post-slug" required aria-describedby="slug-error"
                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" />
                    <div id="slug-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.slug?.map((error: string) => (
                            <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
                        ))}
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blog Image <span className="text-gray-400 font-normal">(.webp only)</span></label>

                    {imageUrl ? (
                        <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                            <div className="relative w-full h-48">
                                <Image src={imageUrl} alt="Upload preview" fill className="object-cover" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white border-t border-gray-100">
                                <span className="text-sm text-gray-600 truncate">{imageUrl}</span>
                                <button type="button" onClick={removeImage}
                                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition-colors">
                                    <FaTimes className="w-3 h-3" /> Remove
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                            className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                                dragActive
                                    ? 'border-[#ee3425] bg-red-50'
                                    : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
                            }`}
                        >
                            {uploading ? (
                                <div className="flex flex-col items-center gap-2">
                                    <FaSpinner className="w-8 h-8 text-[#ee3425] animate-spin" />
                                    <p className="text-sm text-gray-500">Uploading...</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <FaCloudUploadAlt className="w-10 h-10 text-gray-400" />
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold text-[#ee3425]">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400">WebP format only, max 500KB</p>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".webp,image/webp"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    )}

                    {uploadError && (
                        <p className="mt-2 text-sm text-red-500">{uploadError}</p>
                    )}
                </div>

                {/* Read Time + Date */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                        <input id="readTime" name="readTime" type="text" placeholder="e.g. 5 min read" defaultValue="5 min read"
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <input id="date" name="date" type="date"
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" />
                    </div>
                </div>

                {/* Excerpt */}
                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                    <textarea id="excerpt" name="excerpt" placeholder="Short description..." rows={2}
                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" />
                </div>

                {/* Content - Rich Text Editor */}
                <RichTextEditor
                    name="content"
                    required
                    errors={state.errors?.content}
                />

                {/* Global Error */}
                {state.message && (
                    <p className="mt-2 text-sm text-red-500">{state.message}</p>
                )}

                <div className="flex justify-end gap-4 mt-8">
                    <Link href="/admin/blog"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
                        Cancel
                    </Link>
                    <button type="submit"
                        className="flex h-10 items-center rounded-lg bg-[#ee3425] px-4 text-sm font-medium text-white transition-colors hover:bg-red-600 border border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        Create Post
                    </button>
                </div>
            </form>
        </main>
    );
}
