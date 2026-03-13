"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { FaExclamationTriangle, FaCity, FaClipboardCheck, FaHandshake } from "react-icons/fa";
import { IconType } from "react-icons";

interface Reason {
    id: number;
    description: string;
    icon: IconType;
}

const reasons: Reason[] = [
    {
        id: 1,
        description:
            "Traditional fleet and goods transport solutions often fail to meet enterprise standards resulting in operational inefficiencies, service disruptions, limited visibility, and increased risk.",
        icon: FaExclamationTriangle,
    },
    {
        id: 2,
        description:
            "QWQER Fleet solves this by delivering an enterprise-grade goods transportation solution built to support complex, high-volume operations.",
        icon: FaCity,
    },
    {
        id: 3,
        description:
            "Our platform combines professionally managed fleets, standardized processes, and performance-driven operations to ensure predictable outcomes, operational control, and seamless scalability.",
        icon: FaClipboardCheck,
    },
    {
        id: 4,
        description:
            "With QWQER Fleet, enterprises gain a transportation partner designed to meet corporate standards today and at scale.",
        icon: FaHandshake,
    },
];

const offsets = [3, 25, 48, 71];
const nodeThresholds = [0, 0.28, 0.6, 0.9];
const CURVE_R = 30; // radius of the rounded corners

/* ------------------------------------------------------------------ */
/*  Reason node                                                       */
/* ------------------------------------------------------------------ */
const ReasonNode = ({
    reason,
    visible,
    iconRef,
}: {
    reason: Reason;
    visible: boolean;
    iconRef: React.RefObject<HTMLDivElement>;
}) => {
    const Icon = reason.icon;
    return (
        <div className="flex items-start gap-5" style={{ position: "relative", zIndex: 2 }}>
            <motion.div
                ref={iconRef}
                className="w-[56px] h-[56px] flex-shrink-0 rounded-full border-2 border-blue-500/60 flex items-center justify-center"
                style={{ backgroundColor: "#000", position: "relative", zIndex: 3 }}
                initial={false}
                animate={
                    visible
                        ? { opacity: 1, scale: 1, boxShadow: "0 0 35px rgba(59,130,246,0.4)" }
                        : { opacity: 0, scale: 0.3, boxShadow: "0 0 0px rgba(59,130,246,0)" }
                }
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <Icon className="text-[20px] text-blue-400" />
            </motion.div>
            <motion.p
                className="text-white/70 text-sm leading-relaxed font-inter max-w-[260px] pt-2"
                initial={false}
                animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
                transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            >
                {reason.description}
            </motion.p>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Mobile node                                                       */
/* ------------------------------------------------------------------ */
const MobileNode = ({ reason, visible }: { reason: Reason; visible: boolean }) => {
    const Icon = reason.icon;
    return (
        <motion.div
            className="flex items-start gap-5"
            initial={false}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <div
                className="w-14 h-14 flex-shrink-0 rounded-full border-2 border-blue-500/60 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.3)] relative z-10"
                style={{ backgroundColor: "#000" }}
            >
                <Icon className="text-lg text-blue-400" />
            </div>
            <p className="text-white/70 text-sm leading-relaxed font-inter pt-2">
                {reason.description}
            </p>
        </motion.div>
    );
};

/* ------------------------------------------------------------------ */
/*  Build SVG path from measured icon centres                         */
/* ------------------------------------------------------------------ */
function buildSnakePath(centres: { x: number; y: number }[]): string {
    if (centres.length < 2) return "";
    const R = CURVE_R;
    const parts: string[] = [`M ${centres[0].x} ${centres[0].y}`];

    for (let i = 0; i < centres.length - 1; i++) {
        const cur = centres[i];
        const nxt = centres[i + 1];
        // Vertical line down from current icon
        const midY = nxt.y - R;
        parts.push(`L ${cur.x} ${midY}`);
        // Rounded corner: curve right
        parts.push(`Q ${cur.x} ${midY + R} ${cur.x + R} ${midY + R}`);
        // Horizontal line to next icon column
        parts.push(`L ${nxt.x - R} ${midY + R}`);
        // Rounded corner: curve down
        parts.push(`Q ${nxt.x} ${midY + R} ${nxt.x} ${midY + R + R}`);
        // Vertical line down to next icon centre
        parts.push(`L ${nxt.x} ${nxt.y}`);
    }
    return parts.join(" ");
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function WhyQwqerFleet() {
    const containerRef = useRef<HTMLDivElement>(null);
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);
    const ref4 = useRef<HTMLDivElement>(null);
    
    // Stable array of refs
    const iconRefs = [ref1, ref2, ref3, ref4];
    
    const [progress, setProgress] = useState(0);
    const [pathD, setPathD] = useState("");
    const [viewBox, setViewBox] = useState("0 0 1000 800");

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 70%", "end 50%"],
    });
    useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

    /* Measure icon positions and build path */
    const measureAndBuild = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();

        const centres = iconRefs.map((ref) => {
            const el = ref.current;
            if (!el) return { x: 0, y: 0 };
            const r = el.getBoundingClientRect();
            return {
                x: r.left - rect.left + r.width / 2,
                y: r.top - rect.top + r.height / 2,
            };
        });

        if (centres.some(c => c.x === 0 && c.y === 0)) return;

        setViewBox(`0 0 ${rect.width} ${rect.height}`);
        setPathD(buildSnakePath(centres));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Measure after first paint + fonts loaded
        const timer = setTimeout(measureAndBuild, 100);
        window.addEventListener("resize", measureAndBuild);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", measureAndBuild);
        };
    }, [measureAndBuild]);

    return (
        <section className="pt-10 pb-8 px-6 md:px-12 bg-black relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[#3b82f6]/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-left mb-16 flex flex-col items-start">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-[48px] font-bold text-white font-outfit tracking-tighter leading-tight"
                    >
                        Why{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-blue-400">
                            QWQER Fleet?
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="text-white/70 mt-6 max-w-2xl text-lg"
                    >
                        Pioneering logistics through technological innovation, safety, and unwavering reliability.
                    </motion.p>
                </div>

                {/* ============ DESKTOP ============ */}
                <div ref={containerRef} className="hidden md:block relative">
                    {/* SVG snake — draws on scroll, perfectly through icon centres */}
                    {pathD && (
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            viewBox={viewBox}
                            fill="none"
                            style={{ zIndex: 1 }}
                        >
                            <defs>
                                <linearGradient id="snkG" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.5" />
                                </linearGradient>
                            </defs>
                            <path
                                d={pathD}
                                stroke="url(#snkG)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                pathLength={1}
                                strokeDasharray={1}
                                strokeDashoffset={1 - progress}
                                style={{ transition: "stroke-dashoffset 0.03s linear" }}
                            />
                        </svg>
                    )}

                    {/* Content rows */}
                    <div className="relative" style={{ zIndex: 2 }}>
                        {reasons.map((reason, i) => (
                            <div
                                key={reason.id}
                                style={{ paddingLeft: `${offsets[i]}%`, minHeight: 200 }}
                            >
                                <ReasonNode
                                    reason={reason}
                                    visible={progress >= nodeThresholds[i]}
                                    iconRef={iconRefs[i]}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ============ MOBILE ============ */}
                <div className="md:hidden relative">
                    <motion.div
                        className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/40 via-indigo-500/30 to-blue-500/40"
                        style={{ zIndex: 0, transformOrigin: "top" }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    <div className="relative flex flex-col gap-14" style={{ zIndex: 1 }}>
                        {reasons.map((reason, i) => (
                            <MobileNode
                                key={reason.id}
                                reason={reason}
                                visible={progress >= nodeThresholds[i]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
