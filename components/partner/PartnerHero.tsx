"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Globe3D = dynamic(() => import("./Globe3D"), { ssr: false });

export default function PartnerHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".ph-badge", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.25 });
      gsap.fromTo(".ph-line", { y: 55, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.13, delay: 0.35 });
      gsap.fromTo(".ph-sub", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.85 });
      gsap.fromTo(".ph-cta", { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)", delay: 1.1 });

      // Floating icons
      gsap.utils.toArray<HTMLElement>(".ph-float").forEach((el, i) => {
        gsap.to(el, {
          y: -12 - i * 3,
          duration: 2.5 + i * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.4,
        });
      });

      // Blob parallax
      gsap.to(".ph-blob-1", { yPercent: 20, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".ph-blob-2", { yPercent: -14, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true } });

      // Particles drifting upward
      gsap.utils.toArray<HTMLElement>(".ph-particle").forEach((el, i) => {
        gsap.to(el, {
          y: -(150 + i * 30),
          x: (i % 2 === 0 ? 1 : -1) * (20 + i * 5),
          opacity: 0,
          duration: 4 + i * 0.5,
          ease: "none",
          repeat: -1,
          delay: i * 0.4,
        });
      });

      // Route line drawing
      gsap.fromTo(".ph-route-line",
        { strokeDashoffset: 200 },
        { strokeDashoffset: 0, duration: 3, ease: "power2.out", delay: 0.8 }
      );
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

      {/* ══ 3D WIREFRAME GLOBE ══ */}
      <div className="hidden md:block" style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden" }}>
        <Globe3D />
      </div>

      {/* Floating particles — small dots drifting upward */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={`p-${i}`}
            className="ph-particle absolute rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: i % 3 === 0 ? "rgba(238,52,37,0.4)" : "rgba(255,255,255,0.15)",
              boxShadow: i % 3 === 0 ? "0 0 6px rgba(238,52,37,0.3)" : "none",
              left: `${8 + (i * 7.5) % 85}%`,
              top: `${70 + (i * 13) % 30}%`,
            }}
          />
        ))}
      </div>

      {/* Animated delivery route line */}
      <svg className="ph-route absolute bottom-[15%] left-0 w-full h-[60px] pointer-events-none" preserveAspectRatio="none">
        <path
          className="ph-route-line"
          d="M0,30 Q200,10 400,30 T800,30 T1200,30 T1600,30"
          fill="none"
          stroke="rgba(238,52,37,0.12)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
        />
        <circle className="ph-route-dot" cx="0" cy="30" r="3" fill="#ee3425" opacity="0.5">
          <animateMotion dur="6s" repeatCount="indefinite" path="M0,0 Q200,-20 400,0 T800,0 T1200,0 T1600,0" />
        </circle>
      </svg>

      {/* Floating delivery icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Package icon */}
        <div className="ph-float absolute top-[15%] right-[12%]">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(238,52,37,0.3) 0%, rgba(238,52,37,0.08) 40%, transparent 70%)", filter: "blur(12px)", transform: "scale(1.8)" }} />
            <svg className="relative" width="48" height="48" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)"><path d="M20 8l-8-5-8 5v8l8 5 8-5V8zm-8-3.27L18.18 8 12 11.27 5.82 8 12 4.73zM5 9.27l6 3.73v6.73l-6-3.73V9.27zm8 10.46v-6.73l6-3.73v6.73l-6 3.73z"/></svg>
          </div>
        </div>
        {/* Truck icon */}
        <div className="ph-float absolute top-[25%] left-[8%]">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(238,52,37,0.25) 0%, rgba(238,52,37,0.06) 40%, transparent 70%)", filter: "blur(14px)", transform: "scale(1.8)" }} />
            <svg className="relative" width="56" height="56" viewBox="0 0 24 24" fill="rgba(255,255,255,0.25)"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
          </div>
        </div>
        {/* Location pin */}
        <div className="ph-float absolute top-[55%] right-[6%]">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(238,52,37,0.25) 0%, rgba(238,52,37,0.06) 40%, transparent 70%)", filter: "blur(10px)", transform: "scale(1.8)" }} />
            <svg className="relative" width="40" height="40" viewBox="0 0 24 24" fill="rgba(255,255,255,0.25)"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </div>
        </div>
        {/* Speedometer */}
        <div className="ph-float absolute bottom-[20%] left-[15%]">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(238,52,37,0.2) 0%, rgba(238,52,37,0.05) 40%, transparent 70%)", filter: "blur(12px)", transform: "scale(1.8)" }} />
            <svg className="relative" width="44" height="44" viewBox="0 0 24 24" fill="rgba(255,255,255,0.25)"><path d="M20.38 8.57l-1.23 1.85a8 8 0 01-.22 7.58H5.07A8 8 0 0115.58 6.85l1.85-1.23A10 10 0 003.35 19a2 2 0 001.72 1h13.85a2 2 0 001.74-1 10 10 0 00-.27-10.44zM10.59 15.41a2 2 0 002.83 0l5.66-8.49-8.49 5.66a2 2 0 000 2.83z"/></svg>
          </div>
        </div>
      </div>

      {/* Content — above globe */}
      <div className="relative max-w-[1300px] mx-auto px-6 md:px-14 lg:px-20 pt-36 md:pt-44 pb-20 md:pb-28" style={{ zIndex: 10 }}>
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
            {/* Shine effect */}
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
