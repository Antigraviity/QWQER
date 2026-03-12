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
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[800px] bg-red-600/10 blur-[150px] rounded-full" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
                </div>

                {/* Foreground Content over the canvas sequence */}
                <div className="relative z-[3] max-w-7xl mx-auto flex flex-col items-center justify-center w-full px-6 md:px-12 h-full pt-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-xl md:max-w-2xl space-y-6"
                    >
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.25] font-outfit text-white tracking-tight drop-shadow-2xl">
                            Execution-Driven<br />
                            <span className="text-[#ee3425]">Goods Transportation </span><span className="text-blue-500">Solutions.</span>
                        </h1>
                        <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto font-inter drop-shadow-md">
                            Robust transportation solutions that keep your business moving securely, sustainably, and cost-effectively.
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
