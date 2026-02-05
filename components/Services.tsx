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
                    <div className="bg-gradient-to-br from-[#1a1a1a] to-black rounded-[2rem] p-8 border border-white/10 hover:border-[#ee3425] transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee3425]/10 rounded-bl-[100%] transition-all group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-3xl font-bold text-white">QWQER <br /> Express</h3>
                                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-[#ee3425] text-2xl border border-white/5">
                                    <FaMotorcycle />
                                </div>
                            </div>
                            <div className="inline-block px-3 py-1 bg-[#ee3425] text-white text-xs font-bold rounded-full mb-6">
                                Hyperlocal Delivery, On-Demand
                            </div>
                            <ul className="space-y-4 text-gray-400 text-sm mb-8">
                                <li className="flex gap-3"><span className="text-[#ee3425]">•</span> Fast, flexible and reliable last-mile delivery</li>
                                <li className="flex gap-3"><span className="text-[#ee3425]">•</span> Real-time tracking and delivery confirmation</li>
                                <li className="flex gap-3"><span className="text-[#ee3425]">•</span> Optimized routes for efficiency and speed</li>
                            </ul>
                            <button className="w-full py-3 bg-[#ee3425] text-white font-bold rounded-xl hover:bg-[#d02012] transition-colors">Explore</button>
                        </div>
                    </div>

                    {/* Fleet Card */}
                    <div className="bg-gradient-to-bl from-[#1a1a1a] to-black rounded-[2rem] p-8 border border-white/10 hover:border-[#ee3425] transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee3425]/10 rounded-bl-[100%] transition-all group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-3xl font-bold text-white">QWQER <br /> Fleet</h3>
                                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-[#ee3425] text-2xl border border-white/5">
                                    <FaTruck />
                                </div>
                            </div>
                            <div className="inline-block px-3 py-1 bg-white text-black text-xs font-bold rounded-full mb-6">
                                Mid-Mile & Intercity Logistics
                            </div>
                            <ul className="space-y-4 text-gray-400 text-sm mb-8">
                                <li className="flex gap-3"><span className="text-[#ee3425]">•</span> Structured operations for large-scale movement</li>
                                <li className="flex gap-3"><span className="text-[#ee3425]">•</span> Flexible vehicle mix for specialized requirements</li>
                                <li className="flex gap-3"><span className="text-[#ee3425]">•</span> Visibility, planning, and human oversight</li>
                            </ul>
                            <button className="w-full py-3 bg-[#ee3425] text-white font-bold rounded-xl hover:bg-[#d02012] transition-colors">Explore</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
