"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CustomSplitServices() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const leftCardRef = useRef<HTMLDivElement>(null);
    const rightCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%", // Start animation when section is near center
                toggleActions: "play none none reverse"
            }
        });

        // Cards Expand/Reveal (Center Slice Effect)
        tl.fromTo([leftCardRef.current?.parentElement, rightCardRef.current?.parentElement],
            {
                clipPath: "inset(0% 50% 0% 50%)",
                scale: 1.1,
                opacity: 0
            },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: "power4.inOut"
            }
        );

    }, []);

    return (
        <section ref={sectionRef} className="py-20 lg:py-32 bg-black relative overflow-hidden">

            {/* Speed Lines Background (Travelling Effect) */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="speed-line absolute w-0.5 bg-gradient-to-b from-transparent via-[#ee3425] to-transparent"
                        style={{
                            height: `${Math.random() * 20 + 10}vh`,
                            left: `${Math.random() * 100}%`,
                            top: -200, // Start above viewport
                            opacity: Math.random()
                        }}
                    ></div>
                ))}
            </div>

            <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-0 rounded-[3rem] overflow-hidden shadow-2xl relative">


                    {/* QWQER Express Card (Purple Theme) */}
                    <div ref={leftCardRef} className="flex-1 bg-gradient-to-br from-[#5D5CDE] to-[#3A3997] p-8 md:p-12 lg:p-16 relative group">
                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative z-10 flex flex-col h-full items-start">
                            <h3 className="text-4xl md:text-5xl font-semibold text-white mb-2">QWQER Express</h3>
                            <div className="text-[#3A3997] bg-white px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-lg">
                                Hyperlocal Delivery, On-Demand
                            </div>

                            <ul className="space-y-4 text-white/90 text-sm md:text-base mb-10 flex-grow">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                                    <span>Fast, flexible and reliable last-mile delivery across cities</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                                    <span>Real-time tracking and delivery confirmation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                                    <span>Optimized routes for efficiency and speed</span>
                                </li>
                            </ul>

                            <button className="px-8 py-3 bg-[#ee3425] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all mb-8 md:mb-0">
                                Explore
                            </button>
                        </div>
                    </div>

                    {/* QWQER Fleet Card (Blue Theme) */}
                    <div ref={rightCardRef} className="flex-1 bg-gradient-to-bl from-[#1E56C9] to-[#0D2D75] p-8 md:p-12 lg:p-16 relative group">
                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative z-10 flex flex-col h-full items-start">
                            <h3 className="text-4xl md:text-5xl font-semibold text-white mb-2">QWQER Fleet</h3>
                            <div className="text-[#0D2D75] bg-white px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-lg">
                                Mid-Mile & Intercity Logistics
                            </div>

                            <ul className="space-y-4 text-white/90 text-sm md:text-base mb-10 flex-grow">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                                    <span>Structured operations for predictable, large-scale movement</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                                    <span>Flexible vehicle mix for routine, peak, or specialized requirements</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                                    <span>Visibility, planning and human oversight for every shipment</span>
                                </li>
                            </ul>

                            <button className="px-8 py-3 bg-[#ee3425] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all mb-8 md:mb-0">
                                Explore
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Connecting line down to next section */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-gradient-to-t from-[#ee3425] to-transparent"></div>

        </section>
    );
}
