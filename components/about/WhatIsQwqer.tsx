"use client";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Logistics network node positions (normalized 0-1) ── */
const NODES = [
    { x: 0.15, y: 0.12, label: "Warehouse" },
    { x: 0.75, y: 0.08, label: "Hub A" },
    { x: 0.45, y: 0.35, label: "Sort Center" },
    { x: 0.10, y: 0.55, label: "Hub B" },
    { x: 0.80, y: 0.45, label: "City Depot" },
    { x: 0.30, y: 0.72, label: "Last Mile" },
    { x: 0.65, y: 0.75, label: "Delivery" },
    { x: 0.50, y: 0.92, label: "Customer" },
    { x: 0.88, y: 0.70, label: "Express" },
];

const CONNECTIONS = [
    [0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 6],
    [5, 7], [6, 7], [4, 8], [8, 6], [0, 3], [1, 4],
];

export default function WhatIsQwqer() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef(0);
    const timeRef = useRef(0);
    const revealRef = useRef(0);

    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;
        const dpr = window.devicePixelRatio || 1;
        const w = parent.clientWidth;
        const h = parent.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        initCanvas();

        const canvas = canvasRef.current;
        const sec = sectionRef.current;
        if (!canvas || !sec) return;

        const ctx = gsap.context(() => {
            // Text animations
            gsap.set(".wiq-label", { opacity: 0, y: 20 });
            gsap.set(".wiq-accent", { scaleX: 0, transformOrigin: "right" });
            gsap.set(".wiq-word", { opacity: 0, y: 60, rotateX: 40, scale: 0.85 });
            gsap.set(".wiq-body-line", { opacity: 0, x: 80, skewX: -3 });

            const tl = gsap.timeline({
                paused: true,
                defaults: { ease: "power3.out" },
            });

            ScrollTrigger.create({
                trigger: sec,
                start: "top 70%",
                once: true,
                onEnter: () => tl.play(),
            });

            tl.to(".wiq-label", { opacity: 1, y: 0, duration: 0.6 }, 0.2);
            tl.to(".wiq-accent", { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.4);
            tl.to(".wiq-word", {
                opacity: 1, y: 0, rotateX: 0, scale: 1,
                duration: 0.9, stagger: 0.08, ease: "back.out(1.4)"
            }, 0.6);
            tl.to(".wiq-body-line", {
                opacity: 1, x: 0, skewX: 0,
                duration: 1, ease: "power3.out"
            }, 1.2);
        }, sec);

        // Canvas reveal
        const revealObj = { val: 0 };
        gsap.to(revealObj, {
            val: 1, duration: 2, ease: "power2.out",
            scrollTrigger: { trigger: sec, start: "top 70%", toggleActions: "play none none reverse" },
            onUpdate: () => { revealRef.current = revealObj.val; },
        });

        // Packages traveling along routes
        const packages: { from: number; to: number; progress: number; speed: number; color: string }[] =
            CONNECTIONS.map((c, i) => ({
                from: c[0], to: c[1],
                progress: (i * 0.12) % 1,
                speed: 0.12 + Math.random() * 0.15,
                color: i % 3 === 0 ? "#ee3425" : i % 3 === 1 ? "#6C3AE0" : "#4355B9",
            }));

        const draw = () => {
            const context = canvas.getContext("2d");
            if (!context) return;
            const dpr = window.devicePixelRatio || 1;
            const w = canvas.width / dpr;
            const h = canvas.height / dpr;
            context.clearRect(0, 0, w, h);
            timeRef.current += 0.016;
            const time = timeRef.current;
            const reveal = revealRef.current;

            const pad = 30;
            const mW = w - pad * 2;
            const mH = h - pad * 2;
            const nx = (v: number) => pad + v * mW;
            const ny = (v: number) => pad + v * mH;

            // Draw connections
            const connReveal = Math.max(0, (reveal - 0.1) / 0.5);
            CONNECTIONS.forEach((conn, ci) => {
                const t = Math.max(0, Math.min(1, (connReveal - ci * 0.04) * 2));
                if (t <= 0) return;

                const from = NODES[conn[0]];
                const to = NODES[conn[1]];
                const x1 = nx(from.x), y1 = ny(from.y);
                const x2 = nx(to.x), y2 = ny(to.y);

                // Curved connection
                const mx = (x1 + x2) / 2;
                const my = (y1 + y2) / 2;
                const dx = x2 - x1, dy = y2 - y1;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const perpX = -dy / dist, perpY = dx / dist;
                const cx = mx + perpX * dist * 0.15;
                const cy = my + perpY * dist * 0.15;

                // Draw dashed connection line
                context.beginPath();
                context.setLineDash([4, 6]);
                const segs = Math.floor(t * 40);
                for (let i = 0; i <= segs; i++) {
                    const st = i / 40;
                    const mt2 = 1 - st;
                    const px = mt2 * mt2 * x1 + 2 * mt2 * st * cx + st * st * x2;
                    const py = mt2 * mt2 * y1 + 2 * mt2 * st * cy + st * st * y2;
                    if (i === 0) context.moveTo(px, py);
                    else context.lineTo(px, py);
                }
                context.strokeStyle = `rgba(255,255,255,${0.08 * t})`;
                context.lineWidth = 1;
                context.stroke();
                context.setLineDash([]);
            });

            // Draw traveling packages
            if (reveal > 0.4) {
                const pkgAlpha = Math.min(1, (reveal - 0.4) / 0.3);
                packages.forEach((pkg) => {
                    pkg.progress += pkg.speed * 0.016;
                    if (pkg.progress > 1) { pkg.progress = 0; }

                    const from = NODES[pkg.from];
                    const to = NODES[pkg.to];
                    const x1 = nx(from.x), y1 = ny(from.y);
                    const x2 = nx(to.x), y2 = ny(to.y);
                    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
                    const dx = x2 - x1, dy = y2 - y1;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const perpX = -dy / dist, perpY = dx / dist;
                    const cx = mx + perpX * dist * 0.15;
                    const cy = my + perpY * dist * 0.15;

                    const mt = 1 - pkg.progress;
                    const px = mt * mt * x1 + 2 * mt * pkg.progress * cx + pkg.progress * pkg.progress * x2;
                    const py = mt * mt * y1 + 2 * mt * pkg.progress * cy + pkg.progress * pkg.progress * y2;

                    // Glow
                    context.globalAlpha = pkgAlpha * 0.6;
                    const glow = context.createRadialGradient(px, py, 0, px, py, 12);
                    glow.addColorStop(0, pkg.color);
                    glow.addColorStop(1, "transparent");
                    context.beginPath();
                    context.arc(px, py, 12, 0, Math.PI * 2);
                    context.fillStyle = glow;
                    context.fill();

                    // Package dot
                    context.globalAlpha = pkgAlpha;
                    context.beginPath();
                    context.arc(px, py, 3, 0, Math.PI * 2);
                    context.fillStyle = pkg.color;
                    context.fill();

                    // Trail
                    context.globalAlpha = pkgAlpha * 0.3;
                    context.beginPath();
                    const trailLen = 0.08;
                    const trailSegs = 12;
                    for (let i = 0; i <= trailSegs; i++) {
                        const tt = Math.max(0, pkg.progress - trailLen + (trailLen * i / trailSegs));
                        const tmt = 1 - tt;
                        const tx = tmt * tmt * x1 + 2 * tmt * tt * cx + tt * tt * x2;
                        const ty = tmt * tmt * y1 + 2 * tmt * tt * cy + tt * tt * y2;
                        if (i === 0) context.moveTo(tx, ty);
                        else context.lineTo(tx, ty);
                    }
                    context.strokeStyle = pkg.color;
                    context.lineWidth = 2;
                    context.stroke();

                    context.globalAlpha = 1;
                });
            }

            // Draw nodes
            const nodeReveal = Math.max(0, (reveal - 0.2) / 0.5);
            NODES.forEach((node, i) => {
                const t = Math.max(0, Math.min(1, (nodeReveal - i * 0.06) * 3));
                if (t <= 0) return;

                const px = nx(node.x), py = ny(node.y);
                const s = 0.3 + 0.7 * t;

                // Pulse ring
                const pulse = ((time * 0.5 + i * 0.7) % 2.5);
                if (pulse < 1.5) {
                    const pr = 8 + pulse * 16;
                    const pa = Math.max(0, 0.2 * (1 - pulse / 1.5));
                    context.beginPath();
                    context.arc(px, py, pr, 0, Math.PI * 2);
                    context.strokeStyle = i < 3 ? `rgba(238,52,37,${pa})` : i < 6 ? `rgba(108,58,224,${pa})` : `rgba(67,85,185,${pa})`;
                    context.lineWidth = 1;
                    context.stroke();
                }

                // Outer glow
                context.globalAlpha = t;
                const nodeGlow = context.createRadialGradient(px, py, 0, px, py, 14 * s);
                const glowColor = i < 3 ? "238,52,37" : i < 6 ? "108,58,224" : "67,85,185";
                nodeGlow.addColorStop(0, `rgba(${glowColor},0.3)`);
                nodeGlow.addColorStop(1, `rgba(${glowColor},0)`);
                context.beginPath();
                context.arc(px, py, 14 * s, 0, Math.PI * 2);
                context.fillStyle = nodeGlow;
                context.fill();

                // Hexagonal node shape
                context.beginPath();
                const r = 6 * s;
                for (let j = 0; j < 6; j++) {
                    const angle = (Math.PI / 3) * j - Math.PI / 6;
                    const hx = px + r * Math.cos(angle);
                    const hy = py + r * Math.sin(angle);
                    if (j === 0) context.moveTo(hx, hy);
                    else context.lineTo(hx, hy);
                }
                context.closePath();
                context.fillStyle = `rgba(${glowColor},0.8)`;
                context.fill();
                context.strokeStyle = `rgba(255,255,255,0.3)`;
                context.lineWidth = 1;
                context.stroke();

                // Inner dot
                context.beginPath();
                context.arc(px, py, 2 * s, 0, Math.PI * 2);
                context.fillStyle = "rgba(255,255,255,0.8)";
                context.fill();

                // Label
                if (t > 0.5) {
                    context.globalAlpha = Math.max(0, (t - 0.5) / 0.5);
                    context.font = "bold 8px sans-serif";
                    context.fillStyle = "rgba(255,255,255,0.4)";
                    context.textAlign = "center";
                    context.fillText(node.label.toUpperCase(), px, py + 18);
                }
                context.globalAlpha = 1;
            });

            // Scanning radar sweep
            if (reveal > 0.6) {
                const sweepAlpha = Math.min(0.15, (reveal - 0.6) * 0.3);
                const angle = time * 0.8;
                const centerX = w * 0.45, centerY = h * 0.45;
                const sweepR = Math.min(w, h) * 0.45;

                context.save();
                context.translate(centerX, centerY);
                context.rotate(angle);
                const sweep = context.createConicGradient(0, 0, 0);
                sweep.addColorStop(0, `rgba(238,52,37,${sweepAlpha})`);
                sweep.addColorStop(0.15, "transparent");
                sweep.addColorStop(1, "transparent");
                context.beginPath();
                context.moveTo(0, 0);
                context.arc(0, 0, sweepR, 0, Math.PI * 2);
                context.fillStyle = sweep;
                context.fill();
                context.restore();
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);
        const onResize = () => initCanvas();
        window.addEventListener("resize", onResize);

        return () => {
            ctx.revert();
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", onResize);
        };
    }, [initCanvas]);

    const headingWords = ["Built", "to", "deliver,"];
    const highlightWord = "engineered to scale.";

    const bodyLines = [
        "QWQER is a tech-enabled transportation solution combining high-speed",
        "Express delivery with scalable Fleet operations. With real-time visibility,",
        "optimized routing, and a unified platform, we enable enterprises to move goods faster, more efficiently, and with complete control.",
    ];

    return (
        <section
            ref={sectionRef}
            className="bg-black py-6 md:py-8 px-4 md:px-8 relative overflow-hidden"
        >
            {/* Ambient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(90,94,136,0.05) 0%, transparent 65%)",
                    filter: "blur(60px)",
                }}
            />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 min-h-[500px]">

                    {/* Left: Animated Logistics Network Canvas */}
                    <div className="flex-1 w-full lg:w-auto order-2 lg:order-1">
                        <div className="relative w-full max-w-[600px] mx-auto" style={{ aspectRatio: "1" }}>
                            <canvas ref={canvasRef} className="w-full h-full" />
                        </div>
                    </div>

                    {/* Right: Content (right-aligned) */}
                    <div className="flex-1 order-1 lg:order-2 text-right">
                        {/* Label */}
                        <div className="wiq-label mb-3 flex flex-col items-end">
                            <span
                                className="text-[11px] uppercase tracking-[0.2em] font-semibold"
                                style={{ color: "#ee3425" }}
                            >
                                What is QWQER
                            </span>
                            <div
                                className="wiq-accent mt-2 h-[2px] w-14 rounded-full"
                                style={{ backgroundColor: "#ee3425" }}
                            />
                        </div>

                        {/* Heading */}
                        <h2
                            className="text-[48px] font-extrabold text-white leading-[1.1] tracking-[-0.02em]"
                            style={{ perspective: "800px" }}
                        >
                            {headingWords.map((word, i) => (
                                <span key={i} className="wiq-word inline-block mr-3" style={{ transformStyle: "preserve-3d" }}>
                                    {word}
                                </span>
                            ))}
                            <br />
                            <span className="wiq-word inline-block" style={{ color: "#ee3425", transformStyle: "preserve-3d" }}>
                                {highlightWord}
                            </span>
                        </h2>

                        {/* Body */}
                        <p className="wiq-body-line mt-5 ml-auto max-w-xl text-white/70 text-base md:text-[17px] leading-[1.8] text-right">
                            QWQER is a tech-enabled transportation solution combining high-speed Express delivery with scalable Fleet operations. With real-time visibility, optimized routing, and a unified platform, we enable enterprises to move goods faster, more efficiently, and with complete control.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
