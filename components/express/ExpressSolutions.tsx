"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import gsap from "gsap";

const solutions = [
    {
        title: "On-Demand Deliveries",
        description:
            "Instant pickup and delivery for time-sensitive orders, enabled by rapid rider allocation and flexible capacity.",
        image: "/express-solutions/on-demand-deliveries.webp",
    },
    {
        title: "Batch Deliveries",
        description:
            "Efficient single-pickup, multi-drop deliveries designed to handle high-volume dispatches at scale.",
        image: "/express-solutions/batch-deliveries.webp",
    },
    {
        title: "Same-Day Deliveries",
        description:
            "Reliable same-day fulfilment for intra-city orders, ensuring faster turnaround without compromising scale or reliability.",
        image: "/express-solutions/same-day-deliveries.webp",
    },
    {
        title: "Mid-mile to Last-mile Fulfilment",
        description:
            "End-to-end movement from hubs to stores and from stores to customers within city limits.",
        image: "/express-solutions/mid-mile-last-mile-fulfilment.webp",
    },
    {
        title: "Scheduled Deliveries",
        description:
            "Planned, same-day and next-day routes designed for predictable, recurring operations.",
        image: "/express-solutions/scheduled-deliveries.webp",
    },
    {
        title: "Multi-drop Distribution",
        description:
            "Single-pickup, multiple-drop delivery models optimised for efficiency and cost control.",
        image: "/express-solutions/multi-drop-distribution.webp",
    },
];

const TOTAL = solutions.length;

export default function ExpressSolutions() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const prevIndex = useRef(-1);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Header animations
    const headerOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
    const headerY = useTransform(scrollYProgress, [0, 0.06], [40, 0]);
    const headingRevealDone = useRef(false);
    const headingRef = useRef<HTMLHeadingElement>(null);

    // Letter reveal for heading — preserves child element colors
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest >= 0.02 && !headingRevealDone.current && headingRef.current) {
            headingRevealDone.current = true;

            // Process each direct child node (text nodes and span elements)
            const h2 = headingRef.current;
            const children = Array.from(h2.childNodes);
            h2.innerHTML = "";

            children.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    // Plain text — split into chars with white color
                    const text = node.textContent || "";
                    text.split("").forEach((char) => {
                        const span = document.createElement("span");
                        span.textContent = char;
                        span.style.display = "inline-block";
                        span.style.opacity = "0.06";
                        span.classList.add("es-char");
                        if (char === " ") span.style.width = "0.3em";
                        h2.appendChild(span);
                    });
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    // Element (e.g. <span class="text-[#7c3aed]">) — preserve color
                    const el = node as HTMLElement;
                    const color = el.style.color || "";
                    const className = el.className || "";
                    const text = el.textContent || "";
                    text.split("").forEach((char) => {
                        const span = document.createElement("span");
                        span.textContent = char;
                        span.style.display = "inline-block";
                        span.style.opacity = "0.06";
                        span.style.color = "#7c3aed";
                        span.classList.add("es-char");
                        if (char === " ") span.style.width = "0.3em";
                        h2.appendChild(span);
                    });
                }
            });

            gsap.to(".es-char", {
                opacity: 1,
                duration: 0.04,
                stagger: 0.02,
                ease: "none",
            });
        }

        // Active solution index
        const scrollRange = 0.85 - 0.12; // usable scroll range
        const normalized = Math.max(0, Math.min(1, (latest - 0.12) / scrollRange));
        const idx = Math.min(TOTAL - 1, Math.floor(normalized * TOTAL));

        if (idx !== prevIndex.current && idx >= 0) {
            const prev = prevIndex.current;
            prevIndex.current = idx;

            // Animate images
            if (prev >= 0 && imageRefs.current[prev]) {
                gsap.to(imageRefs.current[prev], {
                    opacity: 0,
                    scale: 0.92,
                    duration: 0.5,
                    ease: "power2.inOut",
                });
            }
            if (imageRefs.current[idx]) {
                gsap.fromTo(
                    imageRefs.current[idx],
                    { opacity: 0, scale: 1.08 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
                );
            }

            // Animate text items
            if (prev >= 0 && titleRefs.current[prev]) {
                gsap.to(titleRefs.current[prev], {
                    opacity: 0.2,
                    x: 0,
                    duration: 0.4,
                    ease: "power2.inOut",
                });
                // Collapse description
                const prevDesc = titleRefs.current[prev]?.querySelector(".es-desc") as HTMLElement;
                if (prevDesc) {
                    prevDesc.style.maxHeight = "0px";
                    prevDesc.style.opacity = "0";
                }
            }
            if (titleRefs.current[idx]) {
                gsap.to(titleRefs.current[idx], {
                    opacity: 1,
                    x: 12,
                    duration: 0.5,
                    ease: "power2.out",
                });
                // Expand description
                const activeDesc = titleRefs.current[idx]?.querySelector(".es-desc") as HTMLElement;
                if (activeDesc) {
                    activeDesc.style.maxHeight = "80px";
                    activeDesc.style.opacity = "1";
                }
            }
        }
    });

    // Progress bar
    const progressHeight = useTransform(scrollYProgress, [0.12, 0.85], ["0%", "100%"]);

    return (
        <section ref={sectionRef} className="relative bg-[#050505]" style={{ height: `${(TOTAL + 1) * 100}vh` }}>
            {/* Top border glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/50 to-transparent z-20" />

            {/* Sticky viewport */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-[#7c3aed]/[0.03] blur-[160px] rounded-full" />
                    <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-[#7c3aed]/[0.02] blur-[120px] rounded-full" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full max-w-[1400px] mx-auto px-6 md:px-16">

                    {/* ─── TOP: Full-width heading ─── */}
                    <motion.div className="pt-16 md:pt-20 mb-8 md:mb-10" style={{ opacity: headerOpacity, y: headerY }}>
                        <span className="text-[#7c3aed] text-[11px] font-bold tracking-[0.35em] uppercase block mb-4">
                            Our Services
                        </span>
                        <h2
                            ref={headingRef}
                            className="text-4xl md:text-[48px] font-extrabold text-white tracking-tight leading-[1.1] whitespace-nowrap"
                        >
                            QWQER <span className="text-[#7c3aed]">Express Solutions</span>
                        </h2>
                        <p className="text-white/70 text-base max-w-lg leading-relaxed mt-4">
                            From instant pickups to complex multi-drop runs — we have a model built for every operation.
                        </p>
                    </motion.div>

                    {/* ─── BOTTOM: Two-column layout ─── */}
                    <div className="flex flex-1 min-h-0">

                    {/* ─── LEFT: Text list ─── */}
                    <div className="flex flex-col justify-center w-full md:w-[45%] pr-0 md:pr-12">

                        {/* Solution list with vertical progress bar */}
                        <div className="flex gap-5">
                            {/* Progress track */}
                            <div className="relative w-[2px] flex-shrink-0 hidden md:block">
                                <div className="absolute inset-0 bg-white/[0.06] rounded-full" />
                                <motion.div
                                    className="absolute top-0 left-0 w-full rounded-full"
                                    style={{
                                        height: progressHeight,
                                        background: "linear-gradient(180deg, #7c3aed, #a78bfa)",
                                        boxShadow: "0 0 12px rgba(124,58,237,0.4)",
                                    }}
                                />
                            </div>

                            {/* Titles */}
                            <div className="flex flex-col gap-1 flex-1">
                                {solutions.map((sol, i) => (
                                    <div
                                        key={i}
                                        ref={(el) => { titleRefs.current[i] = el; }}
                                        className={`py-3 px-4 rounded-xl cursor-default transition-colors duration-300 ${i === 0 ? "es-active" : ""}`}
                                        style={{ opacity: i === 0 ? 1 : 0.2 }}
                                    >
                                        <h3 className="text-base md:text-lg font-bold text-white leading-snug mb-1">
                                            {sol.title}
                                        </h3>
                                        <p className="text-white/70 text-sm leading-relaxed es-desc max-w-sm"
                                            style={{
                                                maxHeight: i === 0 ? "80px" : "0px",
                                                overflow: "hidden",
                                                opacity: i === 0 ? 1 : 0,
                                                transition: "max-height 0.5s ease, opacity 0.4s ease",
                                            }}
                                        >
                                            {sol.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ─── RIGHT: Image ─── */}
                    <div className="hidden md:flex w-[55%] items-center justify-center relative">
                        {/* Glow behind image */}
                        <div className="absolute w-[400px] h-[400px] bg-[#7c3aed]/[0.04] blur-[100px] rounded-full pointer-events-none" />

                        {/* Image stack — all positioned absolutely, opacity controlled by GSAP */}
                        <div className="relative w-full h-[60vh] max-h-[500px]">
                            {solutions.map((sol, i) => (
                                <div
                                    key={i}
                                    ref={(el) => { imageRefs.current[i] = el; }}
                                    className="absolute inset-0 rounded-3xl overflow-hidden border border-white/[0.06]"
                                    style={{ opacity: i === 0 ? 1 : 0 }}
                                >
                                    <Image
                                        src={sol.image}
                                        alt={sol.title}
                                        fill
                                        className="object-cover"
                                        sizes="55vw"
                                        priority={i === 0}
                                    />
                                    {/* Subtle vignette */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>{/* close flex-1 wrapper */}
                </div>{/* close content flex-col */}

                {/* Mobile: show active image below text */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 h-[40vh] px-6">
                    <div className="relative w-full h-full">
                        {solutions.map((sol, i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                    // For mobile, reuse the same refs (images will animate)
                                    if (!imageRefs.current[i]) imageRefs.current[i] = el;
                                }}
                                className="absolute inset-0 rounded-2xl overflow-hidden"
                                style={{ opacity: i === 0 ? 1 : 0 }}
                            >
                                <Image
                                    src={sol.image}
                                    alt={sol.title}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </section>
    );
}
