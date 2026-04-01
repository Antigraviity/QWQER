"use client";
import { useEffect, useState } from "react";

export default function ScrollIndicator() {
    const [phase, setPhase] = useState<"intro" | "keep" | "hidden">("intro");

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const nearBottom = scrollY + winHeight > docHeight - 300;

            if (nearBottom) {
                setPhase("hidden");
            } else if (scrollY > 300) {
                setPhase("keep");
            } else {
                setPhase("intro");
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Phase 1: Initial "Scroll to explore" — bottom center */}
            <div
                className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 transition-all duration-700 ${phase === "intro" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
            >
                <span className="text-white/30 text-[11px] font-medium uppercase tracking-[0.2em]">
                    Scroll to explore
                </span>
                <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
                    <div className="w-1 h-1.5 rounded-full bg-white/50 animate-scroll-dot" />
                </div>
            </div>

            {/* Phase 2: "Keep Scrolling" — bottom right, red accent with running line */}
            <div
                className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 transition-all duration-700 ${phase === "keep" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
            >
                <span className="text-white/25 text-[10px] font-medium uppercase tracking-[0.2em] whitespace-nowrap">
                    Keep Scrolling
                </span>

                {/* Red accent pulse + running line container */}
                <div className="relative flex flex-col items-center gap-1">
                    {/* Pulse rings */}
                    <div className="relative w-6 h-6 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-[#ee3425]/30 animate-pulse-ring-1" />
                        <div className="absolute inset-[-5px] rounded-full border border-[#ee3425]/15 animate-pulse-ring-2" />
                        <div className="absolute inset-[-10px] rounded-full border border-[#ee3425]/8 animate-pulse-ring-3" />
                        {/* Core dot */}
                        <div className="w-2 h-2 rounded-full bg-[#ee3425]/70 shadow-[0_0_8px_rgba(238,52,37,0.4)]" />
                    </div>

                    {/* Running line below */}
                    <div className="w-px h-10 bg-white/[0.06] relative overflow-hidden rounded-full">
                        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-[#ee3425]/60 via-[#ee3425]/30 to-transparent animate-running-line rounded-full" />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scrollDot {
                    0% { transform: translateY(0); opacity: 1; }
                    50% { transform: translateY(10px); opacity: 0.3; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .animate-scroll-dot {
                    animation: scrollDot 1.8s ease-in-out infinite;
                }
                @keyframes pulseRing1 {
                    0%, 100% { transform: scale(1); opacity: 0.4; }
                    50% { transform: scale(1.5); opacity: 0; }
                }
                .animate-pulse-ring-1 {
                    animation: pulseRing1 2s ease-in-out infinite;
                }
                @keyframes pulseRing2 {
                    0%, 100% { transform: scale(1); opacity: 0.2; }
                    50% { transform: scale(1.4); opacity: 0; }
                }
                .animate-pulse-ring-2 {
                    animation: pulseRing2 2s ease-in-out 0.3s infinite;
                }
                @keyframes pulseRing3 {
                    0%, 100% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.3); opacity: 0; }
                }
                .animate-pulse-ring-3 {
                    animation: pulseRing3 2s ease-in-out 0.6s infinite;
                }
                @keyframes runningLine {
                    0% { top: -16px; opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { top: 40px; opacity: 0; }
                }
                .animate-running-line {
                    animation: runningLine 1.4s ease-in-out infinite;
                }
            `}</style>
        </>
    );
}
