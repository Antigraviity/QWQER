'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useFormState, useFormStatus } from 'react-dom';
import { submitEnquiry } from '@/lib/data-actions';
import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { State } from '@/lib/definitions';
import { useState } from 'react';

export default function ContactPage() {
    const initialState: State = { message: null, errors: {} };
    const [state, dispatch] = useFormState(submitEnquiry, initialState);
    const [queryType, setQueryType] = useState('fleet');
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [termsError, setTermsError] = useState(false);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#ee3425] selection:text-white relative" data-blog-detail="true">
            <style dangerouslySetInnerHTML={{ __html: 'input:focus, textarea:focus { outline: none !important; box-shadow: 0 0 0 1px rgba(255,255,255,0.2) !important; border-color: rgba(255,255,255,0.5) !important; } input:active, textarea:active { outline: none !important; }' }} />
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-10 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Connect with us</h1>
                    <p className="text-base text-gray-400 max-w-md mx-auto">Any question or remarks? Just write us a message!</p>
                </div>
            </section>

            {/* Contact Form + Offices Sidebar */}
            <section className="pb-20 px-6">
                <div className="max-w-[1400px] mx-auto flex gap-6">

                    {/* Left: Contact card (red info + form) */}
                    <div className="flex-1 min-w-0 flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden border border-white/10">

                        {/* Contact Info (Red Card) */}
                        <div className="w-full lg:w-[380px] shrink-0 bg-[#ee3425] text-white p-8 md:p-10 relative overflow-hidden">
                            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/10" />
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                            <div className="relative z-10 space-y-7">
                                <div>
                                    <h3 className="text-base font-bold mb-3">Express Customer Support</h3>
                                    <div className="space-y-2">
                                        <a href="tel:02250534575" className="flex items-center gap-3 text-sm text-white/90 hover:text-white transition-colors"><FaPhone className="text-xs" /> 02250534575</a>
                                        <a href="https://wa.me/917356124443" className="flex items-center gap-3 text-sm text-white/90 hover:text-white transition-colors"><FaWhatsapp className="text-sm" /> +91 7356124443</a>
                                        <a href="mailto:info@qwqer.in" className="flex items-center gap-3 text-sm text-white/90 hover:text-white transition-colors"><FaEnvelope className="text-xs" /> info@qwqer.in</a>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold mb-3">Fleet Business Enquiry</h3>
                                    <div className="space-y-2">
                                        <a href="tel:+918138023019" className="flex items-center gap-3 text-sm text-white/90 hover:text-white transition-colors"><FaPhone className="text-xs" /> +91 81380 23019</a>
                                        <a href="mailto:ask.fleet@qwqtech.com" className="flex items-center gap-3 text-sm text-white/90 hover:text-white transition-colors"><FaEnvelope className="text-xs" /> ask.fleet@qwqtech.com</a>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold mb-3">Fleet Customer Support</h3>
                                    <div className="space-y-2">
                                        <a href="tel:+918138023019" className="flex items-center gap-3 text-sm text-white/90 hover:text-white transition-colors"><FaPhone className="text-xs" /> +91 81380 23019</a>
                                        <a href="mailto:ask.fleet@qwqtech.com" className="flex items-center gap-3 text-sm text-white/90 hover:text-white transition-colors"><FaEnvelope className="text-xs" /> ask.fleet@qwqtech.com</a>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold mb-2">General Grievances</h3>
                                    <p className="text-sm text-white/70 mb-2">Maria Augustine</p>
                                    <div className="space-y-2">
                                        <a href="tel:+917356324757" className="flex items-center gap-3 text-sm text-white/90 hover:text-white transition-colors"><FaPhone className="text-xs" /> +91 73563 24757</a>
                                        <a href="mailto:grievance@qwqer.in" className="flex items-center gap-3 text-sm text-white/90 hover:text-white transition-colors"><FaEnvelope className="text-xs" /> grievance@qwqer.in</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="flex-1 bg-[#0a0a0a] p-8 md:p-10">
                            <form action={(formData) => {
                                if (!termsAgreed) {
                                    setTermsError(true);
                                    return;
                                }
                                setTermsError(false);
                                dispatch(formData);
                            }} className="space-y-5">
                                {/* Bot protection: honeypot (hidden from users, bots auto-fill it) */}
                                <div className="absolute -left-[9999px]" aria-hidden="true" tabIndex={-1}>
                                    <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
                                </div>
                                {/* Bot protection: timestamp */}
                                <input type="hidden" name="_ft" value={Date.now().toString()} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-white mb-1.5">First Name *</label>
                                        <input type="text" name="name" placeholder="Your name" required className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-white mb-1.5">Last Name</label>
                                        <input type="text" placeholder="Your name" className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-white mb-1.5">Company Name *</label>
                                        <input type="text" placeholder="Company Name" className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-white mb-1.5">Product</label>
                                        <input type="text" placeholder="Product" className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-white mb-1.5">Email *</label>
                                        <input type="email" name="email" placeholder="your@company.com" required className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-white mb-1.5">Phone *</label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 bg-white/5 border border-white/10 border-r-0 rounded-l-lg text-sm text-white/60">+91</span>
                                            <input type="tel" name="phone" placeholder="10-digit number" maxLength={10} pattern="[0-9]{10}" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10); }} required className="w-full bg-transparent border border-white/10 rounded-r-lg rounded-l-none px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-white mb-1.5">Location *</label>
                                    <input type="text" name="location" placeholder="City, State" required className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-white mb-3">Select your query *</label>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                                        {[
                                            { value: 'fleet', label: 'Fleet (FTL)' },
                                            { value: 'express', label: 'Express (Hyperlocal)' },
                                            { value: 'delivery', label: 'Delivery Partner' },
                                            { value: 'vendor', label: 'Fleet Owner /Vendor' },
                                        ].map((opt) => (
                                            <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
                                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${queryType === opt.value ? 'border-[#ee3425]' : 'border-gray-600 group-hover:border-gray-400'}`}>
                                                    {queryType === opt.value && <div className="w-2 h-2 rounded-full bg-[#ee3425]" />}
                                                </div>
                                                <input type="radio" name="queryType" value={opt.value} checked={queryType === opt.value} onChange={() => setQueryType(opt.value)} className="hidden" />
                                                <span className={`text-sm transition-colors ${queryType === opt.value ? 'text-[#ee3425]' : 'text-gray-400 group-hover:text-gray-300'}`}>{opt.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-white mb-1.5">Message</label>
                                    <textarea name="message" placeholder="Type your message..." rows={4} required className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all resize-none" />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={termsAgreed} onChange={(e) => { setTermsAgreed(e.target.checked); if (e.target.checked) setTermsError(false); }} className="w-4 h-4 rounded border-gray-600 text-[#ee3425] focus:ring-[#ee3425]" />
                                        <span className="text-xs text-gray-400">You agree to our friendly <a href="/terms" className="underline hover:text-[#ee3425] transition-colors">terms of service</a>.</span>
                                    </label>
                                    {termsError && <p className="text-sm text-red-400 mt-1.5">Please agree to the terms of service before submitting.</p>}
                                </div>
                                {state.errors?.name && state.errors.name.map((e: string) => <p key={e} className="text-sm text-red-400">{e}</p>)}
                                {state.errors?.email && state.errors.email.map((e: string) => <p key={e} className="text-sm text-red-400">{e}</p>)}
                                {state.errors?.message && state.errors.message.map((e: string) => <p key={e} className="text-sm text-red-400">{e}</p>)}
                                {state.message && (
                                    <div className={`p-3 rounded-lg text-sm ${state.message.includes('Success') ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                                        {state.message}
                                    </div>
                                )}
                                <SubmitButton />
                            </form>
                        </div>
                    </div>

                    {/* Right: Sticky vertical offices sidebar */}
                    <aside className="hidden lg:block w-[280px] shrink-0 self-start sticky top-28">
                        <div className="space-y-5">
                            <div className="rounded-2xl bg-[#fa9008] text-white p-6 relative overflow-hidden">
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
                                <div className="relative z-10">
                                    <h3 className="text-sm font-bold mb-3">Express Customer Enquiries</h3>
                                    <div className="space-y-2">
                                        <a href="tel:02250534575" className="flex items-center gap-2.5 text-xs text-white/90 hover:text-white transition-colors"><FaPhone className="text-[10px]" /> 02250534575</a>
                                        <a href="https://wa.me/917356124443" className="flex items-center gap-2.5 text-xs text-white/90 hover:text-white transition-colors"><FaWhatsapp className="text-xs" /> +91 7356124443</a>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
                                <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5 flex items-center gap-2">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ee3425" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                    Our Offices
                                </h3>
                                <div className="space-y-5">
                                    <div>
                                        <h4 className="text-xs font-bold text-white mb-1.5">Corporate Office</h4>
                                        <p className="text-[11px] text-gray-400 leading-relaxed">1st Floor, Anthill IQ, 20, SR-2 Cunningham Rd, Vasanth Nagar, Bengaluru, Karnataka 560052</p>
                                    </div>
                                    <div className="w-full h-px bg-white/5" />
                                    <div>
                                        <h4 className="text-xs font-bold text-white mb-1.5">Chennai</h4>
                                        <p className="text-[11px] text-gray-400 leading-relaxed">QWQER, Cabin No 11, VVM Towers, Logas Coworking, 3rd Floor, No.22A, Pattulos Road, Anna Salai, Chennai, Tamil Nadu 600002</p>
                                    </div>
                                    <div className="w-full h-px bg-white/5" />
                                    <div>
                                        <h4 className="text-xs font-bold text-white mb-1.5">Kochi</h4>
                                        <p className="text-[11px] text-gray-400 leading-relaxed">Ground floor, InnerSpace Coworking, Sivarama Menon Road, Kaloor, Kochi, Kerala 682018</p>
                                    </div>
                                    <div className="w-full h-px bg-white/5" />
                                    <div>
                                        <h4 className="text-xs font-bold text-white mb-1.5">Hyderabad</h4>
                                        <p className="text-[11px] text-gray-400 leading-relaxed">105, 1st Floor, AltF Green Towers, Municipal No. 1-10-176/4A, 4B, 4C & 4D, Begumpet Main Road, Mayur Marg, Begumpet, Hyderabad-500016</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </section>

            <Footer />
        </main>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}
            className="w-full bg-[#ee3425] text-white font-bold py-3.5 rounded-lg hover:bg-[#d42e20] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {pending ? 'Sending...' : 'Contact Now'}
        </button>
    );
}
