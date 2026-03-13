"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLayerGroup, FaMapLocationDot, FaHeadset, FaEye, FaMicrochip, FaScaleUnbalanced } from "react-icons/fa6";

export default function Features() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Header reveal
            gsap.from(".features-header", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // Staggered row reveals
            const rows = gsap.utils.toArray(".feature-row");
            rows.forEach((row: any, i) => {
                gsap.from(row, {
                    x: i % 2 === 0 ? -60 : 60,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 88%",
                    }
                });
            });

            // Counter animation
            const counters = gsap.utils.toArray(".feature-counter");
            counters.forEach((counter: any) => {
                gsap.from(counter, {
                    textContent: 0,
                    duration: 1.5,
                    snap: { textContent: 1 },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 85%",
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Auto-cycle active feature
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 6);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            title: "Express Speed, Fleet Strength",
            icon: <FaLayerGroup />,
            desc: "Fast, reliable local deliveries combined with large-scale intercity logistics.",
            stat: "2x",
            statLabel: "Faster Delivery",
            color: "#a78bfa"
        },
        {
            title: "Built for Reliability at Every Scale",
            icon: <FaScaleUnbalanced />,
            desc: "Field-tested operations that adapt to your business volume seamlessly.",
            stat: "99.5%",
            statLabel: "Uptime Rate",
            color: "#818cf8"
        },
        {
            title: "Nationwide Reach, Local Execution",
            icon: <FaMapLocationDot />,
            desc: "Operate seamlessly across India while benefiting from strong regional oversight.",
            stat: "500+",
            statLabel: "Cities Covered",
            color: "#6ee7b7"
        },
        {
            title: "Full Operational Visibility",
            icon: <FaEye />,
            desc: "Track shipments in real time, with proactive updates and issue resolution.",
            stat: "100%",
            statLabel: "Transparency",
            color: "#67e8f9"
        },
        {
            title: "Technology-Driven Operations",
            icon: <FaMicrochip />,
            desc: "Tools and systems designed to optimize routes, fleet management and planning.",
            stat: "AI",
            statLabel: "Powered Routing",
            color: "#c084fc"
        },
        {
            title: "24/7 Dedicated Support",
            icon: <FaHeadset />,
            desc: "Our teams are always ready to assist, ensuring smooth operations from start to finish.",
            stat: "365",
            statLabel: "Days Active",
            color: "#f9a8d4"
        }
    ];

    return (
        <section ref={sectionRef} className="py-16 bg-black relative overflow-hidden">
            {/* Ambient background glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-colors duration-1000 opacity-[0.07]"
                style={{ backgroundColor: features[activeIndex].color }}
            ></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="features-header mb-12 text-center">
                    <p className="text-[#ee3425] font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Logistics solutions you can trust</p>
                    <h2 className="text-2xl md:text-[48px] font-bold text-white mb-3 tracking-tight leading-tight">
                        How <span className="text-[#ee3425]">QWQER</span> Helps<br />
                        Businesses Deliver Better
                    </h2>
                    <p className="text-white/60 max-w-lg mx-auto text-sm">
                        Whether it&apos;s hyperlocal express delivery or intercity fleet operations, QWQER provides the right solution.
                    </p>
                </div>

                {/* Interactive Accordion Rows */}
                <div className="space-y-2">
                    {features.map((f, i) => {
                        const isActive = activeIndex === i;
                        return (
                            <div
                                key={i}
                                className="feature-row group cursor-pointer"
                                onClick={() => setActiveIndex(i)}
                                onMouseEnter={() => setActiveIndex(i)}
                            >
                                <div
                                    className={`relative rounded-2xl border transition-all duration-500 overflow-hidden ${
                                        isActive
                                            ? "border-white/15 bg-white/[0.04]"
                                            : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03]"
                                    }`}
                                >
                                    {/* Active glow bar */}
                                    <div
                                        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-500"
                                        style={{
                                            backgroundColor: isActive ? f.color : "transparent",
                                            boxShadow: isActive ? `0 0 20px ${f.color}60` : "none"
                                        }}
                                    ></div>

                                    <div className="flex items-center gap-5 px-6 py-5">
                                        {/* Icon */}
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all duration-500 ${
                                                isActive ? "scale-110" : ""
                                            }`}
                                            style={{
                                                backgroundColor: isActive ? `${f.color}20` : "rgba(255,255,255,0.03)",
                                                color: isActive ? f.color : "#666",
                                                boxShadow: isActive ? `0 0 25px ${f.color}30` : "none"
                                            }}
                                        >
                                            {f.icon}
                                        </div>

                                        {/* Title & Description */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`text-sm md:text-base font-semibold transition-colors duration-300 ${
                                                isActive ? "text-white" : "text-white/70"
                                            }`}>
                                                {f.title}
                                            </h3>
                                            <div
                                                className="overflow-hidden transition-all duration-500"
                                                style={{
                                                    maxHeight: isActive ? "60px" : "0px",
                                                    opacity: isActive ? 1 : 0,
                                                }}
                                            >
                                                <p className="text-white/70 text-sm md:text-base mt-1 leading-relaxed">
                                                    {f.desc}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Stat Badge */}
                                        <div
                                            className={`hidden md:flex flex-col items-end shrink-0 transition-all duration-500 ${
                                                isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                                            }`}
                                        >
                                            <span
                                                className="text-2xl font-black leading-none"
                                                style={{ color: f.color }}
                                            >
                                                {f.stat}
                                            </span>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                                                {f.statLabel}
                                            </span>
                                        </div>

                                        {/* Arrow indicator */}
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                                            style={{
                                                backgroundColor: isActive ? `${f.color}15` : "transparent",
                                            }}
                                        >
                                            <svg
                                                className={`w-3 h-3 transition-transform duration-300 ${isActive ? "rotate-90" : ""}`}
                                                style={{ color: isActive ? f.color : "#444" }}
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Progress bar at bottom of active item */}
                                    {isActive && (
                                        <div className="h-[2px] bg-white/5">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    backgroundColor: f.color,
                                                    animation: "progressFill 3.5s linear forwards",
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                @keyframes progressFill {
                    from { width: 0%; }
                    to { width: 100%; }
                }
            `}</style>
        </section>
    );
}
