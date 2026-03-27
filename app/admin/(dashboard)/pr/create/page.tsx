'use client';

import { useFormState } from 'react-dom';
import { createPrPost } from '@/lib/data-actions';
import Link from 'next/link';
import { State } from '@/lib/definitions';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaCloudUploadAlt, FaTimes, FaSpinner } from 'react-icons/fa';
import RichTextEditor from '@/components/RichTextEditor';

export default function CreatePrPostPage() {
    const initialState: State = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createPrPost, initialState);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const slugRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        if (file.type !== 'image/webp') { setUploadError('Only .webp format is accepted.'); return; }
        if (file.size > 500 * 1024) { setUploadError('File too large. Maximum size is 500KB.'); return; }
        setUploading(true); setUploadError('');
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('slug', slugRef.current?.value || '');
            const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
            const data = await res.json();
            if (!res.ok) { setUploadError(data.error || 'Upload failed'); return; }
            setImageUrl(data.imageUrl);
        } catch { setUploadError('Upload failed. Please try again.'); } finally { setUploading(false); }
    };

    return (
        <main className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create PR Post</h1>
                <Link href="/admin/pr" className="text-sm text-gray-500 hover:text-gray-900">Cancel</Link>
            </div>
            <form action={dispatch} className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <input type="hidden" name="image" value={imageUrl} />
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input id="title" name="title" type="text" placeholder="Enter post title" required className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" />
                    {state.errors?.title?.map((e: string) => <p key={e} className="mt-2 text-sm text-red-500">{e}</p>)}
                </div>
                <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                    <input id="slug" name="slug" type="text" ref={slugRef} placeholder="enter-post-slug" required className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" />
                    {state.errors?.slug?.map((e: string) => <p key={e} className="mt-2 text-sm text-red-500">{e}</p>)}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image <span className="text-gray-400 font-normal">(.webp only)</span></label>
                    {imageUrl ? (
                        <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                            <div className="relative w-full h-48"><Image src={imageUrl} alt="Preview" fill className="object-cover" /></div>
                            <div className="flex items-center justify-between p-3 bg-white border-t border-gray-100">
                                <span className="text-sm text-gray-600 truncate">{imageUrl}</span>
                                <button type="button" onClick={() => { setImageUrl(''); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"><FaTimes className="w-3 h-3" /> Remove</button>
                            </div>
                        </div>
                    ) : (
                        <div onClick={() => fileInputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragActive(true); }} onDragLeave={() => setDragActive(false)} onDrop={(e) => { e.preventDefault(); setDragActive(false); const f = e.dataTransfer.files?.[0]; if (f) handleUpload(f); }}
                            className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${dragActive ? 'border-[#ee3425] bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                            {uploading ? <><FaSpinner className="w-8 h-8 text-[#ee3425] animate-spin" /><p className="text-sm text-gray-500">Uploading...</p></> :
                                <><FaCloudUploadAlt className="w-10 h-10 text-gray-400" /><p className="text-sm text-gray-600"><span className="font-semibold text-[#ee3425]">Click to upload</span> or drag and drop</p><p className="text-xs text-gray-400">WebP only, max 500KB</p></>}
                            <input ref={fileInputRef} type="file" accept=".webp,image/webp" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} className="hidden" />
                        </div>
                    )}
                    {uploadError && <p className="mt-2 text-sm text-red-500">{uploadError}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-2">Read Time</label><input id="readTime" name="readTime" type="text" placeholder="e.g. 5 min read" defaultValue="5 min read" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" /></div>
                    <div><label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Date</label><input id="date" name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" /></div>
                </div>
                <div><label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label><textarea id="excerpt" name="excerpt" placeholder="Short description..." rows={2} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" /></div>
                <RichTextEditor name="content" required errors={state.errors?.content} />
                {state.message && <p className="mt-2 text-sm text-red-500">{state.message}</p>}
                <div className="flex justify-end gap-4 mt-8">
                    <Link href="/admin/pr" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200">Cancel</Link>
                    <button type="submit" className="flex h-10 items-center rounded-lg bg-[#ee3425] px-4 text-sm font-medium text-white hover:bg-red-600">Create Post</button>
                </div>
            </form>
        </main>
    );
}
