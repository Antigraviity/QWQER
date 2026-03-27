"use client";
import NextImage from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import gsap from "gsap";

const FRAME_COUNT = 192;
const FOLDER_PATH = "/express-hero-sequence";
const FILE_PREFIX = "Frame";
const FILE_EXTENSION = "webp";

export default function HeroExpress() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            const paddedNumber = i.toString().padStart(3, "0");
            img.src = `${FOLDER_PATH}/${FILE_PREFIX}${paddedNumber}.${FILE_EXTENSION}`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    imagesRef.current = images;
                    setImagesLoaded(true);
                    renderFrame(0, images);
                }
            };
            images.push(img);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Frames span the full scroll range
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Fade to black at ~75% of scroll (to leave room for end content)
    const fadeOpacity = useTransform(scrollYProgress, [0.68, 0.76], [0, 1]);

    // Text appears after scrolling ~20% and fades out by ~55%
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0.2, 0.3], [40, 0]);

    // End content — scooter pulls the whole content block from right to center
    // The entire assembly (scooter + content) starts off-screen right and slides to center
    const assemblyX = useTransform(scrollYProgress, [0.76, 0.92], ["100vw", "0vw"]);
    const assemblyOpacity = useTransform(scrollYProgress, [0.76, 0.80], [0, 1]);

    // Background elements fade in
    const bgElementsOpacity = useTransform(scrollYProgress, [0.78, 0.86], [0, 1]);

    // Letter-by-letter reveal (like About hero)
    const textRevealDone = useRef(false);
    const headlineRef = useRef<HTMLHeadingElement>(null);

    const triggerTextReveal = useCallback(() => {
        if (textRevealDone.current || !headlineRef.current) return;
        textRevealDone.current = true;

        const lines = headlineRef.current.querySelectorAll(".eh-line");
        lines.forEach((line) => {
            const el = line as HTMLElement;
            const text = el.textContent || "";
            el.textContent = "";
            text.split("").forEach((char) => {
                const span = document.createElement("span");
                span.textContent = char;
                span.style.display = "inline-block";
                span.style.opacity = "0.08";
                span.classList.add("eh-char");
                if (char === " ") span.style.width = "0.3em";
                el.appendChild(span);
            });
        });

        gsap.to(".eh-char", {
            opacity: 1,
            duration: 0.05,
            stagger: 0.03,
            ease: "none",
        });
    }, []);

    // Trigger reveal when text becomes visible (scrollYProgress ~0.25)
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest >= 0.22 && !textRevealDone.current) {
            triggerTextReveal();
        }
    });

    const renderFrame = (index: number, images?: HTMLImageElement[]) => {
        const imgs = images || imagesRef.current;
        if (!imgs.length) return;
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;

        const frame = Math.round(index);
        const img = imgs[frame];
        if (!img || !img.complete) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Cover behaviour
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const shiftX = (canvas.width - img.width * ratio) / 2;
        const shiftY = (canvas.height - img.height * ratio) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            img,
            0, 0, img.width, img.height,
            shiftX, shiftY, img.width * ratio, img.height * ratio
        );
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        renderFrame(latest);
    });

    useEffect(() => {
        if (!imagesLoaded) return;
        const handleResize = () => renderFrame(frameIndex.get());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imagesLoaded, frameIndex]);

    return (
        <section ref={containerRef} className="relative w-full h-[400vh] bg-black">
            {/* Sticky viewport */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

                {/* Static first frame — always present as fallback behind canvas */}
                <NextImage
                    src={`${FOLDER_PATH}/${FILE_PREFIX}000.${FILE_EXTENSION}`}
                    alt=""
                    fill
                    priority
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ zIndex: -1 }}
                />

                {/* Canvas — scrollytelling frames */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none z-0 object-cover"
                />

                {/* Black fade overlay at end of sequence */}
                <motion.div
                    className="absolute inset-0 z-[1] bg-black pointer-events-none"
                    style={{ opacity: fadeOpacity }}
                />

                {/* Dark gradient overlay for text readability */}
                <motion.div
                    className="absolute inset-0 z-[1] pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
                    {/* Left-to-right gradient */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 65%, transparent 80%)" }} />
                    {/* Bottom-to-top gradient */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, transparent 60%)" }} />
                </motion.div>

                {/* Ambient glow accents */}
                <div className="absolute inset-0 z-[2] pointer-events-none mix-blend-screen">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[800px] bg-violet-600/10 blur-[150px] rounded-full" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/8 blur-[120px] rounded-full" />
                </div>

                {/* Foreground text content — hidden by default, appears on scroll */}
                <motion.div
                    className="relative z-[3] max-w-7xl mx-auto flex flex-col items-start justify-center w-full px-6 md:px-16 h-full pt-24"
                    style={{ opacity: textOpacity }}
                >
                    <motion.div
                        style={{ y: textY }}
                        className="max-w-xl md:max-w-2xl space-y-6"
                    >
                        <h1 ref={headlineRef} className="text-4xl md:text-[60px] font-bold leading-tight text-white drop-shadow-2xl">
                            <span className="eh-line block">Hyperlocal Delivery</span>
                            <span className="eh-line block">That Scales</span>
                            <span className="eh-line block text-[#7c3aed]">Business</span>
                            <span className="eh-line block text-[#7c3aed]">Fulfilment.</span>
                        </h1>
                        <p className="eh-sub text-base md:text-lg text-white/70 max-w-xl drop-shadow-md">
                            From hub-to-store movement to store-to-customer fulfilment, QWQER Express enables city-wide delivery operations for growing businesses.
                        </p>
                    </motion.div>
                </motion.div>

                {/* ── Express delivery animated background (appears on fade-to-black) ── */}
                <motion.div
                    className="absolute inset-0 z-[3] pointer-events-none overflow-hidden"
                    style={{ opacity: bgElementsOpacity }}
                >
                    {/* Animated route network SVG */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="exRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="exRouteGradV" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="url(#exRouteGrad)" strokeWidth="1" strokeDasharray="8 12" className="animate-[dashMove_20s_linear_infinite]" />
                        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="url(#exRouteGrad)" strokeWidth="1" strokeDasharray="8 12" className="animate-[dashMove_25s_linear_infinite_reverse]" />
                        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="url(#exRouteGradV)" strokeWidth="1" strokeDasharray="6 14" className="animate-[dashMoveV_18s_linear_infinite]" />
                        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="url(#exRouteGradV)" strokeWidth="1" strokeDasharray="6 14" className="animate-[dashMoveV_22s_linear_infinite_reverse]" />
                        <line x1="5%" y1="85%" x2="95%" y2="15%" stroke="url(#exRouteGrad)" strokeWidth="1" strokeDasharray="10 16" opacity="0.4" className="animate-[dashMove_30s_linear_infinite]" />
                    </svg>

                    {/* Pulsing city nodes */}
                    {[
                        { x: "12%", y: "30%", delay: 0, size: 6 },
                        { x: "20%", y: "25%", delay: 0.5, size: 8 },
                        { x: "35%", y: "70%", delay: 1.0, size: 6 },
                        { x: "65%", y: "68%", delay: 1.5, size: 7 },
                        { x: "80%", y: "25%", delay: 0.8, size: 8 },
                        { x: "88%", y: "72%", delay: 1.2, size: 6 },
                        { x: "50%", y: "20%", delay: 0.3, size: 5 },
                        { x: "45%", y: "82%", delay: 1.8, size: 5 },
                    ].map((node, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{ left: node.x, top: node.y, animationDelay: `${node.delay}s` }}
                        >
                            <div
                                className="rounded-full bg-[#7c3aed] animate-[nodePulse_3s_ease-in-out_infinite]"
                                style={{
                                    width: node.size,
                                    height: node.size,
                                    boxShadow: "0 0 12px rgba(124,58,237,0.6), 0 0 24px rgba(124,58,237,0.2)",
                                    animationDelay: `${node.delay}s`,
                                }}
                            />
                            <div
                                className="absolute rounded-full border border-[#7c3aed]/30 animate-[ringExpand_3s_ease-out_infinite]"
                                style={{
                                    width: node.size * 3,
                                    height: node.size * 3,
                                    top: -(node.size),
                                    left: -(node.size),
                                    animationDelay: `${node.delay}s`,
                                }}
                            />
                        </div>
                    ))}

                    {/* Floating package icons */}
                    {[
                        { x: "8%", y: "55%", delay: 0, dur: 4 },
                        { x: "92%", y: "40%", delay: 1.5, dur: 5 },
                        { x: "75%", y: "85%", delay: 2.5, dur: 3.5 },
                    ].map((pkg, i) => (
                        <div
                            key={`pkg-${i}`}
                            className="absolute animate-[floatY_4s_ease-in-out_infinite]"
                            style={{ left: pkg.x, top: pkg.y, animationDuration: `${pkg.dur}s`, animationDelay: `${pkg.delay}s` }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" opacity="0.25">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                        </div>
                    ))}
                </motion.div>

                {/* Keyframes for express animations */}
                <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes dashMove {
                        from { stroke-dashoffset: 0; }
                        to { stroke-dashoffset: -200; }
                    }
                    @keyframes dashMoveV {
                        from { stroke-dashoffset: 0; }
                        to { stroke-dashoffset: -200; }
                    }
                    @keyframes nodePulse {
                        0%, 100% { opacity: 0.5; transform: scale(1); }
                        50% { opacity: 1; transform: scale(1.4); }
                    }
                    @keyframes ringExpand {
                        0% { opacity: 0.6; transform: scale(0.5); }
                        100% { opacity: 0; transform: scale(2); }
                    }
                    @keyframes riderOnLine {
                        0% { transform: translateX(calc(100% + 10px)); opacity: 0; }
                        5% { opacity: 1; }
                        85% { opacity: 1; }
                        95% { opacity: 0; }
                        100% { transform: translateX(-50px); opacity: 0; }
                    }
                    @keyframes floatY {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-12px); }
                    }
                ` }} />

                {/* End content — scooter pulls entire content block from right */}
                <div className="absolute inset-0 z-[5] flex items-center justify-center overflow-hidden">
                    <motion.div
                        className="flex items-center gap-8 md:gap-12"
                        style={{
                            x: assemblyX,
                            opacity: assemblyOpacity,
                        }}
                    >
                        {/* Scooter leading the content — aligned to divider line */}
                        <div className="shrink-0 relative self-end mb-[68px]">
                            {/* Glow behind scooter */}
                            <div className="absolute -top-4 -left-4 w-28 h-20 rounded-full blur-xl" style={{ backgroundColor: "rgba(124,58,237,0.3)" }} />
                            <svg width="80" height="50" viewBox="0 0 48 28" fill="none" className="relative z-10" style={{ transform: "scaleX(-1)" }}>
                                {/* Delivery box */}
                                <rect x="0" y="4" width="16" height="12" rx="2" fill="#7c3aed" />
                                <rect x="2" y="6" width="12" height="2.5" rx="1" fill="white" opacity="0.15" />
                                <rect x="2" y="10" width="12" height="2.5" rx="1" fill="white" opacity="0.1" />
                                {/* Rider body */}
                                <rect x="18" y="2" width="8" height="14" rx="3" fill="#6d28d9" />
                                {/* Rider head / helmet */}
                                <circle cx="22" cy="0" r="4" fill="#7c3aed" />
                                <rect x="18.5" y="-1" width="7" height="2" rx="1" fill="#6d28d9" />
                                {/* Scooter body / platform */}
                                <path d="M16 16L32 16L36 20L12 20Z" fill="#9333ea" />
                                {/* Front fork + handlebar */}
                                <line x1="34" y1="10" x2="36" y2="18" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
                                <line x1="33" y1="8" x2="38" y2="8" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
                                {/* Rear wheel */}
                                <circle cx="14" cy="22" r="4" fill="#1e1b4b" />
                                <circle cx="14" cy="22" r="2" fill="#334155" />
                                {/* Front wheel */}
                                <circle cx="36" cy="22" r="4" fill="#1e1b4b" />
                                <circle cx="36" cy="22" r="2" fill="#334155" />
                                {/* Headlight */}
                                <rect x="38" y="16" width="4" height="3" rx="1" fill="#c4b5fd" opacity="0.7" />
                            </svg>
                        </div>

                        {/* Content block — pulled by scooter */}
                        <div className="text-left max-w-xl md:max-w-2xl space-y-4">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] font-outfit text-white tracking-tight">
                                <span className="block drop-shadow-[0_0_30px_rgba(124,58,237,0.15)]">
                                    Speed-First
                                </span>
                                <span className="block">
                                    <span className="text-[#7c3aed] drop-shadow-[0_0_40px_rgba(124,58,237,0.3)]">Last-Mile Delivery </span>
                                </span>
                                <span className="block text-purple-300">
                                    Solutions.
                                </span>
                            </h2>

                            {/* Decorative line */}
                            <div className="w-full max-w-md">
                                <div className="h-[2px] rounded-full bg-gradient-to-r from-[#7c3aed] via-[#7c3aed]/50 to-transparent" />
                            </div>

                            <p className="text-sm md:text-base text-white/60 max-w-md font-inter leading-relaxed">
                                Hyperlocal pickup and delivery that keeps your customers happy with fast, reliable, and trackable fulfilment across the city.
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
