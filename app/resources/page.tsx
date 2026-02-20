"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ResourcesPage() {
    const gridRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const floatingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 3D Grid Animation
        if (gridRef.current) {
            gsap.to(gridRef.current, {
                backgroundPosition: "0 100px",
                duration: 2,
                repeat: -1,
                ease: "linear"
            });
        }

        // Floating Elements Mouse Parallax
        const handleMouseMove = (e: MouseEvent) => {
            if (!floatingRef.current) return;
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;

            gsap.to(floatingRef.current, {
                x: x,
                y: y,
                duration: 1,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#ee3425] selection:text-white relative font-sans overflow-x-hidden">
            <Navbar />

            {/* CREATIVE HERO SECTION: Digital Horizon */}
            <section ref={heroRef} className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center overflow-hidden perspective-1000">

                {/* 1. Background Gradient Sky */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#110505] to-[#220a0a] z-0"></div>

                {/* 2. 3D Moving Grid Floor */}
                <div
                    ref={gridRef}
                    className="absolute bottom-0 w-[200%] h-[100%] left-[-50%] z-0 text-[#ee3425]/30"
                    style={{
                        transform: "rotateX(60deg) translateY(0) translateZ(0)",
                        backgroundImage: `
                    linear-gradient(to right, currentColor 1px, transparent 1px),
                    linear-gradient(to bottom, currentColor 1px, transparent 1px)
                `,
                        backgroundSize: "100px 100px",
                        maskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)" // For Safari
                    }}
                ></div>

                {/* 3. Floating Particles (Optional CSS blobs) */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
                    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#ee3425] rounded-full animate-bounce shadow-[0_0_10px_#ee3425]"></div>
                    <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping"></div>
                </div>


                {/* 4. Main Content Container (Floating) */}
                <div ref={floatingRef} className="relative z-10 text-center px-6 max-w-5xl">

                    {/* Glowing Tag */}
                    <div className="inline-block mb-6 relative group cursor-default">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#ee3425] to-orange-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative px-8 py-2 bg-black border border-[#ee3425]/50 rounded-full leading-none flex items-center">
                            <span className="text-gray-300 text-sm font-medium tracking-widest uppercase">Knowledge Hub</span>
                        </div>
                    </div>

                    {/* Main Title with Gradient Text */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 neon-text-shadow">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">
                            RESOURCES
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        Explore insights, guides, and industry trends to fuel your logistics strategy.
                    </p>

                    {/* Scroll Indicator */}
                    <div className="animate-bounce mt-10">
                        <FaArrowRight className="text-white/50 rotate-90 text-2xl mx-auto" />
                    </div>

                </div>

                {/* CSS for Neon Text Shadow (Inline for simplicity or add to globals.css) */}
                <style jsx global>{`
            .neon-text-shadow {
                text-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
            }
            .perspective-1000 {
                perspective: 1000px;
            }
        `}</style>

            </section>

            {/* "What are you looking for?" Section */}
            <section className="w-full py-20 relative z-10 bg-black">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 flex items-center gap-4">
                        <span className="w-2 h-12 bg-[#ee3425] rounded-full inline-block shadow-[0_0_15px_#ee3425]"></span>
                        What are you looking for?
                    </h2>

                    <div className="flex flex-col md:flex-row items-start gap-12">

                        {/* Links List */}
                        <div className="w-full md:w-1/3 flex flex-col gap-6">
                            <Link href="/blog" className="group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#ee3425] hover:border-[#ee3425] hover:shadow-[0_0_20px_rgba(238,52,37,0.4)] transition-all duration-300 transform hover:-translate-y-1">
                                <span className="text-xl font-medium text-white group-hover:text-white">Blogs</span>
                                <FaArrowRight className="text-white transform group-hover:translate-x-2 transition-transform" />
                            </Link>
                            {/* Placeholder for other links */}
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 opacity-50 cursor-not-allowed">
                                <span className="text-xl font-medium text-gray-400">Case Studies (Coming Soon)</span>
                            </div>
                        </div>

                        {/* Featured Content Card */}
                        <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Card 1 */}
                            <Link href="/blog/hyperlocal-delivery-rise" className="group block bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 hover:border-[#ee3425] hover:shadow-[0_0_30px_rgba(238,52,37,0.2)] transition-all duration-500">
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=60"
                                        alt="Blog Thumbnail"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 p-2 rounded-full">
                                        <Image src="/icon.webp" width={20} height={20} alt="QWP Icon" />
                                    </div>

                                    <div className="absolute bottom-4 left-4">
                                        <span className="text-xs bg-[#ee3425] text-white px-3 py-1 rounded-full font-medium shadow-[0_0_10px_#ee3425]">Logistics</span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#ee3425] transition-colors line-clamp-2 leading-tight">
                                        The Rise of Hyperlocal Delivery in India
                                    </h3>
                                    <div className="flex justify-between items-center mt-6 border-t border-white/10 pt-4">
                                        <span className="text-sm text-gray-400">Feb 18, 2026</span>
                                        <div className="flex items-center text-[#ee3425] text-sm font-bold gap-2 group-hover:gap-3 transition-all">
                                            Read Article <FaArrowRight />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
