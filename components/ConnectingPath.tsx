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
            // Animate the mask to reveal the path on scroll
            gsap.to(".path-mask-rect", {
                height: "3000px", // Total height of the SVG viewbox
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                }
            });

            // Running effect (infinite loop for dashes)
            gsap.fromTo(pathRef.current,
                { strokeDashoffset: 0 },
                {
                    strokeDashoffset: -1200, // Seamless loop (multiple of 24)
                    duration: 10,
                    repeat: -1,
                    ease: "none"
                }
            );
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
                <defs>
                    <mask id="path-mask">
                        <rect x="0" y="0" width="1440" height="0" fill="white" className="path-mask-rect" />
                    </mask>
                </defs>

                <path
                    ref={pathRef}
                    d="M720,600 C720,800 720,900 720,1100"
                    fill="none"
                    stroke="#ee3425"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="14 10"
                    mask="url(#path-mask)"
                    className="opacity-100 drop-shadow-[0_0_10px_rgba(238,52,37,0.5)]"
                />
            </svg>
        </div>
    );
}
