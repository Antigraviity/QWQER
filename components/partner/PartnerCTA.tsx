"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PartnerCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".pcta-content", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Pulsing ring
      gsap.to(".pcta-ring", {
        scale: 1.15,
        opacity: 0,
        duration: 2,
        ease: "power1.out",
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const A = "#ee3425";

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #000 0%, #0a0808 50%, #000 100%)" }} />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(238,52,37,0.08) 0%, transparent 50%)",
        filter: "blur(80px)",
      }} />

      <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-14">
        <div className="pcta-content text-center" style={{ opacity: 0 }}>
          {/* Icon with pulsing ring */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="pcta-ring absolute w-20 h-20 rounded-full" style={{ border: `2px solid ${A}`, opacity: 0.4 }} />
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${A}, #c42a1e)` }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            Ready to <span style={{ color: A }}>get started?</span>
          </h2>
          <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-10">
            Whether you&apos;re a rider looking for flexible earnings or a fleet owner seeking consistent business — QWQER is your growth partner.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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

            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <span>Contact Us</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-[12px] text-white/20 tracking-wide">
            No contracts · No lock-ins · Start earning today
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
