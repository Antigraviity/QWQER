"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import CustomFleetTruck from "./CustomFleetTruck";
import CustomScooter from "./CustomScooter";

const CitySilhouette = () => (
    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 2400 200">
        <defs>
            <linearGradient id="building-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#475569" /> {/* Slate-600 */}
                <stop offset="100%" stopColor="#1e293b" /> {/* Slate-800 */}
            </linearGradient>
        </defs>
        <path
            fill="url(#building-gradient)"
            d="M0,200 L0,150 L50,150 L50,100 L100,100 L100,180 L150,180 L150,80 L200,80 L200,200 
               M200,200 L200,120 L280,120 L280,60 L350,60 L350,200 
               M350,200 L350,140 L400,140 L400,90 L450,90 L450,160 L500,160 L500,200
               M500,200 L500,100 L580,100 L580,40 L650,40 L650,200
               M650,200 L650,130 L720,130 L720,180 L780,180 L780,200
               M780,200 L780,110 L850,110 L850,50 L920,50 L920,200
               M920,200 L920,160 L980,160 L980,100 L1050,100 L1050,200
               M1050,200 L1050,80 L1120,80 L1120,140 L1200,140 L1200,200 
               M1200,200 L1200,130 L1250,130 L1250,90 L1300,90 L1300,170 L1350,170 L1350,70 L1400,70 L1400,200
               M1400,200 L1400,110 L1480,110 L1480,50 L1550,50 L1550,200
               M1550,200 L1550,135 L1600,135 L1600,85 L1650,85 L1650,155 L1700,155 L1700,200
               M1700,200 L1700,95 L1780,95 L1780,35 L1850,35 L1850,200
               M1850,200 L1850,125 L1920,125 L1920,175 L1980,175 L1980,200
               M1980,200 L1980,105 L2050,105 L2050,45 L2120,45 L2120,200
               M2120,200 L2120,150 L2180,150 L2180,90 L2250,90 L2250,200
               M2250,200 L2250,70 L2320,70 L2320,130 L2400,130 L2400,200 Z"
            className="opacity-80"
        />
    </svg>
);

export default function CityAnimation() {
    const truckRef = useRef<HTMLDivElement>(null);
    const scooterRef = useRef<HTMLDivElement>(null);
    const cityRef = useRef<HTMLDivElement>(null);
    const cityVisualsRef = useRef<HTMLDivElement>(null);
    const scrollingCityRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // City Entrance Animation (Pop up from bottom)
            gsap.from(cityVisualsRef.current, {
                y: "100%",
                duration: 1.5,
                ease: "power3.out",
                delay: 0.2
            });

            // BG Scrolling Animation (Seamless Loop)
            gsap.to(scrollingCityRef.current, {
                x: "-50%", // Move left by half the total width (one full city width)
                duration: 60, // Slow continuous pan
                ease: "none",
                repeat: -1
            });

            // Truck Animation (Right to Left)
            // Movement only - orientation handled by CSS on inner element
            gsap.fromTo(truckRef.current,
                { x: "100vw" },
                {
                    x: "-20vw",
                    duration: 15,
                    repeat: -1,
                    ease: "none",
                    delay: 1
                }
            );

            // Scooter Animation (Left to Right)
            gsap.fromTo(scooterRef.current,
                { x: "-20vw" },
                {
                    x: "100vw",
                    duration: 12,
                    repeat: -1,
                    ease: "none",
                    delay: 1
                }
            );

            // Master Timeline
            const tl = gsap.timeline({
                repeat: -1, // Infinite loop
                defaults: { ease: "none" } // Linear movement
            });

            // Wheel Rotation - Restored GSAP control for better stability
            gsap.to([".truck-wheel", ".scooter-wheel"], {
                rotation: 360,
                duration: 1,
                repeat: -1,
                ease: "none",
                transformOrigin: "center"
            });

        }, cityRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={cityRef} className="absolute bottom-0 left-0 w-full h-96 pointer-events-none overflow-hidden z-0">
            {/* Cityscape Silhouette - Increased Opacity and Lighter Color */}
            <div ref={cityVisualsRef} className="absolute bottom-4 left-0 w-full h-full opacity-100">
                {/* Scrolling Container */}
                <div ref={scrollingCityRef} className="flex h-full w-[200%]">
                    {/* First Copy */}
                    <div className="w-1/2 h-full flex items-end justify-center">
                        <CitySilhouette />
                    </div>
                    {/* Second Copy (Seam) */}
                    <div className="w-1/2 h-full flex items-end justify-center">
                        <CitySilhouette />
                    </div>
                </div>
            </div>

            {/* Vehicles Container - positioned on the "road" */}
            <div className="absolute bottom-4 w-full h-48 pointer-events-none">
                {/* Truck */}
                <div ref={truckRef} className="absolute bottom-0 text-[#ee3425] text-[14rem] leading-none z-10">
                    <div className="scale-x-[-1]"> {/* scale-x-[-1] to flip only, no stress / translate needed due to tight svg */}
                        <CustomFleetTruck />
                    </div>
                </div>

                {/* Scooter */}
                <div ref={scooterRef} className="absolute bottom-0 text-white text-[8rem] leading-none z-10 translate-y-5">
                    <CustomScooter />
                </div>
            </div>
        </div>
    );
}
