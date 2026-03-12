"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, Variants, useTransform } from "framer-motion";
import { FaShieldAlt, FaWarehouse, FaClipboardCheck, FaHandshake, FaExclamationTriangle, FaCity } from "react-icons/fa";

const reasons = [
    {
        id: 1,
        description: "Traditional fleet and goods transport solutions often fail to meet enterprise standards resulting in operational inefficiencies, service disruptions, limited visibility, and increased risk.",
        icon: FaExclamationTriangle,
        color: "from-blue-500 to-cyan-400",
        shadow: "shadow-blue-500/20"
    },
    {
        id: 2,
        description: "QWQER Fleet solves this by delivering an enterprise-grade goods transportation solution built to support complex, high-volume operations.",
        icon: FaCity,
        color: "from-blue-500 to-cyan-400",
        shadow: "shadow-blue-500/20"
    },
    {
        id: 3,
        description: "Our platform combines professionally managed fleets, standardized processes, and performance-driven operations to ensure predictable outcomes, operational control, and seamless scalability.",
        icon: FaClipboardCheck,
        color: "from-blue-500 to-cyan-400",
        shadow: "shadow-blue-500/20"
    },
    {
        id: 4,
        description: "With QWQER Fleet, enterprises gain a transportation partner designed to meet corporate standards today and at scale.",
        icon: FaHandshake,
        color: "from-blue-500 to-cyan-400",
        shadow: "shadow-blue-500/20"
    },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" }
    }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

// Interactive 3D Tilt Card
const SpotlightCard = ({ reason, index }: { reason: typeof reasons[0] | any, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 80, damping: 25 });
    const mouseYSpring = useSpring(y, { stiffness: 80, damping: 25 });

    // Rotate based on mouse position relative to center of card
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Derived values for the glow orb
    const bgX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]);
    const bgY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    return (
        <motion.div
            variants={cardVariants}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                willChange: "transform",
            }}
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative h-full rounded-[2rem] bg-gradient-to-b from-zinc-800 to-zinc-950 p-[1px] transition-all duration-500 perspective-1000"
        >
            <div
                style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
                className="relative z-10 h-full p-8 md:p-10 rounded-[31px] bg-[#050505] flex flex-col items-start gap-6 border border-white/5 overflow-hidden"
            >
                {/* Dynamic Blue Glow Orb on Hover */}
                <motion.div
                    className="absolute z-0 w-[400px] h-[400px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-[60px]"
                    style={{
                        background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
                        left: "50%",
                        top: "50%",
                        x: bgX,
                        y: bgY,
                        translateX: "-50%",
                        translateY: "-50%"
                    }}
                />

                {/* Animated Top Border Line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 opacity-50 ease-out" />

                {/* Icon */}
                {reason.icon && (
                    <motion.div
                        style={{ transform: "translateZ(50px)" }}
                        className="pb-2 relative z-20"
                    >
                        <reason.icon className="text-5xl text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover:scale-110 transition-transform duration-500" />
                    </motion.div>
                )}

                {/* Text Content */}
                <motion.div
                    style={{ transform: "translateZ(40px)" }}
                    className="relative z-20"
                >
                    <p className="text-[#a1a1aa] leading-relaxed font-inter text-base md:text-lg lg:text-xl group-hover:text-white transition-colors duration-500">
                        {reason.description}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default function WhyQwqerFleet() {
    return (
        <section className="py-24 px-6 md:px-12 bg-black relative overflow-hidden">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[#ee3425]/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="text-center mb-20 flex flex-col items-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-bold text-white font-outfit tracking-tighter"
                    >
                        Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee3425] to-orange-500">QWQER Fleet?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg"
                    >
                        Pioneering logistics through technological innovation, safety, and unwavering reliability.
                    </motion.p>
                </div>

                {/* Staggered Grid Layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 perspective-[2000px]"
                >
                    {reasons.map((reason, index) => (
                        <SpotlightCard key={reason.id} reason={reason} index={index} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
