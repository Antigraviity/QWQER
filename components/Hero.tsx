"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline();

        tl.fromTo(containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1 }
        )
            .fromTo(textRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
            )
            .fromTo(imageRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.5"
            );

        // Parallax
        gsap.to(imageRef.current, {
            y: 50,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

    }, []);

    return (
        <section ref={containerRef} className="min-h-[90vh] w-full flex items-center bg-black relative overflow-hidden pt-20">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ee3425]/10 to-transparent opacity-50"></div>

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
                <div ref={textRef} className="text-left">
                    <p className="text-[#ee3425] font-bold tracking-widest uppercase mb-4 text-sm">Logistics Reinvented</p>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] text-white mb-6">
                        Transportation solutions, <br />
                        <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">built to move business.</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mb-8">
                        From intercity FTL operations to hyperlocal deliveries, QWQER helps businesses move goods across India with visibility, control, and consistency.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-8 py-3 bg-[#ee3425] text-white font-bold rounded-full hover:bg-[#c92a1c] transition-all shadow-[0_0_20px_rgba(238,52,37,0.4)] hover:shadow-[0_0_30px_rgba(238,52,37,0.6)]">
                            Get Started
                        </button>
                        <button className="px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/10">
                            Learn More
                        </button>
                    </div>
                </div>

                <div ref={imageRef} className="relative">
                    {/* Image Container with Glow */}
                    <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#ee3425]/10">
                        <Image
                            src="/hero-image.png"
                            alt="QWQER Logistics Future"
                            width={800}
                            height={500}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    {/* Abstract Decor Elements behind image */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ee3425] rounded-full blur-[80px] opacity-20"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-10"></div>
                </div>
            </div>

            {/* Connection Point for Line */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-transparent to-[#ee3425] z-0"></div>
        </section>
    );
}
