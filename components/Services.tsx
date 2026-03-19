"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaMotorcycle, FaTruck } from "react-icons/fa6";

export default function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Cards entrance
        gsap.from(cardsRef.current?.children ? Array.from(cardsRef.current.children) : [], {
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });

    }, []);

    return (
        <section ref={sectionRef} className="py-10 pb-32 bg-black relative">
            <div className="max-w-6xl mx-auto px-6 relative z-10 pt-20">
                <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 md:gap-20">
                    {/* Express Card */}
                    <div className="bg-white/[0.07] backdrop-blur-sm rounded-[2rem] p-8 border border-white/10 hover:border-[#7c3aed]/50 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c3aed]/10 rounded-bl-[100%] transition-all group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-3xl font-bold text-[#7c3aed]">QWQER <br /> Express</h3>
                                <div className="w-14 h-14 bg-[#7c3aed]/10 rounded-full flex items-center justify-center text-[#7c3aed] text-2xl border border-[#7c3aed]/20">
                                    <FaMotorcycle />
                                </div>
                            </div>
                            <div className="inline-block px-3 py-1 bg-[#7c3aed] text-white text-xs font-bold rounded-full mb-6">
                                Hyperlocal Delivery, On-Demand
                            </div>
                            <ul className="space-y-4 text-white/60 text-sm mb-8">
                                <li className="flex gap-3"><span className="text-[#7c3aed]">•</span> Fast, flexible and reliable last-mile delivery across cities</li>
                                <li className="flex gap-3"><span className="text-[#7c3aed]">•</span> Real-time tracking and delivery confirmation</li>
                                <li className="flex gap-3"><span className="text-[#7c3aed]">•</span> Optimized routes for efficiency and speed</li>
                            </ul>
                            <button className="w-full py-3 bg-[#7c3aed] text-white font-bold rounded-xl hover:bg-[#6d2ed4] transition-colors">Explore</button>
                        </div>
                    </div>

                    {/* Fleet Card */}
                    <div className="bg-white/[0.07] backdrop-blur-sm rounded-[2rem] p-8 border border-white/10 hover:border-[#3b82f6]/50 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6]/10 rounded-bl-[100%] transition-all group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-3xl font-bold text-[#3b82f6]">QWQER <br /> Fleet</h3>
                                <div className="w-14 h-14 bg-[#3b82f6]/10 rounded-full flex items-center justify-center text-[#3b82f6] text-2xl border border-[#3b82f6]/20">
                                    <FaTruck />
                                </div>
                            </div>
                            <div className="inline-block px-3 py-1 bg-[#3b82f6] text-white text-xs font-bold rounded-full mb-6">
                                First-mile FTL & LCV Based Intracity Logistics
                            </div>
                            <ul className="space-y-4 text-white/60 text-sm mb-8">
                                <li className="flex gap-3"><span className="text-[#3b82f6]">•</span> Structured operations for predictable, large-scale movement</li>
                                <li className="flex gap-3"><span className="text-[#3b82f6]">•</span> Flexible vehicle mix for routine, peak, or specialized requirements</li>
                                <li className="flex gap-3"><span className="text-[#3b82f6]">•</span> Visibility, planning and human oversight for every shipment</li>
                            </ul>
                            <button className="w-full py-3 bg-[#3b82f6] text-white font-bold rounded-xl hover:bg-[#2563eb] transition-colors">Explore</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
