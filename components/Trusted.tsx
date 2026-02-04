"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Trusted() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(containerRef.current?.children ? Array.from(containerRef.current.children) : [], {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
            }
        });
    }, []);

    const companies = [
        { name: "KFC", color: "#e4002b" },
        { name: "BigBasket", color: "#84c225" },
        { name: "Zepto", color: "#36013f" },
        { name: "Magicpin", color: "#d51b5e" }
    ];

    return (
        <section className="py-20 bg-black border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-gray-500 text-sm mb-12 uppercase tracking-widest font-bold">Trusted by top companies</p>
                <div ref={containerRef} className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-80">
                    {companies.map((c, i) => (
                        <div key={i} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 cursor-pointer group">
                            {/* Placeholder Icon simulating logo */}
                            <div className="w-8 h-8 rounded bg-current opacity-80" style={{ color: c.color }}></div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500" >
                                {c.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
