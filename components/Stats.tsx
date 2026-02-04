"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Stats() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

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

    }, []);

    const metrics = [
        { value: "99.6%", label: "On-Time Delivery Rate" },
        { value: "5000+", label: "Successful Deliveries Completed" },
        { value: "120+", label: "Active Fleet Vehicles" },
        { value: "24/7", label: "Operations & Tracking Support" },
    ];

    return (
        <section ref={containerRef} className="py-24 bg-white text-black relative">
            {/* Section Title */}
            <div className="text-center mb-16">
                <div className="inline-block px-4 py-1 bg-[#ee3425]/10 rounded-full text-[#ee3425] font-bold text-sm mb-4">
                    Designed for speed, Driven by outcomes.
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#ee3425]">Trusted by businesses to deliver faster with <br /> consistency and control.</h2>
                <p className="max-w-2xl mx-auto mt-4 text-gray-500">A transportation solution provider built for express delivery and fleet operations - designed to move businesses faster, without complexity.</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200">
                {metrics.map((m, i) => (
                    <div key={i} className="stat-item flex flex-col items-center">
                        <span className="text-4xl md:text-5xl font-bold text-[#ee3425] mb-2 block">{m.value}</span>
                        <span className="text-gray-600 text-sm md:text-base font-medium max-w-[150px]">{m.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
