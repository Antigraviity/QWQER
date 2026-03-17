"use client";

import { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import { updateAdminProfile, changePassword } from '@/lib/data-actions';
import { State } from '@/lib/definitions';

type User = {
    id: string;
    name: string | null;
    email: string;
    role: string;
};

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}
            className="px-6 py-2.5 rounded-lg bg-[#ee3425] text-sm font-medium text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {pending ? 'Saving...' : label}
        </button>
    );
}

export default function AdminSettings({ user }: { user: User }) {
    // Profile form
    const profileInitial: State = { message: null, errors: {} };
    const [profileState, profileDispatch] = useFormState(updateAdminProfile, profileInitial);
    const [profileSuccess, setProfileSuccess] = useState(false);

    useEffect(() => {
        if (profileState.message?.includes('successfully')) {
            setProfileSuccess(true);
            setTimeout(() => setProfileSuccess(false), 3000);
        }
    }, [profileState.message]);

    // Password form
    const passwordInitial: State = { message: null, errors: {} };
    const [passwordState, passwordDispatch] = useFormState(changePassword, passwordInitial);
    const passwordFormRef = useRef<HTMLFormElement>(null);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    useEffect(() => {
        if (passwordState.message?.includes('successfully')) {
            setPasswordSuccess(true);
            passwordFormRef.current?.reset();
            setTimeout(() => setPasswordSuccess(false), 4000);
        }
    }, [passwordState.message]);

    return (
        <div className="max-w-2xl space-y-6">

            {/* Email Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <FaUser className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Admin Email</h2>
                        <p className="text-xs text-gray-400">Update your admin login email address</p>
                    </div>
                </div>

                <form action={profileDispatch} className="space-y-5">
                    <input type="hidden" name="id" value={user.id} />
                    <input type="hidden" name="name" value={user.name || 'Admin'} />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            defaultValue={user.email}
                            placeholder="admin@qwqer.in"
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors text-sm"
                        />
                        <p className="mt-2 text-xs text-gray-400">This is the email you use to log in to the admin dashboard.</p>
                    </div>

                    {profileState.message && !profileState.message.includes('successfully') && (
                        <div className="p-3 rounded-lg bg-red-50 text-sm text-red-600 border border-red-100">
                            {profileState.message}
                        </div>
                    )}

                    {profileSuccess && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 text-sm text-green-700 border border-green-100">
                            <FaCheckCircle className="w-4 h-4" />
                            Email updated successfully!
                        </div>
                    )}

                    <div className="flex justify-end pt-2">
                        <SubmitButton label="Update Email" />
                    </div>
                </form>
            </div>

            {/* Password Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[#ee3425]/10 flex items-center justify-center">
                        <FaLock className="w-4 h-4 text-[#ee3425]" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
                        <p className="text-xs text-gray-400">Update your admin login password</p>
                    </div>
                </div>

                {passwordSuccess ? (
                    <div className="py-8 text-center">
                        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                            <FaCheckCircle className="w-7 h-7 text-green-500" />
                        </div>
                        <p className="text-base font-semibold text-gray-900 mb-1">Password Updated!</p>
                        <p className="text-sm text-gray-400">Your password has been changed successfully.</p>
                    </div>
                ) : (
                    <form ref={passwordFormRef} action={passwordDispatch} className="space-y-5">
                        <input type="hidden" name="email" value={user.email} />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showCurrent ? "text" : "password"}
                                    name="currentPassword"
                                    required
                                    placeholder="Enter current password"
                                    className="w-full bg-white border border-gray-300 rounded-lg p-3 pr-10 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors text-sm"
                                />
                                <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showCurrent ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    type={showNew ? "text" : "password"}
                                    name="newPassword"
                                    required
                                    minLength={6}
                                    placeholder="Enter new password (min 6 chars)"
                                    className="w-full bg-white border border-gray-300 rounded-lg p-3 pr-10 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors text-sm"
                                />
                                <button type="button" onClick={() => setShowNew(!showNew)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showNew ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    name="confirmPassword"
                                    required
                                    minLength={6}
                                    placeholder="Confirm new password"
                                    className="w-full bg-white border border-gray-300 rounded-lg p-3 pr-10 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors text-sm"
                                />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showConfirm ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {passwordState.message && !passwordState.message.includes('successfully') && (
                            <div className="p-3 rounded-lg bg-red-50 text-sm text-red-600 border border-red-100">
                                {passwordState.message}
                            </div>
                        )}

                        <div className="flex justify-end pt-2">
                            <SubmitButton label="Update Password" />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
