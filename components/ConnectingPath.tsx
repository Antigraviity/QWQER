"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ConnectingPath() {
    const pathRef = useRef<SVGPathElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate the path drawing
        if (pathRef.current && svgRef.current) {
            const length = pathRef.current.getTotalLength();
            gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

            gsap.to(pathRef.current, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                }
            });
        }
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 hidden md:block overflow-visible">
            <svg ref={svgRef} className="w-full h-full absolute top-0 left-0" preserveAspectRatio="none" viewBox="0 0 1440 3000">
                {/* 
                Path logic:
                1. Starts at Hero center bottom (approx x=50%, y=800)
                2. curves right to Services (approx x=50%, y=1200) - splits or goes between
                3. curves back to center for WhyQWQER (approx x=50%, y=1800)
            */}
                <path
                    ref={pathRef}
                    d="M720,600 C720,900 720,1100 720,1300 C720,1500 720,1700 720,2000"
                    fill="none"
                    stroke="#ee3425"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="opacity-50 drop-shadow-[0_0_10px_rgba(238,52,37,0.5)]"
                />
            </svg>
        </div>
    );
}
