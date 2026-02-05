"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaMotorcycle, FaTruck } from "react-icons/fa6";

export default function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const truckRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Cards entrance
        gsap.from(cardsRef.current?.children ? Array.from(cardsRef.current.children) : [], {
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });

        // Truck animation along the bottom path
        if (truckRef.current && sectionRef.current) {
            // Set initial state explicitly with full opacity
            gsap.set(truckRef.current, { left: "0%", opacity: 1 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "bottom 80%", // Start when section bottom reaches 80% of viewport
                    end: "bottom 20%",   // End when section bottom reaches 20% of viewport
                    scrub: 1,
                    id: "services-truck-animation",
                }
            });

            // Animate truck from left to right
            tl.to(truckRef.current, {
                left: "100%",
                ease: "none",
            });

            // Refresh ScrollTrigger to account for any layout changes
            ScrollTrigger.refresh()
        }

        // Cleanup on unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.id === "services-truck-animation") {
                    trigger.kill();
                }
            });
        };

    }, []);

    return (
        <section ref={sectionRef} className="py-10 pb-32 bg-black relative">
            <div className="max-w-6xl mx-auto px-6 relative z-10 pt-20">
                <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 md:gap-20">
                    {/* Express Card */}
                    <div className="bg-gradient-to-br from-[#1a1a1a] to-black rounded-[2rem] p-8 border border-white/10 hover:border-[#ee3425] transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee3425]/10 rounded-bl-[100%] transition-all group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-3xl font-bold text-white">QWQER <br /> Express</h3>
                                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-[#ee3425] text-2xl border border-white/5">
                                    <FaMotorcycle />
                                </div>
                            </div>
                            <div className="inline-block px-3 py-1 bg-[#ee3425] text-white text-xs font-bold rounded-full mb-6">
                                Hyperlocal Delivery, On-Demand
                            </div>
                            <ul className="space-y-4 text-gray-400 text-sm mb-8">
                                <li className="flex gap-3"><span className="text-[#ee3425]">•</span> Fast, flexible and reliable last-mile delivery</li>
                                <li className="flex gap-3"><span className="text-[#ee3425]">•</span> Real-time tracking and delivery confirmation</li>
                                <li className="flex gap-3"><span className="text-[#ee3425]">•</span> Optimized routes for efficiency and speed</li>
                            </ul>
                            <button className="w-full py-3 bg-[#ee3425] text-white font-bold rounded-xl hover:bg-[#d02012] transition-colors">Explore</button>
                        </div>
                    </div>

                    {/* Fleet Card */}
                    <div className="bg-gradient-to-bl from-[#1a1a1a] to-black rounded-[2rem] p-8 border border-white/10 hover:border-[#ee3425] transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee3425]/10 rounded-bl-[100%] transition-all group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-3xl font-bold text-white">QWQER <br /> Fleet</h3>
                                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-[#ee3425] text-2xl border border-white/5">
                                    <FaTruck />
                                </div>
                            </div>
                            <div className="inline-block px-3 py-1 bg-white text-black text-xs font-bold rounded-full mb-6">
                                Mid-Mile & Intercity Logistics
                            </div>
                            <ul className="space-y-4 text-gray-400 text-sm mb-8">
                                <li className="flex gap-3"><span className="text-[#ee3425]">•</span> Structured operations for large-scale movement</li>
                                <li className="flex gap-3"><span className="text-[#ee3425]">•</span> Flexible vehicle mix for specialized requirements</li>
                                <li className="flex gap-3"><span className="text-[#ee3425]">•</span> Visibility, planning, and human oversight</li>
                            </ul>
                            <button className="w-full py-3 bg-[#ee3425] text-white font-bold rounded-xl hover:bg-[#d02012] transition-colors">Explore</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lines converge back with animated truck */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-gradient-to-t from-[#ee3425] to-transparent"></div>

            {/* Animated truck container with horizontal dashed line */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[60%] hidden md:block">
                {/* Animated horizontal dashed line using SVG */}
                <svg className="absolute top-0 left-0 w-full h-[4px]" preserveAspectRatio="none" viewBox="0 0 1000 4">
                    <path
                        d="M0,2 L1000,2"
                        fill="none"
                        stroke="#ee3425"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="14 10"
                        className="opacity-100 drop-shadow-[0_0_10px_rgba(238,52,37,0.8)] animate-dash"
                    />
                </svg>

                {/* Animated truck */}
                <div
                    ref={truckRef}
                    className="absolute -top-6 left-0 transform -translate-x-1/2 text-[#ee3425] text-3xl opacity-100"
                    style={{
                        filter: "drop-shadow(0 0 10px rgba(238, 52, 37, 0.8))"
                    }}
                >
                    <FaTruck />
                </div>
            </div>

            {/* CSS animation for dashed line */}
            <style jsx>{`
                @keyframes dash {
                    to {
                        stroke-dashoffset: -1200;
                    }
                }
                .animate-dash {
                    animation: dash 10s linear infinite;
                }
            `}</style>
        </section>
    );
}
