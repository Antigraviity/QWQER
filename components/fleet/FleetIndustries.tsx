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

const industries: { name: string; Icon: IconType; desc: string }[] = [
    { name: "Manufacturing", Icon: FaCogs, desc: "Factory-to-warehouse and inter-plant movement with scheduled, damage-free delivery across production hubs." },
    { name: "FMCG & E-commerce", Icon: FaBoxOpen, desc: "High-frequency distribution from fulfilment centres to retail points and dark stores with real-time visibility." },
    { name: "Automotive", Icon: FaCar, desc: "Spare parts logistics and CKD/SKD shipments with precision handling for assembly-line continuity." },
    { name: "Construction", Icon: FaHardHat, desc: "Heavy material haulage — cement, fixtures and equipment moved on-time to keep project timelines intact." },
    { name: "Mining", Icon: FaMountain, desc: "Bulk cargo transport from mine-head to processing units with fleet suited for rugged terrain and heavy loads." },
    { name: "Agri Products", Icon: FaSeedling, desc: "Farm-to-market and cold-chain compatible transport for perishables, grains, and agricultural inputs." },
    { name: "Pharma", Icon: FaCapsules, desc: "Temperature-sensitive, compliance-ready shipments for medicines, medical devices, and healthcare supplies." },
    { name: "Textiles", Icon: FaScroll, desc: "Fabric rolls and raw material movement from mills to garment units with careful handling and on-time dispatch." },
    { name: "Apparels", Icon: FaTshirt, desc: "Seasonal and bulk apparel shipments from manufacturing hubs to brand warehouses and retail destinations." },
    { name: "Heavy Industry", Icon: FaIndustry, desc: "Oversized and heavy machinery transport with specialised fleet and route planning for industrial corridors." },
    { name: "Steel", Icon: FaWrench, desc: "Coil, sheet, and structural steel logistics with flatbed and trailer fleet built for safe, high-tonnage movement." },
];

/* Single industry card with scroll-based reveal */
const IndustryCard = ({ industry, index }: { industry: { name: string; Icon: IconType; desc: string }; index: number }) => {
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

                {/* Name & Description */}
                <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-white/70 group-hover:text-white font-inter font-semibold text-sm md:text-base transition-colors duration-300">
                        {industry.name}
                    </span>
                    <span className="text-white/40 group-hover:text-white/55 text-xs md:text-[13px] leading-relaxed transition-colors duration-300 line-clamp-2">
                        {industry.desc}
                    </span>
                </div>

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
                            className="text-white/70 mt-4 text-sm md:text-base leading-relaxed max-w-xl"
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
