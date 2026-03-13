"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 55;
const FOLDER_PATH = "/Sequence 1";
const FILE_PREFIX = "Sequence";
const FILE_EXTENSION = "jpg";

export default function HeroScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // We keep a simple array of images once loaded
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Set up Scroll Tracking using Framer Motion
    const { scrollYProgress } = useScroll({
        target: containerRef,
        // Map progress from when container top hits viewport top,
        // until container bottom hits viewport bottom.
        offset: ["start start", "end end"]
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Fade the video to black over the last 5 frames (from frame 49 to 54)
    const fadeOpacity = useTransform(frameIndex, [FRAME_COUNT - 6, FRAME_COUNT - 1], [0, 1]);

    const renderFrame = useCallback((index: number) => {
        if (!imagesLoaded) return;
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;

        const frame = Math.round(index);
        const img = imagesRef.current[frame];
        if (!img || !img.complete) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Calculate aspect ratio for "cover" behavior
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            img,
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
    }, [imagesLoaded]);

    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            const paddedNumber = i.toString().padStart(2, '0');
            img.src = `${FOLDER_PATH}/${FILE_PREFIX}${paddedNumber}.${FILE_EXTENSION}`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    imagesRef.current = images;
                    setImagesLoaded(true);
                    // Trigger first render
                    renderFrame(0);
                }
            };
            images.push(img);
        }
    }, [renderFrame]);

    useMotionValueEvent(frameIndex, "change", (latest) => {
        renderFrame(latest);
    });

    useEffect(() => {
        if (!imagesLoaded) return;
        const handleResize = () => renderFrame(frameIndex.get());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [imagesLoaded, frameIndex, renderFrame]);

    // Content appears only on the fade-to-black screen
    const contentOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.85, 0.95], [30, 0]);
    const contentScale = useTransform(scrollYProgress, [0.85, 0.95], [0.92, 1]);

    // Staggered line animations
    const line1Opacity = useTransform(scrollYProgress, [0.84, 0.90], [0, 1]);
    const line1Y = useTransform(scrollYProgress, [0.84, 0.90], [50, 0]);
    const line2Opacity = useTransform(scrollYProgress, [0.87, 0.93], [0, 1]);
    const line2Y = useTransform(scrollYProgress, [0.87, 0.93], [50, 0]);
    const line3Opacity = useTransform(scrollYProgress, [0.90, 0.96], [0, 1]);
    const line3Y = useTransform(scrollYProgress, [0.90, 0.96], [40, 0]);
    const line3Blur = useTransform(scrollYProgress, [0.90, 0.96], [8, 0]);

    // Subtitle blur as a motion template
    const line3BlurFilter = useTransform(line3Blur, (v) => `blur(${v}px)`);
    const lineWidth = useTransform(scrollYProgress, [0.88, 0.96], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="relative w-full h-[400vh] bg-black">
            {/* Sticky container that stays pinned while scrolling down the 400vh parent */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

                {/* Canvas for scrollytelling images */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none z-0 object-cover"
                />

                {/* Black Fade Overlay for the end of the sequence */}
                <motion.div
                    className="absolute inset-0 z-[1] bg-black pointer-events-none"
                    style={{ opacity: fadeOpacity }}
                />

                {/* Ambient Glows overlaying the canvas */}
                <div className="absolute inset-0 z-[2] pointer-events-none mix-blend-screen">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full" />
                </div>

                {/* ── Fleet logistics animated background ── */}
                <motion.div
                    className="absolute inset-0 z-[3] pointer-events-none overflow-hidden"
                    style={{ opacity: contentOpacity }}
                >
                    {/* Animated route network SVG */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="routeGradV" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* Horizontal route lines */}
                        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="url(#routeGrad)" strokeWidth="1" strokeDasharray="8 12" className="animate-[dashMove_20s_linear_infinite]" />
                        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="url(#routeGrad)" strokeWidth="1" strokeDasharray="8 12" className="animate-[dashMove_25s_linear_infinite_reverse]" />
                        {/* Vertical route lines */}
                        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="url(#routeGradV)" strokeWidth="1" strokeDasharray="6 14" className="animate-[dashMoveV_18s_linear_infinite]" />
                        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="url(#routeGradV)" strokeWidth="1" strokeDasharray="6 14" className="animate-[dashMoveV_22s_linear_infinite_reverse]" />
                        {/* Diagonal route */}
                        <line x1="5%" y1="85%" x2="95%" y2="15%" stroke="url(#routeGrad)" strokeWidth="1" strokeDasharray="10 16" opacity="0.4" className="animate-[dashMove_30s_linear_infinite]" />
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
                                className="rounded-full bg-[#3b82f6] animate-[nodePulse_3s_ease-in-out_infinite]"
                                style={{
                                    width: node.size,
                                    height: node.size,
                                    boxShadow: "0 0 12px rgba(59,130,246,0.6), 0 0 24px rgba(59,130,246,0.2)",
                                    animationDelay: `${node.delay}s`,
                                }}
                            />
                            <div
                                className="absolute rounded-full border border-[#3b82f6]/30 animate-[ringExpand_3s_ease-out_infinite]"
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
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.25">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                        </div>
                    ))}
                </motion.div>

                {/* Keyframes for fleet animations */}
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
                    @keyframes truckOnLine {
                        0% { transform: translateX(calc(100% + 10px)); opacity: 0; }
                        5% { opacity: 1; }
                        85% { opacity: 1; }
                        95% { opacity: 0; }
                        100% { transform: translateX(-50px); opacity: 0; }
                    }
                    @keyframes truckDrive {
                        0% { transform: translateX(-60px); }
                        100% { transform: translateX(calc(100vw + 60px)); }
                    }
                    @keyframes truckDriveReverse {
                        0% { transform: translateX(calc(100vw + 60px)) scaleX(-1); }
                        100% { transform: translateX(-60px) scaleX(-1); }
                    }
                    @keyframes floatY {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-12px); }
                    }
                ` }} />

                {/* Foreground Content — only appears on fade-to-black */}
                <div className="relative z-[5] max-w-7xl mx-auto flex flex-col items-center justify-center w-full px-6 md:px-12 h-full pt-24 text-center">
                    <motion.div
                        style={{ opacity: contentOpacity, scale: contentScale }}
                        className="max-w-xl md:max-w-2xl space-y-6"
                    >
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.25] font-outfit text-white tracking-tight">
                            <motion.span
                                style={{ opacity: line1Opacity, y: line1Y }}
                                className="block drop-shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                            >
                                Execution-Driven
                            </motion.span>
                            <motion.span
                                style={{ opacity: line2Opacity, y: line2Y }}
                                className="block"
                            >
                                <span className="text-[#3b82f6] drop-shadow-[0_0_40px_rgba(59,130,246,0.3)]">Goods Transportation </span>
                                <span className="text-blue-300">Solutions.</span>
                            </motion.span>
                        </h1>

                        {/* Decorative animated line with truck riding on it */}
                        <div className="relative w-full max-w-lg mx-auto">
                            <motion.div
                                style={{ width: lineWidth }}
                                className="h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent"
                            />
                            {/* Truck riding on the divider — right to left */}
                            <motion.div
                                style={{ opacity: line2Opacity }}
                                className="absolute bottom-[-2px] left-0 w-full overflow-hidden"
                            >
                                <div className="animate-[truckOnLine_8s_ease-in-out_infinite]">
                                    <svg width="48" height="30" viewBox="0 0 48 28" fill="none" style={{ transform: "scaleX(-1)" }}>
                                        <rect x="0" y="4" width="30" height="16" rx="3" fill="#3b82f6" />
                                        <rect x="2" y="6" width="26" height="3" rx="1" fill="white" opacity="0.15" />
                                        <rect x="2" y="11" width="26" height="3" rx="1" fill="white" opacity="0.1" />
                                        <path d="M30 10L38 10L42 16L42 20L30 20Z" fill="#2563eb" />
                                        <path d="M31 10.5L37 10.5L40.5 16L31 16Z" fill="white" opacity="0.15" />
                                        <circle cx="10" cy="22" r="4" fill="#1e293b" />
                                        <circle cx="10" cy="22" r="2" fill="#334155" />
                                        <circle cx="36" cy="22" r="4" fill="#1e293b" />
                                        <circle cx="36" cy="22" r="2" fill="#334155" />
                                        <rect x="42" y="14" width="4" height="3" rx="1" fill="#60a5fa" opacity="0.7" />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>

                        <motion.p
                            style={{ opacity: line3Opacity, y: line3Y, filter: line3BlurFilter }}
                            className="text-base md:text-lg text-white/70 max-w-xl mx-auto font-inter"
                        >
                            Robust transportation solutions that keep your business moving securely, sustainably, and cost-effectively.
                        </motion.p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
