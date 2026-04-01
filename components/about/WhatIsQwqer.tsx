"use client";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
            gsap.set(".wiq-label", { opacity: 0, y: 20 });
            gsap.set(".wiq-accent", { scaleX: 0, transformOrigin: "right" });
            gsap.set(".wiq-word", { opacity: 0, y: 60, rotateX: 40, scale: 0.85 });
            gsap.set(".wiq-body-line", { opacity: 0, x: 80, skewX: -3 });

            const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
            ScrollTrigger.create({ trigger: sec, start: "top 70%", once: true, onEnter: () => tl.play() });

            tl.to(".wiq-label", { opacity: 1, y: 0, duration: 0.6 }, 0.2);
            tl.to(".wiq-accent", { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.4);
            tl.to(".wiq-word", { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.9, stagger: 0.08, ease: "back.out(1.4)" }, 0.6);
            tl.to(".wiq-body-line", { opacity: 1, x: 0, skewX: 0, duration: 1 }, 1.2);
        }, sec);

        const revealObj = { val: 0 };
        gsap.to(revealObj, {
            val: 1, duration: 2.5, ease: "power2.out",
            scrollTrigger: { trigger: sec, start: "top 70%", toggleActions: "play none none reverse" },
            onUpdate: () => { revealRef.current = revealObj.val; },
        });

        /* ── The main pipeline path — a single flowing S-curve through all stages ── */
        /* Defined as waypoints (normalized 0-1), we'll create a smooth spline through them */
        const WAYPOINTS = [
            { x: 0.50, y: 0.02, label: "Client Order", color: "255,255,255" },
            { x: 0.20, y: 0.18, label: "Pickup", color: "238,52,37" },
            { x: 0.50, y: 0.34, label: "Warehouse", color: "67,85,185" },
            { x: 0.50, y: 0.50, label: "QWQER Hub", color: "238,52,37", isHub: true },
            { x: 0.20, y: 0.66, label: "Express", color: "108,58,224" },
            { x: 0.80, y: 0.66, label: "Fleet", color: "67,85,185" },
            { x: 0.50, y: 0.82, label: "Last Mile", color: "238,52,37" },
            { x: 0.50, y: 0.97, label: "Delivered", color: "34,197,94" },
        ];

        /* Build a dense point array by interpolating smooth curves between waypoints */
        function buildPipeline(w: number, h: number, pad: number) {
            const mW = w - pad * 2;
            const mH = h - pad * 2;
            const points: { x: number; y: number }[] = [];

            for (let wi = 0; wi < WAYPOINTS.length - 1; wi++) {
                const from = WAYPOINTS[wi];
                const to = WAYPOINTS[wi + 1];
                const x1 = pad + from.x * mW, y1 = pad + from.y * mH;
                const x2 = pad + to.x * mW, y2 = pad + to.y * mH;

                // Control points for smooth S-curves
                const cy1 = y1 + (y2 - y1) * 0.5;
                const cy2 = y1 + (y2 - y1) * 0.5;

                for (let t = 0; t <= 1; t += 0.02) {
                    const mt = 1 - t;
                    // Cubic bezier with vertical-ish control points
                    const px = mt * mt * mt * x1 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x2;
                    const py = mt * mt * mt * y1 + 3 * mt * mt * t * cy1 + 3 * mt * t * t * cy2 + t * t * t * y2;
                    points.push({ x: px, y: py });
                }
            }
            return points;
        }

        /* Branch pipelines: Hub → Express and Hub → Fleet */
        function buildBranch(w: number, h: number, pad: number, fromIdx: number, toIdx: number) {
            const mW = w - pad * 2;
            const mH = h - pad * 2;
            const from = WAYPOINTS[fromIdx];
            const to = WAYPOINTS[toIdx];
            const x1 = pad + from.x * mW, y1 = pad + from.y * mH;
            const x2 = pad + to.x * mW, y2 = pad + to.y * mH;
            const points: { x: number; y: number }[] = [];
            for (let t = 0; t <= 1; t += 0.02) {
                const mt = 1 - t;
                const cx = (x1 + x2) / 2;
                const px = mt * mt * x1 + 2 * mt * t * cx + t * t * x2;
                const py = mt * mt * y1 + 2 * mt * t * (y1 + (y2 - y1) * 0.5) + t * t * y2;
                points.push({ x: px, y: py });
            }
            return points;
        }

        /* ── Dash offset for animated flowing dotted lines ── */
        const dashOffset = { main: 0, express: 0, fleet: 0 };

        /* ── Draw icon at node ── */
        function drawNodeIcon(c: CanvasRenderingContext2D, label: string, x: number, y: number, s: number, alpha: number, colorRgb: string, isHub?: boolean) {
            c.save();
            c.translate(x, y);
            c.globalAlpha = alpha;

            // Background circle
            const bgAlpha = isHub ? 0.12 : 0.06;
            c.beginPath();
            c.arc(0, 0, s * 1.4, 0, Math.PI * 2);
            c.fillStyle = `rgba(${colorRgb},${bgAlpha})`;
            c.fill();
            c.strokeStyle = `rgba(${colorRgb},${isHub ? 0.35 : 0.15})`;
            c.lineWidth = isHub ? 1.5 : 1;
            c.stroke();

            if (isHub) {
                // Second ring
                c.beginPath();
                c.arc(0, 0, s * 1.8, 0, Math.PI * 2);
                c.strokeStyle = `rgba(${colorRgb},0.1)`;
                c.lineWidth = 1;
                c.stroke();
            }

            // Simple icons
            c.strokeStyle = `rgba(${colorRgb},0.8)`;
            c.fillStyle = `rgba(${colorRgb},0.8)`;
            c.lineWidth = 1.2;

            if (label === "Client Order") {
                // Document/order icon
                c.strokeRect(-s * 0.25, -s * 0.35, s * 0.5, s * 0.7);
                c.beginPath(); c.moveTo(-s * 0.12, -s * 0.15); c.lineTo(s * 0.12, -s * 0.15);
                c.moveTo(-s * 0.12, 0); c.lineTo(s * 0.12, 0);
                c.moveTo(-s * 0.12, s * 0.15); c.lineTo(s * 0.05, s * 0.15);
                c.stroke();
            } else if (label === "Pickup") {
                // Hand/box pickup
                c.strokeRect(-s * 0.3, -s * 0.15, s * 0.6, s * 0.4);
                c.beginPath(); c.moveTo(0, -s * 0.15); c.lineTo(0, -s * 0.45);
                c.moveTo(-s * 0.15, -s * 0.3); c.lineTo(0, -s * 0.45); c.lineTo(s * 0.15, -s * 0.3);
                c.stroke();
            } else if (label === "Warehouse") {
                // Warehouse building
                c.beginPath();
                c.moveTo(-s * 0.4, s * 0.3); c.lineTo(-s * 0.4, -s * 0.1);
                c.lineTo(0, -s * 0.4); c.lineTo(s * 0.4, -s * 0.1); c.lineTo(s * 0.4, s * 0.3); c.closePath(); c.stroke();
                c.beginPath(); c.moveTo(-s * 0.12, s * 0.3); c.lineTo(-s * 0.12, s * 0.05);
                c.lineTo(s * 0.12, s * 0.05); c.lineTo(s * 0.12, s * 0.3); c.stroke();
            } else if (label === "QWQER Hub") {
                c.font = `bold ${s * 0.6}px sans-serif`;
                c.textAlign = "center"; c.textBaseline = "middle";
                c.fillText("Q", 0, 1);
            } else if (label === "Express") {
                // Lightning bolt
                c.beginPath(); c.moveTo(s * 0.1, -s * 0.4); c.lineTo(-s * 0.15, s * 0.05);
                c.lineTo(s * 0.05, s * 0.05); c.lineTo(-s * 0.1, s * 0.4);
                c.lineTo(s * 0.15, -s * 0.05); c.lineTo(-s * 0.05, -s * 0.05); c.closePath(); c.fill();
            } else if (label === "Fleet") {
                // Truck
                c.strokeRect(-s * 0.4, -s * 0.15, s * 0.5, s * 0.35);
                c.strokeRect(s * 0.1, -s * 0.05, s * 0.25, s * 0.25);
                c.beginPath(); c.arc(-s * 0.15, s * 0.25, s * 0.08, 0, Math.PI * 2); c.stroke();
                c.beginPath(); c.arc(s * 0.25, s * 0.25, s * 0.08, 0, Math.PI * 2); c.stroke();
            } else if (label === "Last Mile") {
                // Pin
                c.beginPath(); c.arc(0, -s * 0.1, s * 0.25, Math.PI, 0);
                c.lineTo(0, s * 0.4); c.closePath(); c.stroke();
                c.beginPath(); c.arc(0, -s * 0.1, s * 0.1, 0, Math.PI * 2); c.fill();
            } else if (label === "Delivered") {
                // Checkmark in circle
                c.beginPath(); c.arc(0, 0, s * 0.35, 0, Math.PI * 2); c.stroke();
                c.beginPath(); c.moveTo(-s * 0.15, 0); c.lineTo(-s * 0.02, s * 0.15);
                c.lineTo(s * 0.18, -s * 0.12); c.lineWidth = 1.8; c.stroke();
            }

            c.restore();
        }

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

            const pad = 35;
            const mW = w - pad * 2;
            const mH = h - pad * 2;

            // Build paths
            const mainPath = buildPipeline(w, h, pad);
            const expressPath = buildBranch(w, h, pad, 3, 4);
            const fleetPath = buildBranch(w, h, pad, 3, 5);

            /* ── Draw the main pipeline line (progressive reveal) ── */
            const lineReveal = Math.min(1, reveal * 1.5);
            const drawCount = Math.floor(lineReveal * mainPath.length);

            if (drawCount > 1) {
                // Pipeline glow (wider, faint)
                context.beginPath();
                for (let i = 0; i < drawCount; i++) {
                    if (i === 0) context.moveTo(mainPath[i].x, mainPath[i].y);
                    else context.lineTo(mainPath[i].x, mainPath[i].y);
                }
                context.strokeStyle = "rgba(238,52,37,0.04)";
                context.lineWidth = 8;
                context.lineCap = "round";
                context.lineJoin = "round";
                context.stroke();

                // Pipeline line
                context.beginPath();
                for (let i = 0; i < drawCount; i++) {
                    if (i === 0) context.moveTo(mainPath[i].x, mainPath[i].y);
                    else context.lineTo(mainPath[i].x, mainPath[i].y);
                }
                context.strokeStyle = "rgba(255,255,255,0.08)";
                context.lineWidth = 2;
                context.stroke();

                // Running light along the line
                const lightPos = ((time * 0.08) % 1);
                const lightIdx = Math.floor(lightPos * mainPath.length);
                if (lightIdx < mainPath.length) {
                    const lp = mainPath[lightIdx];
                    const grad = context.createRadialGradient(lp.x, lp.y, 0, lp.x, lp.y, 30);
                    grad.addColorStop(0, "rgba(238,52,37,0.15)");
                    grad.addColorStop(1, "transparent");
                    context.beginPath();
                    context.arc(lp.x, lp.y, 30, 0, Math.PI * 2);
                    context.fillStyle = grad;
                    context.fill();
                }
            }



            /* ── Animated flowing dotted line along main pipeline ── */
            dashOffset.main -= 0.8; // speed of flow
            if (drawCount > 1) {
                context.beginPath();
                for (let i = 0; i < drawCount; i++) {
                    if (i === 0) context.moveTo(mainPath[i].x, mainPath[i].y);
                    else context.lineTo(mainPath[i].x, mainPath[i].y);
                }
                context.strokeStyle = "rgba(238,52,37,0.3)";
                context.lineWidth = 2;
                context.setLineDash([4, 8]);
                context.lineDashOffset = dashOffset.main;
                context.stroke();
                context.setLineDash([]);
                context.lineDashOffset = 0;
            }

            /* ── Animated flowing dotted lines on branch paths ── */
            if (reveal > 0.5) {
                const branchRevealAlpha = Math.min(1, (reveal - 0.5) * 3);
                dashOffset.express -= 0.7;
                dashOffset.fleet -= 0.7;

                [{ path: expressPath, color: "108,58,224", offset: dashOffset.express },
                 { path: fleetPath, color: "67,85,185", offset: dashOffset.fleet }].forEach(({ path: bPath, color, offset }) => {
                    const bc = Math.floor(branchRevealAlpha * bPath.length);
                    if (bc < 2) return;

                    context.beginPath();
                    for (let i = 0; i < bc; i++) {
                        if (i === 0) context.moveTo(bPath[i].x, bPath[i].y);
                        else context.lineTo(bPath[i].x, bPath[i].y);
                    }
                    context.strokeStyle = `rgba(${color},0.3)`;
                    context.lineWidth = 2;
                    context.setLineDash([4, 8]);
                    context.lineDashOffset = offset;
                    context.stroke();
                    context.setLineDash([]);
                    context.lineDashOffset = 0;
                });
            }

            /* ── Draw station nodes along the pipeline ── */
            WAYPOINTS.forEach((wp, i) => {
                const nodeT = Math.max(0, Math.min(1, (reveal - i * 0.08) * 2.5));
                if (nodeT <= 0) return;

                const px = pad + wp.x * mW;
                const py = pad + wp.y * mH;

                drawNodeIcon(context, wp.label, px, py, 16, nodeT * 0.85, wp.color, (wp as any).isHub);

                // Label
                if (nodeT > 0.5) {
                    context.globalAlpha = (nodeT - 0.5) / 0.5 * 0.45;
                    context.font = "600 8px sans-serif";
                    context.fillStyle = "rgba(255,255,255,0.5)";
                    context.textAlign = "center";
                    context.fillText(wp.label.toUpperCase(), px, py + 28);
                    context.globalAlpha = 1;
                }
            });

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);
        const onResize = () => initCanvas();
        window.addEventListener("resize", onResize);

        return () => { ctx.revert(); cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", onResize); };
    }, [initCanvas]);

    const headingWords = ["Built", "to", "deliver,"];
    const highlightWord = "engineered to scale.";

    return (
        <section ref={sectionRef} className="bg-black py-6 md:py-8 px-4 md:px-8 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(90,94,136,0.04) 0%, transparent 65%)", filter: "blur(60px)" }} />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 min-h-[500px]">
                    <div className="flex-1 w-full lg:w-auto order-2 lg:order-1">
                        <div className="relative w-full max-w-[550px] mx-auto" style={{ aspectRatio: "1" }}>
                            <canvas ref={canvasRef} className="w-full h-full" />
                        </div>
                    </div>

                    <div className="flex-1 order-1 lg:order-2 text-right">
                        <div className="wiq-label mb-3 flex flex-col items-end">
                            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#ee3425" }}>What is QWQER</span>
                            <div className="wiq-accent mt-2 h-[2px] w-14 rounded-full" style={{ backgroundColor: "#ee3425" }} />
                        </div>
                        <h2 className="text-[48px] font-extrabold text-white leading-[1.1] tracking-[-0.02em]" style={{ perspective: "800px" }}>
                            {headingWords.map((word, i) => (
                                <span key={i} className="wiq-word inline-block mr-3" style={{ transformStyle: "preserve-3d" }}>{word}</span>
                            ))}
                            <br />
                            <span className="wiq-word inline-block" style={{ color: "#ee3425", transformStyle: "preserve-3d" }}>{highlightWord}</span>
                        </h2>
                        <p className="wiq-body-line mt-5 ml-auto max-w-xl text-white/70 text-base md:text-[17px] leading-[1.8] text-right">
                            QWQER is a tech-enabled transportation solution combining high-speed Express delivery with scalable Fleet operations. With real-time visibility, optimized routing, and a unified platform, we enable enterprises to move goods faster, more efficiently, and with complete control.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
