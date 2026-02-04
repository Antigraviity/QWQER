"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight } from "react-icons/fa6"; // Using arrows as bullets similar to ref image

export default function WhyQwqer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(listRef.current?.children ? Array.from(listRef.current.children) : [], {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        });

    }, []);

    const reasons = [
        "One-Partner, Two Powerful Solutions",
        "Predictable pricing and capacity, even during peaks",
        "Built for Reliability at Every Scale",
        "Nationwide Reach, Local Execution",
        "Operational Visibility and Dedicated Support",
        "Technology Driven Operations",
        "365 Days Dedicated Support"
    ];

    return (
        <section className="py-20 bg-black relative">
            {/* Central Line coming from top */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-[#ee3425]"></div>

            {/* Line terminates into a dot or the box */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#ee3425] rounded-full shadow-[0_0_10px_#ee3425]"></div>

            <div className="max-w-5xl mx-auto px-6 pt-10">
                <div ref={containerRef} className="bg-[#111] rounded-[2.5rem] p-10 md:p-16 border border-[#ee3425]/20 relative overflow-hidden shadow-2xl">

                    {/* Header Badge */}
                    <div className="absolute top-10 left-10 md:left-16">
                        <span className="bg-[#ee3425] text-white font-bold px-6 py-2 rounded-full shadow-lg">Why QWQER</span>
                    </div>

                    <div className="mt-16 md:mt-12">
                        <ul ref={listRef} className="space-y-6">
                            {reasons.map((r, i) => (
                                <li key={i} className="flex items-start gap-4 text-lg md:text-xl text-gray-300 border-b border-white/5 pb-2 last:border-0 hover:text-white transition-colors">
                                    <span className="mt-1.5 text-[#ee3425] text-sm transform rotate-[-45deg]">
                                        <FaArrowRight />
                                    </span>
                                    {r}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
