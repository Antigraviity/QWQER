'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { authenticate } from '@/lib/actions';
import { FaArrowRight, FaExclamationCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="flex items-center justify-center min-h-screen bg-black text-gray-900">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-4 p-4 md:-mt-32">
                <div className="flex flex-col items-center justify-center mb-2">
                    <Image src="/qwqer-logo.png" alt="QWQER Logo" width={160} height={40} className="h-10 w-auto" />
                </div>
                <form action={dispatch} className="space-y-3">
                    <div className="flex-1 rounded-xl bg-white px-6 pb-4 pt-6 border border-gray-200 shadow-sm text-center">
                        <h2 className="mb-2 text-xl font-medium text-gray-500 uppercase tracking-widest text-center">Admin Portal</h2>
                        <h1 className="mb-6 text-2xl font-bold text-gray-900">
                            Please log in to continue.
                        </h1>
                        <div className="w-full">
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-semibold uppercase tracking-wider text-gray-600"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-300 bg-white py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-400 text-gray-900 focus:border-[#ee3425] focus:ring-[#ee3425]"
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-semibold uppercase tracking-wider text-gray-600"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-300 bg-white py-[9px] pl-4 pr-10 text-sm outline-2 placeholder:text-gray-400 text-gray-900 focus:border-[#ee3425] focus:ring-[#ee3425]"
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter password"
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <LoginButton />
                        <div
                            className="flex h-8 items-end space-x-1"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {errorMessage && (
                                <>
                                    <FaExclamationCircle className="h-5 w-5 text-red-500" />
                                    <p className="text-sm text-red-500">{errorMessage}</p>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="mt-4 w-full flex items-center justify-center rounded-lg bg-[#ee3425] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            aria-disabled={pending}
        >
            Log in <FaArrowRight className="ml-auto h-5 w-5 text-gray-50" />
        </button>
    );
}
