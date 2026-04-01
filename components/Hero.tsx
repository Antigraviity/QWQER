"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import CityAnimation from "./CityAnimation";

const TYPEWRITER_PHRASES = [
    "to move businesses.",
    "for speed and scale.",
    "for seamless delivery.",
    "for enterprise reliability.",
];

function TypewriterText() {
    const [displayText, setDisplayText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];
        let timeout: NodeJS.Timeout;

        if (!isDeleting) {
            // Typing
            if (displayText.length < currentPhrase.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                }, 80 + Math.random() * 40); // slight randomness for natural feel
            } else {
                // Pause at full text, then start deleting
                timeout = setTimeout(() => setIsDeleting(true), 2000);
            }
        } else {
            // Deleting
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 40);
            } else {
                // Move to next phrase
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, phraseIndex, isDeleting]);

    // Blinking cursor
    useEffect(() => {
        const cursorInterval = setInterval(() => setShowCursor((prev) => !prev), 530);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <>
            {displayText}
            <span
                className="inline-block w-[3px] md:w-[4px] ml-1 rounded-full bg-[#ee3425] align-middle"
                style={{
                    opacity: showCursor ? 1 : 0,
                    transition: "opacity 0.1s",
                    height: "0.7em",
                }}
            />
        </>
    );
}

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
        <section ref={containerRef} className="min-h-screen w-full flex items-center bg-black relative overflow-hidden pt-16 md:pt-20 pb-28 md:pb-10 opacity-0">
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
                    <h1 className="text-[2rem] xs:text-[2.25rem] sm:text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1.15] text-white mb-6 md:mb-8">
                        <span className="animate-word inline-block mr-2 md:mr-3">Transportation</span>
                        <span className="animate-word inline-block mr-2 md:mr-3">solutions,</span>
                        <br />
                        <span className="flex items-baseline justify-center flex-wrap gap-x-1">
                            <span className="text-white">built&nbsp;</span>
                            <span className="inline-block text-left">
                                <span className="bg-gradient-to-r from-[#ee3425] via-[#ff6b5a] to-[#ee3425] bg-clip-text text-transparent"><TypewriterText /></span>
                                {/* Invisible longest phrase to reserve width — hidden on mobile to prevent overflow */}
                                <span className="hidden sm:block h-0 overflow-hidden invisible" aria-hidden="true">
                                    for enterprise reliability.
                                </span>
                            </span>
                        </span>
                    </h1>
                    <p className="animate-word block text-white/70 text-sm sm:text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2 md:px-0">
                        From intercity FTL operations to hyperlocal deliveries, QWQER helps businesses move goods across India with visibility, control, and consistency.
                    </p>

                </div>
            </div>

        </section>
    );
}
