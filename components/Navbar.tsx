"use client";
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa6';

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);

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
                end: "+=100", // Shorter distance for faster completion
                scrub: true, // Direct 1:1 mapping to scroll, no "catch up" lag
            }
        });

        // 1. Shrink Width
        tl.to(navRef.current, {
            width: "75%",
            y: 20, // Use transform instead of marginTop for better performance
            borderRadius: "9999px",
            backgroundColor: "rgba(5,5,5,0.8)", // Darker & more opaque for better contrast
            border: "1px solid rgba(255,255,255,0.15)", // Slightly crisper border
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.03), 0 10px 40px -10px rgba(0,0,0,0.8)", // Added subtle outer glow + deep shadow
            ease: "none" // Linear ease for direct control
        }, 0);

        // 2. Animate Shine Effect (wipes across as it shrinks)
        if (shineRef.current) {
            tl.fromTo(shineRef.current,
                { xPercent: -100 },
                { xPercent: 200, ease: "none" },
                0
            );
        }

        // --- Smart Header Logic (Hide on scroll down, Show on scroll up) ---
        const st = ScrollTrigger.create({
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                const currentScrollY = self.scroll();
                const heroHeight = window.innerHeight * 0.9;

                // If scrolling down AND past hero section
                if (self.direction === 1 && currentScrollY > heroHeight) {
                    gsap.to(wrapperRef.current, { yPercent: -150, duration: 0.3, ease: "power3.out", overwrite: true });
                }
                // If scrolling up OR (scrolling down but within hero section)
                else if (self.direction === -1 || currentScrollY <= heroHeight) {
                    gsap.to(wrapperRef.current, { yPercent: 0, duration: 0.3, ease: "power3.out", overwrite: true });
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
        <div ref={wrapperRef} className="fixed top-0 left-0 w-full z-50 flex justify-center pt-0 pointer-events-none">
            <nav
                ref={navRef}
                className="pointer-events-auto will-change-transform backdrop-blur-xl bg-black/10 border-b border-white/5 w-full max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between relative"
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
                        <Link href="#" className="relative px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10 group">
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
                                <Link href="#" className="block px-4 py-2.5 text-sm font-medium hover:bg-[#ee3425] hover:text-white rounded-xl transition-colors">
                                    Express
                                </Link>
                                <Link href="#" className="block px-4 py-2.5 text-sm font-medium hover:bg-[#ee3425] hover:text-white rounded-xl transition-colors">
                                    Fleet
                                </Link>
                            </div>
                        </div>

                        {/* Resources */}
                        <Link href="#" className="relative px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10 group">
                            Resources
                        </Link>
                    </div>

                    <button className="relative overflow-hidden group bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold border border-white hover:border-[#ee3425] transition-all duration-300">
                        <span className="relative z-10 group-hover:text-white transition-colors">Contact Us</span>
                        <div className="absolute inset-0 bg-[#ee3425] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                    </button>
                </div>
            </nav>
        </div>
    )
}
