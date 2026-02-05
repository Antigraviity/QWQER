"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
                    height: "100%",
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
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".list-container",
                        start: "top 70%",
                        end: "bottom 80%",
                        scrub: 1
                    }
                }
            );

            // Marker Fill Animations
            const markers = gsap.utils.toArray(".node-marker");
            markers.forEach((marker: any) => {
                gsap.to(marker, {
                    backgroundColor: "#ee3425",
                    borderColor: "#ee3425",
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
            // Truck Vibration
            gsap.to(".why-truck-vibrate", {
                x: 0.5,
                y: 0.5,
                duration: 0.05,
                repeat: -1,
                yoyo: true,
                ease: "none"
            });

            // Running Road Animation for WhyQwqer
            gsap.fromTo(".why-road-line",
                { backgroundPosition: "0px 0px" },
                {
                    backgroundPosition: "0px 1200px",
                    duration: 10,
                    repeat: -1,
                    ease: "none"
                }
            );

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
        { title: "365 Days Dedicated Support.", desc: "Logistics that never sleeps or pauses for holidays." }
    ];

    return (
        <section ref={sectionRef} className="py-12 bg-black relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 pt-12 relative z-10">
                <div className="bg-[#ffefe9] rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-2xl">

                    {/* Subtle Blueprint Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.05]"
                        style={{ backgroundImage: 'radial-gradient(#ee3425 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}>
                    </div>

                    <div className="relative z-10">
                        {/* Header Area */}
                        <div className="mb-14 text-center">
                            <div className="inline-block px-4 py-1.5 bg-[#ee3425] text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-lg shadow-xl mb-8">
                                Why QWQER
                            </div>
                            <h2 className="text-3xl md:text-5xl font-semibold text-[#d02012] leading-[1.1] tracking-tighter">
                                Quick logistics, <span className="italic">made for speed,</span><br />
                                built for business, smarter deliveries.
                            </h2>
                        </div>

                        {/* Logistics Path List Container */}
                        <div className="list-container relative max-w-5xl mx-auto">

                            {/* Center Vertical Route Line (Desktop) */}
                            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 opacity-20"
                                style={{
                                    backgroundSize: "4px 24px",
                                    backgroundImage: "linear-gradient(to bottom, #ee3425 60%, transparent 40%)",
                                }}
                            ></div>
                            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2">
                                <div ref={pathRef} className="why-road-line absolute inset-0 w-full h-0 shadow-[0_0_10px_#ee3425]"
                                    style={{
                                        backgroundSize: "4px 24px",
                                        backgroundImage: "linear-gradient(to bottom, #ee3425 60%, transparent 40%)",
                                    }}
                                >
                                    <div className="absolute bottom-[-44px] left-[-0.5px] -translate-x-1/2 flex flex-col items-center">
                                        <div className="why-truck-vibrate flex flex-col items-center">
                                            <div className="w-1.5 h-6 bg-[#ee3425] rounded-full mb-1 animate-pulse"></div>
                                            <svg width="48" height="72" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ee3425] drop-shadow-[0_0_20px_rgba(238,52,37,0.7)]">
                                                <rect x="4" y="2" width="16" height="26" rx="2" fill="currentColor" />
                                                <rect x="6" y="28" width="12" height="6" rx="1" fill="currentColor" />
                                                <rect x="7" y="31" width="10" height="2" rx="0.5" fill="white" fillOpacity="0.3" />
                                                <rect x="3" y="29" width="2" height="3" rx="0.5" fill="currentColor" />
                                                <rect x="19" y="29" width="2" height="3" rx="0.5" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Left Vertical Route Line (Mobile) */}
                            <div className="md:hidden absolute left-4 top-2 bottom-2 w-1 opacity-30"
                                style={{
                                    backgroundSize: "4px 24px",
                                    backgroundImage: "linear-gradient(to bottom, #ee3425 60%, transparent 40%)",
                                }}
                            ></div>
                            <div className="md:hidden absolute left-4 top-2 bottom-2 w-1">
                                <div ref={mobilePathRef} className="why-road-line absolute inset-0 w-full h-0 shadow-[0_0_10px_#ee3425] overflow-hidden"
                                    style={{
                                        backgroundSize: "4px 24px",
                                        backgroundImage: "linear-gradient(to bottom, #ee3425 60%, transparent 40%)",
                                    }}
                                >
                                    <div className="absolute bottom-[-24px] left-[-0.5px] -translate-x-1/2 scale-110">
                                        <svg width="32" height="48" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ee3425]">
                                            <rect x="4" y="2" width="16" height="26" rx="2" fill="currentColor" />
                                            <rect x="6" y="28" width="12" height="6" rx="1" fill="currentColor" />
                                            <rect x="7" y="31" width="10" height="2" rx="0.5" fill="white" fillOpacity="0.3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-10 md:space-y-14">
                                {reasons.map((r, i) => (
                                    <div key={i} className={`list-item group relative md:flex items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

                                        {/* Mobile Path Node (Left) */}
                                        <div className="node-marker md:hidden absolute left-[12px] top-2 w-2.5 h-2.5 rounded-full border-2 border-[#ee3425] bg-transparent z-20"></div>

                                        {/* Center Node Marker (Desktop) */}
                                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 z-30">
                                            <div className="node-marker w-4 h-4 rounded-full border-2 border-[#ee3425] bg-transparent transition-all duration-300"></div>
                                            <div className="absolute w-12 h-px bg-[#ee3425]/20 group-hover:bg-[#ee3425]/50 transition-all duration-300"></div>
                                        </div>

                                        {/* Content Side */}
                                        <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${i % 2 === 0 ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8'}`}>
                                            <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                                                {/* Technical Index (e.g. 01) */}
                                                <span className="text-3xl md:text-4xl font-black text-[#ee3425]/10 group-hover:text-[#ee3425]/20 transition-colors uppercase italic leading-none mb-3">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-2 group-hover:text-[#ee3425] transition-colors duration-300">
                                                    {r.title}
                                                </h3>
                                                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                                                    {r.desc}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Spacer for the other side on desktop */}
                                        <div className="hidden md:block md:w-[45%]"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Large Background Branding Watermark */}
                        <div className="absolute -bottom-20 -right-20 pointer-events-none opacity-[0.03]">
                            <h4 className="text-[200px] font-black italic tracking-tighter select-none">QWQER</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Connection to Features */}
            <div className="why-road-line absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 opacity-80"
                style={{
                    backgroundSize: "4px 24px",
                    backgroundImage: "linear-gradient(to bottom, #ee3425 60%, transparent 40%)",
                }}
            ></div>
        </section>
    );
}
