"use client";

import { useEffect, useRef, useState } from "react";
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
    }, []);

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

    const renderFrame = (index: number) => {
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
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        renderFrame(latest);
    });

    useEffect(() => {
        if (!imagesLoaded) return;
        const handleResize = () => renderFrame(frameIndex.get());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [imagesLoaded, frameIndex]);

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

                {/* Overlay Text Content */}
                <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center pointer-events-none px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-outfit text-white leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-tight">
                            Delivering Your Promises, <br />
                            <span className="text-[#ee3425]">On Time, Every Time.</span>
                        </h2>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
