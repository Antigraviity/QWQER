"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CareersHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".ch-badge", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.25 });
      gsap.fromTo(".ch-line", { y: 55, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.13, delay: 0.35 });
      gsap.fromTo(".ch-sub", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.85 });

      // Floating icons
      gsap.utils.toArray<HTMLElement>(".ch-float").forEach((el, i) => {
        gsap.to(el, {
          y: -10 - i * 4,
          duration: 2.8 + i * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.5,
        });
      });

      // Blob parallax
      gsap.to(".ch-blob-1", { yPercent: 18, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".ch-blob-2", { yPercent: -12, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true } });

      // Particles drifting upward
      gsap.utils.toArray<HTMLElement>(".ch-particle").forEach((el, i) => {
        gsap.to(el, {
          y: -(120 + i * 25),
          x: (i % 2 === 0 ? 1 : -1) * (15 + i * 4),
          opacity: 0,
          duration: 4.5 + i * 0.4,
          ease: "none",
          repeat: -1,
          delay: i * 0.35,
        });
      });

      // Network lines drawing in
      gsap.utils.toArray<HTMLElement>(".ch-net-line").forEach((line, i) => {
        const el = line as unknown as SVGLineElement;
        const length = Math.sqrt(
          Math.pow(parseFloat(el.getAttribute("x2") || "0") - parseFloat(el.getAttribute("x1") || "0"), 2) +
          Math.pow(parseFloat(el.getAttribute("y2") || "0") - parseFloat(el.getAttribute("y1") || "0"), 2)
        );
        gsap.set(el, { strokeDasharray: 1000, strokeDashoffset: 1000 });
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.8 + i * 0.15,
        });
      });

      // Network nodes popping in
      gsap.fromTo(".ch-net-node",
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: "back.out(2)",
          delay: 1.2,
        }
      );

      // Nodes pulsing after appearing
      gsap.utils.toArray<HTMLElement>(".ch-net-node").forEach((node, i) => {
        gsap.to(node, {
          scale: 1.4,
          opacity: 0.6,
          duration: 1.5 + i * 0.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2 + i * 0.2,
        });
      });
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

      {/* Animated orbit rings — centered behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* Outer orbit */}
        <div className="absolute w-[550px] h-[550px] -top-[275px] -left-[275px] rounded-full" style={{
          border: "1px solid rgba(238,52,37,0.07)",
          animation: "ch-orbit 28s linear infinite",
        }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "rgba(238,52,37,0.35)", boxShadow: "0 0 10px rgba(238,52,37,0.25)" }} />
        </div>
        {/* Middle orbit */}
        <div className="absolute w-[380px] h-[380px] -top-[190px] -left-[190px] rounded-full" style={{
          border: "1px dashed rgba(255,255,255,0.04)",
          animation: "ch-orbit 20s linear infinite reverse",
        }}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.25)", boxShadow: "0 0 8px rgba(255,255,255,0.12)" }} />
        </div>
        {/* Inner orbit */}
        <div className="absolute w-[220px] h-[220px] -top-[110px] -left-[110px] rounded-full" style={{
          border: "1px solid rgba(238,52,37,0.05)",
          animation: "ch-orbit 14s linear infinite",
        }}>
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full" style={{ background: "rgba(238,52,37,0.45)", boxShadow: "0 0 6px rgba(238,52,37,0.25)" }} />
        </div>
        {/* Central pulsing glow */}
        <div className="absolute w-[140px] h-[140px] -top-[70px] -left-[70px] rounded-full" style={{
          background: "radial-gradient(circle, rgba(238,52,37,0.05) 0%, transparent 70%)",
          animation: "ch-pulse 3s ease-in-out infinite",
        }} />
      </div>

      {/* Floating particles — rising dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={`cp-${i}`}
            className="ch-particle absolute rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: i % 4 === 0 ? "rgba(238,52,37,0.35)" : "rgba(255,255,255,0.12)",
              boxShadow: i % 4 === 0 ? "0 0 6px rgba(238,52,37,0.25)" : "none",
              left: `${5 + (i * 9.2) % 88}%`,
              top: `${65 + (i * 11) % 30}%`,
            }}
          />
        ))}
      </div>

      {/* Animated network lines — connecting-dots pattern */}
      <svg className="absolute top-[10%] left-0 w-full h-[80%] pointer-events-none" preserveAspectRatio="none">
        {/* Network connection lines */}
        <line className="ch-net-line" x1="10%" y1="20%" x2="25%" y2="45%" stroke="rgba(238,52,37,0.06)" strokeWidth="1" />
        <line className="ch-net-line" x1="25%" y1="45%" x2="50%" y2="30%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line className="ch-net-line" x1="50%" y1="30%" x2="75%" y2="55%" stroke="rgba(238,52,37,0.05)" strokeWidth="1" />
        <line className="ch-net-line" x1="75%" y1="55%" x2="90%" y2="25%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line className="ch-net-line" x1="15%" y1="70%" x2="40%" y2="60%" stroke="rgba(238,52,37,0.04)" strokeWidth="1" />
        <line className="ch-net-line" x1="40%" y1="60%" x2="65%" y2="75%" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line className="ch-net-line" x1="65%" y1="75%" x2="85%" y2="65%" stroke="rgba(238,52,37,0.04)" strokeWidth="1" />
        {/* Network nodes */}
        <circle className="ch-net-node" cx="10%" cy="20%" r="3" fill="rgba(238,52,37,0.2)" />
        <circle className="ch-net-node" cx="25%" cy="45%" r="2.5" fill="rgba(255,255,255,0.1)" />
        <circle className="ch-net-node" cx="50%" cy="30%" r="3" fill="rgba(238,52,37,0.15)" />
        <circle className="ch-net-node" cx="75%" cy="55%" r="2.5" fill="rgba(255,255,255,0.08)" />
        <circle className="ch-net-node" cx="90%" cy="25%" r="2" fill="rgba(238,52,37,0.15)" />
        <circle className="ch-net-node" cx="15%" cy="70%" r="2" fill="rgba(255,255,255,0.08)" />
        <circle className="ch-net-node" cx="40%" cy="60%" r="3" fill="rgba(238,52,37,0.12)" />
        <circle className="ch-net-node" cx="65%" cy="75%" r="2.5" fill="rgba(255,255,255,0.06)" />
        <circle className="ch-net-node" cx="85%" cy="65%" r="2" fill="rgba(238,52,37,0.1)" />
      </svg>

      {/* Floating icons — career/work themed */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Briefcase */}
        <div className="ch-float absolute top-[18%] right-[10%]">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(238,52,37,0.3) 0%, rgba(238,52,37,0.08) 40%, transparent 70%)", filter: "blur(12px)", transform: "scale(1.8)" }} />
            <svg className="relative" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="12.01" /></svg>
          </div>
        </div>
        {/* Users / Team */}
        <div className="ch-float absolute top-[30%] left-[7%]">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(238,52,37,0.25) 0%, rgba(238,52,37,0.06) 40%, transparent 70%)", filter: "blur(14px)", transform: "scale(1.8)" }} />
            <svg className="relative" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
          </div>
        </div>
        {/* Rocket */}
        <div className="ch-float absolute top-[55%] right-[5%]">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(238,52,37,0.25) 0%, rgba(238,52,37,0.06) 40%, transparent 70%)", filter: "blur(10px)", transform: "scale(1.8)" }} />
            <svg className="relative" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
          </div>
        </div>
        {/* Target */}
        <div className="ch-float absolute bottom-[25%] left-[12%]">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(238,52,37,0.2) 0%, rgba(238,52,37,0.05) 40%, transparent 70%)", filter: "blur(12px)", transform: "scale(1.8)" }} />
            <svg className="relative" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
          </div>
        </div>
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
          className="ch-sub mt-5 md:mt-7 max-w-2xl mx-auto text-center text-[15px] md:text-lg leading-[1.8] text-white/40"
          style={{ opacity: 0 }}
        >
          Do you like solving real operational problems, taking ownership, and working in fast-moving, real-world environments?
        </p>
      </div>

      {/* Keyframes for orbit animations */}
      <style jsx>{`
        @keyframes ch-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ch-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>

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
