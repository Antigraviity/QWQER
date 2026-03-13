"use client";

import Image from "next/image";

const clients = [
    { name: "KFC", src: "/Express clients/KFC.png" },
    { name: "Rebel Foods", src: "/Express clients/Rebel.png" },
    { name: "Tata 1mg", src: "/Express clients/Tata 1mg.png" },
    { name: "Zomato", src: "/fleet-clients/zomato.webp" },
    { name: "Zepto", src: "/Express clients/zepto (1).png" },
    { name: "Apollo Pharmacy", src: "/Express clients/apollo-phar.png" },
    { name: "McDonald's", src: "/Express clients/mcd.png" },
    { name: "BigBasket", src: "/Express clients/Bigbask.png" },
    { name: "Magicpin", src: "/Express clients/Magicpin.png" },
    { name: "Bakingo", src: "/Express clients/Bakingo.png" },
    { name: "FnP", src: "/Express clients/Fnp.png" },
    { name: "More", src: "/Express clients/More.png" },
    { name: "Ratnadeep", src: "/Express clients/Ratnadeep.png" },
    { name: "Spar", src: "/Express clients/Spar.png" },
    { name: "Sweet Karam Coffee", src: "/Express clients/Sweet_karam_coffee.png" },
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
