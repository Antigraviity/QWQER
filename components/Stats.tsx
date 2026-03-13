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

            // Counter animations
            const counters = gsap.utils.toArray(".stat-counter");
            counters.forEach((el: any) => {
                const target = parseFloat(el.dataset.target);
                const decimals = parseInt(el.dataset.decimals) || 0;
                const suffix = el.dataset.suffix || "";
                const isStatic = el.dataset.static;
                if (isNaN(target) || isStatic) return;

                gsap.fromTo(el,
                    { innerText: "0" },
                    {
                        innerText: target,
                        duration: 2,
                        ease: "power2.out",
                        snap: decimals === 0 ? { innerText: 1 } : {},
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                        },
                        onUpdate: function () {
                            const current = parseFloat(el.innerText);
                            el.innerText = (decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString()) + suffix;
                        }
                    }
                );
            });
        }, containerRef); // Scope to container

        return () => ctx.revert(); // Clean up on unmount
    }, []);

    const metrics = [
        { num: 99.6, suffix: "%", decimals: 1, label: "On-Time Delivery Rate" },
        { num: 5000, suffix: "+", decimals: 0, label: "Successful Deliveries Completed" },
        { num: 120, suffix: "+", decimals: 0, label: "Active Fleet Vehicles" },
        { num: 0, suffix: "", decimals: 0, label: "Operations & Tracking Support", static: "24/7" },
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
                            <p className="max-w-2xl mx-auto text-base md:text-lg text-white/70 leading-relaxed">
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
                                        <span
                                            className="stat-counter text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 group-hover:from-white group-hover:to-[#ee3425] transition-all duration-500 mb-4 block pr-2"
                                            data-target={m.num}
                                            data-decimals={m.decimals}
                                            data-suffix={m.suffix}
                                            {...(m.static ? { 'data-static': 'true' } : {})}
                                        >
                                            {m.static || `0${m.suffix}`}
                                        </span>
                                        <span className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] group-hover:text-white transition-colors duration-300">
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
