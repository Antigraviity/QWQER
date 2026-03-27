"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
    {
        title: "Vast Rider Network",
        description:
            "A vast rider network built to handle hyperlocal deliveries at scale, without ever missing a beat.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="5" stroke="#7c3aed" strokeWidth="2" />
                <circle cx="32" cy="16" r="5" stroke="#7c3aed" strokeWidth="2" />
                <circle cx="24" cy="32" r="5" stroke="#7c3aed" strokeWidth="2" />
                <path d="M20 18l4 10M28 18l-4 10" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                <path d="M11 16h-3M40 16h-3M24 40v3" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
                <circle cx="24" cy="24" r="18" stroke="#7c3aed" strokeWidth="1.5" opacity="0.2" />
            </svg>
        ),
    },
    {
        title: "System-Ready Integration",
        description:
            "Integrate seamlessly with your OMS, ERP or internal tools to automate delivery allocation and tracking, with AI-driven processes engineered to accelerate speed and keep your operations running without interruption.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 8l4 4-4 4-4-4 4-4zm10 10l4 4-4 4-4-4 4-4zm-20 0l4 4-4 4-4-4 4-4zm10 10l4 4-4 4-4-4 4-4z" stroke="#7c3aed" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="24" cy="24" r="4" fill="#7c3aed" opacity="0.25" />
            </svg>
        ),
    },
    {
        title: "Multiple Delivery Models",
        description:
            "We offer multiple delivery models, including on-demand, batch and same-day deliveries, designed to support varying order volumes, timelines and operational needs.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="14" width="28" height="18" rx="3" stroke="#7c3aed" strokeWidth="2.5" />
                <path d="M34 20h5l3 8v4h-8V20z" stroke="#7c3aed" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="14" cy="35" r="3" stroke="#7c3aed" strokeWidth="2" />
                <circle cx="34" cy="35" r="3" stroke="#7c3aed" strokeWidth="2" />
            </svg>
        ),
    },
    {
        title: "High-Volume Fulfilment Efficiency",
        description:
            "Manage hyperlocal deliveries at scale through our vast rider network.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="14" stroke="#7c3aed" strokeWidth="2.5" />
                <path d="M24 14l2.4 7.2H34l-6.2 4.6 2.4 7.2L24 29l-6.2 4.8 2.4-7.2L14 21.2h7.6L24 14z" fill="#7c3aed" opacity="0.8" />
            </svg>
        ),
    },
];

const TOTAL = steps.length;

export default function WhyQwqerExpress() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const prevIndex = useRef(-1);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Heading text reveal
    const textRevealDone = useRef(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
        // Letter reveal — trigger immediately when section enters
        if (latest >= 0.01 && !textRevealDone.current && headingRef.current) {
            textRevealDone.current = true;
            const lines = headingRef.current.querySelectorAll(".wq-line");
            lines.forEach((line) => {
                const el = line as HTMLElement;
                const text = el.textContent || "";
                const color = el.dataset.color || "";
                el.textContent = "";
                text.split("").forEach((char) => {
                    const span = document.createElement("span");
                    span.textContent = char;
                    span.style.display = "inline-block";
                    span.style.opacity = "0.06";
                    if (color) span.style.color = color;
                    span.classList.add("wq-char");
                    if (char === " ") span.style.width = "0.3em";
                    el.appendChild(span);
                });
            });
            gsap.to(".wq-char", {
                opacity: 1,
                duration: 0.04,
                stagger: 0.025,
                ease: "none",
            });
        }

        // Active card — map scroll to card index
        const scrollRange = 0.90 - 0.08;
        const normalized = Math.max(0, Math.min(1, (latest - 0.08) / scrollRange));
        const idx = Math.min(TOTAL - 1, Math.floor(normalized * TOTAL));

        if (idx !== prevIndex.current && idx >= 0) {
            prevIndex.current = idx;

            // Animate all cards based on their distance from active
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                const distance = i - idx;
                const absDistance = Math.abs(distance);

                const isActive = distance === 0;
                const scale = isActive ? 1 : Math.max(0.7, 1 - absDistance * 0.12);
                const opacity = isActive ? 1 : Math.max(0.15, 1 - absDistance * 0.35);
                const translateX = distance * 105; // percentage offset from center
                const translateZ = isActive ? 0 : -80 * absDistance;
                const rotateY = distance * -5;

                gsap.to(card, {
                    x: `${translateX}%`,
                    scale,
                    opacity,
                    rotateY,
                    z: translateZ,
                    duration: 0.7,
                    ease: "power3.out",
                    overwrite: true,
                });

                // Toggle active glow border
                const border = card.querySelector(".card-border") as HTMLElement;
                if (border) {
                    border.style.opacity = isActive ? "1" : "0";
                }

                // Toggle description visibility
                const desc = card.querySelector(".card-desc") as HTMLElement;
                if (desc) {
                    desc.style.maxHeight = isActive ? "120px" : "0px";
                    desc.style.opacity = isActive ? "1" : "0";
                    desc.style.marginTop = isActive ? "16px" : "0px";
                }
            });
        }
    });

    // Progress bar
    const progressWidth = useTransform(scrollYProgress, [0.08, 0.90], ["0%", "100%"]);

    return (
        <section ref={sectionRef} className="relative h-[500vh] bg-black">
            {/* Sticky viewport */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-[#7c3aed]/[0.03] blur-[180px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] bg-[#7c3aed]/[0.02] blur-[140px] rounded-full" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full max-w-[1400px] mx-auto px-6 md:px-16 pt-20 md:pt-24">

                    {/* ── Header ── */}
                    <div className="mb-6">
                        <h2
                            ref={headingRef}
                            className="text-4xl md:text-[48px] font-extrabold tracking-tight leading-[1.1]"
                        >
                            <span className="wq-line inline text-white">Why QWQER</span>{" "}
                            <span className="wq-line inline text-[#7c3aed]" data-color="#7c3aed">Express?</span>
                        </h2>
                        <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed mt-4">
                            Built to Support Daily Operations, QWQER Express has proven to be a
                            reliable solution for hyperlocal deliveries.{" "}
                            <span className="text-white font-medium">Here&apos;s how:</span>
                        </p>
                    </div>

                    {/* ── Progress indicator ── */}
                    <div className="relative mb-8 hidden md:block">
                        <div className="h-[2px] w-full bg-white/[0.05] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{
                                    width: progressWidth,
                                    background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                                    boxShadow: "0 0 16px rgba(124,58,237,0.4)",
                                }}
                            />
                        </div>
                    </div>

                    {/* ── Centered carousel ── */}
                    <div className="flex-1 flex items-center justify-center relative" style={{ perspective: "1200px" }}>
                        {/* Cards — all absolutely positioned, GSAP moves them */}
                        <div className="relative w-full max-w-[480px] md:max-w-[520px] h-[380px]">
                            {steps.map((step, i) => (
                                <div
                                    key={i}
                                    ref={(el) => { cardRefs.current[i] = el; }}
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{
                                        transform: `translateX(${(i - 0) * 105}%)`,
                                        opacity: i === 0 ? 1 : 0.15,
                                        transformStyle: "preserve-3d",
                                        willChange: "transform, opacity",
                                    }}
                                >
                                    <div className="relative w-full rounded-[32px] p-[1.5px] overflow-hidden">
                                        {/* Animated gradient border */}
                                        <div
                                            className="card-border absolute inset-0 rounded-[32px] transition-opacity duration-500"
                                            style={{
                                                opacity: i === 0 ? 1 : 0,
                                                background: "conic-gradient(from 220deg at 50% 50%, #7c3aed, rgba(124,58,237,0.15) 25%, transparent 50%, transparent 75%, rgba(124,58,237,0.15) 90%, #7c3aed)",
                                            }}
                                        />

                                        {/* Card content */}
                                        <div className="relative rounded-[32px] bg-[#0c0c10] p-8 md:p-10 min-h-[320px] flex flex-col">
                                            {/* Icon */}
                                            <div className="w-16 h-16 rounded-2xl bg-[#7c3aed]/[0.08] border border-[#7c3aed]/20 flex items-center justify-center mb-6">
                                                {step.icon}
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-2xl md:text-[28px] font-bold text-white leading-snug">
                                                {step.title}
                                            </h3>

                                            {/* Description — expands for active card */}
                                            <p
                                                className="card-desc text-white/60 text-[15px] leading-[1.8] overflow-hidden transition-all duration-500"
                                                style={{
                                                    maxHeight: i === 0 ? "120px" : "0px",
                                                    opacity: i === 0 ? 1 : 0,
                                                    marginTop: i === 0 ? "16px" : "0px",
                                                }}
                                            >
                                                {step.description}
                                            </p>

                                            {/* Bottom accent */}
                                            <div className="mt-auto pt-6">
                                                <div className="h-[1px] w-full bg-gradient-to-r from-[#7c3aed]/20 via-[#7c3aed]/10 to-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Dot navigation ── */}
                    <div className="flex items-center justify-center gap-3 pb-10 md:pb-16">
                        {steps.map((_, i) => (
                            <DotIndicator key={i} index={i} scrollYProgress={scrollYProgress} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── Dot indicator ── */
function DotIndicator({
    index,
    scrollYProgress,
}: {
    index: number;
    scrollYProgress: MotionValue<number>;
}) {
    const dotRef = useRef<HTMLDivElement>(null);

    useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
        if (!dotRef.current) return;
        const scrollRange = 0.90 - 0.08;
        const normalized = Math.max(0, Math.min(1, (latest - 0.08) / scrollRange));
        const activeIdx = Math.min(TOTAL - 1, Math.floor(normalized * TOTAL));
        const isActive = activeIdx === index;

        dotRef.current.style.width = isActive ? "32px" : "8px";
        dotRef.current.style.background = isActive ? "#7c3aed" : "rgba(255,255,255,0.15)";
        dotRef.current.style.boxShadow = isActive ? "0 0 12px rgba(124,58,237,0.5)" : "none";
    });

    return (
        <div
            ref={dotRef}
            className="h-2 rounded-full transition-all duration-500"
            style={{
                width: index === 0 ? "32px" : "8px",
                background: index === 0 ? "#7c3aed" : "rgba(255,255,255,0.15)",
            }}
        />
    );
}
