"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProgress() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const anim = gsap.fromTo(ref.current,
            { scaleX: 0 },
            {
                scaleX: 1,
                transformOrigin: "left",
                ease: "none",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0,
                }
            }
        );
        return () => {
            anim.kill();
        };
    }, []);
    return <div ref={ref} className="fixed top-0 left-0 w-full h-[3px] bg-[#ee3425] z-[100] scale-x-0" />;
}
