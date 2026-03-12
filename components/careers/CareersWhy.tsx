"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PILLARS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></svg>
    ),
    label: "Operations-first thinking",
    text: "On-demand express delivery and execution-led fleet logistics at scale.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
    ),
    label: "Led by experience",
    text: "Practical, structured leadership that knows logistics from the inside out.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" /><path d="M16.5 6h5.25v5.25" /></svg>
    ),
    label: "Grow with the business",
    text: "Build your career as we expand across cities, services, and systems.",
  },
];

export default function CareersWhy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".cw-title", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.fromTo(".cw-card", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".cw-grid", start: "top 85%" },
      });

      // Subtle card number count-up illusion via line draw
      gsap.utils.toArray<HTMLElement>(".cw-line-draw").forEach((line) => {
        gsap.fromTo(line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: { trigger: line, start: "top 90%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const A = "#ee3425";

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #000 0%, #0a0a0a 50%, #000 100%)" }} />

      {/* Side accent */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-[150px] w-[400px] h-[400px] pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(238,52,37,0.05) 0%, transparent 60%)",
        filter: "blur(80px)",
      }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-14 lg:px-20">
        {/* Section Title */}
        <div className="cw-title mb-16 text-center" style={{ opacity: 0 }}>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            Why <span style={{ color: A }}>QWQER?</span>
          </h2>
          <p className="text-white/35 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            We work on transportation challenges that exist across real supply chains. Here&apos;s what makes working here different.
          </p>
        </div>

        {/* 3-column pillar cards */}
        <div className="cw-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <div
              key={i}
              className="cw-card group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                opacity: 0,
              }}
            >
              {/* Top accent bar that expands on hover */}
              <div className="cw-line-draw h-[3px] w-full" style={{
                background: `linear-gradient(90deg, ${A}, rgba(238,52,37,0.3))`,
                transformOrigin: "left center",
                transform: "scaleX(0)",
              }} />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: "radial-gradient(circle at 50% 0%, rgba(238,52,37,0.06) 0%, transparent 50%)",
              }} />

              <div className="p-7 md:p-8">
                {/* Number + Icon row */}
                <div className="flex items-center justify-end mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{
                    background: "rgba(238,52,37,0.08)",
                    color: A,
                  }}>
                    {p.icon}
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-white font-bold text-lg mb-3 leading-tight">{p.label}</h3>

                {/* Description */}
                <p className="text-white/30 text-[13.5px] leading-[1.75]">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
