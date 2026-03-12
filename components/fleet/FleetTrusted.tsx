"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
    { name: "Flipkart", src: "/fleet-clients/Flipkart.jpg" },
    { name: "Blue Dart DHL", src: "/fleet-clients/Blue-Dart.png" },
    { name: "Epsilon", src: "/fleet-clients/Epsilon-1.png" },
    { name: "BigBasket", src: "/fleet-clients/Bigbask.png" },
    { name: "Zomato", src: "/fleet-clients/zomato.jpg" },
    { name: "Zepto", src: "/fleet-clients/zepto-1.png" },
    { name: "Berger", src: "/fleet-clients/Berger-1.png" },
    { name: "Pidilite", src: "/fleet-clients/pidilite-1.png" },
    { name: "Saint Gobain", src: "/fleet-clients/Saint-Gobain-1.png" },
    { name: "Greenlam", src: "/fleet-clients/Greenlam-1.png" },
    { name: "Yokohama", src: "/fleet-clients/Yokohama-1.png" },
];

export default function FleetTrusted() {
    // Duplicate logos for seamless scrolling
    const scrollLogos = [...logos, ...logos, ...logos];

    return (
        <section className="py-12 bg-white/5 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <p className="text-gray-400 font-inter text-sm uppercase tracking-widest">
                    Trusted by top companies
                </p>
            </div>

            <div className="relative w-full flex overflow-x-hidden pt-4">
                {/* Gradient Masks for smooth intro/outro of logos */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

                <motion.div
                    className="flex gap-16 md:gap-24 items-center whitespace-nowrap min-w-max"
                    animate={{
                        x: [0, -1035], // Adjust based on content width. A rough guess that looping handles smoothly.
                        // We will use standard CSS animation for true seamless loop generally, 
                        // but framer motion works well if we set repeat.
                    }}
                    transition={{
                        duration: 30, // Adjust speed
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {scrollLogos.map((logo, index) => (
                        <div key={index} className="opacity-90 hover:opacity-100 transition-opacity duration-300">
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={200}
                                height={100}
                                className="object-contain max-h-24 md:max-h-28 w-auto rounded-lg"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
