"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { submitJobApplication } from '@/lib/data-actions';
import { State } from '@/lib/definitions';
import { useState, useRef } from 'react';
import { FaCheckCircle, FaCloudUploadAlt, FaTimes, FaSpinner, FaFilePdf } from 'react-icons/fa';

export default function JobApplicationForm({ careerTitle, careerSlug }: { careerTitle: string; careerSlug: string }) {
    const initialState: State = { message: null, errors: {} };
    const [state, dispatch] = useFormState(submitJobApplication, initialState);
    const [resumeUrl, setResumeUrl] = useState('');
    const [resumeName, setResumeName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isSuccess = state.message?.includes('successfully');

    const handleResumeUpload = async (file: File) => {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
            setUploadError('Only PDF or Word documents are accepted.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('File too large. Maximum size is 5MB.');
            return;
        }

        setUploading(true);
        setUploadError('');

        try {
            const formData = new FormData();
            formData.append('resume', file);

            const res = await fetch('/api/upload-resume', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (!res.ok) {
                setUploadError(data.error || 'Upload failed');
                return;
            }

            setResumeUrl(data.resumeUrl);
            setResumeName(file.name);
        } catch (err) {
            setUploadError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const removeResume = () => {
        setResumeUrl('');
        setResumeName('');
        setUploadError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    if (isSuccess) {
        return (
            <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center">
                <FaCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-sm text-gray-600">Thank you for applying for <strong>{careerTitle}</strong>. We&apos;ll review your application and get back to you soon.</p>
            </div>
        );
    }

    return (
        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Apply for this Position</h3>
            <p className="text-sm text-gray-500 mb-6">Fill in your details below and we&apos;ll get back to you.</p>

            <form action={dispatch} className="space-y-4">
                <input type="hidden" name="careerTitle" value={careerTitle} />
                <input type="hidden" name="careerSlug" value={careerSlug} />
                <input type="hidden" name="resumeUrl" value={resumeUrl} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Full Name *</label>
                        <input id="name" name="name" type="text" required placeholder="Your full name"
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 outline-none border-gray-200 focus:border-[#ee3425] focus:ring-0 transition-colors duration-200" />
                        {state.errors?.name?.map((e: string) => <p key={e} className="mt-1 text-xs text-red-500">{e}</p>)}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Email *</label>
                        <input id="email" name="email" type="email" required placeholder="you@email.com"
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 outline-none border-gray-200 focus:border-[#ee3425] focus:ring-0 transition-colors duration-200" />
                        {state.errors?.email?.map((e: string) => <p key={e} className="mt-1 text-xs text-red-500">{e}</p>)}
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Phone</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 py-2.5 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 font-medium">+91</span>
                        <input id="phone" name="phone" type="tel" placeholder="98765 43210" maxLength={10}
                            pattern="[0-9]{10}" inputMode="numeric"
                            onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10); }}
                            className="w-full px-3 py-2.5 rounded-r-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-[#ee3425] focus:ring-0 transition-colors duration-200" />
                    </div>
                </div>

                {/* Resume Upload */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Resume <span className="text-gray-400 font-normal normal-case">(PDF, DOC, DOCX, max 5MB)</span></label>

                    {resumeUrl ? (
                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                                    <FaFilePdf className="w-4 h-4 text-[#ee3425]" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">{resumeName}</p>
                                    <p className="text-xs text-green-600">Uploaded successfully</p>
                                </div>
                            </div>
                            <button type="button" onClick={removeResume}
                                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition-colors flex-shrink-0 ml-3">
                                <FaTimes className="w-3 h-3" />
                            </button>
                        </div>
                    ) : (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center justify-center gap-3 w-full py-4 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-colors"
                        >
                            {uploading ? (
                                <div className="flex items-center gap-2">
                                    <FaSpinner className="w-5 h-5 text-[#ee3425] animate-spin" />
                                    <span className="text-sm text-gray-500">Uploading...</span>
                                </div>
                            ) : (
                                <>
                                    <FaCloudUploadAlt className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm text-gray-600">
                                        <span className="font-semibold text-[#ee3425]">Click to upload</span> your resume
                                    </span>
                                </>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleResumeUpload(file);
                                }}
                                className="hidden"
                            />
                        </div>
                    )}

                    {uploadError && <p className="mt-1 text-xs text-red-500">{uploadError}</p>}
                </div>

                <div>
                    <label htmlFor="coverNote" className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Why are you a good fit?</label>
                    <textarea id="coverNote" name="coverNote" rows={4} placeholder="Tell us briefly about your experience and why you're interested..."
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 outline-none border-gray-200 focus:border-[#ee3425] focus:ring-0 transition-colors duration-200 resize-none" />
                </div>

                {state.message && !isSuccess && (
                    <p className="text-sm text-red-500">{state.message}</p>
                )}

                <SubmitButton />
            </form>
        </div>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}
            className={`w-full py-3 rounded-lg text-white text-sm font-bold transition-colors ${
                pending ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ee3425] hover:bg-red-600'
            }`}>
            {pending ? 'Submitting...' : 'Submit Application'}
        </button>
    );
}
