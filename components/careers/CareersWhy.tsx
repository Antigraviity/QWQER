"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PILLARS = [
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></svg>,
    label: "Operations-first thinking",
    text: "On-demand express delivery and execution-led fleet logistics at scale. Every decision is driven by operational efficiency.",
    stat: "30+",
    statLabel: "Cities Operational",
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
    label: "Led by experience",
    text: "Practical, structured leadership that knows logistics from the inside out. Our leaders have built supply chains, not just managed them.",
    stat: "15+",
    statLabel: "Years Combined Experience",
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" /><path d="M16.5 6h5.25v5.25" /></svg>,
    label: "Grow with the business",
    text: "Build your career as we expand across cities, services, and systems. Your growth is directly tied to the company's growth.",
    stat: "3x",
    statLabel: "Team Growth This Year",
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    label: "Real-world impact",
    text: "No vanity metrics. Your work affects real businesses, real deliveries, and real livelihoods across India every single day.",
    stat: "1M+",
    statLabel: "Deliveries Powered",
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
    label: "Small team, big ownership",
    text: "No layers of bureaucracy. You work directly with decision-makers. Your ideas get heard, tested, and shipped — fast.",
    stat: "100+",
    statLabel: "Team Members",
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>,
    label: "Move fast, stay structured",
    text: "We don't choose between speed and quality. Tight feedback loops, structured processes, and data-driven decisions keep us sharp.",
    stat: "48hr",
    statLabel: "Avg. Hiring Decision",
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
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".cw-grid", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #000 0%, #0a0a0a 50%, #000 100%)" }} />

      {/* Accent glow */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-[150px] w-[400px] h-[400px] pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(238,52,37,0.05) 0%, transparent 60%)",
        filter: "blur(80px)",
      }} />
      <div className="absolute top-1/4 right-[-100px] w-[300px] h-[300px] pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(238,52,37,0.03) 0%, transparent 60%)",
        filter: "blur(60px)",
      }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-14 lg:px-20">
        {/* Section Title */}
        <div className="cw-title mb-12 text-center" style={{ opacity: 0 }}>
          <p className="text-[#ee3425] text-xs font-bold uppercase tracking-[0.2em] mb-4">Why Join Us</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            Why <span style={{ color: "#ee3425" }}>QWQER?</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            We work on transportation challenges that exist across real supply chains. Here&apos;s what makes working here different.
          </p>
        </div>

        {/* 6-card grid */}
        <div className="cw-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => (
            <div
              key={i}
              className="cw-card group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
              style={{ opacity: 0 }}
            >
              {/* Card background with gradient border effect */}
              <div className="absolute inset-0 rounded-2xl" style={{
                background: "linear-gradient(160deg, rgba(238,52,37,0.12) 0%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.01) 100%)",
                padding: "1px",
              }} />
              <div className="relative h-full rounded-2xl" style={{
                background: "linear-gradient(160deg, rgba(20,18,18,0.98) 0%, rgba(12,12,12,0.99) 100%)",
              }}>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(238,52,37,0.08) 0%, transparent 60%)",
                }} />

                <div className="relative z-10 p-7 md:p-8 h-full flex flex-col">
                  {/* Icon + Stat row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#ee3425] transition-transform duration-300 group-hover:scale-110" style={{
                      background: "rgba(238,52,37,0.08)",
                      border: "1px solid rgba(238,52,37,0.15)",
                    }}>
                      {p.icon}
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-black text-[#ee3425]">{p.stat}</span>
                      <span className="block text-[10px] text-white/35 uppercase tracking-wider font-medium leading-tight">{p.statLabel}</span>
                    </div>
                  </div>

                  {/* Label */}
                  <h3 className="text-white font-bold text-[17px] mb-3 leading-tight group-hover:text-[#ee3425] transition-colors duration-300">{p.label}</h3>

                  {/* Description */}
                  <p className="text-white/50 text-[14px] leading-[1.8] flex-1">{p.text}</p>

                  {/* Bottom accent line */}
                  <div className="mt-6 h-[2px] w-8 rounded-full bg-[#ee3425]/20 group-hover:w-full group-hover:bg-[#ee3425]/40 transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
