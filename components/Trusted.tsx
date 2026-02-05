"use client";
import Image from "next/image";

export default function Trusted() {

    const clients = [
        { name: "McDonalds", src: "/clients/mcd.webp" },
        { name: "Apollo", src: "/clients/apollo-phar.webp" },
        { name: "Pidilite", src: "/clients/pidilite.webp" },
        { name: "Zepto", src: "/clients/zepto.webp" },
        { name: "Zomato", src: "/clients/zomato.webp" },
        // Duplicate for seamless loop if needed, or we just map twice
    ];

    return (
        <section className="py-16 bg-black border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center mb-10">
                <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">Trusted by top companies</p>
            </div>

            <div className="relative w-full overflow-hidden mask-linear-fade">
                {/* Marquee Track */}
                <div className="flex w-max animate-scroll items-center gap-2 md:gap-3 hover:[animation-play-state:paused]">
                    {/* First Set */}
                    {clients.map((c, i) => (
                        <div key={`a-${i}`} className="relative w-48 h-28 md:w-[200px] md:h-32 transition-transform duration-300 hover:scale-105 cursor-pointer flex items-center justify-center">
                            <Image
                                src={c.src}
                                alt={c.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                    {/* Duplicate Set for Loop */}
                    {clients.map((c, i) => (
                        <div key={`b-${i}`} className="relative w-48 h-28 md:w-[200px] md:h-32 transition-transform duration-300 hover:scale-105 cursor-pointer flex items-center justify-center">
                            <Image
                                src={c.src}
                                alt={c.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                    {/* Triplicate Set for Loop smoothness on wide screens */}
                    {clients.map((c, i) => (
                        <div key={`c-${i}`} className="relative w-48 h-28 md:w-[200px] md:h-32 transition-transform duration-300 hover:scale-105 cursor-pointer flex items-center justify-center">
                            <Image
                                src={c.src}
                                alt={c.name}
                                fill
                                className="object-contain"
                            />
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
                    animation: scroll 30s linear infinite;
                }
                .mask-linear-fade {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </section>
    );
}
