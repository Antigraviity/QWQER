"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLayerGroup, FaMapLocationDot, FaHeadset, FaEye, FaMicrochip, FaScaleUnbalanced } from "react-icons/fa6";

export default function Features() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Journey Timeline - Scooter moves right then down
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 95%",
                    end: "bottom 30%",
                    scrub: 1.5
                }
            });

            tl.set(".scooter-icon", { rotation: -90 }) // Start facing RIGHT
                .to(".journey-path-h", { width: "100%", ease: "none" })
                .to(".scooter-icon", { left: "calc(100% - 2.5rem)", ease: "none" }, 0)
                .to(".scooter-icon", { rotation: 0, duration: 0.3, ease: "power1.inOut" }) // Turn to face DOWN
                .to(".journey-path-v", { height: "100%", ease: "none" })
                .to(".scooter-icon", { top: "calc(100% - 3rem)", ease: "none" }, "<");

            // Vehicle Vibration (Scooter)
            gsap.to(".scooter-vibrate", {
                x: 0.4,
                y: 0.4,
                duration: 0.05,
                repeat: -1,
                yoyo: true,
                ease: "none"
            });

            // Running Road Animation for horizontal and vertical paths
            gsap.fromTo(".journey-path-h",
                { backgroundPosition: "0px 0px" },
                {
                    backgroundPosition: "1200px 0px", // Seamless loop (multiple of 24)
                    duration: 10, // Faster running motion
                    repeat: -1,
                    ease: "none"
                }
            );

            gsap.fromTo(".journey-path-v",
                { backgroundPosition: "0px 0px" },
                {
                    backgroundPosition: "0px 1200px", // Downward seamless loop
                    duration: 10,
                    repeat: -1,
                    ease: "none"
                }
            );

            // Sequential reveal of cards - Using .to for more reliability
            gsap.set(".cargo-module", { y: 20, opacity: 0, scale: 0.98 });

            gsap.to(".cargo-module", {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Pulse animation for the background route dots
            gsap.to(".route-dot", {
                opacity: 0.3,
                scale: 1.5,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                stagger: 0.3,
                ease: "sine.inOut"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const features = [
        {
            title: "Express Speed, Fleet Strength",
            icon: <FaLayerGroup />,
            desc: "Fast, reliable local deliveries combined with large-scale intercity logistics.",
            gradient: "from-blue-600/20 to-transparent",
            accent: "text-blue-400"
        },
        {
            title: "Built for Reliability at Every Scale",
            icon: <FaScaleUnbalanced />,
            desc: "Field-tested operations that adapt to your business volume seamlessly.",
            gradient: "from-purple-600/20 to-transparent",
            accent: "text-purple-400"
        },
        {
            title: "Nationwide Reach, Local Execution",
            icon: <FaMapLocationDot />,
            desc: "Operate seamlessly across India while benefiting from strong regional oversight.",
            gradient: "from-emerald-600/20 to-transparent",
            accent: "text-emerald-400"
        },
        {
            title: "Full Operational Visibility", icon: <FaEye />,
            desc: "Track shipments in real time, with proactive updates and issue resolution.",
            gradient: "from-cyan-600/20 to-transparent",
            accent: "text-cyan-400"
        },
        {
            title: "Technology-Driven Operations", icon: <FaMicrochip />,
            desc: "Tools and systems designed to optimize routes, fleet management and planning.",
            gradient: "from-indigo-600/20 to-transparent",
            accent: "text-indigo-400"
        },
        {
            title: "24/7 Dedicated Support", icon: <FaHeadset />,
            desc: "Our teams are always ready to assist, ensuring smooth operations from start to finish.",
            gradient: "from-rose-600/20 to-transparent",
            accent: "text-rose-400"
        }
    ];

    return (
        <section ref={sectionRef} className="py-12 bg-black relative overflow-hidden">
            {/* Static entry point - no animation */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-12 opacity-80"
                style={{
                    backgroundSize: "4px 24px",
                    backgroundImage: "linear-gradient(to bottom, #ee3425 60%, transparent 40%)",
                }}
            ></div>

            <div className="absolute top-12 left-1/2 w-[calc(50%-2.5rem)] h-1 -translate-y-1/2 opacity-20"
                style={{
                    backgroundSize: "24px 4px",
                    backgroundImage: "linear-gradient(to right, #ee3425 60%, transparent 40%)",
                }}
            ></div>
            <div className="absolute top-12 left-1/2 w-[calc(50%-2.5rem)] h-1 -translate-y-1/2 overflow-hidden">
                <div className="journey-path-h absolute inset-0 w-0 shadow-[0_0_10px_#ee3425]"
                    style={{
                        backgroundSize: "24px 4px",
                        backgroundImage: "linear-gradient(to right, #ee3425 60%, transparent 40%)",
                    }}
                ></div>
            </div>

            {/* Vertical Segment (Right Side Down) */}
            <div className="absolute top-12 right-10 w-1 h-[calc(100%-6rem)] opacity-20"
                style={{
                    backgroundSize: "4px 24px",
                    backgroundImage: "linear-gradient(to bottom, #ee3425 60%, transparent 40%)",
                }}
            ></div>
            <div className="absolute top-12 right-10 w-1 h-[calc(100%-6rem)] overflow-hidden">
                <div className="journey-path-v absolute inset-0 w-full h-0 shadow-[0_0_10px_#ee3425]"
                    style={{
                        backgroundSize: "4px 24px",
                        backgroundImage: "linear-gradient(to bottom, #ee3425 60%, transparent 40%)",
                    }}
                ></div>
            </div>

            {/* Traveling Scooter */}
            <div className="scooter-icon absolute z-30 pointer-events-none" style={{ left: '50%', top: '48px', transform: 'translate(-50%, -50%) rotate(-90deg)' }}>
                <div className="scooter-vibrate flex flex-col items-center">
                    <div className="w-2.5 h-6 bg-[#ee3425] rounded-full mb-1 animate-pulse"></div>
                    <svg width="52" height="68" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ee3425] drop-shadow-[0_0_20px_rgba(238,52,37,0.7)]">
                        {/* Scooter Body */}
                        <rect x="8" y="4" width="8" height="20" rx="4" fill="currentColor" />
                        {/* Handlebars */}
                        <rect x="4" y="8" width="16" height="2" rx="1" fill="currentColor" />
                        {/* Front Wheel/Shield */}
                        <rect x="9" y="2" width="6" height="4" rx="1" fill="currentColor" opacity="0.8" />
                        {/* Man (Top View) */}
                        <circle cx="12" cy="14" r="5" fill="white" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
                        <circle cx="12" cy="14" r="3" fill="currentColor" />
                        {/* Footboard */}
                        <rect x="7" y="24" width="10" height="4" rx="1" fill="currentColor" opacity="0.6" />
                    </svg>
                </div>
            </div>

            {/* Background Texture/Gradient for depth */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.02)_0%,_transparent_50%)] pointer-events-none"></div>

            {/* Delivery Route Background Decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
                    <path className="route-path" d="M0,200 C300,100 600,300 900,200 S1200,100 1440,300" stroke="white" strokeWidth="0.5" opacity="0.1" />
                    <path className="route-path" d="M0,600 C400,700 800,500 1000,700 S1300,600 1440,800" stroke="white" strokeWidth="0.5" opacity="0.1" />
                    <circle className="route-dot" cx="300" cy="150" r="1.5" fill="white" />
                    <circle className="route-dot" cx="700" cy="230" r="1.5" fill="white" />
                    <circle className="route-dot" cx="1100" cy="120" r="1.5" fill="white" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-8 text-center md:text-left">
                    <div className="inline-block px-3 py-0.5 bg-white/5 rounded-full border border-white/10 mb-3 backdrop-blur-sm">
                        <p className="text-white/60 font-bold text-[9px] uppercase tracking-widest">Logistics solutions you can trust</p>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tighter uppercase italic leading-none [word-spacing:0.2em]">
                        How <span className="text-[#ee3425]">QWQER</span> Helps <br />
                        <span className="not-italic text-white/90">Businesses Deliver Better</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl text-sm md:text-base font-medium">
                        Whether it's hyperlocal express delivery or intercity fleet operations, QWQER provides the right solution to keep your business moving.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, i) => (
                        <div key={i} className="cargo-module group relative p-5 md:p-6 bg-[#0f0f0f] border border-white/10 hover:border-white/20 transition-all duration-500 rounded-xl overflow-hidden flex flex-col h-full shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                            {/* Inner Glow Effect - Colored Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-700`}></div>

                            {/* Industrial Grid Texture */}
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                            </div>

                            <div className="relative z-10">
                                <div className={`w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center ${f.accent} text-xl mb-4 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-2xl`}>
                                    {f.icon}
                                </div>

                                <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tight group-hover:text-white transition-colors leading-tight">
                                    {f.title}
                                </h3>

                                <div className={`w-8 h-0.5 bg-white/10 mb-4 rounded-full group-hover:w-12 group-hover:bg-white transition-all duration-500`}></div>

                                <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium group-hover:text-white/80 transition-colors">
                                    {f.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
