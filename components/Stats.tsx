"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Stats() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
            const stats = gsap.utils.toArray(".stat-item");
            stats.forEach((stat: any) => {
                gsap.from(stat, {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 85%"
                    }
                });
            });
        }, containerRef); // Scope to container

        return () => ctx.revert(); // Clean up on unmount
    }, []);

    const metrics = [
        { value: "99.6%", label: "On-Time Delivery Rate" },
        { value: "5000+", label: "Successful Deliveries Completed" },
        { value: "120+", label: "Active Fleet Vehicles" },
        { value: "24/7", label: "Operations & Tracking Support" },
    ];

    return (
        <section ref={containerRef} className="py-16 bg-black text-white relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ee3425]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="bg-[#1a1414] rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-2xl border border-white/[0.08] shadow-[#ee3425]/10">

                    {/* Subtle Blueprint Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.05]"
                        style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}>
                    </div>

                    <div className="relative z-10">
                        {/* Section Title */}
                        <div className="text-center mb-16">
                            <div className="inline-block px-4 py-1.5 bg-[#ee3425] text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-lg shadow-xl mb-8">
                                Designed for delivery. Driven by outcomes.
                            </div>
                            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 leading-tight tracking-tight">
                                Trusted by businesses to <span className="text-[#ee3425]">deliver <br /> faster</span> with consistency.
                            </h2>
                            <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-400 leading-relaxed">
                                A transportation solution provider built for express delivery and fleet operations - designed to moove businesses faster, without complexity.
                            </p>
                        </div>

                        {/* Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {metrics.map((m, i) => (
                                <div
                                    key={i}
                                    className="stat-item group relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:bg-white/[0.08] hover:border-[#ee3425]/30 transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="flex flex-col items-center justify-center text-center h-full min-h-[160px]">
                                        <span className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 group-hover:from-white group-hover:to-[#ee3425] transition-all duration-500 mb-4 block italic pr-2">
                                            {m.value}
                                        </span>
                                        <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] group-hover:text-white transition-colors duration-300">
                                            {m.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
