"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import CityAnimation from "./CityAnimation";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const packageRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // 1. Initial State Set
        const words = textRef.current ? textRef.current.querySelectorAll(".animate-word") : [];
        const logisticsLine = pathRef.current;
        const packageDot = packageRef.current;

        if (logisticsLine) {
            const length = logisticsLine.getTotalLength();
            gsap.set(logisticsLine, { strokeDasharray: length, strokeDashoffset: length });
        }

        // 2. Animation Sequence
        tl.to(containerRef.current, { opacity: 1, duration: 0.5 })
            // Text Reveal (Staggered "Arrival")
            .fromTo(words,
                { x: -50, opacity: 0, scale: 0.9 },
                { x: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 }
            )
            // Logistics Line Drawing
            .to(logisticsLine, {
                strokeDashoffset: 0,
                duration: 2,
                ease: "power2.inOut"
            }, "-=0.4");

        // 3. Continuous "Package" Movement Loop
        if (logisticsLine && packageDot) {
            // Create a separate timeline for the infinite loop
            const loopTl = gsap.timeline({ repeat: -1 });
            loopTl.to(packageDot, {
                motionPath: {
                    path: logisticsLine,
                    align: logisticsLine,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true
                },
                duration: 4,
                ease: "linear"
            });
            // Note: standard GSAP MotionPathPlugin might not be imported/registered in this env.
            // Fallback: Simple SVG animateMotion is safer if plugin is missing.
            // We will use native SVG animation in the JSX for reliability in this specific environment context

            // Truck Vibration
            gsap.to(".hero-truck-vibrate", {
                x: 0.5,
                y: 0.5,
                duration: 0.05,
                repeat: -1,
                yoyo: true,
                ease: "none"
            });
        }
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen w-full flex items-center bg-black relative overflow-hidden pt-20 opacity-0">
            {/* Background Gradients - Adjusted for centered layout */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-[#ee3425]/10 to-transparent opacity-30 blur-3xl"></div>

            {/* Logistics Route SVG Animation Background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#333" />
                        <stop offset="50%" stopColor="#ee3425" />
                        <stop offset="100%" stopColor="#333" />
                    </linearGradient>
                </defs>
                {/* A path that weaves through the section - Wide S curve for background */}
                <path
                    ref={pathRef}
                    d="M-100,300 C200,300 300,100 600,200 S900,400 1200,200 S1600,100 2000,300"
                    fill="none"
                    stroke="url(#line-gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_5px_rgba(238,52,37,0.5)]"
                />
                {/* Moving Package Dot - Native SVG Animation Fallback */}
                <circle r="6" fill="#ee3425" className="drop-shadow-[0_0_10px_#ee3425]">
                    <animateMotion dur="8s" repeatCount="indefinite" path="M-100,300 C200,300 300,100 600,200 S900,400 1200,200 S1600,100 2000,300" rotate="auto" />
                </circle>
            </svg>

            {/* City Layer */}
            <CityAnimation />

            <div className="max-w-5xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
                <div ref={textRef} className="perspective-1000">
                    <p className="animate-word inline-block text-[#ee3425] font-bold tracking-widest uppercase mb-6 text-sm md:text-base">
                        Logistics Reinvented
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1.1] text-white mb-8">
                        <span className="animate-word inline-block mr-3">Transportation</span>
                        <span className="animate-word inline-block mr-3">solutions,</span>
                        <br className="hidden md:block" />
                        <span className="animate-word inline-block bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                            built to move business.
                        </span>
                    </h1>
                    <p className="animate-word block text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        From intercity FTL operations to hyperlocal deliveries, QWQER helps businesses move goods across India with visibility, control, and consistency.
                    </p>
                    <div className="flex gap-4 justify-center animate-word">
                        <button className="px-8 py-4 bg-[#ee3425] text-white font-bold rounded-full hover:bg-[#c92a1c] transition-all hover:scale-105 active:scale-95 text-lg">
                            Get Started
                        </button>
                        <button className="px-8 py-4 bg-white/5 text-white font-bold rounded-full hover:bg-white/10 transition-all border border-white/10 hover:scale-105 active:scale-95 text-lg backdrop-blur-md">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
}
