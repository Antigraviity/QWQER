"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const industries = [
    "Manufacturing",
    "FMCG & E-commerce",
    "Automotive",
    "Construction",
    "Mining",
    "Agri Products",
    "Pharma",
    "Textiles",
    "Apparels",
    "Heavy Industry",
    "Steel"
];

export default function FleetIndustries() {
    return (
        <section className="py-24 px-6 md:px-12 bg-zinc-950 relative overflow-hidden">
            {/* Background structural elements */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full point-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">

                {/* Left: Graphic representation */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2 flex items-center justify-center relative min-h-[300px] md:min-h-[500px]"
                >
                    <Image
                        src="/Fleet truck mascot.png"
                        alt="Fleet truck mascot"
                        fill
                        className="object-contain drop-shadow-2xl"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </motion.div>

                {/* Right: List of Industries */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2 flex flex-col items-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10 text-center"
                    >
                        <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-[#ee3425] font-outfit">
                            Industries we serve
                        </h2>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 pb-10">
                        {industries.map((industry, index) => (
                            <motion.div
                                key={industry}
                                initial={{ opacity: 0, y: 50, scale: 0.5, rotateX: 45 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                    delay: index * 0.08
                                }}
                                style={{ perspective: 1000 }}
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -8, 0],
                                    }}
                                    transition={{
                                        duration: 3 + (index % 3),
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.2
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        rotateZ: index % 2 === 0 ? 3 : -3,
                                        rotateX: 10,
                                        rotateY: index % 2 === 0 ? 10 : -10,
                                        boxShadow: "0 20px 40px -10px rgba(238,52,37,0.5)",
                                    }}
                                    className="relative p-[1px] rounded-2xl cursor-pointer group transition-colors duration-300 bg-transparent hover:bg-transparent"
                                >
                                    {/* Glowing Border effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#ee3425] via-orange-500 to-[#ee3425] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#ee3425] via-orange-500 to-[#ee3425] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Inner text content */}
                                    <div className="relative flex items-center gap-3 px-6 py-3 bg-transparent group-hover:bg-[#ee3425] rounded-2xl transition-colors duration-300">
                                        <span className="text-zinc-400 group-hover:text-white font-inter font-semibold tracking-wide transition-colors duration-300 text-sm md:text-base whitespace-nowrap">
                                            {industry}
                                        </span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
