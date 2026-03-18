"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

const vendorTabs = [
    {
        id: "payments",
        title: "On-Time Payments",
        image: "/fleet-vendor-benefits/on-time-payments.webp",
        description: "Reliable and structured payment cycles, reducing standard market norms of credit period."
    },
    {
        id: "business",
        title: "Consistent Business Opportunities",
        image: "/fleet-vendor-benefits/consistent-opportunities.webp",
        description: "Steady demand from enterprise clients."
    },
    {
        id: "transparent",
        title: "Transparent Processes",
        image: "/fleet-vendor-benefits/transparent-processes.webp",
        description: "Clear terms, fair practices, and predictable operations."
    },
    {
        id: "growth",
        title: "Scalable Growth",
        image: "/fleet-vendor-benefits/scalable-growth.webp",
        description: "Opportunities to grow with long-term enterprise contracts."
    },
    {
        id: "support",
        title: "Operational Support",
        image: "/fleet-vendor-benefits/operational-support.webp",
        description: "Process guidance, standards, and performance enablement."
    }
];

export default function FleetVendors() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const total = vendorTabs.length;
        let index = Math.floor(latest * total);
        if (index >= total) index = total - 1;
        if (index < 0) index = 0;
        setActiveIndex(index);
    });

    return (
        <section ref={sectionRef} className="relative bg-black h-[400vh]">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12">

                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(59,130,246,0.06),transparent_50%)] pointer-events-none z-0" />

                <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">

                    {/* Left: Dynamic Sticky Image & Title */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left h-full justify-center">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[48px] font-bold text-white mb-2 font-outfit tracking-tight leading-tight"
                        >
                            Why Vendors <span className="text-[#3b82f6]">Work With Us</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                            className="text-white/70 mt-0 mb-10 text-lg max-w-lg"
                        >
                            Building lasting partnerships through transparency, reliability, and mutual growth.
                        </motion.p>

                        {/* Floating Image Container */}
                        <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                            {vendorTabs.map((tab, idx) => (
                                <AnimatePresence key={tab.id}>
                                    {activeIndex === idx && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8, y: 50, filter: "blur(8px)" }}
                                            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                                            exit={{ opacity: 0, scale: 0.8, y: -50, filter: "blur(8px)" }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            <Image
                                                src={tab.image}
                                                alt={tab.title}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                                priority
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            ))}
                        </div>
                    </div>

                    {/* Right: Scroll-driven Timeline */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 md:gap-8 relative self-stretch">

                        {/* Vertical Timeline Track */}
                        <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-zinc-800 hidden md:block" />

                        {/* Scroll progress bar on timeline */}
                        <motion.div
                            className="absolute left-3 top-0 w-[2px] bg-[#3b82f6] hidden md:block origin-top"
                            style={{
                                height: `${((activeIndex + 1) / vendorTabs.length) * 100}%`,
                                transition: "height 0.4s ease-out",
                            }}
                        />

                        {vendorTabs.map((tab, idx) => {
                            const isActive = activeIndex === idx;
                            return (
                                <motion.div
                                    key={tab.id}
                                    onClick={() => setActiveIndex(idx)}
                                    className="relative md:pl-12 text-center md:text-left cursor-pointer"
                                    animate={{
                                        opacity: isActive ? 1 : 0.3,
                                        scale: isActive ? 1.05 : 1,
                                    }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    {/* Timeline Dot */}
                                    <div className="hidden md:flex absolute left-[-2px] top-[13px] items-center justify-center">
                                        <motion.div
                                            className="w-2.5 h-2.5 rounded-full z-10"
                                            animate={{
                                                backgroundColor: isActive ? "#3b82f6" : "#3f3f46",
                                                scale: isActive ? 1.4 : 1,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        {isActive && (
                                            <div className="absolute w-6 h-6 rounded-full bg-[#3b82f6] opacity-30 animate-ping pointer-events-none" />
                                        )}
                                    </div>

                                    <h3
                                        className={`text-xl md:text-2xl font-bold font-outfit mb-1 md:mb-2 transition-colors duration-500 ${
                                            isActive ? "text-white" : "text-gray-500"
                                        }`}
                                    >
                                        {tab.title}
                                    </h3>

                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: isActive ? "auto" : 0,
                                            opacity: isActive ? 1 : 0,
                                            marginTop: isActive ? 8 : 0,
                                        }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-white/60 font-inter text-sm md:text-base leading-relaxed">
                                            {tab.description}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
