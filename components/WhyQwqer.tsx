"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PURPLE = { accent: "#a78bfa", bg: "#625ea5", glow: "rgba(167,139,250,0.6)", shadow: "rgba(167,139,250,0.7)" };
const BLUE = { accent: "#60a5fa", bg: "#3b82f6", glow: "rgba(59,130,246,0.6)", shadow: "rgba(59,130,246,0.7)" };

export default function WhyQwqer() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<HTMLDivElement>(null);
    const mobilePathRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Path Drawing Animation (Desktop)
            gsap.fromTo(pathRef.current,
                { height: 0 },
                {
                    height: "calc(100% - 80px)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".list-container",
                        start: "top 70%",
                        end: "bottom 80%",
                        scrub: 1
                    }
                }
            );

            // Path Drawing Animation (Mobile)
            gsap.fromTo(mobilePathRef.current,
                { height: 0 },
                {
                    height: "calc(100% - 60px)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".list-container",
                        start: "top 70%",
                        end: "bottom 80%",
                        scrub: 1
                    }
                }
            );

            // Marker Fill Animations — purple for 1-5, blue for 6-10
            const markers = gsap.utils.toArray(".node-marker");
            markers.forEach((marker: any) => {
                // Determine color from data attribute
                const isBlue = marker.dataset.phase === "blue";
                const color = isBlue ? BLUE : PURPLE;
                gsap.to(marker, {
                    backgroundColor: color.accent,
                    borderColor: color.accent,
                    boxShadow: `0 0 12px ${color.glow}`,
                    scale: 1.2,
                    duration: 0.4,
                    scrollTrigger: {
                        trigger: marker,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Staggered reveal of list items
            const items = gsap.utils.toArray(".list-item");
            items.forEach((item: any, i) => {
                gsap.from(item, {
                    opacity: 0,
                    x: i % 2 === 0 ? 50 : -50,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                    }
                });
            });

            // Title highlight on scroll
            items.forEach((item: any, i) => {
                const title = item.querySelector('.wq-title');
                if (!title) return;
                const isBlue = i >= 5;
                const color = isBlue ? BLUE : PURPLE;
                gsap.to(title, {
                    color: color.accent,
                    duration: 0.4,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Vehicle Vibration
            gsap.to(".why-vehicle-vibrate", {
                x: 0.5,
                y: 0.5,
                duration: 0.1,
                repeat: -1,
                yoyo: true,
                ease: "none"
            });

            // Running Road Animation — continuous time-based dash movement
            gsap.fromTo(".why-road-line",
                { backgroundPosition: "0px 0px" },
                {
                    backgroundPosition: "0px 480px",
                    duration: 12,
                    repeat: -1,
                    ease: "none"
                }
            );

            // Color transition — when item 6 enters viewport, shift entire section to blue
            const transitionTrigger = items[5]; // 6th item (index 5)
            if (transitionTrigger) {
                // Section card background gradient
                gsap.to(".wq-section-card", {
                    background: "linear-gradient(to bottom right, #0a0d1a, #111d35, #0c1020)",
                    borderColor: "rgba(59,130,246,0.1)",
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Badge color
                gsap.to(".wq-badge", {
                    backgroundColor: BLUE.bg,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Heading color
                gsap.to(".wq-heading", {
                    color: BLUE.accent,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Blueprint grid dots
                gsap.to(".wq-grid-dots", {
                    backgroundImage: "radial-gradient(#3b82f6 0.5px, transparent 0.5px)",
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Ambient glow
                gsap.to(".wq-glow", {
                    background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Dotted line background color
                gsap.to(".wq-dashed-bg", {
                    backgroundImage: "linear-gradient(to bottom, #60a5fa 60%, transparent 40%)",
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Active path line shadow
                gsap.to(".why-road-line", {
                    backgroundImage: "linear-gradient(to bottom, #60a5fa 60%, transparent 40%)",
                    boxShadow: `0 0 10px ${BLUE.accent}`,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Pulse indicator
                gsap.to(".wq-pulse-bar", {
                    backgroundColor: BLUE.accent,
                    duration: 0.4,
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Transition ALL already-filled purple markers to blue
                gsap.to('.node-marker[data-phase="purple"]', {
                    borderColor: BLUE.accent,
                    backgroundColor: BLUE.accent,
                    boxShadow: `0 0 12px ${BLUE.glow}`,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Transition purple connector lines to blue
                gsap.to('.wq-connector-purple', {
                    backgroundColor: `${BLUE.accent}30`,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Transition purple index numbers to blue
                gsap.to('.wq-index-purple', {
                    color: `${BLUE.accent}33`,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Transition already-highlighted purple titles to blue
                gsap.to('.wq-title-purple', {
                    color: BLUE.accent,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Swap vehicle icon visibility
                gsap.to(".wq-scooter", {
                    opacity: 0,
                    scale: 0.5,
                    duration: 0.4,
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });
                gsap.to(".wq-truck", {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    scrollTrigger: {
                        trigger: transitionTrigger,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const reasons = [
        { title: "One Partner. Two Powerful Solutions.", desc: "Unified ecosystem for express and fleet logistics." },
        { title: "Predictable Pricing and Capacity.", desc: "Stability even during peak demand seasons." },
        { title: "Built for Reliability at Every Scale.", desc: "Operations that grow with your business volume." },
        { title: "Nationwide Reach, Local Execution.", desc: "Strategic network with regional expertise." },
        { title: "Operational Visibility and Support.", desc: "Always informed, always assisted 24/7." },
        { title: "Technology-Driven Operations.", desc: "Proprietary stack optimizing every single manifest." },
        { title: "365 Days Dedicated Support.", desc: "Logistics that never sleeps or pauses for holidays." },
        { title: "Scalable Solutions That Grow with Your Business.", desc: "From a few deliveries a day to thousands — we scale with you." },
        { title: "Streamlined Processes for Faster Turnaround.", desc: "Reducing delays and improving delivery speed at every step." },
        { title: "Proactive Problem Solving and Continuous Improvement.", desc: "We identify issues before they impact your operations." },
    ];

    return (
        <section ref={sectionRef} className="py-6 bg-black relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 pt-6 relative z-10">
                <div className="wq-section-card bg-gradient-to-br from-[#0f0d1a] via-[#1c1735] to-[#12101f] rounded-[3rem] p-8 md:p-10 relative overflow-hidden shadow-2xl border border-[#625ea5]/10">

                    {/* Blueprint Grid Pattern */}
                    <div className="wq-grid-dots absolute inset-0 opacity-[0.05]"
                        style={{ backgroundImage: 'radial-gradient(#625ea5 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}>
                    </div>
                    {/* Ambient glow */}
                    <div className="wq-glow absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(98,94,165,0.05) 0%, transparent 70%)" }}>
                    </div>

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="mb-8 text-center">
                            <div className="wq-badge inline-block px-4 py-1.5 bg-[#625ea5] text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-lg shadow-xl mb-5 transition-colors duration-500">
                                Why QWQER
                            </div>
                            <h2 className="wq-heading text-2xl md:text-4xl font-semibold text-[#a78bfa] leading-[1.1] tracking-tighter transition-colors duration-500">
                                Quick logistics, <span className="italic">made for speed,</span><br />
                                built for business, smarter deliveries.
                            </h2>
                        </div>

                        {/* Logistics Path List Container */}
                        <div className="list-container relative max-w-5xl mx-auto">

                            {/* Center Vertical Route Line (Desktop) */}
                            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 opacity-20 wq-dashed-bg"
                                style={{
                                    backgroundSize: "4px 24px",
                                    backgroundImage: "linear-gradient(to bottom, #a78bfa 60%, transparent 40%)",
                                }}
                            ></div>
                            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2">
                                <div ref={pathRef} className="why-road-line absolute inset-0 w-full h-0 shadow-[0_0_10px_#a78bfa]"
                                    style={{
                                        backgroundSize: "4px 24px",
                                        backgroundImage: "linear-gradient(to bottom, #a78bfa 60%, transparent 40%)",
                                    }}
                                >
                                    <div className="absolute bottom-[-44px] left-[-0.5px] -translate-x-1/2 flex flex-col items-center">
                                        <div className="why-vehicle-vibrate flex flex-col items-center relative">
                                            <div className="wq-pulse-bar w-1.5 h-6 bg-[#a78bfa] rounded-full mb-1 animate-pulse"></div>

                                            {/* Scooter (top view) — visible for items 1-5 */}
                                            <svg className="wq-scooter absolute top-7 transition-all duration-300" width="44" height="64" viewBox="0 0 44 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 1 }}>
                                                {/* Rear wheel (top) */}
                                                <ellipse cx="22" cy="6" rx="5" ry="3" fill="#8b6fdb" stroke="#c4b0f0" strokeWidth="1" />
                                                {/* Body */}
                                                <rect x="14" y="12" width="16" height="32" rx="8" fill="#a78bfa" />
                                                {/* Rider silhouette */}
                                                <circle cx="22" cy="30" r="4" fill="#7c3aed" />
                                                {/* Seat */}
                                                <ellipse cx="22" cy="24" rx="6" ry="4" fill="#8b6fdb" />
                                                {/* Handlebar (bottom - front, facing down) */}
                                                <rect x="10" y="46" width="24" height="4" rx="2" fill="#a78bfa" />
                                                <circle cx="10" cy="48" r="3" fill="#c4b0f0" />
                                                <circle cx="34" cy="48" r="3" fill="#c4b0f0" />
                                                {/* Front wheel (bottom - direction of travel) */}
                                                <ellipse cx="22" cy="56" rx="6" ry="4" fill="#8b6fdb" stroke="#c4b0f0" strokeWidth="1" />
                                                {/* Headlight glow */}
                                                <circle cx="22" cy="60" r="2" fill="white" fillOpacity="0.5" />
                                            </svg>

                                            {/* Truck (top view) — visible for items 6-10 */}
                                            <svg className="wq-truck absolute top-7 transition-all duration-300" width="48" height="72" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0, transform: "scale(0.5)" }}>
                                                <rect x="4" y="2" width="16" height="26" rx="2" fill="#3b82f6" />
                                                <rect x="6" y="28" width="12" height="6" rx="1" fill="#3b82f6" />
                                                <rect x="7" y="31" width="10" height="2" rx="0.5" fill="white" fillOpacity="0.3" />
                                                <rect x="3" y="29" width="2" height="3" rx="0.5" fill="#3b82f6" />
                                                <rect x="19" y="29" width="2" height="3" rx="0.5" fill="#3b82f6" />
                                                {/* Headlights */}
                                                <rect x="7" y="1" width="4" height="2" rx="1" fill="white" fillOpacity="0.4" />
                                                <rect x="13" y="1" width="4" height="2" rx="1" fill="white" fillOpacity="0.4" />
                                                {/* Cargo area */}
                                                <rect x="6" y="6" width="12" height="16" rx="1" fill="#2563eb" />
                                                <path d="M8 10h8M8 14h8M8 18h8" stroke="white" strokeOpacity="0.15" strokeWidth="0.5" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Left Vertical Route Line (Mobile) */}
                            <div className="md:hidden absolute left-4 top-2 bottom-2 w-1 opacity-30"
                                style={{
                                    backgroundSize: "4px 24px",
                                    backgroundImage: "linear-gradient(to bottom, #a78bfa 60%, transparent 40%)",
                                }}
                            ></div>
                            <div className="md:hidden absolute left-4 top-2 bottom-2 w-1">
                                <div ref={mobilePathRef} className="why-road-line absolute inset-0 w-full h-0 shadow-[0_0_10px_#a78bfa] overflow-hidden"
                                    style={{
                                        backgroundSize: "4px 24px",
                                        backgroundImage: "linear-gradient(to bottom, #a78bfa 60%, transparent 40%)",
                                    }}
                                >
                                    <div className="absolute bottom-[-24px] left-[-0.5px] -translate-x-1/2 scale-110">
                                        {/* Mobile scooter */}
                                        <svg className="wq-scooter" width="28" height="40" viewBox="0 0 44 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 1 }}>
                                            <ellipse cx="22" cy="6" rx="5" ry="3" fill="#8b6fdb" />
                                            <rect x="14" y="12" width="16" height="32" rx="8" fill="#a78bfa" />
                                            <circle cx="22" cy="30" r="4" fill="#7c3aed" />
                                            <ellipse cx="22" cy="24" rx="6" ry="4" fill="#8b6fdb" />
                                            <rect x="10" y="46" width="24" height="4" rx="2" fill="#a78bfa" />
                                            <ellipse cx="22" cy="56" rx="6" ry="4" fill="#8b6fdb" />
                                            <circle cx="22" cy="60" r="2" fill="white" fillOpacity="0.5" />
                                        </svg>
                                        {/* Mobile truck */}
                                        <svg className="wq-truck absolute top-0 left-0" width="32" height="48" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0, transform: "scale(0.5)" }}>
                                            <rect x="4" y="2" width="16" height="26" rx="2" fill="#3b82f6" />
                                            <rect x="6" y="28" width="12" height="6" rx="1" fill="#3b82f6" />
                                            <rect x="7" y="31" width="10" height="2" rx="0.5" fill="white" fillOpacity="0.3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 md:space-y-8">
                                {reasons.map((r, i) => {
                                    const isBlue = i >= 5;
                                    const color = isBlue ? BLUE : PURPLE;
                                    return (
                                        <div key={i} className={`list-item group relative md:flex items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

                                            {/* Mobile Path Node (Left) */}
                                            <div className="node-marker md:hidden absolute left-[12px] top-2 w-2.5 h-2.5 rounded-full border-2 bg-transparent z-20"
                                                data-phase={isBlue ? "blue" : "purple"}
                                                style={{ borderColor: color.accent }}></div>

                                            {/* Center Node Marker (Desktop) */}
                                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 z-30">
                                                <div className="node-marker w-4 h-4 rounded-full border-2 bg-transparent transition-all duration-300"
                                                    data-phase={isBlue ? "blue" : "purple"}
                                                    style={{ borderColor: color.accent }}></div>
                                                <div className={`absolute w-12 h-px transition-all duration-300 ${!isBlue ? 'wq-connector-purple' : ''}`}
                                                    style={{ backgroundColor: `${color.accent}30` }}></div>
                                            </div>

                                            {/* Content Side */}
                                            <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${i % 2 === 0 ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8'}`}>
                                                <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                                                    <span className={`text-2xl md:text-3xl font-black transition-colors uppercase italic leading-none mb-3 ${!isBlue ? 'wq-index-purple' : ''}`}
                                                        style={{ color: `${color.accent}33` }}>
                                                        {String(i + 1).padStart(2, '0')}
                                                    </span>
                                                    <h3 className={`wq-title text-lg md:text-xl font-semibold text-slate-200 mb-2 transition-colors duration-300 ${!isBlue ? 'wq-title-purple' : ''}`}
                                                    >
                                                        {r.title}
                                                    </h3>
                                                    <p className="text-white/60 text-sm md:text-base leading-relaxed">
                                                        {r.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Spacer */}
                                            <div className="hidden md:block md:w-[45%]"></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Background Branding Watermark */}
                        <div className="absolute -bottom-20 -right-20 pointer-events-none opacity-[0.03]">
                            <h4 className="text-[200px] font-black italic tracking-tighter select-none">QWQER</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
