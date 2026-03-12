"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const solutions = [
    {
        title: "On-Demand Deliveries",
        description: "Instant pickup and delivery for time-sensitive orders, enabled by rapid rider allocation and flexible capacity.",
        image: "/QWQER Express Solutions/On-Demand Deliveries.png",
        color: "from-red-900/20 to-transparent",
        accent: "rgba(238,52,37,0.15)",
    },
    {
        title: "Batch Deliveries",
        description: "Efficient single-pickup, multi-drop deliveries designed to handle high-volume dispatches at scale.",
        image: "/QWQER Express Solutions/Batch Deliveries.png",
        color: "from-orange-900/20 to-transparent",
        accent: "rgba(251,146,60,0.1)",
    },
    {
        title: "Same-Day Deliveries",
        description: "Reliable same-day fulfilment for intra-city orders, ensuring faster turnaround without compromising scale or reliability.",
        image: "/QWQER Express Solutions/Same-Day Deliveries.png",
        color: "from-rose-900/20 to-transparent",
        accent: "rgba(244,63,94,0.12)",
    },
    {
        title: "Mid-mile to Last-mile Fulfilment",
        description: "End-to-end movement from hubs to stores and from stores to customers within city limits.",
        image: "/QWQER Express Solutions/Mid-mile to Last-mile Fulfilment.png",
        color: "from-red-900/20 to-transparent",
        accent: "rgba(238,52,37,0.15)",
    },
    {
        title: "Scheduled Deliveries",
        description: "Planned, same-day and next-day routes designed for predictable, recurring operations.",
        image: "/QWQER Express Solutions/Scheduled Deliveries.png",
        color: "from-orange-900/20 to-transparent",
        accent: "rgba(251,146,60,0.1)",
    },
    {
        title: "Multi-drop Distribution",
        description: "Single-pickup, multiple-drop delivery models optimised for efficiency and cost control.",
        image: "/QWQER Express Solutions/Multi-drop Distribution.png",
        color: "from-rose-900/20 to-transparent",
        accent: "rgba(244,63,94,0.12)",
    },
];

export default function ExpressSolutions() {
    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Top border glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ee3425]/50 to-transparent" />

            {/* Background grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
                >
                    <div>
                        <span className="text-[#ee3425] text-sm font-bold tracking-[0.3em] uppercase block mb-3">
                            Our Services
                        </span>
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
                            QWQER Express<br />
                            <span className="text-[#ee3425]">Solutions</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 text-base max-w-sm leading-relaxed md:text-right">
                        From instant pickups to complex multi-drop runs — we have a model built for every operation.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {solutions.map((solution, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                            className="group relative rounded-3xl overflow-hidden border border-white/5 hover:border-[#ee3425]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(238,52,37,0.15)] h-[420px] bg-[#0a0a0a]"
                        >
                            {/* Full-card image */}
                            <Image
                                src={solution.image}
                                alt={solution.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Dark gradient overlay — bottom half for text legibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none" />

                            {/* Hover color accent glow from top */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                                style={{ background: `radial-gradient(ellipse at 50% 10%, ${solution.accent} 0%, transparent 60%)` }}
                            />

                            {/* Text content — pinned to bottom */}
                            <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                                {/* Index */}
                                <span className="text-[11px] font-bold tracking-[0.25em] text-[#ee3425]/60 uppercase block mb-2">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-[#ee3425] transition-colors duration-300">
                                    {solution.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {solution.description}
                                </p>

                            </div>

                            {/* Bottom border accent on hover */}
                            <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#ee3425] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom border glow */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ee3425]/30 to-transparent" />
        </section>
    );
}
