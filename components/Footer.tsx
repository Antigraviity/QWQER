"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Image from 'next/image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const mascotRef = useRef<HTMLDivElement>(null);
    const runnerRef = useRef<HTMLDivElement>(null);
    const idleAnimRef = useRef<gsap.core.Tween | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const isAnimatingRef = useRef(false);

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
                    start: "top 90%",
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
                    start: "top 85%",
                }
            });

            // Copyright Animation
            gsap.from(".footer-copyright", {
                opacity: 0,
                y: 20,
                duration: 1,
                delay: 0.5,
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 95%",
                }
            });

            // Mascot scroll-triggered slide-in from left + idle breathing after
            if (mascotRef.current) {
                // Start off-screen to the left
                gsap.set(mascotRef.current, { x: -200, opacity: 0 });

                gsap.to(mascotRef.current, {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 85%",
                    },
                    onComplete: () => {
                        // Start idle breathing after slide-in completes
                        if (mascotRef.current) {
                            idleAnimRef.current = gsap.to(mascotRef.current, {
                                scaleY: 1.02,
                                scaleX: 0.99,
                                y: -2,
                                duration: 1.8,
                                ease: "sine.inOut",
                                repeat: -1,
                                yoyo: true,
                                transformOrigin: "bottom center",
                            });
                        }
                    },
                });
            }

        }, footerRef);

        return () => ctx.revert();
    }, []);

    // Click: excited reaction → swap to running mascot → run right-to-left
    const handleMascotClick = useCallback(() => {
        if (isAnimatingRef.current || !mascotRef.current || !footerRef.current) return;
        isAnimatingRef.current = true;

        // Pause idle
        idleAnimRef.current?.pause();

        const footerWidth = footerRef.current.offsetWidth;
        const mascotEl = mascotRef.current;

        // Phase 1: Excited reaction on thumbs-up mascot
        const excitedTl = gsap.timeline({
            onComplete: () => {
                // Phase 2: Swap to running mascot & run across
                setIsRunning(true);

                const runner = runnerRef.current;
                if (!runner) {
                    isAnimatingRef.current = false;
                    return;
                }

                // Position runner at right side and make visible
                gsap.set(runner, {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0,
                });

                // Running animation timeline
                const runTl = gsap.timeline({
                    onComplete: () => {
                        // Redirect to contact page after running animation ends
                        window.location.href = "/contact";
                    },
                });

                // Run from left to right across the full footer
                runTl.to(runner, {
                    x: footerWidth + 300,
                    duration: 3,
                    ease: "power1.in",
                });

                // Simultaneous bobbing while running
                gsap.to(runner, {
                    y: -8,
                    duration: 0.18,
                    ease: "sine.inOut",
                    repeat: 16,
                    yoyo: true,
                });

                // Slight forward lean while running (leaning right)
                gsap.to(runner, {
                    rotation: 5,
                    duration: 0.3,
                    ease: "power2.out",
                });

                // Animate air pressure waves — expanding outward
                const airWaves = runner.querySelectorAll(".air-wave");
                airWaves.forEach((wave, i) => {
                    gsap.fromTo(wave,
                        { scaleX: 0.3, scaleY: 0.6, opacity: 0 },
                        {
                            scaleX: 1,
                            scaleY: 1,
                            opacity: 1,
                            duration: 0.6,
                            delay: i * 0.12,
                            repeat: -1,
                            ease: "power2.out",
                            transformOrigin: "right center",
                            onRepeat: () => {
                                gsap.set(wave, { scaleX: 0.3, scaleY: 0.6, opacity: 0 });
                            },
                        }
                    );
                    // Fade out as they expand
                    gsap.to(wave, {
                        opacity: 0,
                        duration: 0.3,
                        delay: i * 0.12 + 0.35,
                        repeat: -1,
                        ease: "power1.in",
                    });
                });

                // Animate speed streaks — shooting out and fading
                const airStreaks = runner.querySelectorAll(".air-streaks > div");
                airStreaks.forEach((streak, i) => {
                    gsap.fromTo(streak,
                        { scaleX: 0, opacity: 0 },
                        {
                            scaleX: 1,
                            opacity: 1,
                            duration: 0.25,
                            delay: i * 0.06,
                            repeat: -1,
                            yoyo: true,
                            ease: "power2.out",
                            transformOrigin: "right center",
                        }
                    );
                });

                // Animate dust puffs — expand and drift left
                const dustPuffs = runner.querySelectorAll(".dust-cloud .flex > div");
                dustPuffs.forEach((puff, i) => {
                    gsap.fromTo(puff,
                        { scale: 0.4, opacity: 0.2, x: 0 },
                        {
                            scale: 2,
                            opacity: 0,
                            x: -(20 + (i * 8)),
                            duration: 0.8,
                            delay: i * 0.12,
                            repeat: -1,
                            ease: "power1.out",
                        }
                    );
                });
            },
        });

        // Excited jump
        excitedTl.to(mascotEl, {
            y: -35,
            scaleY: 1.08,
            scaleX: 0.94,
            duration: 0.25,
            ease: "power3.out",
            transformOrigin: "bottom center",
        })
        // Land with squash
        .to(mascotEl, {
            y: 0,
            scaleY: 0.92,
            scaleX: 1.06,
            duration: 0.15,
            ease: "power3.in",
        })
        // Bounce back
        .to(mascotEl, {
            scaleY: 1,
            scaleX: 1,
            duration: 0.2,
            ease: "elastic.out(1, 0.4)",
        })
        // Quick excited wiggle
        .to(mascotEl, {
            rotation: -6,
            duration: 0.08,
            ease: "sine.inOut",
        })
        .to(mascotEl, {
            rotation: 6,
            duration: 0.08,
            ease: "sine.inOut",
        })
        .to(mascotEl, {
            rotation: -4,
            duration: 0.08,
            ease: "sine.inOut",
        })
        .to(mascotEl, {
            rotation: 0,
            duration: 0.1,
            ease: "sine.out",
        })
        // Fade out thumbs-up mascot
        .to(mascotEl, {
            opacity: 0,
            scale: 0.8,
            duration: 0.2,
            ease: "power2.in",
        });
    }, []);

    return (
        <footer ref={footerRef} className="bg-[#ee3425] text-white pt-12 pb-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 lg:gap-24 mb-8 border-b border-white/20 pb-12 relative">
                    {/* Column 1: Brand Info */}
                    <div className="footer-col space-y-4 relative">
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
                                <a href="/#qwqer-fleet" className="flex items-center group hover:text-white transition-colors">
                                    <span className="w-2 h-2 bg-white/50 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                                    QWQER Fleet
                                </a>
                            </li>
                            <li>
                                <a href="/#qwqer-express" className="flex items-center group hover:text-white transition-colors">
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
                            <h4 className="text-2xl font-bold mb-4 relative inline-block">
                                Our Locations
                                <span className="absolute -bottom-1.5 left-0 w-1/2 h-0.5 bg-white rounded-full"></span>
                            </h4>
                            <p className="text-white/80 leading-relaxed font-medium text-lg">
                                Karnataka, Kerala, Tamilnadu, Telangana
                            </p>
                        </div>

                        {/* Quick Links - Vertical Alignment */}
                        <div>
                            <h4 className="text-2xl font-bold mb-4 relative inline-block">
                                Quick Links
                                <span className="absolute -bottom-1.5 left-0 w-1/2 h-0.5 bg-white rounded-full"></span>
                            </h4>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-base font-medium text-white/80">
                                {[
                                    { label: "About Us", href: "/about" },
                                    { label: "Partner", href: "/partner" },
                                    { label: "Services", href: "#" },
                                    { label: "Contact", href: "/contact" },
                                    { label: "Resources", href: "/resources" },
                                    { label: "Terms", href: "/terms" },
                                    { label: "Careers", href: "/careers" },
                                    { label: "Privacy Policy", href: "/privacy" },
                                ].map((link) => (
                                    <a key={link.label} href={link.href} className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mascot sitting on the divider line — LEFT side */}
                <div className="hidden md:block relative h-0" style={{ zIndex: 50 }}>
                    {/* Thumbs-up mascot */}
                    <div
                        ref={mascotRef}
                        className={`absolute left-4 cursor-pointer select-none ${isRunning ? "pointer-events-none" : ""}`}
                        style={{ bottom: "-38px", opacity: isRunning ? 0 : 1 }}
                        onClick={handleMascotClick}
                    >
                        {/* "Click to contact me" label next to right hand */}
                        <div className={`absolute flex items-center gap-1 transition-opacity duration-300 ${isRunning ? "opacity-0" : "opacity-100"}`}
                            style={{ top: "35%", right: "-140px" }}
                        >
                            <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-[#eed32f]" />
                            <span className="bg-[#eed32f] text-black text-xs font-extrabold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap animate-bounce">
                                Click me to contact
                            </span>
                        </div>

                        {/* Rotating ring animation behind mascot */}
                        <div className="absolute pointer-events-none" style={{
                            top: "50%", left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "280px", height: "280px",
                            zIndex: 0,
                        }}>
                            {/* Outer rotating dashed ring */}
                            <div style={{
                                position: "absolute", inset: "0",
                                border: "2px dashed rgba(255,255,255,0.15)",
                                borderRadius: "50%",
                                animation: "spin-slow 12s linear infinite",
                            }} />
                            {/* Middle rotating solid ring — opposite direction */}
                            <div style={{
                                position: "absolute", inset: "20px",
                                border: "1.5px solid rgba(255,255,255,0.1)",
                                borderRadius: "50%",
                                animation: "spin-slow 8s linear infinite reverse",
                            }} />
                            {/* Inner pulsing glow */}
                            <div style={{
                                position: "absolute", inset: "40px",
                                borderRadius: "50%",
                                background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                                animation: "pulse-glow 2.5s ease-in-out infinite",
                            }} />
                            {/* Small orbiting dot */}
                            <div style={{
                                position: "absolute", inset: "0",
                                animation: "spin-slow 6s linear infinite",
                            }}>
                                <div style={{
                                    position: "absolute", top: "0", left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "6px", height: "6px",
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.3)",
                                    boxShadow: "0 0 8px rgba(255,255,255,0.2)",
                                }} />
                            </div>
                            {/* Second orbiting dot — opposite */}
                            <div style={{
                                position: "absolute", inset: "15px",
                                animation: "spin-slow 9s linear infinite reverse",
                            }}>
                                <div style={{
                                    position: "absolute", bottom: "0", left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "4px", height: "4px",
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.2)",
                                    boxShadow: "0 0 6px rgba(255,255,255,0.15)",
                                }} />
                            </div>
                        </div>

                        {/* CSS keyframes for the rotating animations */}
                        <style jsx>{`
                            @keyframes spin-slow {
                                from { transform: rotate(0deg); }
                                to { transform: rotate(360deg); }
                            }
                            @keyframes pulse-glow {
                                0%, 100% { opacity: 0.4; transform: scale(0.95); }
                                50% { opacity: 1; transform: scale(1.05); }
                            }
                        `}</style>

                        {/* White glow on hover */}
                        <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                                background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)",
                                transform: "scale(1.1)",
                                zIndex: 1,
                            }}
                        />

                        {/* Thumbs-up image */}
                        <Image
                            src="/mascot-thumbsup.png"
                            alt="QWQER Mascot - Thumbs Up"
                            width={280}
                            height={320}
                            className="h-[300px] w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:drop-shadow-[0_10px_40px_rgba(255,255,255,0.3)] hover:brightness-110 transition-all duration-300 relative"
                            style={{ transform: "scaleX(-1) rotate(-3deg)", transformOrigin: "bottom center", zIndex: 2 }}
                            draggable={false}
                            priority
                        />

                        {/* Ground shadow */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2"
                            style={{
                                bottom: "55px",
                                width: "120px",
                                height: "14px",
                                background: "radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)",
                                borderRadius: "50%",
                            }}
                        />
                    </div>

                    {/* Running mascot (after click — runs right to left) */}
                    <div
                        ref={runnerRef}
                        className="absolute left-4 pointer-events-none"
                        style={{ bottom: "-38px", opacity: 0 }}
                    >
                        {/* === AIR PUSH WAVE EFFECTS === */}

                        {/* Concentric air pressure waves — expanding half-circles behind runner */}
                        <div className="air-waves absolute top-1/2 -translate-y-1/2 right-full" style={{ marginRight: "10px" }}>
                            {/* Wave 1 - closest, strongest */}
                            <div className="air-wave absolute" style={{
                                width: "60px", height: "180px",
                                right: "0px", top: "-90px",
                                borderRight: "3px solid rgba(255,255,255,0.35)",
                                borderRadius: "0 50% 50% 0",
                            }} />
                            {/* Wave 2 */}
                            <div className="air-wave absolute" style={{
                                width: "90px", height: "220px",
                                right: "15px", top: "-110px",
                                borderRight: "2.5px solid rgba(255,255,255,0.25)",
                                borderRadius: "0 50% 50% 0",
                            }} />
                            {/* Wave 3 */}
                            <div className="air-wave absolute" style={{
                                width: "120px", height: "260px",
                                right: "35px", top: "-130px",
                                borderRight: "2px solid rgba(255,255,255,0.15)",
                                borderRadius: "0 50% 50% 0",
                            }} />
                            {/* Wave 4 - farthest, faintest */}
                            <div className="air-wave absolute" style={{
                                width: "150px", height: "300px",
                                right: "60px", top: "-150px",
                                borderRight: "1.5px solid rgba(255,255,255,0.08)",
                                borderRadius: "0 50% 50% 0",
                            }} />
                        </div>

                        {/* Horizontal speed streaks — sharp motion lines */}
                        <div className="air-streaks absolute top-1/2 -translate-y-1/2 right-full mr-2">
                            <div className="absolute" style={{ top: "-50px", right: "0", width: "80px", height: "2px", background: "linear-gradient(to left, rgba(255,255,255,0.4), transparent)" }} />
                            <div className="absolute" style={{ top: "-25px", right: "10px", width: "120px", height: "2px", background: "linear-gradient(to left, rgba(255,255,255,0.3), transparent)" }} />
                            <div className="absolute" style={{ top: "0px", right: "5px", width: "100px", height: "2.5px", background: "linear-gradient(to left, rgba(255,255,255,0.35), transparent)" }} />
                            <div className="absolute" style={{ top: "25px", right: "15px", width: "90px", height: "2px", background: "linear-gradient(to left, rgba(255,255,255,0.25), transparent)" }} />
                            <div className="absolute" style={{ top: "50px", right: "0", width: "70px", height: "1.5px", background: "linear-gradient(to left, rgba(255,255,255,0.3), transparent)" }} />
                        </div>

                        {/* Ground dust puffs at feet level */}
                        <div className="dust-cloud absolute right-full mr-1" style={{ bottom: "55px" }}>
                            <div className="flex gap-2 items-center">
                                <div className="w-4 h-4 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)" }} />
                                <div className="w-6 h-6 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)" }} />
                                <div className="w-8 h-8 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }} />
                                <div className="w-5 h-5 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)" }} />
                            </div>
                        </div>

                        {/* Running image */}
                        <Image
                            src="/mascot-running.png"
                            alt="QWQER Mascot - Running Delivery"
                            width={280}
                            height={320}
                            className="h-[300px] w-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.4)] relative"
                            style={{ zIndex: 2, transform: "scaleX(-1)" }}
                            draggable={false}
                            priority
                        />

                        {/* Ground shadow */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2"
                            style={{
                                bottom: "55px",
                                width: "160px",
                                height: "12px",
                                background: "radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)",
                                borderRadius: "50%",
                                filter: "blur(2px)",
                            }}
                        />
                    </div>
                </div>

                {/* Copyright positioned below the line */}
                <div className="footer-copyright text-center text-sm text-white/50 font-medium relative z-10">
                    © {new Date().getFullYear()} QWQER. All rights reserved.
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="absolute bottom-8 right-8 z-20 w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center hover:bg-white/25 hover:scale-110 transition-all duration-300 group"
                aria-label="Back to top"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform duration-300">
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </button>

            {/* Centered Watermark - maintain 20% bottom clipping */}
            <div className="footer-watermark absolute -bottom-12 left-1/2 -translate-x-1/2 w-full flex flex-col items-center pointer-events-none select-none z-0">
                <h1 className="text-[15rem] font-black leading-none text-white opacity-20 tracking-tighter">
                    QWQER
                </h1>
            </div>
        </footer>
    );
}
