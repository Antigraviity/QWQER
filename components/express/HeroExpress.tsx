"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 164;
const FOLDER_PATH = "/Sequence 3";
const FILE_PREFIX = "Sequence";
const FILE_EXTENSION = "jpg";

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
                    renderFrame(0);
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

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Fade to black over the last 10 frames
    const fadeOpacity = useTransform(frameIndex, [FRAME_COUNT - 11, FRAME_COUNT - 1], [0, 1]);

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

                {/* Ambient glow accents */}
                <div className="absolute inset-0 z-[2] pointer-events-none mix-blend-screen">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[800px] bg-red-600/10 blur-[150px] rounded-full" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/8 blur-[120px] rounded-full" />
                </div>

                {/* Foreground text content */}
                <div className="relative z-[3] max-w-7xl mx-auto flex flex-col items-start justify-center w-full px-6 md:px-16 h-full pt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-xl md:max-w-2xl space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white drop-shadow-2xl">
                            Hyperlocal Delivery<br />
                            That Scales{" "}
                            <span className="text-[#ee3425]">Business Fulfilment.</span>
                        </h1>
                        <p className="text-base md:text-lg text-gray-300 max-w-xl drop-shadow-md">
                            Free up the hassle and resources by allowing the customer's full-scale QWQER Express model to manage end-to-end delivery operations for a glowing business.
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
