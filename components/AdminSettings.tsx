"use client";

import { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { FaUser, FaLock, FaRegEye, FaRegEyeSlash, FaCheckCircle, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { changePassword } from '@/lib/data-actions';
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

// ─── Email change with OTP verification ────────────────────
type OtpStep = 'email' | 'otp' | 'success';

function EmailSection({ user }: { user: User }) {
    const [step, setStep] = useState<OtpStep>('email');
    const [newEmail, setNewEmail] = useState(user.email);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [devOtp, setDevOtp] = useState('');
    const [resendTimer, setResendTimer] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown for resend
    useEffect(() => {
        if (resendTimer <= 0) return;
        const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        return () => clearTimeout(timer);
    }, [resendTimer]);

    // Auto sign-out after successful email change
    useEffect(() => {
        if (step !== 'success') return;
        const timeout = setTimeout(async () => {
            try {
                // Get CSRF token for NextAuth signout
                const csrfRes = await fetch('/api/auth/csrf');
                const { csrfToken } = await csrfRes.json();
                // POST to signout endpoint
                await fetch('/api/auth/signout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `csrfToken=${csrfToken}`,
                });
            } catch {
                // Ignore errors
            }
            window.location.href = '/admin/login';
        }, 3000);
        return () => clearTimeout(timeout);
    }, [step]);

    const handleSendOtp = async () => {
        setError('');
        if (!newEmail || newEmail === user.email) {
            setError('Please enter a different email address.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/email-otp/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newEmail }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Failed to send verification code.');
                return;
            }
            // In dev mode, API returns the OTP for easy testing
            if (data.devOtp) {
                setDevOtp(data.devOtp);
            }
            setStep('otp');
            setResendTimer(60);
            setOtp(['', '', '', '', '', '']);
            // Focus first input after render
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setError('');

        // Auto-focus next
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pasted.length === 6) {
            const digits = pasted.split('');
            setOtp(digits);
            inputRefs.current[5]?.focus();
        }
    };

    const handleVerifyOtp = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            setError('Please enter the complete 6-digit code.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/email-otp/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp: otpCode, newEmail }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Verification failed.');
                return;
            }
            setStep('success');
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0) return;
        await handleSendOtp();
    };

    return (
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

            {/* Step 1: Enter new email */}
            {step === 'email' && (
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => { setNewEmail(e.target.value); setError(''); }}
                            placeholder="admin@qwqer.in"
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors text-sm"
                        />
                        <p className="mt-2 text-xs text-gray-400">
                            A verification code will be sent to the new email address.
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 text-sm text-red-600 border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end pt-2">
                        <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={loading}
                            className="px-6 py-2.5 rounded-lg bg-[#ee3425] text-sm font-medium text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <FaEnvelope className="w-3.5 h-3.5" />
                                    Send Verification Code
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Enter OTP */}
            {step === 'otp' && (
                <div className="space-y-5">
                    <div className="text-center py-2">
                        <div className="w-14 h-14 rounded-full bg-[#ee3425]/10 flex items-center justify-center mx-auto mb-4">
                            <FaEnvelope className="w-6 h-6 text-[#ee3425]" />
                        </div>
                        <p className="text-sm text-gray-600 mb-1">We sent a 6-digit code to</p>
                        <p className="text-sm font-bold text-gray-900">{newEmail}</p>
                    </div>

                    {/* Dev mode OTP display */}
                    {devOtp && (
                        <div className="mx-auto max-w-xs p-3 rounded-lg bg-amber-50 border border-amber-200 text-center">
                            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Dev Mode — OTP</p>
                            <p className="text-2xl font-mono font-bold text-amber-800 tracking-[6px]">{devOtp}</p>
                        </div>
                    )}

                    {/* OTP Input Boxes */}
                    <div className="flex justify-center gap-2.5" onPaste={handleOtpPaste}>
                        {otp.map((digit, i) => (
                            <input
                                key={i}
                                ref={(el) => { inputRefs.current[i] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(i, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                className={`w-12 h-14 text-center text-xl font-bold rounded-lg border-2 transition-all duration-200 outline-none ${
                                    digit
                                        ? 'border-[#ee3425] bg-red-50/50 text-gray-900'
                                        : 'border-gray-200 bg-white text-gray-900'
                                } focus:border-[#ee3425] focus:ring-2 focus:ring-[#ee3425]/20`}
                            />
                        ))}
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 text-sm text-red-600 border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    <div className="text-center">
                        <p className="text-xs text-gray-400">
                            Didn&apos;t receive the code?{' '}
                            {resendTimer > 0 ? (
                                <span className="text-gray-500 font-medium">Resend in {resendTimer}s</span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={loading}
                                    className="text-[#ee3425] font-semibold hover:underline disabled:opacity-50"
                                >
                                    Resend Code
                                </button>
                            )}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <button
                            type="button"
                            onClick={() => { setStep('email'); setError(''); setOtp(['', '', '', '', '', '']); }}
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft className="w-3 h-3" />
                            Change Email
                        </button>
                        <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={loading || otp.join('').length !== 6}
                            className="px-6 py-2.5 rounded-lg bg-[#ee3425] text-sm font-medium text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                    Verifying...
                                </>
                            ) : 'Verify & Update'}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Success — auto redirect to login */}
            {step === 'success' && (
                <div className="py-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <FaCheckCircle className="w-7 h-7 text-green-500" />
                    </div>
                    <p className="text-base font-semibold text-gray-900 mb-1">Email Updated!</p>
                    <p className="text-sm text-gray-400 mb-1">Your admin email has been changed to</p>
                    <p className="text-sm font-bold text-gray-900 mb-4">{newEmail}</p>
                    <p className="text-xs text-gray-400 mb-4">You will be redirected to login with your new email...</p>
                    <div className="flex justify-center">
                        <svg className="animate-spin h-5 w-5 text-[#ee3425]" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────
export default function AdminSettings({ user }: { user: User }) {
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

            {/* Email Section with OTP */}
            <EmailSection user={user} />

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
                                    {showCurrent ? <FaRegEye className="w-4 h-4" /> : <FaRegEyeSlash className="w-4 h-4" />}
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
                                    {showNew ? <FaRegEye className="w-4 h-4" /> : <FaRegEyeSlash className="w-4 h-4" />}
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
                                    {showConfirm ? <FaRegEye className="w-4 h-4" /> : <FaRegEyeSlash className="w-4 h-4" />}
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
