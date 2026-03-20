"use client";

import Image from "next/image";

const clients = [
    { name: "KFC", src: "/express-clients/KFC.webp" },
    { name: "Rebel Foods", src: "/express-clients/rebel-foods.webp" },
    { name: "Tata 1mg", src: "/express-clients/tata-1mg.webp" },
    { name: "Zomato", src: "/fleet-clients/zomato.webp" },
    { name: "Zepto", src: "/express-clients/zepto.webp" },
    { name: "Apollo Pharmacy", src: "/express-clients/apollo-pharmacy.webp" },
    { name: "McDonald's", src: "/express-clients/mcdonalds.webp" },
    { name: "BigBasket", src: "/express-clients/bigbasket.webp" },
    { name: "Magicpin", src: "/express-clients/Magicpin.webp" },
    { name: "Bakingo", src: "/express-clients/Bakingo.webp" },
    { name: "FnP", src: "/express-clients/Fnp.webp" },
    { name: "More", src: "/express-clients/More.webp" },
    { name: "Ratnadeep", src: "/express-clients/Ratnadeep.webp" },
    { name: "Spar", src: "/express-clients/Spar.webp" },
    { name: "Sweet Karam Coffee", src: "/express-clients/sweet-karam-coffee.webp" },
];

export default function ExpressTrusted() {
    return (
        <section className="py-16 bg-black border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center mb-10">
                <p className="text-white/50 text-sm uppercase tracking-widest font-bold">
                    Trusted by top companies
                </p>
            </div>

            <div className="relative w-full overflow-hidden mask-linear-fade-express">
                {/* Marquee Track */}
                <div className="flex w-max animate-scroll-express items-center gap-2 md:gap-3 hover:[animation-play-state:paused]">
                    {/* Three sets for seamless infinite loop */}
                    {[...clients, ...clients, ...clients].map((c, i) => (
                        <div
                            key={i}
                            className="relative w-48 h-28 md:w-[200px] md:h-32 transition-transform duration-300 hover:scale-105 cursor-pointer flex items-center justify-center"
                        >
                            <Image
                                src={c.src}
                                alt={c.name}
                                fill
                                className="object-contain rounded-xl"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll-express {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-scroll-express {
                    animation: scroll-express 40s linear infinite;
                }
                .mask-linear-fade-express {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </section>
    );
}
