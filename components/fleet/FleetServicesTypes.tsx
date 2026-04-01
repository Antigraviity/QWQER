"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

const serviceTabs = [
    {
        id: "ftl",
        title: "Full Truck Load Transportation",
        image: "/fleet-services/full-truck-load.webp",
        description:
            "Intercity goods transportation operating across major routes across India, designed to handle high volume freight with consistency, operational control and real time visibility during transit.",
        label: "01",
    },
    {
        id: "intracity",
        title: "Intracity Transportation",
        image: "/fleet-services/intracity-transportation.webp",
        description:
            "Purpose-built local transportation with vehicles optimised for city routes. Ideal for Factory to DC, Store replenishments, etc.",
        label: "02",
    },
    {
        id: "project",
        title: "Project Transportation",
        image: "/fleet-services/project-transportation.webp",
        description:
            "Goods transportation solutions designed around unique cargos, routes and handling needs.",
        label: "03",
    },
];

export default function FleetServicesTypes() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const total = serviceTabs.length;
        let index = Math.floor(latest * total);
        if (index >= total) index = total - 1;
        if (index < 0) index = 0;
        setActiveIndex(index);
    });

    const activeTab = serviceTabs[activeIndex];

    return (
        <section
            ref={sectionRef}
            className="relative bg-black h-[300vh] border-t border-zinc-900"
        >
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-6 md:px-12">
                {/* Background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04),transparent_70%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto w-full relative z-10">
                    {/* Header */}
                    <div className="mb-8">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[48px] font-bold text-white font-outfit tracking-tight leading-tight"
                        >
                            Types of{" "}
                            <span className="text-[#3b82f6]">Fleet Services</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                            className="text-white/70 mt-4 text-sm md:text-base leading-relaxed max-w-2xl"
                        >
                            Comprehensive transportation solutions tailored to every freight need across India.
                        </motion.p>
                    </div>

                    {/* Route progress line */}
                    <div className="relative mb-10">
                        <div className="h-[2px] bg-zinc-800 w-full rounded-full" />
                        <div
                            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#3b82f6] to-[#6366f1] rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${(activeIndex / (serviceTabs.length - 1)) * 100}%` }}
                        />
                        {/* Route stop dots */}
                        {serviceTabs.map((tab, i) => (
                            <div
                                key={tab.id}
                                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                                style={{ left: `${(i / (serviceTabs.length - 1)) * 100}%` }}
                                onClick={() => setActiveIndex(i)}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full border-2 transition-all duration-400 ${
                                        i <= activeIndex
                                            ? "bg-[#3b82f6] border-[#3b82f6] shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                                            : "bg-zinc-900 border-zinc-600"
                                    }`}
                                />
                                <span
                                    className={`absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-inter whitespace-nowrap transition-colors duration-300 ${
                                        i === activeIndex ? "text-white" : "text-white/30"
                                    }`}
                                >
                                    {tab.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Card content — image left, text right */}
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 mt-6">
                        {/* Image with AnimatePresence */}
                        <div className="w-full md:w-1/2 relative">
                            <div className="relative aspect-[4/3] max-w-[500px] mx-auto">
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-2/3 h-2/3 bg-[#3b82f6]/12 blur-[80px] rounded-full" />
                                </div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab.id}
                                        initial={{ opacity: 0, x: 60, scale: 0.95 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -60, scale: 0.95 }}
                                        transition={{ duration: 0.45, ease: "easeInOut" }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={activeTab.image}
                                            alt={activeTab.title}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Text with AnimatePresence */}
                        <div className="w-full md:w-1/2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="flex flex-col items-start"
                                >
                                    <span className="text-[#3b82f6]/30 text-[96px] font-black font-outfit leading-none -mb-4">
                                        {activeTab.label}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold font-outfit text-white mb-4 leading-tight">
                                        {activeTab.title}
                                    </h3>
                                    <p className="text-white/60 font-inter text-base md:text-lg leading-relaxed max-w-md">
                                        {activeTab.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
