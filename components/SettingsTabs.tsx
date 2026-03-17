"use client";

import { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { FaUsers, FaLock, FaPlus, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import { changePassword } from '@/lib/data-actions';
import { State } from '@/lib/definitions';

type User = {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: string;
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

export default function SettingsTabs({ users, currentUserEmail }: { users: User[]; currentUserEmail: string }) {
    const [activeTab, setActiveTab] = useState<'users' | 'password'>('users');
    const initialState: State = { message: null, errors: {} };
    const [state, dispatch] = useFormState(changePassword, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (state.message?.includes('successfully')) {
            setShowSuccess(true);
            formRef.current?.reset();
            setTimeout(() => setShowSuccess(false), 4000);
        }
    }, [state.message]);

    const isSuccess = state.message?.includes('successfully');

    return (
        <>
            {/* Tabs */}
            <div className="flex items-center gap-4 border-b border-gray-200 mb-8">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                        activeTab === 'users'
                            ? 'border-[#ee3425] text-[#ee3425]'
                            : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                    }`}
                >
                    <FaUsers className="w-3.5 h-3.5" />
                    Admin Users
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        activeTab === 'users' ? 'bg-red-50 text-[#ee3425]' : 'bg-gray-100 text-gray-500'
                    }`}>
                        {users.length}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('password')}
                    className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                        activeTab === 'password'
                            ? 'border-[#ee3425] text-[#ee3425]'
                            : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                    }`}
                >
                    <FaLock className="w-3.5 h-3.5" />
                    Change Password
                </button>
            </div>

            {/* Admin Users Tab */}
            {activeTab === 'users' && (
                <div>
                    <div className="flex justify-end mb-4">
                        <Link
                            href="/admin/users/create"
                            className="flex h-10 items-center rounded-lg bg-[#ee3425] px-4 text-sm font-medium text-white transition-colors hover:bg-red-600"
                        >
                            <span className="hidden md:block">Add User</span>
                            <FaPlus className="h-4 md:ml-3" />
                        </Link>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                        <table className="w-full text-left text-sm md:text-base">
                            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium">Name</th>
                                    <th className="p-4 font-medium">Email</th>
                                    <th className="p-4 font-medium hidden md:table-cell">Role</th>
                                    <th className="p-4 font-medium hidden md:table-cell">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors text-gray-800">
                                        <td className="p-4 font-medium">
                                            {user.name}
                                            {user.email === currentUserEmail && (
                                                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-[#ee3425]/10 text-[#ee3425] font-bold uppercase">You</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-gray-500">{user.email}</td>
                                        <td className="p-4 hidden md:table-cell">
                                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4 hidden md:table-cell text-gray-500">{user.createdAt}</td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-6 text-center text-gray-500">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Change Password Tab */}
            {activeTab === 'password' && (
                <div className="max-w-lg">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-[#ee3425]/10 flex items-center justify-center">
                                <FaLock className="w-4 h-4 text-[#ee3425]" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
                                <p className="text-xs text-gray-400">Update your admin account password</p>
                            </div>
                        </div>

                        {showSuccess ? (
                            <div className="py-8 text-center">
                                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <FaCheckCircle className="w-7 h-7 text-green-500" />
                                </div>
                                <p className="text-base font-semibold text-gray-900 mb-1">Password Updated!</p>
                                <p className="text-sm text-gray-400">Your password has been changed successfully.</p>
                            </div>
                        ) : (
                            <form ref={formRef} action={dispatch} className="space-y-5">
                                <input type="hidden" name="email" value={currentUserEmail} />

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

                                {state.message && !isSuccess && (
                                    <div className="p-3 rounded-lg bg-red-50 text-sm text-red-600 border border-red-100">
                                        {state.message}
                                    </div>
                                )}

                                <div className="flex justify-end pt-2">
                                    <SubmitButton label="Update Password" />
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
