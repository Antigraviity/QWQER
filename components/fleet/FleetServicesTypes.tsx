"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const serviceTabs = [
    {
        id: "ftl",
        title: "Full Truck Load Transportation",
        image: "/Types of Fleet Services/Full Truck Load transportation.png",
        description: "Intercity goods transportation operating across major routes across India, designed to handle high volume freight with consistency, operational control and real time visibility during transit."
    },
    {
        id: "intracity",
        title: "Intracity Transportation",
        image: "/Types of Fleet Services/Intracity transportation.png",
        description: "Purpose-built local transportation with vehicles optimised for city routes. Ideal for Factory to DC, Store replenishments, etc."
    },
    {
        id: "project",
        title: "Project Transportation",
        image: "/Types of Fleet Services/Project Transportation.png",
        description: "Goods transportation solutions designed around unique cargos, routes and handling needs."
    }
];

export default function FleetServicesTypes() {
    return (
        <section className="py-24 px-6 md:px-12 bg-black relative border-t border-zinc-900">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header Title */}
                <div className="text-center mb-16 flex flex-col items-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-outfit"
                    >
                        Types of <span className="text-[#f97316]">Fleet Services</span>
                    </motion.h2>
                </div>

                {/* Grid of 3 Services */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {serviceTabs.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-transparent group flex flex-col items-center text-center"
                        >
                            {/* Floating Image Container */}
                            <div className="w-full relative aspect-square flex items-center justify-center mb-6 transition-all duration-500 group-hover:-translate-y-3">
                                {/* Ambient back glow */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-1/2 h-1/2 bg-[#f97316]/20 blur-[60px] rounded-full" />
                                </div>
                                <div className="w-[90%] h-[90%] relative z-10">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold font-outfit text-white mb-4 transition-colors duration-300 group-hover:text-[#f97316]">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 font-inter text-base md:text-lg leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
