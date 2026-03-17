"use client";

import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import gsap from "gsap";

export default function ResourcesHero() {
    const gridRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const floatingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gridRef.current) {
            gsap.to(gridRef.current, { backgroundPosition: "0 100px", duration: 2, repeat: -1, ease: "linear" });
        }

        gsap.fromTo(".rh-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.3 });
        gsap.fromTo(".rh-title", { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.5 });
        gsap.fromTo(".rh-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.8 });
        gsap.fromTo(".rh-scroll", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 1.1 });

        gsap.utils.toArray<HTMLElement>(".rh-float").forEach((el, i) => {
            gsap.fromTo(el, { x: i % 2 === 0 ? -80 : 80, y: 40, opacity: 0, scale: 0.5 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.6 + i * 0.15 });
            gsap.to(el, { y: -12 - i * 4, duration: 2.5 + i * 0.3, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.8 + i * 0.15 });
        });

        gsap.utils.toArray<HTMLElement>(".rh-orbit").forEach((el, i) => {
            gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.3 + i * 0.2 });
        });

        gsap.utils.toArray<HTMLElement>(".rh-particle").forEach((el, i) => {
            gsap.to(el, { y: -(120 + i * 25), x: (i % 2 === 0 ? 1 : -1) * (15 + i * 5), opacity: 0, duration: 4 + i * 0.4, ease: "none", repeat: -1, delay: i * 0.3 });
        });

        const handleMouseMove = (e: MouseEvent) => {
            if (!floatingRef.current) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            gsap.to(floatingRef.current, { x, y, duration: 1, ease: "power2.out" });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section ref={heroRef} className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center overflow-x-clip overflow-y-visible perspective-1000">
            <div className="absolute inset-0 bg-white z-0" />

            <div ref={gridRef} className="absolute bottom-0 w-[200%] h-[100%] left-[-50%] z-0" style={{
                transform: "rotateX(60deg)", backgroundImage: "linear-gradient(to right, rgba(238,52,37,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(238,52,37,0.08) 1px, transparent 1px)", backgroundSize: "100px 100px",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
            }} />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1]">
                <div className="rh-orbit absolute w-[500px] h-[500px] -top-[250px] -left-[250px] rounded-full" style={{ border: "1px solid rgba(238,52,37,0.1)", animation: "rh-spin 25s linear infinite" }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "rgba(238,52,37,0.5)", boxShadow: "0 0 10px rgba(238,52,37,0.4)" }} />
                </div>
                <div className="rh-orbit absolute w-[350px] h-[350px] -top-[175px] -left-[175px] rounded-full" style={{ border: "1px dashed rgba(238,52,37,0.08)", animation: "rh-spin 18s linear infinite reverse" }}>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "rgba(238,52,37,0.4)", boxShadow: "0 0 8px rgba(238,52,37,0.2)" }} />
                </div>
                <div className="rh-orbit absolute w-[200px] h-[200px] -top-[100px] -left-[100px] rounded-full" style={{ border: "1px solid rgba(238,52,37,0.07)", animation: "rh-spin 12s linear infinite" }} />
                <div className="absolute w-[120px] h-[120px] -top-[60px] -left-[60px] rounded-full" style={{ background: "radial-gradient(circle, rgba(238,52,37,0.08) 0%, transparent 70%)", animation: "rh-pulse 3s ease-in-out infinite" }} />
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
                {[...Array(10)].map((_, i) => (
                    <div key={`rp-${i}`} className="rh-particle absolute rounded-full" style={{ width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`, background: i % 3 === 0 ? "rgba(238,52,37,0.5)" : "rgba(200,200,200,0.5)", boxShadow: i % 3 === 0 ? "0 0 8px rgba(238,52,37,0.4)" : "none", left: `${6 + (i * 9) % 86}%`, top: `${60 + (i * 12) % 30}%` }} />
                ))}
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
                <div className="rh-float absolute top-[16%] right-[10%]">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(238,52,37,0.3) 0%, transparent 60%)", filter: "blur(10px)", transform: "scale(2)" }} />
                        <svg className="relative" width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="rgba(238,52,37,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>
                    </div>
                </div>
                <div className="rh-float absolute top-[28%] left-[8%]">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(238,52,37,0.25) 0%, transparent 60%)", filter: "blur(12px)", transform: "scale(2)" }} />
                        <svg className="relative" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="rgba(238,52,37,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 00-4 12.73V17h8v-2.27A7 7 0 0012 2z" /></svg>
                    </div>
                </div>
                <div className="rh-float absolute top-[55%] right-[6%]">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(238,52,37,0.2) 0%, transparent 60%)", filter: "blur(10px)", transform: "scale(2)" }} />
                        <svg className="relative" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="rgba(238,52,37,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg>
                    </div>
                </div>
                <div className="rh-float absolute bottom-[22%] left-[14%]">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(238,52,37,0.2) 0%, transparent 60%)", filter: "blur(10px)", transform: "scale(2)" }} />
                        <svg className="relative" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(238,52,37,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
                    </div>
                </div>
            </div>

            <div ref={floatingRef} className="relative z-10 text-center px-6 max-w-5xl">
                <div className="rh-badge inline-block mb-6 relative group cursor-default" style={{ opacity: 0 }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#ee3425] to-orange-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                    <div className="relative px-8 py-2 bg-white border border-[#ee3425]/20 rounded-full leading-none flex items-center shadow-sm">
                        <span className="text-[#ee3425] text-sm font-medium tracking-widest uppercase">Knowledge Hub</span>
                    </div>
                </div>
                <h1 className="rh-title text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-5" style={{ opacity: 0 }}>
                    <span className="text-gray-900">RESOURCES</span>
                </h1>
                <p className="rh-sub text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-6" style={{ opacity: 0 }}>
                    Explore insights, guides, and industry trends to fuel your logistics strategy.
                </p>
                <div className="rh-scroll animate-bounce mt-4" style={{ opacity: 0 }}>
                    <FaArrowRight className="text-gray-300 rotate-90 text-2xl mx-auto" />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .perspective-1000 { perspective: 1000px; }
                @keyframes rh-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes rh-pulse { 0%, 100% { opacity: 0.3; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.15); } }
            ` }} />
        </section>
    );
}
