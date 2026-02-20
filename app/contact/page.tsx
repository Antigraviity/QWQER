'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useFormState, useFormStatus } from 'react-dom';
import { submitEnquiry } from '@/lib/data-actions';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { State } from '@/lib/definitions';

export default function ContactPage() {
    const initialState: State = { message: null, errors: {} };
    const [state, dispatch] = useFormState(submitEnquiry, initialState);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#ee3425] selection:text-white relative">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
                        We&apos;d love to hear from you. Get in touch with our team.
                    </p>
                </div>
            </section>

            <section className="pb-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-white">Get in touch</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#111] p-3 rounded-lg border border-white/10">
                                        <FaPhone className="text-[#ee3425] text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Phone</h4>
                                        <p className="text-gray-400">+91 000 000 0000</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#111] p-3 rounded-lg border border-white/10">
                                        <FaEnvelope className="text-[#ee3425] text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Email</h4>
                                        <p className="text-gray-400">support@qwqer.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#111] p-3 rounded-lg border border-white/10">
                                        <FaMapMarkerAlt className="text-[#ee3425] text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Headquarters</h4>
                                        <p className="text-gray-400">
                                            QWQER Express,<br />
                                            Bengaluru, Karnataka,<br />
                                            India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-6 text-white">Send us a message</h3>
                        <form action={dispatch} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your name"
                                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors"
                                        required
                                        aria-describedby="name-error"
                                    />
                                    <div id="name-error" aria-live="polite" aria-atomic="true">
                                        {state.errors?.name && state.errors.name.map((error: string) => (
                                            <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Mobile Number"
                                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors"
                                    required
                                    aria-describedby="email-error"
                                />
                                <div id="email-error" aria-live="polite" aria-atomic="true">
                                    {state.errors?.email && state.errors.email.map((error: string) => (
                                        <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="How can we help you?"
                                    rows={4}
                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors"
                                    required
                                    aria-describedby="message-error"
                                />
                                <div id="message-error" aria-live="polite" aria-atomic="true">
                                    {state.errors?.message && state.errors.message.map((error: string) => (
                                        <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
                                    ))}
                                </div>
                            </div>

                            {state.message && (
                                <div className={`p-4 rounded-lg ${state.message.includes('Success') ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
                                    {state.message}
                                </div>
                            )}

                            <SubmitButton />
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#ee3425] text-white font-bold py-4 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {pending ? 'Sending...' : 'Send Message'}
        </button>
    );
}
