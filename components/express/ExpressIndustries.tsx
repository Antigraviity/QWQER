"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const industries = [
    { name: "Food & Delivery Platforms", icon: "M12 6v6l4 2M12 2a10 10 0 100 20 10 10 0 000-20z", desc: "Powering rapid fulfilment for aggregators, cloud kitchens, and restaurant chains." },
    { name: "Bakery", icon: "M3 9l4-4 3 3 3-3 4 4v11H3V9z", desc: "Temperature-sensitive, time-bound deliveries for bakeries and confectioneries." },
    { name: "Apparels", icon: "M20.38 3.46L16 2 12 5.5 8 2l-4.38 1.46a1 1 0 00-.62.94V20a2 2 0 002 2h14a2 2 0 002-2V4.4a1 1 0 00-.62-.94z", desc: "Same-day and next-day fashion deliveries with careful handling and returns support." },
    { name: "Q-commerce", icon: "M13 10V3L4 14h7v7l9-11h-7z", desc: "Ultra-fast delivery for quick-commerce platforms operating within tight SLA windows." },
    { name: "Fish & Meat", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", desc: "Cold-chain aware logistics for perishable proteins with strict freshness timelines." },
    { name: "Personal Care", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", desc: "Reliable delivery of beauty, wellness, and personal care products to doorsteps." },
    { name: "E-commerce", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z", desc: "Scalable last-mile delivery for online retailers handling high daily order volumes." },
    { name: "Pharma", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 2v2m8-2v2M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z", desc: "Compliant, tracked deliveries for pharmacies, diagnostics, and healthcare providers." },
    { name: "Florists & Gifts", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", desc: "Time-sensitive, occasion-driven deliveries for florists and gifting platforms." },
];

const TOTAL = industries.length;

export default function ExpressIndustries() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const headingRevealDone = useRef(false);
    const prevIndex = useRef(-1);
    const listRefs = useRef<(HTMLDivElement | null)[]>([]);
    const orbitDotsRef = useRef<(HTMLDivElement | null)[]>([]);
    const centerEmojiRef = useRef<HTMLDivElement>(null);
    const centerNameRef = useRef<HTMLDivElement>(null);
    const centerDescRef = useRef<HTMLParagraphElement>(null);
    const connectorRef = useRef<SVGLineElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Header animations
    const headerOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
    const headerY = useTransform(scrollYProgress, [0, 0.06], [30, 0]);

    // Ring rotation tied to scroll
    const ringRotation = useTransform(scrollYProgress, [0.08, 0.92], [0, 200]);

    // Progress bar
    const progressWidth = useTransform(scrollYProgress, [0.08, 0.88], ["0%", "100%"]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    // Heading letter reveal + active industry cycling
    useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
        // Letter reveal
        if (latest >= 0.04 && !headingRevealDone.current && headingRef.current) {
            headingRevealDone.current = true;
            const lines = headingRef.current.querySelectorAll(".ei-line");
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
                    span.classList.add("ei-char");
                    if (char === " ") span.style.width = "0.3em";
                    el.appendChild(span);
                });
            });
            gsap.to(".ei-char", {
                opacity: 1,
                duration: 0.04,
                stagger: 0.025,
                ease: "none",
            });
        }

        // Active industry index
        const scrollRange = 0.88 - 0.08;
        const normalized = Math.max(0, Math.min(1, (latest - 0.08) / scrollRange));
        const idx = Math.min(TOTAL - 1, Math.floor(normalized * TOTAL));

        if (idx !== prevIndex.current && idx >= 0) {
            prevIndex.current = idx;

            // Animate list items
            listRefs.current.forEach((el, i) => {
                if (!el) return;
                const isActive = i === idx;
                gsap.to(el, {
                    opacity: isActive ? 1 : 0.25,
                    x: isActive ? 8 : 0,
                    duration: 0.4,
                    ease: "power2.out",
                });
                // Toggle active bar
                const bar = el.querySelector(".ind-bar") as HTMLElement;
                if (bar) {
                    bar.style.background = isActive ? "#7c3aed" : "rgba(255,255,255,0.06)";
                    bar.style.boxShadow = isActive ? "0 0 12px rgba(124,58,237,0.5)" : "none";
                    bar.style.height = isActive ? "32px" : "20px";
                }
                // Toggle icon
                const icon = el.querySelector(".ind-icon") as HTMLElement;
                if (icon) {
                    icon.style.transform = isActive ? "scale(1.15)" : "scale(1)";
                    icon.style.opacity = isActive ? "1" : "0.3";
                    icon.style.color = isActive ? "#7c3aed" : "rgba(255,255,255,0.3)";
                }
                // Toggle description
                const desc = el.querySelector(".ind-desc") as HTMLElement;
                if (desc) {
                    desc.style.maxHeight = isActive ? "40px" : "0px";
                    desc.style.opacity = isActive ? "1" : "0";
                    desc.style.marginTop = isActive ? "2px" : "0px";
                }
                // Toggle arrow
                const arrow = el.querySelector(".ind-arrow") as HTMLElement;
                if (arrow) {
                    arrow.style.opacity = isActive ? "1" : "0";
                    arrow.style.transform = isActive ? "translateX(0)" : "translateX(-8px)";
                }
            });

            // Animate orbital dots
            orbitDotsRef.current.forEach((dot, i) => {
                if (!dot) return;
                const isActive = i === idx;
                gsap.to(dot, {
                    scale: isActive ? 1.5 : 1,
                    duration: 0.4,
                    ease: "back.out(2)",
                });
                const inner = dot.querySelector(".orbit-inner") as HTMLElement;
                if (inner) {
                    inner.style.borderColor = isActive ? "#7c3aed" : "rgba(255,255,255,0.1)";
                    inner.style.background = isActive ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)";
                    inner.style.boxShadow = isActive ? "0 0 20px rgba(124,58,237,0.4)" : "none";
                }
                const ping = dot.querySelector(".orbit-ping") as HTMLElement;
                if (ping) {
                    ping.style.display = isActive ? "block" : "none";
                }
            });

            // Animate center name
            if (centerNameRef.current) {
                gsap.fromTo(centerNameRef.current,
                    { opacity: 0, y: 8 },
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.1 }
                );
                centerNameRef.current.textContent = industries[idx].name;
            }
            if (centerDescRef.current) {
                gsap.fromTo(centerDescRef.current,
                    { opacity: 0, y: 6 },
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.2 }
                );
                centerDescRef.current.textContent = industries[idx].desc;
            }

            // Animate connector line to active dot
            if (connectorRef.current) {
                const angle = (idx / TOTAL) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const x = 50 + 48 * Math.cos(rad);
                const y = 50 + 48 * Math.sin(rad);
                gsap.to(connectorRef.current, {
                    attr: { x1: "50%", y1: "35%", x2: `${x}%`, y2: `${y}%` },
                    duration: 0.5,
                    ease: "power2.out",
                });
            }
        }
    });

    return (
        <section ref={sectionRef} className="relative bg-[#050505]" style={{ height: `${(TOTAL) * 55}vh` }}>
            {/* Sticky viewport */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7c3aed]/[0.03] blur-[180px] rounded-full" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full max-w-[1400px] mx-auto px-6 md:px-16 pt-16 md:pt-20">

                    {/* ── Header ── */}
                    <motion.div className="mb-4" style={{ opacity: headerOpacity, y: headerY }}>
                        <h2
                            ref={headingRef}
                            className="text-4xl md:text-[48px] font-extrabold tracking-tight leading-[1.1]"
                        >
                            <span className="ei-line inline text-white">Industries </span>
                            <span className="ei-line inline text-[#7c3aed]" data-color="#7c3aed">We Serve</span>
                        </h2>
                        <p className="text-white/70 text-base max-w-lg leading-relaxed mt-4">
                            Delivering across every sector — from food platforms to pharma,
                            we power hyperlocal fulfilment at scale.
                        </p>
                    </motion.div>

                    {/* ── Progress bar ── */}
                    <div className="relative mb-6 hidden md:block">
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

                    {/* ── Main: Left list + Right orbital ── */}
                    <div className="flex flex-col lg:flex-row items-center flex-1 gap-6 lg:gap-4 min-h-0">

                        {/* Left — scrolling industry list */}
                        <div className="w-full lg:w-[38%] flex flex-col justify-center overflow-hidden">
                            <div className="flex flex-col gap-0.5">
                                {industries.map((ind, i) => (
                                    <div
                                        key={i}
                                        ref={(el) => { listRefs.current[i] = el; }}
                                        className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-300"
                                        style={{ opacity: i === 0 ? 1 : 0.25 }}
                                    >
                                        {/* Active bar */}
                                        <div
                                            className="ind-bar w-[3px] rounded-full transition-all duration-500 flex-shrink-0"
                                            style={{
                                                height: i === 0 ? "32px" : "20px",
                                                background: i === 0 ? "#7c3aed" : "rgba(255,255,255,0.06)",
                                                boxShadow: i === 0 ? "0 0 12px rgba(124,58,237,0.5)" : "none",
                                            }}
                                        />

                                        {/* Icon */}
                                        <div
                                            className="ind-icon transition-all duration-500 flex-shrink-0"
                                            style={{
                                                transform: i === 0 ? "scale(1.15)" : "scale(1)",
                                                opacity: i === 0 ? 1 : 0.3,
                                                color: i === 0 ? "#7c3aed" : "rgba(255,255,255,0.3)",
                                            }}
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d={ind.icon} />
                                            </svg>
                                        </div>

                                        {/* Name + Desc */}
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm md:text-base font-semibold text-white truncate">
                                                {ind.name}
                                            </span>
                                            <span
                                                className="ind-desc text-xs md:text-sm text-white/70 leading-snug overflow-hidden transition-all duration-500"
                                                style={{
                                                    maxHeight: i === 0 ? "40px" : "0px",
                                                    opacity: i === 0 ? 1 : 0,
                                                    marginTop: i === 0 ? "2px" : "0px",
                                                }}
                                            >
                                                {ind.desc}
                                            </span>
                                        </div>

                                        {/* Arrow */}
                                        <svg
                                            className="ind-arrow w-4 h-4 ml-auto text-[#7c3aed] flex-shrink-0 transition-all duration-300"
                                            style={{
                                                opacity: i === 0 ? 1 : 0,
                                                transform: i === 0 ? "translateX(0)" : "translateX(-8px)",
                                            }}
                                            fill="none" viewBox="0 0 16 16"
                                        >
                                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — Orbital visualization */}
                        <div className="w-full lg:w-[62%] flex items-center justify-center">
                            <div className="relative w-[340px] h-[340px] md:w-[440px] md:h-[440px]">

                                {/* Outer rotating ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-[#7c3aed]/10"
                                    style={{ rotate: ringRotation }}
                                />

                                {/* Middle ring */}
                                <div className="absolute inset-10 rounded-full border border-dashed border-[#7c3aed]/[0.06]" />

                                {/* Inner glow */}
                                <div className="absolute inset-20 rounded-full bg-[#7c3aed]/[0.03] blur-[30px]" />

                                {/* Center content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
                                    <span ref={centerNameRef} className="text-white font-bold text-lg md:text-xl tracking-tight">
                                        {industries[0].name}
                                    </span>
                                    <div className="mt-2 h-[2px] w-10 bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent rounded-full" />
                                    <p ref={centerDescRef} className="text-white/70 text-sm leading-relaxed mt-2 max-w-[200px]">
                                        {industries[0].desc}
                                    </p>
                                </div>

                                {/* Connector line from above center to active dot */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <line
                                        ref={connectorRef}
                                        x1="50%" y1="35%"
                                        x2={`${50 + 48 * Math.cos((-90 * Math.PI) / 180)}%`}
                                        y2={`${50 + 48 * Math.sin((-90 * Math.PI) / 180)}%`}
                                        stroke="#7c3aed"
                                        strokeWidth="1.5"
                                        strokeDasharray="4 4"
                                        opacity="0.5"
                                    />
                                    {/* Faint lines to all dots */}
                                    {industries.map((_, i) => {
                                        const angle = (i / TOTAL) * 360 - 90;
                                        const rad = (angle * Math.PI) / 180;
                                        const x = 50 + 48 * Math.cos(rad);
                                        const y = 50 + 48 * Math.sin(rad);
                                        return (
                                            <line
                                                key={i}
                                                x1="50%" y1="35%"
                                                x2={`${x}%`} y2={`${y}%`}
                                                stroke="rgba(255,255,255,0.03)"
                                                strokeWidth="0.5"
                                            />
                                        );
                                    })}
                                </svg>

                                {/* Orbiting dots */}
                                {industries.map((ind, i) => {
                                    const angle = (i / TOTAL) * 360 - 90;
                                    const rad = (angle * Math.PI) / 180;
                                    const x = 50 + 48 * Math.cos(rad);
                                    const y = 50 + 48 * Math.sin(rad);

                                    return (
                                        <div
                                            key={i}
                                            ref={(el) => { orbitDotsRef.current[i] = el; }}
                                            className="absolute"
                                            style={{
                                                left: `${x}%`,
                                                top: `${y}%`,
                                                transform: "translate(-50%, -50%)",
                                            }}
                                        >
                                            <div
                                                className="orbit-inner relative flex items-center justify-center rounded-full transition-all duration-500"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderWidth: "2px",
                                                    borderStyle: "solid",
                                                    borderColor: i === 0 ? "#7c3aed" : "rgba(255,255,255,0.1)",
                                                    background: i === 0 ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
                                                    boxShadow: i === 0 ? "0 0 20px rgba(124,58,237,0.4)" : "none",
                                                    color: i === 0 ? "#7c3aed" : "rgba(255,255,255,0.3)",
                                                }}
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d={ind.icon} />
                                                </svg>
                                                {/* Ping */}
                                                <div
                                                    className="orbit-ping absolute inset-0 rounded-full border border-[#7c3aed]/40 animate-ping"
                                                    style={{ display: i === 0 ? "block" : "none" }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ── Bottom dot navigation ── */}
                    <div className="flex items-center justify-center gap-2 pb-6 md:pb-10">
                        {industries.map((_, i) => (
                            <DotNav key={i} index={i} scrollYProgress={scrollYProgress} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── Dot nav indicator ── */
function DotNav({
    index,
    scrollYProgress,
}: {
    index: number;
    scrollYProgress: MotionValue<number>;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
        if (!ref.current) return;
        const scrollRange = 0.88 - 0.08;
        const normalized = Math.max(0, Math.min(1, (latest - 0.08) / scrollRange));
        const activeIdx = Math.min(TOTAL - 1, Math.floor(normalized * TOTAL));
        const isActive = activeIdx === index;

        ref.current.style.width = isActive ? "28px" : "6px";
        ref.current.style.background = isActive ? "#7c3aed" : "rgba(255,255,255,0.15)";
        ref.current.style.boxShadow = isActive ? "0 0 10px rgba(124,58,237,0.5)" : "none";
    });

    return (
        <div
            ref={ref}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
                width: index === 0 ? "28px" : "6px",
                background: index === 0 ? "#7c3aed" : "rgba(255,255,255,0.15)",
            }}
        />
    );
}
