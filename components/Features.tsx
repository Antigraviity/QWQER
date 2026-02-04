"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBoxOpen, FaScaleUnbalanced, FaMapLocationDot, FaEye, FaLaptopCode, FaHeadset } from "react-icons/fa6";

export default function Features() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(gridRef.current?.children ? Array.from(gridRef.current.children) : [], {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });
    }, []);

    const features = [
        { title: "Express Speed, Fleet Strength", icon: <FaBoxOpen />, desc: "Fast, reliable local deliveries combined with large-scale intercity logistics." },
        { title: "Built for Reliability at Every Scale", icon: <FaScaleUnbalanced />, desc: "Field-tested operations that adapt to your business volume seamlessly." },
        { title: "Nationwide Reach, Local Execution", icon: <FaMapLocationDot />, desc: "Operate seamlessly across India while benefiting from strong regional oversight." },
        { title: "Full Operational Visibility", icon: <FaEye />, desc: "Track shipments in real-time with proactive updates and issue resolution." },
        { title: "Technology-Driven Operations", icon: <FaLaptopCode />, desc: "Tools and systems designed to optimize routes, fleet management and planning." },
        { title: "24/7 Dedicated Support", icon: <FaHeadset />, desc: "Our teams are always ready to assist, ensuring smooth operations from start to finish." }
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <p className="text-[#ee3425] mb-2 font-medium">Logistics solutions you can trust</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white max-w-2xl">How QWQER Helps Businesses Deliver Better</h2>
                </div>

                <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="group p-10 rounded-3xl bg-black border border-white/5 hover:border-[#ee3425] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(238,52,37,0.2)] flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center text-[#ee3425] text-2xl mb-6 group-hover:bg-[#ee3425] group-hover:text-white transition-all duration-300 border border-white/5">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{f.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
