"use client";
import Image from "next/image";

export default function Trusted() {

    const clients = [
        { name: "McDonalds", src: "/express-clients/mcdonalds.webp" },
        { name: "Flipkart", src: "/fleet-clients/Flipkart.webp" },
        { name: "Apollo Pharmacy", src: "/express-clients/apollo-pharmacy.webp" },
        { name: "ONDC", src: "/clients/ondc.webp" },
        { name: "Pidilite", src: "/fleet-clients/pidilite.webp" },
        { name: "Zepto", src: "/express-clients/zepto.webp" },
        { name: "Saint Gobain", src: "/fleet-clients/saint-gobain.webp" },
        { name: "Zomato", src: "/express-clients/zomato.webp" },
        { name: "Blue Dart", src: "/fleet-clients/Blue-Dart.webp" },
        { name: "KFC", src: "/express-clients/KFC.webp" },
        { name: "Berger", src: "/fleet-clients/berger.webp" },
        { name: "Swiggy Instamart", src: "/clients/swiggy-instamart.webp" },
        { name: "BigBasket", src: "/express-clients/bigbasket.webp" },
        { name: "Yokohama", src: "/fleet-clients/yokohama.webp" },
        { name: "Bakingo", src: "/express-clients/Bakingo.webp" },
        { name: "Greenlam", src: "/fleet-clients/greenlam.webp" },
        { name: "FNP", src: "/express-clients/Fnp.webp" },
        { name: "Epsilon", src: "/fleet-clients/epsilon.webp" },
        { name: "Magicpin", src: "/express-clients/Magicpin.webp" },
        { name: "Rebel Foods", src: "/express-clients/rebel-foods.webp" },
        { name: "More", src: "/express-clients/More.webp" },
        { name: "Spar", src: "/express-clients/Spar.webp" },
        { name: "Tata 1mg", src: "/express-clients/tata-1mg.webp" },
        { name: "Ratnadeep", src: "/express-clients/Ratnadeep.webp" },
        { name: "Sweet Karam Coffee", src: "/express-clients/sweet-karam-coffee.webp" },
    ];

    return (
        <section className="py-16 bg-black border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center mb-10">
                <p className="text-white/50 text-sm uppercase tracking-widest font-bold">Trusted by top companies</p>
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
                    animation: scroll 60s linear infinite;
                }
                .mask-linear-fade {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </section>
    );
}
