"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const BASE = "/Why Join QWQER Express as a Rider  Rider Vendor";

const benefits = [
    {
        title: "Consistent Order Flow",
        description: "Access steady delivery demand across food, e-commerce, pharma and other hyperlocal categories.",
        image: `${BASE}/Consistent Order Flow.png`,
    },
    {
        title: "Flexible Working Model",
        description: "Work on your own schedule — suitable for individual riders as well as fleet vendors.",
        image: `${BASE}/Flexible Working Model.png`,
    },
    {
        title: "On-Time, Transparent Payouts",
        description: "Weekly settlements with clear earnings visibility and no hidden deductions.",
        image: `${BASE}/On-Time, Transparent Payouts.png`,
    },
    {
        title: "Tech-Enabled Operations",
        description: "A simple rider app with optimized routing, real-time support and minimal downtime.",
        image: `${BASE}/Tech-Enabled Operations.png`,
    },
    {
        title: "Grow With the Platform",
        description: "Whether you're an individual rider or managing a fleet, QWQER Express supports your growth at every stage.",
        image: `${BASE}/Grow With the Platform.png`,
    },
];

export default function ExpressJoin() {
    return (
        <section className="py-24 bg-black">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-[#7c3aed] text-xs font-bold tracking-[0.35em] uppercase block mb-3">
                        Rider / Vendor
                    </span>
                    <h2 className="text-4xl md:text-[48px] font-extrabold text-white tracking-tight">
                        Why Join <span className="text-[#7c3aed]">QWQER Express?</span>
                    </h2>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {benefits.map((b, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.06 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="group flex flex-col bg-[#0c0c0c] border border-white/6 hover:border-[#7c3aed]/40 rounded-2xl overflow-hidden cursor-pointer will-change-transform"
                        >
                            {/* Image */}
                            <div className="relative w-full h-48 bg-[#101010] overflow-hidden">
                                <Image
                                    src={b.image}
                                    alt={b.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                />
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-white/5 group-hover:bg-[#7c3aed]/30 transition-colors duration-300" />

                            {/* Text */}
                            <div className="flex flex-col gap-2 p-5 flex-1">
                                <h3 className="text-sm font-bold text-white leading-snug">
                                    {b.title}
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {b.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
