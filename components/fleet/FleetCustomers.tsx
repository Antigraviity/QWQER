"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import Image from "next/image";

const customerTabs = [
    {
        id: "reliability",
        title: "Enterprise-Grade Reliability",
        image: "/fleet-why-choose/enterprise-reliability.webp",
        description: "Consistent, dependable goods transportation built for high-volume operations.",
        color: "bg-[#3b82f6]",
        glow: "bg-[#3b82f6]/20"
    },
    {
        id: "partner",
        title: "Trusted Partner Mindset",
        image: "/fleet-why-choose/trusted-partner.webp",
        description: "We operate as an extension of your enterprise, with complete accountability.",
        color: "bg-[#3b82f6]",
        glow: "bg-[#3b82f6]/20"
    },
    {
        id: "scalable",
        title: "Customisable and Scalable Solutions",
        image: "/fleet-why-choose/scalable-solutions.webp",
        description: "Easily scale across cities, routes, and demand cycles.",
        color: "bg-[#3b82f6]",
        glow: "bg-[#3b82f6]/20"
    },
    {
        id: "control",
        title: "Operational Control & Visibility",
        image: "/fleet-why-choose/operational-control.webp",
        description: "Structured processes and performance-driven operations.",
        color: "bg-[#3b82f6]",
        glow: "bg-[#3b82f6]/20"
    },
    {
        id: "safety",
        title: "Compliance & Safety First",
        image: "/fleet-why-choose/compliance-safety.webp",
        description: "Adherence to corporate, regulatory, and safety standards.",
        color: "bg-[#3b82f6]",
        glow: "bg-[#3b82f6]/20"
    }
];

// Sub-component to safely use hooks inside the map loop
const ScrollProgressBar = ({
    scrollYProgress,
    index,
    total,
    color
}: {
    scrollYProgress: MotionValue<number>;
    index: number;
    total: number;
    color: string;
}) => {
    // Calculate the start and end points for this specific tab's scroll window
    const start = index / total;
    const end = (index + 1) / total;

    // Map the section's overall scroll progress to 0% -> 100% just for this tab's slice
    const width = useTransform(scrollYProgress, [start, end], ["0%", "100%"]);

    return (
        <div className="absolute bottom-0 left-0 h-[3px] w-full bg-transparent">
            {/* We clamp the width between 0 and 100% using overflow-hidden on the parent, or implicit clamping in Framer Motion */}
            <motion.div style={{ width }} className={`h-full ${color}`} />
        </div>
    );
};

export default function FleetCustomers() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    // Track scroll within the 400vh tall container wrapper
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const totalTabs = customerTabs.length;
        // Map 0 -> 1 progress to 0 -> totalTabs
        let index = Math.floor(latest * totalTabs);

        // Ensure index stays within bounds at the absolute bottom or top of the scroll
        if (index >= totalTabs) index = totalTabs - 1;
        if (index < 0) index = 0;

        setActiveIndex(index);
    });

    const activeTab = customerTabs[activeIndex];

    return (
        // The container is extremely tall (e.g. 400vh) to allow a long scroll duration
        <section ref={sectionRef} className="relative bg-black h-[400vh]">

            {/* The sticky inner container locks to the screen viewport while scrolling down the 400vh section */}
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto w-full relative z-10">

                    {/* Section Header */}
                    <div className="text-center md:text-left mb-6 lg:mb-8 flex flex-col items-center md:items-start">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="text-[48px] font-extrabold text-white font-outfit tracking-[-0.02em] leading-[1.1]"
                        >
                            Why do Customers <span className="text-[#3b82f6]">Choose Us?</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                            className="text-white/70 mt-4 text-base md:text-[17px] leading-[1.8] font-outfit max-w-2xl"
                        >
                            Delivering enterprise-grade logistics that businesses trust to scale, perform, and grow.
                        </motion.p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">

                        {/* Left: Scroll-Linked Tabs */}
                        <div className="w-full lg:w-5/12 flex flex-col gap-3">
                            {customerTabs.map((tab, index) => {
                                const isActive = activeIndex === index;
                                // Determine if this tab has already been viewed (scrolled past)
                                // so we can keep its progress bar completely full
                                const isPast = activeIndex > index;

                                return (
                                    <div
                                        key={tab.id}
                                        className={`text-left p-5 rounded-xl transition-all duration-300 font-outfit relative overflow-hidden border ${isActive
                                            ? "bg-[#161616] border-gray-700 shadow-lg"
                                            : "bg-black border-transparent text-gray-500"
                                            }`}
                                    >
                                        <div className="relative z-10 flex flex-col gap-1">
                                            <h3 className={`text-lg md:text-xl font-extrabold transition-colors duration-300 ${isActive ? "text-white" : ""}`}>
                                                {tab.title}
                                            </h3>

                                            <AnimatePresence initial={false}>
                                                {isActive && (
                                                    <motion.p
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-sm text-white/60 font-outfit leading-[1.8] mt-1"
                                                    >
                                                        {tab.description}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Dynamic Scroll Progress Bar */}
                                        {isActive ? (
                                            <ScrollProgressBar
                                                scrollYProgress={scrollYProgress}
                                                index={index}
                                                total={customerTabs.length}
                                                color={tab.color}
                                            />
                                        ) : isPast ? (
                                            <div className="absolute bottom-0 left-0 h-[3px] w-full bg-transparent">
                                                <div className={`h-full w-full ${tab.color}`} />
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right: Floating Image Container */}
                        <div className="w-full lg:w-7/12 relative aspect-[4/3] flex items-center justify-center p-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="w-full h-full relative z-10"
                                >
                                    {activeTab.image && (
                                        <Image
                                            src={activeTab.image}
                                            alt={activeTab.title}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
