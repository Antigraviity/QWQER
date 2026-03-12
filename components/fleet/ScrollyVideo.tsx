"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollyVideoProps {
    folderPath: string;
    frameCount: number;
    filePrefix: string;
    fileExtension: string;
    startIndex?: number;
    padLength?: number;
    className?: string;
    children?: ReactNode;
}

export default function ScrollyVideo({
    folderPath,
    frameCount,
    filePrefix,
    fileExtension,
    startIndex = 0,
    padLength = 2,
    className = "",
    children
}: ScrollyVideoProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        const container = containerRef.current;
        if (!canvas || !context || !container) return;

        // Create an array to hold all the image objects
        const images: HTMLImageElement[] = [];
        const airpods = { frame: 0 };

        // Helper to format the frame number
        const currentFrame = (index: number) => {
            const paddedNumber = index.toString().padStart(padLength, '0');
            return `${folderPath}/${filePrefix}${paddedNumber}.${fileExtension}`;
        };

        // Preload all images
        for (let i = startIndex; i < frameCount + startIndex; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        // Draw the very first frame as soon as it loads
        images[0].onload = () => {
            render();
        };

        // Render function to draw the current frame maintaining aspect ratio
        function render() {
            if (!canvas || !context) return;

            // Set canvas resolution to match its display size or window size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const img = images[airpods.frame];
            if (!img || !img.complete) return;

            // Calculate scaling to "contain" or "cover" the image
            // We use standard "cover" math so there are no black borders
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio); // Max for cover, Min for contain

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        }

        // Setup the GSAP timeline with ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top", // When the top of the container hits the top of the viewport
                end: "+=2500",   // Scroll distance for the animation
                scrub: 1,      // Smooth scrubbing
                pin: true,       // Pin the container in place while scrolling
                anticipatePin: 1,
            }
        });

        // Add the frame update to the timeline timeline
        tl.to(airpods, {
            frame: frameCount - 1,
            snap: "frame", // Ensure it snaps to whole integers
            ease: "none",
            onUpdate: render // Trigger render explicitly on update ensures smoothness
        });

        // Handle window resize gracefully
        window.addEventListener("resize", render);

        return () => {
            tl.kill();
            ScrollTrigger.getById(container.id)?.kill();
            window.removeEventListener("resize", render);
        };
    }, [folderPath, frameCount, filePrefix, fileExtension, padLength, startIndex]);

    return (
        <div ref={containerRef} className={`relative w-full h-screen overflow-hidden ${className}`}>
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-[100dvh] pointer-events-none z-0 opacity-50 mix-blend-screen" />
            <div className="relative z-10 w-full h-full flex flex-col justify-center">
                {children}
            </div>
        </div>
    );
}
