"use client";
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa6';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initial Entrance
        gsap.fromTo(wrapperRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
        );

        // Scrub-based scroll animation for smoothness
        const tl = gsap.timeline({
            scrollTrigger: {
                start: "top top",
                end: "+=100",
                scrub: true,
            }
        });

        // Shrink from full width to pill
        tl.fromTo(navRef.current,
            {
                width: "100%",
                maxWidth: "100%",
                y: 0,
                borderRadius: "0px",
                backgroundColor: "rgba(0,0,0,0.85)",
                border: "none",
                boxShadow: "none",
            },
            {
                width: "75%",
                maxWidth: "75%",
                y: 20,
                borderRadius: "9999px",
                backgroundColor: "rgba(5,5,5,0.8)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.03), 0 10px 40px -10px rgba(0,0,0,0.8)",
                ease: "none"
            }, 0
        );

        // 2. Animate Shine Effect (wipes across as it shrinks)
        if (shineRef.current) {
            tl.fromTo(shineRef.current,
                { xPercent: -100 },
                { xPercent: 200, ease: "none" },
                0
            );
        }

        // --- Header: hide after hero, show on scroll up ---
        let isHidden = false;
        const isBlogDetail = !!document.querySelector('[data-blog-detail]');
        const st = ScrollTrigger.create({
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                const scrollY = self.scroll();
                const heroEnd = isBlogDetail ? window.innerHeight * 0.1 : window.innerHeight * 0.85;

                // Scrolling down past hero → hide
                if (self.direction === 1 && scrollY > heroEnd && !isHidden) {
                    isHidden = true;
                    gsap.to(wrapperRef.current, { y: -120, duration: 0.35, ease: "power3.inOut", overwrite: "auto" });
                }
                // Scrolling up → show
                else if (self.direction === -1 && isHidden) {
                    isHidden = false;
                    gsap.to(wrapperRef.current, { y: 0, duration: 0.35, ease: "power3.out", overwrite: "auto" });
                }

                // At top of page → ensure scrub is at start
                if (scrollY <= 5) {
                    tl.progress(0);
                }
            }
        });

        return () => {
            // Kill GSAP instances
            if (tl) tl.kill();
            if (st) st.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };

    }, []);

    return (
        <>
        <div ref={wrapperRef} className="fixed top-0 left-0 w-full z-50 flex justify-center pt-0 pointer-events-none">
            <nav
                ref={navRef}
                className="pointer-events-auto will-change-transform backdrop-blur-xl bg-black/10 border-b border-white/5 w-full mx-auto px-6 h-14 md:h-16 flex items-center justify-between relative"
            >
                {/* Background & Clipping Container for Shine Effect */}
                <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
                    {/* Glass Shine Effect */}
                    <div ref={shineRef} className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"></div>
                </div>

                <Link href="/" className="relative z-10 group">
                    {/* Logo Image without filters to show original colors */}
                    <Image
                        src="/qwqer-logo.png"
                        alt="QWQER Logo"
                        width={120}
                        height={40}
                        className="h-8 w-auto object-contain transition-all duration-300"
                    />
                </Link>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
                        {/* About Us */}
                        <Link href="/about" className="relative px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10 group">
                            About us
                        </Link>

                        {/* Services Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10 group-hover:bg-white/10">
                                Services
                                <FaChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white/90 backdrop-blur-xl rounded-2xl p-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-black">
                                <Link href="/express" className="block px-4 py-2.5 text-sm font-medium hover:bg-[#ee3425] hover:text-white rounded-xl transition-colors">
                                    Express
                                </Link>
                                <Link href="/fleet" className="block px-4 py-2.5 text-sm font-medium hover:bg-[#ee3425] hover:text-white rounded-xl transition-colors">
                                    Fleet
                                </Link>
                            </div>
                        </div>

                        {/* Resources */}
                        <Link href="/resources" className="relative px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10 group">
                            Resources
                        </Link>

                        {/* Careers */}
                        <Link href="/careers" className="relative px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10 group">
                            Careers
                        </Link>

                        {/* Contact */}
                        <Link href="/contact" className="relative px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10 group">
                            Contact
                        </Link>
                    </div>

                    <Link href="/partner" className="relative overflow-hidden group bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold border border-white hover:border-[#ee3425] transition-all duration-300 hidden md:inline-flex">
                        <span className="relative z-10 group-hover:text-white transition-colors">Join Us</span>
                        <div className="absolute inset-0 bg-[#ee3425] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                    </Link>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white transition-colors hover:bg-white/10"
                        onClick={() => setMobileOpen(prev => !prev)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>
        </div>

        {/* Mobile drawer — fixed independently so it's never clipped by wrapperRef transforms */}
        <div className={`md:hidden fixed left-0 w-full z-40 pointer-events-auto transition-all duration-300 px-3 ${
            mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
            style={{ top: '62px' }}
        >
            <div className={`bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl px-3 py-3 flex flex-col gap-1 shadow-2xl transition-all duration-300 ${
                mobileOpen ? 'translate-y-0' : '-translate-y-4'
            }`}>
                <Link href="/about" className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>About us</Link>
                <div>
                    <button
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
                        onClick={() => setServicesOpen(prev => !prev)}
                    >
                        Services <FaChevronDown className={`w-3 h-3 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-200 ${servicesOpen ? 'max-h-32' : 'max-h-0'}`}>
                        <Link href="/express" className="block px-8 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors" onClick={() => setMobileOpen(false)}>Express</Link>
                        <Link href="/fleet" className="block px-8 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors" onClick={() => setMobileOpen(false)}>Fleet</Link>
                    </div>
                </div>
                <Link href="/resources" className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>Resources</Link>
                <Link href="/careers" className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>Careers</Link>
                <Link href="/contact" className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>Contact</Link>
                <Link href="/partner" className="mt-2 mx-4 text-center py-3 rounded-full text-sm font-bold bg-white text-black hover:bg-[#ee3425] hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Join Us</Link>
            </div>
        </div>
        </>
    )
}
