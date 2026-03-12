"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const vendorTabs = [
    {
        id: "payments",
        title: "On-Time Payments",
        image: "/Why vendors work with us/On-Time Payments.png",
        description: "Reliable and structured payment cycles, reducing standard market norms of credit period."
    },
    {
        id: "business",
        title: "Consistent Business Opportunities",
        image: "/Why vendors work with us/Consistent Business Opportunities.png",
        description: "Steady demand from enterprise clients."
    },
    {
        id: "transparent",
        title: "Transparent Processes",
        image: "/Why vendors work with us/Transparent Processes.png",
        description: "Clear terms, fair practices, and predictable operations."
    },
    {
        id: "growth",
        title: "Scalable Growth",
        image: "/Why vendors work with us/Scalable Growth.png",
        description: "Opportunities to grow with long-term enterprise contracts."
    },
    {
        id: "support",
        title: "Operational Support",
        image: "/Why vendors work with us/Operational Support.png",
        description: "Process guidance, standards, and performance enablement."
    }
];

export default function FleetVendors() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto change options every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % vendorTabs.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-black relative py-20 border-y border-zinc-900">
            <div className="w-full flex flex-col justify-center overflow-hidden px-6 md:px-12">

                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(234,179,8,0.06),transparent_50%)] pointer-events-none z-0" />

                <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: Dynamic Sticky Image & Title */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left h-full justify-center mt-12 md:mt-0">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-10 font-outfit"
                        >
                            Why vendors <span className="text-[#eab308]">work with us</span>
                        </motion.h2>

                        {/* Floating Image Container without box borders */}
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

                    {/* Right: Scrolling Timeline Selection */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 md:gap-8 relative pb-10 lg:pb-0 lg:pt-24 h-[50vh] lg:h-auto overflow-hidden lg:overflow-visible">

                        {/* Vertical Timeline Track */}
                        <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-zinc-800 hidden md:block" />

                        {vendorTabs.map((tab, idx) => {
                            const isActive = activeIndex === idx;
                            return (
                                <motion.div
                                    key={tab.id}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`relative md:pl-12 transition-all duration-500 ease-out origin-left text-center md:text-left cursor-pointer`}
                                    animate={{
                                        opacity: isActive ? 1 : 0.3,
                                        scale: isActive ? 1.05 : 1,
                                    }}
                                >
                                    {/* Timeline Glow Dot (hidden on mobile for space) */}
                                    <div className="hidden md:flex absolute left-[-2px] top-[13px] items-center justify-center">
                                        <motion.div
                                            className="w-2.5 h-2.5 rounded-full z-10"
                                            animate={{
                                                backgroundColor: isActive ? "#eab308" : "#3f3f46", // yellow or zinc-700
                                                scale: isActive ? 1.4 : 1
                                            }}
                                        />
                                        {/* Ping animation behind active dot */}
                                        {isActive && (
                                            <div className="absolute w-6 h-6 rounded-full bg-[#eab308] opacity-30 animate-ping pointer-events-none" />
                                        )}
                                    </div>

                                    <h3 className={`text-xl md:text-2xl font-bold font-outfit mb-1 md:mb-2 transition-colors duration-500 ${isActive ? "text-white" : "text-gray-500"}`}>
                                        {tab.title}
                                    </h3>

                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: isActive ? "auto" : 0,
                                            opacity: isActive ? 1 : 0,
                                            marginTop: isActive ? 8 : 0
                                        }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-gray-400 font-inter text-sm md:text-base leading-relaxed">
                                            {tab.description}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section >
    );
}
