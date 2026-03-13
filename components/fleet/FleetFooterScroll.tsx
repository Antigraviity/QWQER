"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 52;
const FOLDER_PATH = "/Sequence 2";
const FILE_PREFIX = "Sequence ";
const FILE_EXTENSION = "jpg";

export default function FleetFooterScroll() {
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

    // Fade the video in from black over the first 3 frames (from frame 0 to 3)
    const fadeOpacity = useTransform(frameIndex, [0, 3], [1, 0]);

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

    return (
        <section ref={containerRef} className="relative w-full h-[400vh] bg-black">
            {/* Sticky container that stays pinned while scrolling down the 400vh parent */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                {/* Canvas for scrollytelling images */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none z-0 object-cover"
                />

                {/* Fade from black in the first 3 frames */}
                <motion.div
                    className="absolute inset-0 z-[1] bg-black pointer-events-none"
                    style={{ opacity: fadeOpacity }}
                />

                {/* Animated logistics floating elements — fade out when images appear */}
                <motion.div
                    className="absolute inset-0 z-[2] pointer-events-none overflow-hidden"
                    style={{ opacity: fadeOpacity }}
                >
                    {/* Large floating package boxes */}
                    {[
                        { left: "6%", top: "18%", size: 52, delay: 0, dur: 4 },
                        { left: "88%", top: "12%", size: 44, delay: 1.5, dur: 5 },
                        { left: "78%", top: "68%", size: 48, delay: 0.8, dur: 4.5 },
                        { left: "12%", top: "72%", size: 38, delay: 2, dur: 3.5 },
                        { left: "48%", top: "8%", size: 36, delay: 0.5, dur: 5.5 },
                        { left: "93%", top: "42%", size: 40, delay: 1, dur: 4.2 },
                        { left: "3%", top: "45%", size: 34, delay: 0.3, dur: 4.8 },
                    ].map((box, i) => (
                        <motion.div
                            key={`box-${i}`}
                            className="absolute text-[#3b82f6]"
                            style={{ left: box.left, top: box.top }}
                            animate={{
                                y: [0, -25, 0],
                                rotate: [0, 8, -8, 0],
                                opacity: [0.25, 0.55, 0.25],
                            }}
                            transition={{ duration: box.dur, repeat: Infinity, ease: "easeInOut", delay: box.delay }}
                        >
                            <svg width={box.size} height={box.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                        </motion.div>
                    ))}

                    {/* Floating location pins */}
                    {[
                        { left: "22%", top: "22%", size: 38, delay: 0.3, dur: 3.5 },
                        { left: "68%", top: "15%", size: 34, delay: 1.2, dur: 4 },
                        { left: "38%", top: "75%", size: 36, delay: 0.7, dur: 4.5 },
                        { left: "82%", top: "78%", size: 32, delay: 2.5, dur: 3.8 },
                        { left: "55%", top: "80%", size: 30, delay: 1.8, dur: 4.2 },
                    ].map((pin, i) => (
                        <motion.div
                            key={`pin-${i}`}
                            className="absolute text-[#3b82f6]"
                            style={{ left: pin.left, top: pin.top }}
                            animate={{
                                y: [0, -18, 0],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{ duration: pin.dur, repeat: Infinity, ease: "easeInOut", delay: pin.delay }}
                        >
                            <svg width={pin.size} height={pin.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        </motion.div>
                    ))}

                    {/* Truck traveling on the curved route line */}
                    <div className="absolute inset-0">
                        <div
                            className="animate-truck-on-path text-[#3b82f6]"
                            style={{
                                offsetPath: "path('M -50 480 Q 200 400 400 460 Q 575 520 750 430 Q 925 340 1100 470 Q 1275 600 1500 420')",
                                offsetRotate: "auto",
                                position: "absolute",
                            }}
                        >
                            <svg width="56" height="34" viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="0" y="6" width="30" height="18" rx="2" />
                                <path d="M30 12H40L46 18V24H30V12Z" strokeLinejoin="round" />
                                <circle cx="10" cy="26" r="3" />
                                <circle cx="38" cy="26" r="3" />
                            </svg>
                        </div>
                    </div>

                    {/* Pulsing glow orbs */}
                    {[
                        { left: "15%", top: "40%", size: 120 },
                        { left: "72%", top: "30%", size: 140 },
                        { left: "42%", top: "65%", size: 100 },
                        { left: "88%", top: "55%", size: 90 },
                    ].map((glow, i) => (
                        <motion.div
                            key={`glow-${i}`}
                            className="absolute rounded-full bg-[#3b82f6] blur-[50px]"
                            style={{ left: glow.left, top: glow.top, width: glow.size, height: glow.size }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.04, 0.1, 0.04] }}
                            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 1.2 }}
                        />
                    ))}

                    {/* Wavy dashed route line — same path as truck */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
                        <motion.path
                            d="M -50 480 Q 200 400 400 460 Q 575 520 750 430 Q 925 340 1100 470 Q 1275 600 1500 420"
                            stroke="rgba(59,130,246,0.25)"
                            strokeWidth="2"
                            strokeDasharray="10 6"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
                        />
                        <motion.path
                            d="M -50 520 Q 300 580 500 530 Q 700 480 900 560 Q 1050 620 1200 510 Q 1350 400 1500 550"
                            stroke="rgba(59,130,246,0.12)"
                            strokeWidth="1.5"
                            strokeDasharray="6 8"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 3.5, ease: "easeOut", delay: 1 }}
                        />
                    </svg>

                    {/* Truck animation keyframes */}
                    <style>{`
                        @keyframes truckOnPath {
                            0% { offset-distance: 0%; opacity: 0; }
                            3% { opacity: 0.6; }
                            92% { opacity: 0.6; }
                            100% { offset-distance: 100%; opacity: 0; }
                        }
                        .animate-truck-on-path {
                            animation: truckOnPath 8s linear infinite;
                        }
                    `}</style>
                </motion.div>

                {/* Overlay Text Content — fades out with images */}
                <motion.div
                    className="absolute inset-0 z-[3] flex flex-col items-center justify-center pointer-events-none px-6"
                    style={{ opacity: fadeOpacity }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-outfit text-white leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-tight">
                            Delivering Your Promises, <br />
                            <span className="text-[#3b82f6]">On Time, Every Time.</span>
                        </h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-white/50 mt-6 text-lg font-inter max-w-xl mx-auto"
                        >
                            Enterprise-grade goods transportation built for scale, speed, and reliability.
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
