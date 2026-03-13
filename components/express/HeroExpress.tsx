"use client";
import NextImage from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import gsap from "gsap";

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

    // Fade to black right at the end of scroll (last 8%)
    const fadeOpacity = useTransform(scrollYProgress, [0.92, 1], [0, 1]);

    // Text appears after scrolling ~20% and fades out by ~55%
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0.2, 0.3], [40, 0]);

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
        <section ref={containerRef} className="relative w-full h-[200vh] bg-black">
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

            </div>
        </section>
    );
}
