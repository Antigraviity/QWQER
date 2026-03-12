"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MILESTONES = [
  {
    year: "2019",
    items: ["Began operations in Bangalore", "Scaled up operations in multiple segments & industries"],
  },
  {
    year: "2021",
    items: ["Spread Express across South India", "Started QWQER Shop in 1 location"],
  },
  {
    year: "2022",
    items: ["Expanded QWQER Shop to multiple locations", "Launch of transportation offering"],
  },
  {
    year: "2023",
    items: ["Started Pan India operations with marquee clients"],
  },
  {
    year: "2024",
    items: ["Presence across all major transportation lanes", "200+ satisfied customers", "3 Lakh+ successful trips"],
  },
];

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Badge */
      gsap.fromTo(".ah-badge", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.25 });

      /* Headline — letter-by-letter reveal */
      document.querySelectorAll(".ah-line").forEach((line) => {
        const el = line as HTMLElement;
        const text = el.textContent || "";
        el.textContent = "";
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.opacity = "0.12";
          span.classList.add("ah-char");
          if (char === " ") span.style.width = "0.3em";
          el.appendChild(span);
        });
      });
      gsap.to(".ah-char", {
        opacity: 1,
        duration: 0.06,
        stagger: 0.035,
        delay: 0.4,
        ease: "none",
      });

      /* Subtext */
      gsap.fromTo(".ah-sub", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.95 });

      /* ── Milestone timeline animation ── */

      const TRACK_DELAY = 1.0;
      const TRACK_DUR = 2.5;
      const TRUCK_DELAY = 1.3;
      const TRUCK_DUR = 5;
      const TOTAL = MILESTONES.length;

      // Track draws in
      gsap.fromTo(".ah-track", { scaleX: 0 }, { scaleX: 1, duration: TRACK_DUR, ease: "power2.inOut", delay: TRACK_DELAY, transformOrigin: "left center" });

      // Trail follows truck
      gsap.fromTo(".ah-trail", { scaleX: 0 }, { scaleX: 1, duration: TRUCK_DUR, ease: "power1.inOut", delay: TRUCK_DELAY, transformOrigin: "left center" });

      // Truck drives across
      gsap.fromTo(".ah-truck", { left: "-2%", opacity: 1 }, { left: "97%", duration: TRUCK_DUR, ease: "power1.inOut", delay: TRUCK_DELAY });

      // Milestones appear as truck passes
      MILESTONES.forEach((_, i) => {
        const pos = ((i + 1) / (TOTAL + 1)) * 100;
        const progress = (pos - (-2)) / (97 - (-2));
        const arrivalTime = TRUCK_DELAY + TRUCK_DUR * progress;

        // Dot appears
        gsap.set(`.ah-dot-${i}`, { scale: 0, opacity: 0 });
        gsap.to(`.ah-dot-${i}`, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out", delay: arrivalTime - 0.1 });

        // Pulse ring
        gsap.set(`.ah-ring-${i}`, { opacity: 0 });
        gsap.to(`.ah-ring-${i}`, {
          opacity: 1, delay: arrivalTime + 0.2, duration: 0.01,
          onComplete: () => {
            const ring = document.querySelector(`.ah-ring-${i}`) as HTMLElement;
            if (ring) ring.style.animation = "ringPing 2.5s ease-out infinite";
          },
        });

        // Content + Year card drops in from above
        gsap.set(`.ah-card-${i}`, { y: -20, opacity: 0 });
        gsap.to(`.ah-card-${i}`, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(2)", delay: arrivalTime });
      });

      /* Blob parallax */
      gsap.to(".ah-blob-1", { yPercent: 20, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".ah-blob-2", { yPercent: -14, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".ah-blob-3", { yPercent: 10, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const A = "#ee3425"; // brand accent

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(175deg, #0c0c0c 0%, #111214 30%, #141618 55%, #111214 80%, #0a0a0a 100%)",
      }}
    >
      {/* ── Vibrant background glows ──────────────────────────── */}

      {/* Primary red glow — top right */}
      <div
        className="ah-blob-1 absolute -top-24 right-[-8%] w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(238,52,37,0.12) 0%, rgba(238,52,37,0.04) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Warm orange glow — mid left */}
      <div
        className="ah-blob-2 absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,120,60,0.08) 0%, rgba(255,100,50,0.02) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Subtle magenta glow — bottom center */}
      <div
        className="ah-blob-3 absolute -bottom-20 left-[30%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(238,52,37,0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.5) 0.8px, transparent 0.8px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Drifting clouds (realistic SVG paths) ────────── */}
      <div className="absolute top-0 left-0 w-full h-[320px] pointer-events-none overflow-hidden z-[1]">

        {/* Cloud 1 — large fluffy */}
        <svg className="absolute" style={{ top: "12px", width: "340px", height: "100px", opacity: 0.08, animation: "cloudDrift1 34s linear infinite" }} viewBox="0 0 340 100" fill="white">
          <path d="M300 80 Q300 80 300 80 L40 80 Q20 80 20 65 Q20 52 35 48 Q30 30 50 22 Q70 14 90 22 Q100 8 125 5 Q155 2 175 15 Q190 5 215 8 Q240 11 250 28 Q270 20 290 30 Q310 40 305 58 Q320 62 320 72 Q320 80 300 80 Z" />
        </svg>

        {/* Cloud 2 — medium puffed */}
        <svg className="absolute" style={{ top: "55px", width: "260px", height: "80px", opacity: 0.065, animation: "cloudDrift2 26s linear infinite" }} viewBox="0 0 260 80" fill="white">
          <path d="M230 65 L30 65 Q15 65 15 52 Q15 42 30 38 Q25 22 45 15 Q65 8 80 18 Q92 5 115 4 Q140 3 150 18 Q165 10 185 15 Q205 20 210 35 Q225 30 235 40 Q245 50 240 58 Q245 62 240 65 Z" />
        </svg>

        {/* Cloud 3 — small fast wisp */}
        <svg className="absolute" style={{ top: "110px", width: "200px", height: "65px", opacity: 0.07, animation: "cloudDrift3 19s linear infinite" }} viewBox="0 0 200 65" fill="white">
          <path d="M175 52 L25 52 Q12 52 12 42 Q12 33 25 30 Q20 18 38 12 Q55 6 68 15 Q78 4 98 3 Q120 2 128 15 Q140 8 158 14 Q172 20 172 34 Q182 36 185 44 Q188 52 175 52 Z" />
        </svg>

        {/* Cloud 4 — wide slow background */}
        <svg className="absolute" style={{ top: "25px", width: "420px", height: "95px", opacity: 0.05, animation: "cloudDrift4 42s linear infinite" }} viewBox="0 0 420 95" fill="white">
          <path d="M380 78 L40 78 Q20 78 20 62 Q20 50 38 45 Q32 28 55 18 Q78 8 100 20 Q112 5 145 3 Q178 1 195 18 Q210 6 240 8 Q268 10 278 28 Q295 18 318 24 Q340 30 342 48 Q365 45 378 55 Q392 65 385 75 Q390 78 380 78 Z" />
        </svg>

        {/* Cloud 5 — lower small */}
        <svg className="absolute" style={{ top: "160px", width: "220px", height: "70px", opacity: 0.055, animation: "cloudDrift5 30s linear infinite" }} viewBox="0 0 220 70" fill="white">
          <path d="M195 56 L25 56 Q12 56 12 44 Q12 35 26 32 Q22 20 40 13 Q58 6 72 16 Q82 5 105 3 Q128 2 138 16 Q150 10 168 15 Q184 20 186 36 Q198 38 202 46 Q206 54 195 56 Z" />
        </svg>

        {/* Cloud 6 — tiny quick accent */}
        <svg className="absolute" style={{ top: "85px", width: "150px", height: "50px", opacity: 0.07, animation: "cloudDrift6 17s linear infinite" }} viewBox="0 0 150 50" fill="white">
          <path d="M132 40 L18 40 Q8 40 8 32 Q8 25 20 22 Q16 14 30 9 Q44 4 55 12 Q62 3 80 2 Q98 2 105 14 Q115 9 128 16 Q138 22 135 32 Q140 36 138 40 Z" />
        </svg>

        {/* Cloud 7 — extra large distant */}
        <svg className="absolute" style={{ top: "5px", width: "480px", height: "105px", opacity: 0.04, animation: "cloudDrift7 50s linear infinite" }} viewBox="0 0 480 105" fill="white">
          <path d="M440 88 L40 88 Q18 88 18 70 Q18 55 38 50 Q30 32 58 20 Q85 8 110 22 Q125 5 160 3 Q198 1 218 20 Q235 6 268 8 Q300 10 312 30 Q332 18 358 25 Q382 32 385 52 Q408 48 428 58 Q448 68 445 80 Q452 85 445 88 Z" />
        </svg>

      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-14 lg:px-20 pt-36 md:pt-44 pb-6">
        {/* Badge */}
        <div className="ah-badge mb-5" style={{ opacity: 0 }}>
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
              About Us
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl">
          <span className="ah-line block text-4xl md:text-[65px] font-extrabold leading-[1.06] tracking-[-0.025em] text-white">
            Built by operators.
          </span>
          <span className="ah-line block text-4xl md:text-[65px] font-extrabold leading-[1.06] tracking-[-0.025em] text-white">
            Powered by precision.
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="ah-sub mt-5 md:mt-7 max-w-lg text-[15px] md:text-base leading-[1.8] text-white/40"
          style={{ opacity: 0 }}
        >
          From the first mile to the final doorstep, we orchestrate every
          handoff, every route, and every delivery with operational discipline
          — so your supply chain never skips a beat.
        </p>
      </div>

      {/* ── Milestone Timeline ──────────────────────────────────── */}
      <div className="relative z-10 w-full mt-10 md:mt-14 pb-10 md:pb-14">
        <div className="relative mx-6 md:mx-14 lg:mx-20 max-w-[1300px] xl:mx-auto">
          <div className="relative w-full" style={{ minHeight: "280px" }}>

            {/* ── Year labels (above line) & Content cards (below line) ── */}
            {MILESTONES.map((m, i) => {
              const left = ((i + 1) / (MILESTONES.length + 1)) * 100;
              return (
                <div key={m.year} className="absolute flex flex-col items-center" style={{ left: `${left}%`, bottom: "50%", transform: "translateX(-50%)", width: "160px" }}>
                  <div
                    className={`ah-card-${i} flex flex-col items-center`}
                    style={{ opacity: 0, marginBottom: "16px" }}
                  >
                    <div className="flex flex-col gap-1.5 mb-3 min-h-[70px] justify-end">
                      {m.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-1.5">
                          <svg className="w-2.5 h-2.5 shrink-0 mt-[3px]" viewBox="0 0 10 10" fill="none">
                            <path d="M1 5 L4 8 L9 2" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-[9px] md:text-[10px] text-white/50 leading-[1.4]">{item}</span>
                        </div>
                      ))}
                    </div>
                    <span className={`ah-year-${i} text-lg md:text-xl font-black text-white tracking-tight`}>{m.year}</span>
                  </div>
                </div>
              );
            })}

            {/* ── Route line (centered vertically) ──────────────── */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-[0.5px] h-[2px]">
              <div
                className="ah-track absolute inset-0 rounded-full"
                style={{ background: "rgba(255,255,255,0.06)", transformOrigin: "left center", transform: "scaleX(0)" }}
              />
              <div
                className="ah-trail absolute inset-0 h-[3px] -top-[0.5px] rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${A}, rgba(238,52,37,0.5) 55%, rgba(238,52,37,0.1) 90%, transparent 100%)`,
                  boxShadow: `0 0 14px rgba(238,52,37,0.25), 0 0 40px rgba(238,52,37,0.08)`,
                  transformOrigin: "left center",
                  transform: "scaleX(0)",
                }}
              />
            </div>

            {/* ── Stop dots ──────────────────────────────────── */}
            {MILESTONES.map((m, i) => {
              const left = ((i + 1) / (MILESTONES.length + 1)) * 100;
              return (
                <div
                  key={`dot-${m.year}`}
                  className="absolute top-1/2"
                  style={{ left: `${left}%`, transform: "translate(-50%, -50%)" }}
                >
                  <div
                    className={`ah-ring-${i} absolute w-3 h-3 rounded-full -top-1.5 -left-1.5`}
                    style={{ border: `1.5px solid ${A}`, opacity: 0 }}
                  />
                  <div
                    className={`ah-dot-${i} w-[7px] h-[7px] rounded-full`}
                    style={{ backgroundColor: A, boxShadow: `0 0 10px rgba(238,52,37,0.5), 0 0 20px rgba(238,52,37,0.15)`, opacity: 0, transform: "scale(0)" }}
                  />
                </div>
              );
            })}

            {/* ── Truck ───────────────────────────────────────── */}
            <div className="ah-truck absolute top-1/2 z-10" style={{ left: "-2%", transform: "translateY(-50%)" }}>
              <div className="relative -top-[12px] -left-[15px]">
                <div className="absolute top-1 -left-1 w-10 h-6 rounded-full blur-md" style={{ backgroundColor: "rgba(238,52,37,0.25)" }} />
                <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                  <rect x="0" y="3" width="18" height="11" rx="2" fill={A} />
                  <line x1="4" y1="6" x2="14" y2="6" stroke="white" strokeWidth="0.6" opacity="0.3" />
                  <line x1="4" y1="8.5" x2="14" y2="8.5" stroke="white" strokeWidth="0.6" opacity="0.3" />
                  <line x1="4" y1="11" x2="14" y2="11" stroke="white" strokeWidth="0.6" opacity="0.3" />
                  <path d="M18 7L23.5 7L26 11L26 14L18 14Z" fill="#b8201a" strokeLinejoin="round" />
                  <path d="M19 7.5L22.5 7.5L25 11L19 11Z" fill="white" opacity="0.15" />
                  <circle cx="6" cy="15.5" r="2.8" fill="#222" />
                  <circle cx="6" cy="15.5" r="1.4" fill="#444" />
                  <circle cx="22" cy="15.5" r="2.8" fill="#222" />
                  <circle cx="22" cy="15.5" r="1.4" fill="#444" />
                  <rect x="26" y="10" width="2" height="2.5" rx="0.5" fill="#ffcc44" opacity="0.7" />
                </svg>
              </div>
            </div>

            {/* Origin dot */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <div className="w-[9px] h-[9px] rounded-full border-2" style={{ borderColor: A, backgroundColor: "transparent" }} />
            </div>

            {/* Destination dot */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div className="w-[9px] h-[9px] rounded-full border-2" style={{ borderColor: A, backgroundColor: "transparent" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom separator ──────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <div className="w-full h-28" style={{ background: "linear-gradient(to bottom, transparent 0%, #000 100%)" }} />
        {/* Accent line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px]"
          style={{
            width: "min(70%, 800px)",
            background: `linear-gradient(90deg, transparent, rgba(238,52,37,0.2) 30%, rgba(238,52,37,0.35) 50%, rgba(238,52,37,0.2) 70%, transparent)`,
          }}
        />
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes ringPing {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        @keyframes dotPop {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes cloudDrift1 {
          0%   { left: 110%; }
          100% { left: -340px; }
        }
        @keyframes cloudDrift2 {
          0%   { left: -260px; }
          100% { left: 110%; }
        }
        @keyframes cloudDrift3 {
          0%   { left: 110%; }
          100% { left: -200px; }
        }
        @keyframes cloudDrift4 {
          0%   { left: -420px; }
          100% { left: 110%; }
        }
        @keyframes cloudDrift5 {
          0%   { left: 110%; }
          100% { left: -220px; }
        }
        @keyframes cloudDrift6 {
          0%   { left: -150px; }
          100% { left: 110%; }
        }
        @keyframes cloudDrift7 {
          0%   { left: 110%; }
          100% { left: -480px; }
        }
      `}</style>
    </section>
  );
}
