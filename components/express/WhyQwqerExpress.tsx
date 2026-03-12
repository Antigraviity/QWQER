"use client";

import { motion } from "framer-motion";

const steps = [
    {
        title: "Real Time Tracking",
        description: "Track every shipment live and maintain full visibility across business delivery workflows.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="18" stroke="#ee3425" strokeWidth="2.5" />
                <path d="M24 14v10l6 4" stroke="#ee3425" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="24" cy="24" r="2" fill="#ee3425" />
                <path d="M24 6a18 18 0 0 1 12.7 30.7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
            </svg>
        ),
        align: "top",   // card above the path
    },
    {
        title: "System-Ready Integration",
        description: "Integrate seamlessly with your OMS, ERP, or internal tools to automate delivery allocation and tracking.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 8l4 4-4 4-4-4 4-4zm10 10l4 4-4 4-4-4 4-4zm-20 0l4 4-4 4-4-4 4-4zm10 10l4 4-4 4-4-4 4-4z" stroke="#ee3425" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="24" cy="24" r="4" fill="#ee3425" opacity="0.25" />
            </svg>
        ),
        align: "bottom",  // card below the path
    },
    {
        title: "High-Volume Fulfilment Efficiency",
        description: "Manage hyperlocal deliveries at scale through our vast rider network.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="14" stroke="#ee3425" strokeWidth="2.5" />
                <path d="M24 14l2.4 7.2H34l-6.2 4.6 2.4 7.2L24 29l-6.2 4.8 2.4-7.2L14 21.2h7.6L24 14z" fill="#ee3425" opacity="0.8" />
            </svg>
        ),
        align: "top",
    },
    {
        title: "Multiple Delivery Models",
        description: "We offer multiple delivery models, including on-demand, batch and same-day deliveries, designed to support varying order volumes, timelines and operational needs.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="14" width="28" height="18" rx="3" stroke="#ee3425" strokeWidth="2.5" />
                <path d="M34 20h5l3 8v4h-8V20z" stroke="#ee3425" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="14" cy="35" r="3" stroke="#ee3425" strokeWidth="2" />
                <circle cx="34" cy="35" r="3" stroke="#ee3425" strokeWidth="2" />
            </svg>
        ),
        align: "bottom",
    },
];

export default function WhyQwqerExpress() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#ee3425]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-[#ee3425] tracking-tight">
                        Why QWQER Express?
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                        Built to Support Daily Operations, QWQER Express has proven to be a reliable
                        solution for hyperlocal deliveries.{" "}
                        <span className="text-white font-medium">Here&apos;s how:</span>
                    </p>
                </motion.div>

                {/* Timeline (Desktop) */}
                <div className="hidden md:block relative">
                    {/* === SVG winding path === */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 1200 360"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M 100 280 Q 200 280 300 180 Q 400 80 500 180 Q 600 280 700 180 Q 800 80 900 180 Q 1000 280 1100 180"
                            stroke="url(#pathGrad)"
                            strokeWidth="2.5"
                            strokeDasharray="8 5"
                            strokeLinecap="round"
                        />
                        <defs>
                            <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#ee3425" stopOpacity="0.2" />
                                <stop offset="50%" stopColor="#ee3425" stopOpacity="1" />
                                <stop offset="100%" stopColor="#ee3425" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Cards grid */}
                    <div className="grid grid-cols-4 gap-6 relative z-10" style={{ minHeight: "360px" }}>
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: step.align === "top" ? -30 : 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                                className={`flex flex-col relative ${step.align === "top"
                                        ? "justify-start pt-0"
                                        : "justify-end pb-0"
                                    }`}
                            >
                                <div
                                    className={`group bg-[#0e0e0e] border border-gray-800 hover:border-[#ee3425]/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(238,52,37,0.12)] ${step.align === "top" ? "mb-auto" : "mt-auto"
                                        }`}
                                >
                                    {/* Icon bubble */}
                                    <div className="w-14 h-14 rounded-full bg-[#ee3425]/10 border border-[#ee3425]/30 flex items-center justify-center mb-5 group-hover:bg-[#ee3425]/20 transition-colors duration-300 shadow-[0_0_20px_rgba(238,52,37,0.15)]">
                                        {step.icon}
                                    </div>

                                    {/* Step number */}
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#ee3425]/60 uppercase mb-2 block">
                                        Step {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-[#ee3425] transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                                        {step.description}
                                    </p>

                                    {/* Connector dot toward the path */}
                                    <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#ee3425] shadow-[0_0_12px_rgba(238,52,37,0.8)] ${step.align === "top" ? "-bottom-[30px]" : "-top-[30px]"
                                        }`} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile fallback — vertical stack */}
                <div className="md:hidden flex flex-col gap-6 relative">
                    {/* Vertical line */}
                    <div className="absolute left-[26px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ee3425]/20 via-[#ee3425] to-[#ee3425]/20" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12 }}
                            className="flex gap-5 relative z-10"
                        >
                            <div className="flex-shrink-0 w-[52px] h-[52px] rounded-full bg-[#0e0e0e] border border-[#ee3425]/40 flex items-center justify-center shadow-[0_0_15px_rgba(238,52,37,0.25)]">
                                {step.icon}
                            </div>
                            <div className="bg-[#0e0e0e] border border-gray-800 rounded-2xl p-5 flex-1">
                                <span className="text-[10px] font-bold tracking-widest text-[#ee3425]/60 uppercase block mb-1">
                                    Step {String(index + 1).padStart(2, "0")}
                                </span>
                                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
