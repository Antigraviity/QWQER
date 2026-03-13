"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    FaCogs,
    FaBoxOpen,
    FaCar,
    FaHardHat,
    FaMountain,
    FaSeedling,
    FaCapsules,
    FaScroll,
    FaTshirt,
    FaIndustry,
    FaWrench,
} from "react-icons/fa";
import { IconType } from "react-icons";

const industries: { name: string; Icon: IconType }[] = [
    { name: "Manufacturing", Icon: FaCogs },
    { name: "FMCG & E-commerce", Icon: FaBoxOpen },
    { name: "Automotive", Icon: FaCar },
    { name: "Construction", Icon: FaHardHat },
    { name: "Mining", Icon: FaMountain },
    { name: "Agri Products", Icon: FaSeedling },
    { name: "Pharma", Icon: FaCapsules },
    { name: "Textiles", Icon: FaScroll },
    { name: "Apparels", Icon: FaTshirt },
    { name: "Heavy Industry", Icon: FaIndustry },
    { name: "Steel", Icon: FaWrench },
];

/* Single industry card with scroll-based reveal */
const IndustryCard = ({ industry, index }: { industry: { name: string; Icon: IconType }; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 90%", "start 60%"],
    });
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y, scale }}
            className="group relative"
        >
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm p-6 md:p-7 flex items-center gap-4 hover:border-[#3b82f6]/40 transition-all duration-500 cursor-pointer hover:bg-zinc-900/80">
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/0 to-[#3b82f6]/0 group-hover:from-[#3b82f6]/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#3b82f6]/20 transition-colors duration-300">
                    <industry.Icon className="text-[#3b82f6] text-lg" />
                </div>

                {/* Divider */}
                <div className="w-[1px] h-8 bg-white/10 flex-shrink-0" />

                {/* Name */}
                <span className="text-white/70 group-hover:text-white font-inter font-semibold text-sm md:text-base transition-colors duration-300">
                    {industry.name}
                </span>

                {/* Arrow on hover */}
                <svg
                    className="w-4 h-4 ml-auto text-white/0 group-hover:text-[#3b82f6] transition-all duration-300 group-hover:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </motion.div>
    );
};

export default function FleetIndustries() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 bg-black relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-blue-600/3 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="text-[48px] font-bold text-white font-outfit tracking-tight leading-tight"
                        >
                            Industries We{" "}
                            <span className="text-[#3b82f6]">Serve</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                            className="text-white/70 mt-3 text-lg max-w-xl"
                        >
                            Delivering reliable goods transportation across diverse sectors and supply chains.
                        </motion.p>
                    </div>


                </div>

                {/* Industry grid — each card reveals on scroll */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {industries.map((industry, index) => (
                        <IndustryCard key={industry.name} industry={industry} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
