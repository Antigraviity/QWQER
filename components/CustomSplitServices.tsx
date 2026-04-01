"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { HiOutlineLightningBolt, HiOutlineTruck } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";


/* ───────────────── subtle floating motes ───────────────── */
function FloatingMotes() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="mote absolute rounded-full"
                    style={{
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        background: "rgba(238, 52, 37, 0.3)",
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.2 + 0.05,
                    }}
                />
            ))}
        </div>
    );
}

/* ───────────────── zigzag path connector SVG ───────────────── */
function ZigzagConnector() {
    return (
        <div className="hidden lg:flex justify-center items-center py-1 relative zigzag-connector" style={{ opacity: 0 }}>
            <svg width="160" height="40" viewBox="0 0 200 80" fill="none" className="overflow-visible">
                <path
                    d="M100 0 L100 15 Q100 25 110 30 L140 45 Q150 50 150 60 L150 80"
                    stroke="url(#zigzag-grad)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="zigzag-path"
                />
                <circle cx="100" cy="0" r="3" fill="rgba(108,58,224,0.4)" />
                <circle cx="150" cy="80" r="3" fill="rgba(67,85,185,0.4)" />
                <defs>
                    <linearGradient id="zigzag-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(108,58,224,0.3)" />
                        <stop offset="100%" stopColor="rgba(67,85,185,0.2)" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

/* ───────────────── stat component ───────────────── */
function StatBlock({ value, suffix, label, isHovered }: { value: string; suffix: string; label: string; isHovered: boolean }) {
    return (
        <div className="flex flex-col">
            <div className="flex items-baseline gap-0.5">
                <span className={`text-2xl md:text-3xl font-bold tabular-nums transition-colors duration-500 ${isHovered ? "text-white" : "text-white/80"}`}>
                    {value}
                </span>
                <span className={`text-sm font-medium transition-colors duration-500 ${isHovered ? "text-[#ee3425]/70" : "text-white/25"}`}>
                    {suffix}
                </span>
            </div>
            <span className="text-[10px] text-white/20 mt-1 uppercase tracking-widest font-medium">
                {label}
            </span>
        </div>
    );
}

/* ───────────────── service card ───────────────── */
interface CardData {
    id: "express" | "fleet";
    title: string;
    badge: string;
    icon: React.ReactNode;
    accent: string;
    accentRgb: string;
    stats: { value: string; suffix: string; label: string }[];
    features: string[];
    link: string;
    joinLink?: string;
    showJoin: boolean;
}

function ServiceCard({
    card,
    reversed,
    cardRef,
}: {
    card: CardData;
    reversed: boolean;
    cardRef: React.RefObject<HTMLDivElement | null>;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`grid ${reversed ? "lg:grid-cols-[auto_1fr]" : "lg:grid-cols-[1fr_auto]"} gap-6 lg:gap-10 items-center group cursor-default relative py-6 lg:py-8`}
            style={{ opacity: 0 }}
        >
            {/* hover glow — positioned behind entire card */}
            <div
                className="absolute -inset-6 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none blur-3xl -z-10"
                style={{ background: `radial-gradient(ellipse at center, rgba(${card.accentRgb},0.04), transparent 70%)` }}
            />

            {/* ── content side ── */}
            <div className={`relative z-10 ${reversed ? "lg:order-2 lg:text-right" : "lg:order-1"}`}>
                {/* icon + badge row */}
                <div className={`flex items-center gap-3 mb-4 ${reversed ? "lg:justify-end" : ""}`}>
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500"
                        style={{
                            background: isHovered ? `rgba(${card.accentRgb},0.12)` : "rgba(255,255,255,0.04)",
                            border: `1px solid ${isHovered ? `rgba(${card.accentRgb},0.25)` : "rgba(255,255,255,0.06)"}`,
                            color: isHovered ? card.accent : "rgba(255,255,255,0.35)",
                        }}
                    >
                        {card.icon}
                    </div>
                    <span className="text-white/25 text-[11px] font-medium uppercase tracking-[0.15em]">
                        {card.badge}
                    </span>
                </div>

                {/* title */}
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 mb-4 leading-tight tracking-tight">
                    {card.title}
                </h3>

                {/* thin divider */}
                <div
                    className="h-px mb-4 transition-all duration-700"
                    style={{
                        background: isHovered
                            ? `linear-gradient(90deg, transparent, rgba(${card.accentRgb},0.2), transparent)`
                            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                    }}
                />

                {/* features */}
                <ul className={`space-y-2.5 mb-6 ${reversed ? "lg:items-end" : ""}`}>
                    {card.features.map((feat, i) => (
                        <li
                            key={i}
                            className={`feature-item flex items-start gap-3 group/feat ${reversed ? "lg:flex-row-reverse lg:text-right" : ""}`}
                        >
                            <span
                                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                                style={{
                                    background: isHovered ? card.accent : "rgba(255,255,255,0.12)",
                                    boxShadow: isHovered ? `0 0 8px rgba(${card.accentRgb},0.25)` : "none",
                                }}
                            />
                            <span className="text-white/35 text-sm md:text-[15px] leading-relaxed group-hover/feat:text-white/55 transition-colors duration-300">
                                {feat}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* buttons */}
                <div className={`flex items-center gap-3 ${reversed ? "lg:justify-end" : ""}`}>
                    <Link
                        href={card.link}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
                        style={{
                            background: `rgba(${card.accentRgb},0.1)`,
                            color: card.accent,
                            border: `1px solid rgba(${card.accentRgb},0.2)`,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = card.accent; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = card.accent; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = `rgba(${card.accentRgb},0.1)`; e.currentTarget.style.color = card.accent; e.currentTarget.style.borderColor = `rgba(${card.accentRgb},0.2)`; }}
                    >
                        Explore
                        <BsArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {card.showJoin && (
                        <Link
                            href={card.joinLink || "/partner"}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white/35 border border-white/[0.08] hover:text-white/60 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300"
                        >
                            Join Us
                            <BsArrowRight className="w-3.5 h-3.5 opacity-50" />
                        </Link>
                    )}
                </div>
            </div>

            {/* ── visual / icon side ── */}
            <div className={`relative ${reversed ? "lg:order-1 lg:justify-self-start" : "lg:order-2 lg:justify-self-end"} hidden lg:flex items-center justify-center`}>
                <div className="relative w-44 h-44 flex items-center justify-center vehicle-visual">
                    {/* outer ring */}
                    <div
                        className="absolute inset-0 rounded-full transition-all duration-700"
                        style={{
                            border: `1px solid ${isHovered ? `rgba(${card.accentRgb},0.15)` : "rgba(255,255,255,0.04)"}`,
                        }}
                    />
                    {/* rotating dash ring */}
                    <div
                        className="absolute inset-3 rounded-full orbit-ring transition-opacity duration-700"
                        style={{
                            border: `1px dashed ${isHovered ? `rgba(${card.accentRgb},0.1)` : "rgba(255,255,255,0.03)"}`,
                        }}
                    />
                    {/* vehicle icon */}
                    <div className="relative z-10 transition-all duration-500" style={{ opacity: isHovered ? 0.9 : 0.15 }}>
                        {card.id === "express" ? (
                            <svg width="110" height="110" viewBox="0 -18.83 122.88 122.88" xmlns="http://www.w3.org/2000/svg">
                                <path fill={isHovered ? card.accent : "rgba(255,255,255,0.6)"} className="transition-all duration-500" fillRule="evenodd" clipRule="evenodd" d="M28.84,12.93l4.75,0.09L23.08,47.67c1.45,0.36,2.82,0.79,4.11,1.28c-1.27-0.48-2.61-0.9-4.03-1.26 C13.94,45.62,6.32,48.64,0,55.82l7.87,3.71l33.43,15.77c0.26-2.05,0.38-3.97,0.34-5.78c0.01,0.26,0.03,0.53,0.03,0.8h38.37 c0.01,8.23,6.69,14.89,14.92,14.89s14.91-6.67,14.92-14.89h12.56c0.87-17.07-7.19-30.2-21.31-31.46h19c1.51,0,2.74-1.24,2.74-2.74 v-3.01c0-1.49-1.22-2.7-2.7-2.7h-0.24V9.79c0-1.35-1.11-2.46-2.46-2.46h-35.4c-1.35,0-2.46,1.11-2.46,2.46V30.4h-17.5 c-1.85-0.06-2.83,0.78-2.84,2.63v5.84h0v3.82c7.88,6.2,9.08,15.89,1.89,21.35H49.5c-0.3-9.29-5.61-14.95-14.43-21.21l5.26-16.21 c2.17-5.04,0.74-8.86-2.43-11.53c0.99-3.18,1.7-5.9,1.48-8.12l5.51,1.14c1.79,0.37,2.25,1.01,2.83-0.72 c0.1-0.3,0.18-0.59,0.23-0.89c0.45-2.37,0.17-2.21-1.75-2.58l-5.88-1.14h-1.75l-2.16-1.21c-1.29-0.74-2.63-1.18-4-1.36l-1.89-0.12 c-1.94,0-4.12-0.54-5.24,1.25c-0.02,0.03-0.03,0.14-0.04,0.3c-0.79,0.27-1.47,0.86-1.98,1.67c-0.63,0.98-1.01,2.32-1.01,3.78 c0,1.46,0.39,2.8,1.01,3.78c0.7,1.1,1.71,1.8,2.87,1.83C26.8,13.18,27.86,12.91,28.84,12.93L28.84,12.93L28.84,12.93z M103.13,24.37h12.46v2.19h-12.46V24.37L103.13,24.37z M93.66,9.48h9v9.78l-4.72-3.66l-4.28,3.66V9.48L93.66,9.48z M103.13,30.07 h12.46v2.19h-12.46V30.07L103.13,30.07z M7.91,59.56l13.3,6.3l-4.32-1.98c-2.97,0.63-5.19,3.27-5.19,6.42 c0,3.63,2.94,6.57,6.57,6.57c3.63,0,6.57-2.94,6.57-6.57c0-1.12-0.28-2.17-0.77-3.1l9.08,4.3c-0.61,7.68-7.04,13.72-14.87,13.72 c-8.24,0-14.92-6.68-14.92-14.92C3.34,66.08,5.09,62.27,7.91,59.56L7.91,59.56L7.91,59.56z M25.27,4.2 c0.06,1.92,0.19,4.39,0.28,6.05c-0.16-0.14-0.32-0.32-0.46-0.55c-0.42-0.65-0.67-1.58-0.67-2.62s0.26-1.97,0.67-2.62 C25.15,4.37,25.21,4.28,25.27,4.2L25.27,4.2z M88.4,70.32h13.14c-0.01,3.62-2.95,6.54-6.57,6.54S88.41,73.94,88.4,70.32L88.4,70.32 L88.4,70.32z"/>
                            </svg>
                        ) : (
                            <svg width="120" height="80" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
                                <path fill={isHovered ? card.accent : "rgba(255,255,255,0.6)"} className="transition-all duration-500" d="M48 320h64c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h16c26.5 0 48-21.5 48-48V176c0-44.2-35.8-80-80-80h-48V48c0-26.5-21.5-48-48-48H80C53.5 0 32 21.5 32 48v256c0 8.8 7.2 16 16 16zm160 48c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-256v96h-96c-17.7 0-32-14.3-32-32v-64h128z"/>
                            </svg>
                        )}
                    </div>
                    {/* glow behind icon */}
                    <div
                        className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-700"
                        style={{
                            background: `radial-gradient(circle, rgba(${card.accentRgb},0.08) 0%, transparent 70%)`,
                            opacity: isHovered ? 1 : 0,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

/* ───────────────── main component ───────────────── */
export default function CustomSplitServices() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const expressRef = useRef<HTMLDivElement>(null);
    const fleetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            /* heading */
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
                }
            );

            /* express card — slide from left */
            gsap.fromTo(
                expressRef.current,
                { opacity: 0, x: -80 },
                {
                    opacity: 1, x: 0, duration: 1.2, ease: "power4.out",
                    scrollTrigger: { trigger: expressRef.current, start: "top 80%" },
                }
            );

            /* fleet card — slide from right */
            gsap.fromTo(
                fleetRef.current,
                { opacity: 0, x: 80 },
                {
                    opacity: 1, x: 0, duration: 1.2, ease: "power4.out",
                    scrollTrigger: { trigger: fleetRef.current, start: "top 80%" },
                }
            );

            /* zigzag connector */
            gsap.utils.toArray<HTMLElement>(".zigzag-connector").forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1, scale: 1, duration: 0.8, ease: "power2.out",
                        scrollTrigger: { trigger: el, start: "top 85%" },
                    }
                );
            });

            /* feature items stagger */
            gsap.utils.toArray<HTMLElement>(".feature-item").forEach((item, i) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, x: -15 },
                    {
                        opacity: 1, x: 0, duration: 0.5, delay: 0.3 + i * 0.08, ease: "power2.out",
                        scrollTrigger: { trigger: item, start: "top 90%" },
                    }
                );
            });

            /* mote float */
            gsap.utils.toArray<HTMLElement>(".mote").forEach((m) => {
                gsap.to(m, {
                    y: `random(-25, 25)`, x: `random(-12, 12)`,
                    duration: `random(4, 7)`, repeat: -1, yoyo: true, ease: "sine.inOut",
                });
            });

            /* orbit ring rotation */
            gsap.to(".orbit-ring", {
                rotation: 360, duration: 25, repeat: -1, ease: "none",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const cards: CardData[] = [
        {
            id: "express",
            title: "QWQER Express",
            badge: "Hyperlocal Delivery, On-Demand",
            icon: <HiOutlineLightningBolt className="w-5 h-5" />,
            accent: "#6C3AE0",
            accentRgb: "108,58,224",
            stats: [
                { value: "30", suffix: "min", label: "Avg delivery" },
                { value: "50", suffix: "km", label: "City radius" },
                { value: "99", suffix: "%", label: "On-time rate" },
            ],
            features: [
                "On-demand deliveries dispatched instantly",
                "Same Day and Next Day delivery options",
                "Batch pickups with multi-drop efficiency",
            ],
            link: "/express",
            joinLink: "/partner",
            showJoin: true,
        },
        {
            id: "fleet",
            title: "QWQER Fleet",
            badge: "First-mile FTL & LCV Intracity Logistics",
            icon: <HiOutlineTruck className="w-5 h-5" />,
            accent: "#4355B9",
            accentRgb: "67,85,185",
            stats: [
                { value: "500", suffix: "+", label: "Vehicles" },
                { value: "24", suffix: "/7", label: "Operations" },
                { value: "100", suffix: "%", label: "Visibility" },
            ],
            features: [
                "Structured ops for predictable, large-scale movement",
                "Flexible vehicle mix for routine or peak needs",
                "Full visibility, planning & human oversight",
            ],
            link: "/fleet",
            joinLink: "/partner",
            showJoin: false,
        },
    ];

    return (
        <section ref={sectionRef} className="py-16 lg:py-20 bg-black relative overflow-hidden">
            <FloatingMotes />

            {/* ambient glow */}
            <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(108,58,224,0.04) 0%, transparent 70%)" }}
            />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(67,85,185,0.04) 0%, transparent 70%)" }}
            />

            {/* dot pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* heading */}
                <div ref={headingRef} className="text-center mb-10 lg:mb-14">
                    <span className="inline-block text-[#6C3AE0]/60 text-xs font-semibold uppercase tracking-[0.3em] mb-2">
                        Our Services
                    </span>
                    <h2 className="text-3xl md:text-[48px] font-bold text-white/90 leading-tight">
                        Your logistics,{" "}
                        <span className="bg-gradient-to-r from-[#6C3AE0] to-[#4355B9] bg-clip-text text-transparent">unified.</span>
                    </h2>
                    <p className="text-white/25 mt-2 text-base max-w-lg mx-auto leading-relaxed">
                        Whether it&apos;s a single parcel or a full truckload — we move India, faster.
                    </p>
                </div>

                {/* ── zigzag cards ── */}

                {/* Card 1: Express — content LEFT, visual RIGHT */}
                <ServiceCard card={cards[0]} reversed={false} cardRef={expressRef} />

                {/* Zigzag connector */}
                <ZigzagConnector />

                {/* Card 2: Fleet — content RIGHT, visual LEFT */}
                <ServiceCard card={cards[1]} reversed={true} cardRef={fleetRef} />
            </div>

            {/* connecting line to next section */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-20 bg-gradient-to-t from-[#4355B9]/25 to-transparent" />
        </section>
    );
}
