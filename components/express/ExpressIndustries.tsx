"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const industries = [
    "Food & Delivery Platforms",
    "Bakery",
    "Apparels",
    "Q-commerce",
    "Fish & Meat",
    "Personal Care",
    "E-commerce",
    "Pharma",
    "Florists & Gifts",
];

export default function ExpressIndustries() {
    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background decorative glow */}
            <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ee3425]/5 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left — Mascot illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative h-[560px] w-full flex items-center justify-center"
                    >
                        {/* Subtle circular glow behind mascot */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[420px] h-[420px] rounded-full bg-[#ee3425]/8 blur-[80px]" />
                        </div>

                        {/* Decorative ring */}
                        <div className="absolute w-[380px] h-[380px] rounded-full border border-white/5 animate-spin-slow pointer-events-none" />
                        <div className="absolute w-[460px] h-[460px] rounded-full border border-dashed border-[#ee3425]/10 pointer-events-none" />

                        <div className="relative w-full h-full">
                            <Image
                                src="/illustration_mascot_3d.png"
                                alt="QWQER Express Mascot"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Right — Industry list */}
                    <div className="flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-10"
                        >
                            <span className="text-[#ee3425] text-sm font-bold tracking-[0.3em] uppercase block mb-3">
                                Coverage
                            </span>
                            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
                                Industries
                                <br />
                                <span className="text-[#ee3425]">we serve</span>
                            </h2>
                        </motion.div>

                        {/* Industry rows */}
                        <div className="flex flex-col divide-y divide-white/5">
                            {industries.map((industry, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.06, duration: 0.4 }}
                                    className="group flex items-center justify-between py-4 cursor-default hover:bg-white/[0.02] px-3 rounded-xl transition-colors duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Number */}
                                        <span className="text-[11px] font-bold text-[#ee3425]/40 tracking-widest w-6">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        {/* Label */}
                                        <span className="text-lg md:text-xl font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                                            {industry}
                                        </span>
                                    </div>

                                    {/* Arrow that appears on hover */}
                                    <svg
                                        className="w-4 h-4 text-[#ee3425]/0 group-hover:text-[#ee3425] transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                                        fill="none" viewBox="0 0 16 16"
                                    >
                                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}</style>
        </section>
    );
}
