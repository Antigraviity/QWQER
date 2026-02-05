"use client";
import React, { useEffect, useRef } from "react";
import Image from 'next/image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
            // Watermark Animation
            gsap.from(".footer-watermark", {
                y: 100,
                opacity: 0,
                duration: 2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%",
                }
            });

            // Column Animations
            gsap.from(".footer-col", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 75%",
                }
            });

            // Copyright Animation
            gsap.from(".footer-copyright", {
                opacity: 0,
                duration: 1,
                delay: 0.8,
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 90%",
                }
            });

        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-[#ee3425] text-white pt-12 pb-24 relative overflow-hidden">
            {/* Unique Watermark Background */}
            <div className="footer-watermark absolute -bottom-10 -right-20 opacity-20 pointer-events-none select-none">
                <h1 className="text-[15rem] font-black leading-none text-white tracking-tighter">
                    QWQER
                </h1>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 lg:gap-24 mb-12 border-b border-white/20 pb-8">
                    {/* Column 1: Brand Info */}
                    <div className="footer-col space-y-4">
                        <div className="inline-block">
                            <Image src="/footerlogo.webp" alt="QWQER Logo" width={120} height={40} className="h-10 w-auto object-contain" />
                        </div>
                        <p className="text-white/90 text-lg leading-relaxed max-w-sm font-medium">
                            A transportation solution provider built for express delivery and fleet operations.
                        </p>
                    </div>

                    {/* Column 2: Services */}
                    <div className="footer-col">
                        <h4 className="text-2xl font-bold mb-4 relative inline-block">
                            Our Services
                            <span className="absolute -bottom-1.5 left-0 w-1/2 h-0.5 bg-white rounded-full"></span>
                        </h4>
                        <ul className="space-y-3 text-white/80 font-medium text-lg">
                            <li>
                                <a href="#" className="flex items-center group hover:text-white transition-colors">
                                    <span className="w-2 h-2 bg-white/50 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                                    QWQER Fleet
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center group hover:text-white transition-colors">
                                    <span className="w-2 h-2 bg-white/50 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                                    QWQER Express
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Locations & Quick Links */}
                    <div className="footer-col space-y-8">
                        {/* Locations */}
                        <div>
                            <h4 className="text-2xl font-bold mb-3">Our Locations</h4>
                            <p className="text-white/80 leading-relaxed font-medium text-lg">
                                Karnataka, Kerala, Tamilnadu, Telangana
                            </p>
                        </div>

                        {/* Quick Links - Vertical Alignment */}
                        <div>
                            <h4 className="text-2xl font-bold mb-3">Quick Links</h4>
                            <ul className="flex flex-col gap-2.5 text-base font-medium text-white/80">
                                {["Contact Us", "Blog", "PR Perks", "Case Studies", "FAQs", "Terms"].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright text-center md:text-left text-base text-white/60 font-medium">
                    © {new Date().getFullYear()} QWQER. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
