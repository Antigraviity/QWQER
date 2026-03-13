"use client";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─── Indian cities with pixel-mapped positions (normalized 0-1) ─── */
/* Based on India's bounding box: lat 8-35°N, lon 68-97°E */
const CITIES = [
  { name: "Mumbai",    x: 0.18, y: 0.58 },
  { name: "Delhi",     x: 0.35, y: 0.18 },
  { name: "Bangalore", x: 0.34, y: 0.78 },
  { name: "Chennai",   x: 0.45, y: 0.76 },
  { name: "Hyderabad", x: 0.38, y: 0.64 },
  { name: "Kolkata",   x: 0.72, y: 0.42 },
  { name: "Pune",      x: 0.22, y: 0.62 },
  { name: "Ahmedabad", x: 0.16, y: 0.38 },
  { name: "Jaipur",    x: 0.28, y: 0.26 },
  { name: "Lucknow",   x: 0.44, y: 0.28 },
  { name: "Kochi",     x: 0.28, y: 0.88 },
  { name: "Indore",    x: 0.28, y: 0.44 },
];

const ROUTES = [
  [0, 1],  // Mumbai → Delhi
  [2, 3],  // Bangalore → Chennai
  [0, 2],  // Mumbai → Bangalore
  [1, 5],  // Delhi → Kolkata
  [4, 1],  // Hyderabad → Delhi
  [0, 6],  // Mumbai → Pune
  [7, 1],  // Ahmedabad → Delhi
  [8, 9],  // Jaipur → Lucknow
  [3, 4],  // Chennai → Hyderabad
  [5, 2],  // Kolkata → Bangalore
  [10, 2], // Kochi → Bangalore
  [11, 0], // Indore → Mumbai
];

/* India outline (simplified polygon, normalized 0-1) */
const INDIA_OUTLINE = [
  [0.30, 0.02], [0.38, 0.04], [0.50, 0.06], [0.58, 0.08],
  [0.65, 0.12], [0.72, 0.18], [0.78, 0.22], [0.82, 0.28],
  [0.84, 0.34], [0.82, 0.38], [0.78, 0.42], [0.74, 0.46],
  [0.72, 0.50], [0.68, 0.54], [0.62, 0.58], [0.58, 0.62],
  [0.54, 0.66], [0.50, 0.72], [0.46, 0.76], [0.42, 0.80],
  [0.38, 0.84], [0.34, 0.88], [0.30, 0.92], [0.26, 0.94],
  [0.24, 0.90], [0.22, 0.86], [0.24, 0.80], [0.26, 0.74],
  [0.22, 0.68], [0.18, 0.62], [0.14, 0.56], [0.10, 0.50],
  [0.08, 0.44], [0.10, 0.38], [0.12, 0.32], [0.16, 0.26],
  [0.20, 0.20], [0.22, 0.14], [0.24, 0.08], [0.28, 0.04],
];

export default function GlobeFleet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const secRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const timeRef = useRef(0);
  const revealRef = useRef(0); // 0→1 controls sequential reveal
  const mapOpacityRef = useRef(0); // canvas fade-in
  const trucksRef = useRef<{
    progress: number;
    speed: number;
    from: number;
    to: number;
  }[]>([]);

  const init = useCallback(() => {
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

    // Initialize trucks
    trucksRef.current = ROUTES.map((_, i) => ({
      progress: (i * 0.08) % 1,
      speed: 0.15 + Math.random() * 0.12,
      from: ROUTES[i][0],
      to: ROUTES[i][1],
    }));
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    init();

    const canvas = canvasRef.current;
    const sec = secRef.current;
    if (!canvas || !sec) return;

    /* ── GSAP text animations ── */
    gsap.set(".gf-badge", { opacity: 0, y: 20 });
    gsap.set(".gf-title", { opacity: 0, y: 40 });
    gsap.set(".gf-desc", { opacity: 0, y: 25 });
    gsap.set(".gf-stat", { opacity: 0, y: 30 });
    gsap.set(".gf-map", { opacity: 0, scale: 0.92 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(".gf-badge", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
      .to(".gf-title", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
      .to(".gf-desc", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(".gf-stat", { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power3.out" }, "-=0.3")
      .to(".gf-map", { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, "-=0.6");

    /* ── Canvas reveal: animate mapOpacity and reveal progress ── */
    const revealObj = { val: 0, opacity: 0 };
    gsap.to(revealObj, {
      val: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      delay: 0,
      scrollTrigger: {
        trigger: sec,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      onUpdate: () => {
        revealRef.current = revealObj.val;
        mapOpacityRef.current = revealObj.opacity;
      },
    });

    const A = { r: 238, g: 52, b: 37 };

    /* Quadratic bezier arc — control point lifted upward-left */
    function getArcPoint(
      x1: number, y1: number, x2: number, y2: number, t: number,
      w: number, h: number
    ) {
      // Control point: midpoint shifted up and slightly perpendicular
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Perpendicular offset (curve outward)
      const perpX = -dy / dist;
      const perpY = dx / dist;
      const lift = dist * 0.3;
      const cx = mx + perpX * lift;
      const cy = my + perpY * lift - dist * 0.15; // also lift upward

      const mt = 1 - t;
      return {
        x: mt * mt * x1 + 2 * mt * t * cx + t * t * x2,
        y: mt * mt * y1 + 2 * mt * t * cy + t * t * y2,
      };
    }

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const time = timeRef.current;
      const reveal = revealRef.current;
      const mapAlpha = mapOpacityRef.current;

      // Global canvas opacity
      ctx.globalAlpha = mapAlpha;

      // Padding for the map area
      const pad = 40;
      const mapW = w - pad * 2;
      const mapH = h - pad * 2;

      const cx = (nx: number) => pad + nx * mapW;
      const cy = (ny: number) => pad + ny * mapH;

      /* ── India outline (draws progressively) ── */
      const outlineCount = Math.floor(reveal * INDIA_OUTLINE.length);
      if (outlineCount > 1) {
        ctx.beginPath();
        for (let i = 0; i < outlineCount; i++) {
          const p = INDIA_OUTLINE[i];
          const px = cx(p[0]);
          const py = cy(p[1]);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        if (reveal >= 1) ctx.closePath();
        ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},0.12)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (reveal >= 1) {
          ctx.fillStyle = `rgba(${A.r},${A.g},${A.b},0.02)`;
          ctx.fill();
        }
      }

      /* ── Dashed route arcs (appear after outline is drawn) ── */
      const routeReveal = Math.max(0, (reveal - 0.3) / 0.7); // starts at 30% reveal
      ROUTES.forEach((route, ri) => {
        // Stagger each route
        const routeT = Math.max(0, Math.min(1, (routeReveal - ri * 0.06) * 2));
        if (routeT <= 0) return;

        const from = CITIES[route[0]];
        const to = CITIES[route[1]];
        const drawSegs = Math.floor(routeT * 60);

        ctx.beginPath();
        ctx.setLineDash([6, 4]);
        for (let i = 0; i <= drawSegs; i++) {
          const t = i / 60;
          const p = getArcPoint(cx(from.x), cy(from.y), cx(to.x), cy(to.y), t, w, h);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},${0.12 * routeT})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      /* ── Traveling trucks with trails (only after routes are visible) ── */
      if (reveal < 0.6) { rafRef.current = requestAnimationFrame(draw); ctx.globalAlpha = 1; return; }
      const truckAlpha = Math.min(1, (reveal - 0.6) / 0.4);

      trucksRef.current.forEach((truck) => {
        truck.progress += truck.speed * 0.016;
        if (truck.progress > 1) truck.progress = 0;

        const from = CITIES[truck.from];
        const to = CITIES[truck.to];

        // Draw trail (solid line behind truck)
        const trailLen = 0.15;
        const trailStart = Math.max(0, truck.progress - trailLen);
        ctx.beginPath();
        const segments = 30;
        for (let i = 0; i <= segments; i++) {
          const t = trailStart + (truck.progress - trailStart) * (i / segments);
          const p = getArcPoint(cx(from.x), cy(from.y), cx(to.x), cy(to.y), t, w, h);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        const trailGrad = ctx.createLinearGradient(
          cx(from.x), cy(from.y), cx(to.x), cy(to.y)
        );
        trailGrad.addColorStop(0, `rgba(${A.r},${A.g},${A.b},0)`);
        trailGrad.addColorStop(1, `rgba(${A.r},${A.g},${A.b},0.6)`);
        ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},0.5)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Truck dot
        const tp = getArcPoint(cx(from.x), cy(from.y), cx(to.x), cy(to.y), truck.progress, w, h);

        // Glow
        ctx.globalAlpha = mapAlpha * truckAlpha;
        const glow = ctx.createRadialGradient(tp.x, tp.y, 0, tp.x, tp.y, 18);
        glow.addColorStop(0, `rgba(${A.r},${A.g},${A.b},0.6)`);
        glow.addColorStop(1, `rgba(${A.r},${A.g},${A.b},0)`);
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${A.r},${A.g},${A.b})`;
        ctx.fill();

        // White core
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();
        ctx.globalAlpha = mapAlpha;
      });

      /* ── City dots (appear sequentially) ── */
      const cityReveal = Math.max(0, (reveal - 0.15) / 0.6);
      CITIES.forEach((city, i) => {
        const cityT = Math.max(0, Math.min(1, (cityReveal - i * 0.07) * 3));
        if (cityT <= 0) return;

        const px = cx(city.x);
        const py = cy(city.y);
        const cityScale = 0.3 + 0.7 * cityT;

        // Pulse ring
        const pulse = ((time * 0.6 + i * 0.4) % 2);
        if (pulse < 1.5) {
          const pr = 6 + pulse * 14;
          const pa = Math.max(0, 0.25 * (1 - pulse / 1.5));
          ctx.beginPath();
          ctx.arc(px, py, pr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},${pa})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Outer glow
        ctx.globalAlpha = mapAlpha * cityT;
        const cGlow = ctx.createRadialGradient(px, py, 0, px, py, 12 * cityScale);
        cGlow.addColorStop(0, `rgba(${A.r},${A.g},${A.b},0.3)`);
        cGlow.addColorStop(1, `rgba(${A.r},${A.g},${A.b},0)`);
        ctx.beginPath();
        ctx.arc(px, py, 12 * cityScale, 0, Math.PI * 2);
        ctx.fillStyle = cGlow;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(px, py, 5 * cityScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${A.r},${A.g},${A.b})`;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(px, py, 2 * cityScale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fill();

        // City name (fades in)
        ctx.globalAlpha = mapAlpha * Math.max(0, cityT - 0.4) / 0.6;
        ctx.font = "bold 9px sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.textAlign = "center";
        ctx.fillText(city.name.toUpperCase(), px, py + 16);
        ctx.globalAlpha = mapAlpha;
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [init]);

  return (
    <section
      ref={secRef}
      className="relative py-6 md:py-10 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#000 0%,#060608 50%,#000 100%)" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(238,52,37,0.05) 0%,transparent 60%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-14 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left */}
          <div className="flex-1 max-w-xl">
            <div className="gf-badge mb-5">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{ border: "1px solid rgba(238,52,37,0.25)", background: "rgba(238,52,37,0.06)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50 bg-[#ee3425]" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ee3425]" />
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: "rgba(238,52,37,0.85)" }}>
                  Pan-India Network
                </span>
              </div>
            </div>

            <h2 className="gf-title text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Connecting cities.<br />
              <span style={{ color: "#ee3425" }}>Powering commerce.</span>
            </h2>

            <p className="gf-desc text-white/70 text-[15px] md:text-base leading-[1.8] mb-8">
              Our fleet network spans major Indian cities, delivering goods
              across intercity corridors with real-time tracking, optimized
              routes, and operational precision — from first mile to final
              doorstep.
            </p>

            <div className="flex gap-8 md:gap-12">
              <div className="gf-stat">
                <div className="text-2xl md:text-3xl font-black text-white">10+</div>
                <div className="text-[12px] text-white/70 mt-1 uppercase tracking-wider">Major Cities</div>
              </div>
              <div className="gf-stat">
                <div className="text-2xl md:text-3xl font-black text-white">200+</div>
                <div className="text-[12px] text-white/70 mt-1 uppercase tracking-wider">Clients Served</div>
              </div>
              <div className="gf-stat">
                <div className="text-2xl md:text-3xl font-black text-white">3L+</div>
                <div className="text-[12px] text-white/70 mt-1 uppercase tracking-wider">Trips Completed</div>
              </div>
            </div>
          </div>

          {/* Right: India Map Canvas */}
          <div className="flex-1 w-full lg:w-auto lg:flex-[1.3]">
            <div className="gf-map relative w-full max-w-[700px] mx-auto" style={{ aspectRatio: "0.85" }}>
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
