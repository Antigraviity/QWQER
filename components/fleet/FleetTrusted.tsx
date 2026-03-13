"use client";

import Image from "next/image";

const logos = [
    { name: "Flipkart", src: "/fleet-clients/Flipkart.jpg" },
    { name: "Blue Dart DHL", src: "/fleet-clients/Blue-Dart.png" },
    { name: "Epsilon", src: "/fleet-clients/Epsilon-1.png" },
    { name: "BigBasket", src: "/fleet-clients/Bigbask.png" },
    { name: "Zomato", src: "/fleet-clients/zomato.webp" },
    { name: "Zepto", src: "/fleet-clients/zepto-1.png" },
    { name: "Berger", src: "/fleet-clients/Berger-1.png" },
    { name: "Pidilite", src: "/fleet-clients/pidilite-1.png" },
    { name: "Saint Gobain", src: "/fleet-clients/Saint-Gobain-1.png" },
    { name: "Greenlam", src: "/fleet-clients/Greenlam-1.png" },
    { name: "Yokohama", src: "/fleet-clients/Yokohama-1.png" },
];

export default function FleetTrusted() {
    return (
        <section className="py-16 bg-black border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center mb-10">
                <p className="text-white/50 text-sm uppercase tracking-widest font-bold">
                    Trusted by top companies
                </p>
            </div>

            <div className="relative w-full overflow-hidden mask-linear-fade">
                {/* Marquee Track */}
                <div className="flex w-max animate-scroll items-center gap-2 md:gap-3 hover:[animation-play-state:paused]">
                    {/* First Set */}
                    {logos.map((c, i) => (
                        <div
                            key={`a-${i}`}
                            className="relative w-48 h-28 md:w-[200px] md:h-32 transition-transform duration-300 hover:scale-105 cursor-pointer flex items-center justify-center"
                        >
                            <Image src={c.src} alt={c.name} fill className="object-contain" />
                        </div>
                    ))}
                    {/* Duplicate Set for Loop */}
                    {logos.map((c, i) => (
                        <div
                            key={`b-${i}`}
                            className="relative w-48 h-28 md:w-[200px] md:h-32 transition-transform duration-300 hover:scale-105 cursor-pointer flex items-center justify-center"
                        >
                            <Image src={c.src} alt={c.name} fill className="object-contain" />
                        </div>
                    ))}
                    {/* Triplicate Set for Loop smoothness on wide screens */}
                    {logos.map((c, i) => (
                        <div
                            key={`c-${i}`}
                            className="relative w-48 h-28 md:w-[200px] md:h-32 transition-transform duration-300 hover:scale-105 cursor-pointer flex items-center justify-center"
                        >
                            <Image src={c.src} alt={c.name} fill className="object-contain" />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .mask-linear-fade {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </section>
    );
}
