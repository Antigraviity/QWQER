"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CareersJoin() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".cj-content", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Pulsing ring
      gsap.to(".cj-ring-1", {
        scale: 1.4,
        opacity: 0,
        duration: 2.5,
        ease: "power1.out",
        repeat: -1,
      });
      gsap.to(".cj-ring-2", {
        scale: 1.6,
        opacity: 0,
        duration: 2.5,
        ease: "power1.out",
        repeat: -1,
        delay: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const A = "#ee3425";

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #000 0%, #0c0808 40%, #0a0606 60%, #000 100%)" }} />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(238,52,37,0.07) 0%, transparent 50%)",
        filter: "blur(80px)",
      }} />

      {/* Dot grid subtle */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 0.8px, transparent 0.8px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-[750px] mx-auto px-6 md:px-14">
        <div className="cj-content text-center" style={{ opacity: 0 }}>

          {/* Icon with double pulsing rings */}
          <div className="relative inline-flex items-center justify-center mb-10">
            <div className="cj-ring-1 absolute w-24 h-24 rounded-full" style={{ border: `2px solid ${A}`, opacity: 0.3 }} />
            <div className="cj-ring-2 absolute w-24 h-24 rounded-full" style={{ border: `1.5px solid ${A}`, opacity: 0.2 }} />
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${A}, #c42a1e)` }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Join <span style={{ color: A }}>us</span>
          </h2>

          {/* Body text */}
          <p className="text-white/40 text-[15px] md:text-base leading-[1.85] max-w-xl mx-auto mb-10">
            If you&apos;re interested in working on logistics that values execution and ownership, we&apos;d love to hear from you. Explore open roles and join QWQER.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <a
              href="#"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(238,52,37,0.3)]"
              style={{ background: A }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
              </svg>
              <span className="relative z-10">Explore Open Roles</span>
              <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </a>

            {/* Secondary CTA */}
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <span>Get in Touch</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-[12px] text-white/15 tracking-wide">
            Execution · Ownership · Growth
          </p>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px]" style={{
        width: "min(60%, 700px)",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 70%, transparent)",
      }} />
    </section>
  );
}
