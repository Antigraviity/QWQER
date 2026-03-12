"use client";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  { label: "Sign Up", icon: "M15 19v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2 M9 9a4 4 0 100-8 4 4 0 000 8 M18 8v4 M20 10h-4" },
  { label: "Deliver", icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 7v4l2 2" },
  { label: "Earn", icon: "M8 7h8 M8 11h8 M12 7c2.5 0 4 1.5 4 4s-1.5 4-4 4l4 5" },
  { label: "Grow", icon: "M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22 M16.5 6h5.25v5.25" },
];

/*
 * Shared node positions as percentages of the section.
 * Both the Canvas and the HTML overlay read from this single source of truth.
 * Layout: gentle upward arc — outer two sit slightly lower, inner two higher.
 */
const NODE_POSITIONS = [
  { xPct: 0.20, yPct: 0.32 },  // Sign Up  — left
  { xPct: 0.40, yPct: 0.22 },  // Deliver  — inner-left, higher
  { xPct: 0.60, yPct: 0.22 },  // Earn     — inner-right, higher
  { xPct: 0.80, yPct: 0.32 },  // Grow     — right
];

/* ─── Canvas-based Particle Energy Network ─── */
function ParticleNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<{
    x: number; y: number; radius: number; active: boolean;
    pulsePhase: number; orbitParticles: { angle: number; dist: number; speed: number; size: number }[];
  }[]>([]);
  const beamsRef = useRef<{ progress: number; active: boolean }[]>([]);
  const floatingRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number; targetNode: number }[]>([]);
  const phaseRef = useRef(0);
  const timeRef = useRef(0);
  const activatedRef = useRef(0);
  const activationTimerRef = useRef(0);

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

    // Derive pixel positions from shared percentages
    // Shift canvas nodes up by 12px so circles align with the icon center,
    // not the center of the full HTML block (icon + label).
    nodesRef.current = NODE_POSITIONS.map((p) => ({
      x: w * p.xPct,
      y: h * p.yPct - 14,
      radius: 0,
      active: false,
      pulsePhase: Math.random() * Math.PI * 2,
      orbitParticles: Array.from({ length: 6 }, () => ({
        angle: Math.random() * Math.PI * 2,
        dist: 24 + Math.random() * 18,
        speed: (0.3 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1),
        size: 1 + Math.random() * 1.5,
      })),
    }));

    beamsRef.current = [
      { progress: 0, active: false },
      { progress: 0, active: false },
      { progress: 0, active: false },
    ];

    // Floating ambient particles — keep them within the centre band
    floatingRef.current = Array.from({ length: 45 }, () => ({
      x: w * 0.15 + Math.random() * w * 0.7,
      y: h * 0.05 + Math.random() * h * 0.45,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: 0.5 + Math.random() * 1.5,
      alpha: 0.05 + Math.random() * 0.15,
      targetNode: Math.floor(Math.random() * 4),
    }));

    phaseRef.current = 0;
    activatedRef.current = 0;
    activationTimerRef.current = 0;
    timeRef.current = 0;
  }, []);

  useEffect(() => {
    initCanvas();

    const startTimeout = setTimeout(() => {
      phaseRef.current = 1;
    }, 600);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const A = { r: 238, g: 52, b: 37 };

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      const nodes = nodesRef.current;
      const beams = beamsRef.current;
      const floats = floatingRef.current;

      // ── Phase 1: Activate nodes sequentially ──
      if (phaseRef.current === 1) {
        activationTimerRef.current += 0.016;
        const interval = 0.55;
        const shouldBeActive = Math.min(4, Math.floor(activationTimerRef.current / interval) + 1);
        if (shouldBeActive > activatedRef.current) {
          const idx = activatedRef.current;
          if (nodes[idx]) nodes[idx].active = true;
          if (idx > 0 && beams[idx - 1]) beams[idx - 1].active = true;
          activatedRef.current = shouldBeActive;
        }
        if (activatedRef.current >= 4 && activationTimerRef.current > 4 * interval + 0.3) {
          phaseRef.current = 2;
        }
      }

      // Animate node radii
      nodes.forEach((n) => {
        const target = n.active ? 30 : 0;
        n.radius += (target - n.radius) * 0.08;
      });

      // Animate beam progress
      beams.forEach((b) => {
        if (b.active && b.progress < 1) b.progress = Math.min(1, b.progress + 0.025);
      });

      // ── Floating particles ──
      floats.forEach((p) => {
        const targetN = nodes[p.targetNode];
        if (targetN && targetN.active) {
          const dx = targetN.x - p.x;
          const dy = targetN.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 60) {
            p.vx += (dx / dist) * 0.008;
            p.vy += (dy / dist) * 0.008;
          } else {
            p.vx -= (dx / dist) * 0.005;
            p.vy -= (dy / dist) * 0.005;
          }
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${A.r},${A.g},${A.b},${p.alpha})`;
        ctx.fill();

        // Faint connecting lines to nearby active nodes
        nodes.forEach((n) => {
          if (!n.active) return;
          const dx2 = n.x - p.x;
          const dy2 = n.y - p.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},${0.04 * (1 - dist2 / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // ── Energy beams between consecutive nodes ──
      for (let i = 0; i < beams.length; i++) {
        const beam = beams[i];
        if (!beam.active || beam.progress <= 0) continue;
        const from = nodes[i];
        const to = nodes[i + 1];
        if (!from || !to) continue;

        // Control point for the curve — arc upward
        const midX = (from.x + to.x) / 2;
        const midY = Math.min(from.y, to.y) - 35;

        // Draw beam trail
        const segments = 50;
        const drawTo = Math.floor(segments * beam.progress);
        for (let s = 0; s < drawTo; s++) {
          const t1 = s / segments;
          const t2 = (s + 1) / segments;
          const x1 = (1 - t1) * (1 - t1) * from.x + 2 * (1 - t1) * t1 * midX + t1 * t1 * to.x;
          const y1 = (1 - t1) * (1 - t1) * from.y + 2 * (1 - t1) * t1 * midY + t1 * t1 * to.y;
          const x2 = (1 - t2) * (1 - t2) * from.x + 2 * (1 - t2) * t2 * midX + t2 * t2 * to.x;
          const y2 = (1 - t2) * (1 - t2) * from.y + 2 * (1 - t2) * t2 * midY + t2 * t2 * to.y;

          const alpha = 0.12 + 0.18 * Math.sin(t1 * Math.PI);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},${alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Glow behind beam
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(midX, midY, to.x, to.y);
        ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},${0.04 * beam.progress})`;
        ctx.lineWidth = 8;
        ctx.stroke();

        // Traveling energy pulse
        if (beam.progress >= 1) {
          const pulseT = ((t * 0.7 + i * 0.4) % 1);
          const px = (1 - pulseT) * (1 - pulseT) * from.x + 2 * (1 - pulseT) * pulseT * midX + pulseT * pulseT * to.x;
          const py = (1 - pulseT) * (1 - pulseT) * from.y + 2 * (1 - pulseT) * pulseT * midY + pulseT * pulseT * to.y;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(px, py, 0, px, py, 14);
          grad.addColorStop(0, `rgba(${A.r},${A.g},${A.b},0.9)`);
          grad.addColorStop(1, `rgba(${A.r},${A.g},${A.b},0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      // ── Draw nodes ──
      nodes.forEach((n, i) => {
        if (n.radius < 0.5) return;
        const pulse = 1 + 0.06 * Math.sin(t * 2.5 + n.pulsePhase);
        const r = n.radius * pulse;

        // Outer glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 12, 0, Math.PI * 2);
        const outerGrad = ctx.createRadialGradient(n.x, n.y, r, n.x, n.y, r + 24);
        outerGrad.addColorStop(0, `rgba(${A.r},${A.g},${A.b},0.1)`);
        outerGrad.addColorStop(1, `rgba(${A.r},${A.g},${A.b},0)`);
        ctx.fillStyle = outerGrad;
        ctx.fill();

        // Main node
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
        grad.addColorStop(0, `rgba(${A.r},${A.g},${A.b},0.22)`);
        grad.addColorStop(0.7, `rgba(${A.r},${A.g},${A.b},0.08)`);
        grad.addColorStop(1, `rgba(${A.r},${A.g},${A.b},0.02)`);
        ctx.fillStyle = grad;
        ctx.fill();

        // Border ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},${0.5 + 0.2 * Math.sin(t * 3 + i)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Orbiting particles
        n.orbitParticles.forEach((op) => {
          op.angle += op.speed * 0.016;
          const ox = n.x + Math.cos(op.angle) * op.dist * pulse;
          const oy = n.y + Math.sin(op.angle) * op.dist * pulse;
          ctx.beginPath();
          ctx.arc(ox, oy, op.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${A.r},${A.g},${A.b},0.4)`;
          ctx.fill();
        });

        // Expanding ring pulse
        if (n.active) {
          const ringT = ((t * 0.5 + i * 0.7) % 2);
          if (ringT < 1.2) {
            const ringR = r + ringT * 25;
            const ringAlpha = Math.max(0, 0.2 * (1 - ringT / 1.2));
            ctx.beginPath();
            ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},${ringAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    const onResize = () => initCanvas();
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [initCanvas]);

  return <canvas ref={canvasRef} className={className} />;
}

export default function PartnerHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".ph-badge", { opacity: 0, y: 14 });
      gsap.set(".ph-line", { opacity: 0, y: 55 });
      gsap.set(".ph-sub", { opacity: 0, y: 18 });
      gsap.set(".ph-cta", { opacity: 0, y: 20 });
      gsap.set(".ph-step-html", { opacity: 0, scale: 0.5 });
      gsap.set(".ph-step-label-html", { opacity: 0, y: 10 });

      const tl = gsap.timeline({ delay: 0.8 });

      // Nodes appear with stagger (synced with canvas activation)
      STEPS.forEach((_, i) => {
        tl.to(`.ph-step-html-${i}`, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.5)" }, 0.55 * i);
        tl.to(`.ph-step-label-html-${i}`, { opacity: 1, y: 0, duration: 0.35 }, 0.55 * i + 0.2);
      });

      // Content reveals
      tl.to(".ph-badge", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
      tl.to(".ph-line", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.3");
      tl.to(".ph-sub", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
      tl.to(".ph-cta", { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2");

      // Blob parallax
      gsap.to(".ph-blob-1", { yPercent: 20, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".ph-blob-2", { yPercent: -14, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const A = "#ee3425";

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(175deg, #0c0c0c 0%, #111214 30%, #141618 55%, #111214 80%, #0a0a0a 100%)",
      }}
    >
      {/* Background glows */}
      <div
        className="ph-blob-1 absolute -top-24 right-[-8%] w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(238,52,37,0.12) 0%, rgba(238,52,37,0.04) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="ph-blob-2 absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,120,60,0.08) 0%, rgba(255,100,50,0.02) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 0.8px, transparent 0.8px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Particle Energy Network (Canvas) ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <ParticleNetwork className="w-full h-full" />
      </div>

      {/* ── HTML Overlay: Icons + Labels — uses the same NODE_POSITIONS percentages ── */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <div className="relative w-full h-full">
          {STEPS.map((step, i) => {
            const pos = NODE_POSITIONS[i];
            return (
              <div
                key={i}
                className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pos.xPct * 100}%`, top: `${pos.yPct * 100}%` }}
              >
                <div
                  className={`ph-step-html ph-step-html-${i} w-14 h-14 rounded-full flex items-center justify-center`}
                  style={{ opacity: 0 }}
                >
                  <svg
                    width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d={step.icon} />
                  </svg>
                </div>
                <span
                  className={`ph-step-label-html ph-step-label-html-${i} text-[12px] font-bold uppercase tracking-wider text-white/60 mt-3 whitespace-nowrap`}
                  style={{ opacity: 0 }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-[1300px] mx-auto px-6 md:px-14 lg:px-20 pt-52 md:pt-64 pb-36 md:pb-44" style={{ zIndex: 10 }}>
        {/* Badge */}
        <div className="ph-badge mb-5 flex justify-center" style={{ opacity: 0 }}>
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
            style={{
              border: "1px solid rgba(238,52,37,0.25)",
              background: "rgba(238,52,37,0.06)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ backgroundColor: A }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: A }} />
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: "rgba(238,52,37,0.85)" }}>
              Partner With Us
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-center">
          <span className="ph-line block text-4xl md:text-[65px] font-extrabold leading-[1.06] tracking-[-0.025em] text-white">
            Deliver, Earn, and Grow
          </span>
          <span className="ph-line block text-4xl md:text-[65px] font-extrabold leading-[1.06] tracking-[-0.025em]" style={{ color: A }}>
            With QWQER
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="ph-sub mt-5 md:mt-7 max-w-lg mx-auto text-center text-[15px] md:text-base leading-[1.8] text-white/40"
          style={{ opacity: 0 }}
        >
          Start earning anytime. No contracts. No lock-ins.
        </p>

        {/* CTA Button */}
        <div className="ph-cta mt-8 flex justify-center" style={{ opacity: 0 }}>
          <a
            href="#"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(238,52,37,0.3)]"
            style={{ background: A }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
            <span className="relative z-10">Download the App</span>
            <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </a>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <div className="w-full h-28" style={{ background: "linear-gradient(to bottom, transparent 0%, #000 100%)" }} />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px]"
          style={{
            width: "min(70%, 800px)",
            background: "linear-gradient(90deg, transparent, rgba(238,52,37,0.2) 30%, rgba(238,52,37,0.35) 50%, rgba(238,52,37,0.2) 70%, transparent)",
          }}
        />
      </div>
    </section>
  );
}
