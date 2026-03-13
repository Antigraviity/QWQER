"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CareersHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mouse-reactive floating elements
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const floaters = section.querySelectorAll<HTMLElement>(".ch-floater");
      floaters.forEach((el) => {
        const elRect = el.getBoundingClientRect();
        const elX = elRect.left - rect.left + elRect.width / 2;
        const elY = elRect.top - rect.top + elRect.height / 2;

        const dx = elX - mouseX;
        const dy = elY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 30;
          const angle = Math.atan2(dy, dx);
          gsap.to(el, {
            x: Math.cos(angle) * force,
            y: Math.sin(angle) * force,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto",
          });
        }
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Content starts off-screen right (will follow the dart like a train)
      gsap.set(".ch-badge", { opacity: 0, x: "100vw" });
      gsap.set(".ch-line", { opacity: 0, x: "100vw" });
      gsap.set(".ch-sub", { opacity: 0, x: "100vw" });

      // Dart starts off-screen right
      gsap.set(".ch-dart-flying", { x: "100vw", opacity: 1 });
      gsap.set(".ch-impact", { scale: 0, opacity: 0 });

      // Target board visible on the left from the start
      gsap.set(".ch-target-board", { opacity: 1 });
      gsap.set(".ch-target-ring", { scale: 0, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });

      // Phase 1: Target rings appear on the left (faster)
      tl.to(".ch-target-ring", {
        scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.5)",
      });

      // Phase 2: Dart flies from right to left FAST, content follows
      tl.to(".ch-dart-flying", { x: 0, duration: 0.5, ease: "power4.in" }, "+=0.1");

      // Content follows the dart with staggered delays
      tl.to(".ch-badge", { x: 0, opacity: 1, duration: 0.6 }, "-=0.35");
      tl.to(".ch-line", { x: 0, opacity: 1, duration: 0.6, stagger: 0.05 }, "-=0.45");
      tl.to(".ch-sub", { x: 0, opacity: 1, duration: 0.6 }, "-=0.4");

      // Phase 3: Impact — dart hits the bullseye
      tl.to(".ch-impact", { scale: 2, opacity: 1, duration: 0.1, ease: "power2.out" }, "-=0.05");
      tl.to(".ch-impact", { scale: 4, opacity: 0, duration: 0.5, ease: "power2.out" });

      // Board shakes on impact
      tl.to(".ch-target-board", { x: -5, duration: 0.04, ease: "none" }, "-=0.55");
      tl.to(".ch-target-board", { x: 5, duration: 0.04, ease: "none" });
      tl.to(".ch-target-board", { x: -3, duration: 0.04, ease: "none" });
      tl.to(".ch-target-board", { x: 1, duration: 0.04, ease: "none" });
      tl.to(".ch-target-board", { x: 0, duration: 0.06, ease: "power2.out" });

      // Dart sticks — slight recoil bounce
      tl.to(".ch-dart-flying", { x: 8, duration: 0.08, ease: "power2.out" }, "-=0.4");
      tl.to(".ch-dart-flying", { x: 0, duration: 0.15, ease: "elastic.out(1, 0.5)" });

      // Phase 4: After a pause, fade out board and dart
      tl.to([".ch-target-board", ".ch-dart-flying"], {
        opacity: 0, scale: 0.9, duration: 0.6, ease: "power2.in",
      }, "+=0.8");

      // Blob parallax
      gsap.to(".ch-blob-1", { yPercent: 18, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".ch-blob-2", { yPercent: -12, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true } });


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
        className="ch-blob-1 absolute -top-24 left-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(238,52,37,0.1) 0%, rgba(238,52,37,0.03) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="ch-blob-2 absolute top-[50%] right-[-6%] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,120,60,0.06) 0%, rgba(255,100,50,0.02) 45%, transparent 70%)",
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

      {/* ── Target Board on the LEFT ── */}
      <div className="ch-target-board absolute top-1/2 left-[8%] -translate-y-1/2 pointer-events-none z-[5]" style={{ perspective: "800px" }}>
        <div className="ch-target-3d" style={{ transform: "rotateY(20deg) rotateX(5deg)", transformStyle: "preserve-3d" }}>
        <svg width="400" height="400" viewBox="0 0 320 320" fill="none">
          {/* Outer ring */}
          <circle className="ch-target-ring" cx="160" cy="160" r="150" stroke="rgba(238,52,37,0.15)" strokeWidth="3" fill="none" />
          {/* Ring 2 */}
          <circle className="ch-target-ring" cx="160" cy="160" r="120" stroke="rgba(238,52,37,0.2)" strokeWidth="2.5" fill="rgba(238,52,37,0.03)" />
          {/* Ring 3 */}
          <circle className="ch-target-ring" cx="160" cy="160" r="90" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="rgba(238,52,37,0.05)" />
          {/* Ring 4 */}
          <circle className="ch-target-ring" cx="160" cy="160" r="60" stroke="rgba(238,52,37,0.3)" strokeWidth="2" fill="rgba(238,52,37,0.06)" />
          {/* Ring 5 - inner */}
          <circle className="ch-target-ring" cx="160" cy="160" r="30" stroke="rgba(238,52,37,0.4)" strokeWidth="2" fill="rgba(238,52,37,0.1)" />
          {/* Bullseye */}
          <circle className="ch-target-ring" cx="160" cy="160" r="8" fill="#ee3425" />
          {/* Crosshair lines */}
          <line className="ch-target-ring" x1="160" y1="5" x2="160" y2="315" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <line className="ch-target-ring" x1="5" y1="160" x2="315" y2="160" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </svg>



        {/* Impact flash */}
        <div className="ch-impact absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full" style={{
          background: "radial-gradient(circle, rgba(238,52,37,0.8) 0%, rgba(238,52,37,0.3) 40%, transparent 70%)",
        }} />

        {/* 3D shadow beneath the board */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[250px] h-[20px] rounded-full" style={{
          background: "radial-gradient(ellipse, rgba(238,52,37,0.15) 0%, transparent 70%)",
          filter: "blur(8px)",
        }} />
        </div>
      </div>

      {/* ── Flying Dart (separate, travels from right to left to hit the board) ── */}
      <div className="ch-dart-flying absolute top-1/2 left-[8%] -translate-y-1/2 pointer-events-none z-[6]" style={{ marginLeft: "160px" }}>
        <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
          {/* Dart tip (pointing left) */}
          <polygon points="0,10 16,3 16,17" fill="#ee3425" />
          {/* Dart body */}
          <rect x="16" y="6" width="44" height="8" rx="2" fill="#cc2a1e" />
          {/* Dart tail fins */}
          <polygon points="60,0 60,20 76,10" fill="rgba(238,52,37,0.5)" />
          <polygon points="64,3 64,17 78,10" fill="rgba(200,40,30,0.3)" />
          {/* Tail feathers */}
          <rect x="76" y="4" width="24" height="4" rx="1.5" fill="rgba(238,52,37,0.4)" />
          <rect x="76" y="12" width="24" height="4" rx="1.5" fill="rgba(238,52,37,0.4)" />
          <rect x="78" y="8" width="20" height="4" rx="1.5" fill="rgba(238,52,37,0.25)" />
        </svg>
      </div>

      {/* ── Floating elements ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        {/* Cross */}
        <svg className="ch-floater absolute top-[12%] right-[12%]" width="36" height="36" viewBox="0 0 36 36">
          <line x1="18" y1="4" x2="18" y2="32" stroke="rgba(238,52,37,0.45)" strokeWidth="2" />
          <line x1="4" y1="18" x2="32" y2="18" stroke="rgba(238,52,37,0.45)" strokeWidth="2" />
        </svg>

        {/* Circle */}
        <div className="ch-floater absolute top-[20%] left-[18%] w-5 h-5 rounded-full border-2 border-[#ee3425]/40" style={{ boxShadow: "0 0 12px rgba(238,52,37,0.2)" }} />

        {/* Diamond */}
        <div className="ch-floater absolute top-[70%] right-[20%] w-5 h-5 rotate-45 border-2 border-[#ee3425]/35" style={{ boxShadow: "0 0 10px rgba(238,52,37,0.15)" }} />

        {/* Glowing dot */}
        <div className="ch-floater absolute top-[16%] left-[35%] w-2.5 h-2.5 rounded-full bg-[#ee3425]/50" style={{ boxShadow: "0 0 16px rgba(238,52,37,0.4), 0 0 30px rgba(238,52,37,0.15)" }} />

        {/* Ring */}
        <div className="ch-floater absolute top-[60%] left-[8%] w-10 h-10 rounded-full border-2 border-[#ee3425]/25" style={{ boxShadow: "0 0 15px rgba(238,52,37,0.1)" }} />

        {/* Dot */}
        <div className="ch-floater absolute top-[45%] right-[6%] w-2 h-2 rounded-full bg-white/25" style={{ boxShadow: "0 0 12px rgba(255,255,255,0.15)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-14 lg:px-20 pt-40 md:pt-52 pb-28 md:pb-40">
        {/* Badge */}
        <div className="ch-badge mb-5 flex justify-center" style={{ opacity: 0 }}>
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
              We&apos;re Hiring
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-center">
          <span className="ch-line block text-4xl md:text-[65px] font-extrabold leading-[1.06] tracking-[-0.025em] text-white">
            Careers at
          </span>
          <span className="ch-line block text-4xl md:text-[65px] font-extrabold leading-[1.06] tracking-[-0.025em]" style={{ color: A }}>
            QWQER
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="ch-sub mt-5 md:mt-7 max-w-2xl mx-auto text-center text-[15px] md:text-lg leading-[1.8] text-white/70"
          style={{ opacity: 0 }}
        >
          Do you like solving real operational problems, taking ownership, and working in fast-moving, real-world environments?
        </p>
      </div>

      {/* Keyframes for orbit animations */}


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
