'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitEnquiry } from '@/lib/data-actions';
import { State } from '@/lib/definitions';
import { useRef, useEffect, useState } from 'react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-2.5 rounded-lg bg-[#ee3425] text-white text-sm font-bold hover:bg-[#d42e20] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? 'Sending...' : 'Send Message'}
        </button>
    );
}

export default function SidebarContactForm() {
    const initialState: State = { message: null, errors: {} };
    const [state, dispatch] = useFormState(submitEnquiry, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (state.message?.includes('Success')) {
            setShowSuccess(true);
            formRef.current?.reset();
            setTimeout(() => setShowSuccess(false), 4000);
        }
    }, [state.message]);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#ee3425]" />
                <span className="text-[10px] font-bold text-[#ee3425] uppercase tracking-widest">Get in Touch</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Have Questions?</h3>
            <p className="text-xs text-gray-400 mb-5">We&apos;d love to hear from you. Drop us a message.</p>

            {showSuccess ? (
                <div className="py-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Message Sent!</p>
                    <p className="text-xs text-gray-400 mt-1">We&apos;ll get back to you soon.</p>
                </div>
            ) : (
                <form ref={formRef} action={dispatch} className="space-y-3">
                    <div>
                        <label className="block text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            required
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-[#ee3425] focus:ring-0 transition-colors duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@company.com"
                            required
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-[#ee3425] focus:ring-0 transition-colors duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="+91 98765 43210"
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-[#ee3425] focus:ring-0 transition-colors duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">Message</label>
                        <textarea
                            name="message"
                            placeholder="How can we help?"
                            rows={3}
                            required
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-[#ee3425] focus:ring-0 transition-colors duration-200 resize-none"
                        />
                    </div>

                    {state.errors?.name?.map((e: string) => <p key={e} className="text-xs text-red-500">{e}</p>)}
                    {state.errors?.email?.map((e: string) => <p key={e} className="text-xs text-red-500">{e}</p>)}
                    {state.errors?.message?.map((e: string) => <p key={e} className="text-xs text-red-500">{e}</p>)}
                    {state.message && !state.message.includes('Success') && (
                        <p className="text-xs text-red-500">{state.message}</p>
                    )}

                    <SubmitButton />
                </form>
            )}
        </div>
    );
}
