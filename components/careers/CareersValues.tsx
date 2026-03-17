"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const VALUES = [
  {
    number: "01",
    title: "Ownership over tasks",
    desc: "You don't wait for instructions. You see a problem, you own it, and you fix it. Every team member has direct impact.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  },
  {
    number: "02",
    title: "Speed with structure",
    desc: "We move fast, but not recklessly. Decisions are data-informed, execution is structured, and feedback loops are tight.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  },
  {
    number: "03",
    title: "Real problems, real impact",
    desc: "No vanity metrics. You work on logistics challenges that affect thousands of deliveries, real businesses, and real people.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  },
  {
    number: "04",
    title: "No hierarchy in ideas",
    desc: "The best idea wins, regardless of who it comes from. We value clarity of thought over titles or tenure.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
  },
  {
    number: "05",
    title: "Build, don't just maintain",
    desc: "We're scaling across cities and services. You'll build new systems, not just keep existing ones running.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M12 12h.01" /><path d="M17 12h.01" /><path d="M7 12h.01" /></svg>,
  },
  {
    number: "06",
    title: "Growth is earned",
    desc: "Promotions and responsibility come from demonstrated output. If you deliver, you grow — no waiting in line.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg>,
  },
];

export default function CareersValues() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".cv-title", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.fromTo(".cv-card", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".cv-grid", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #000 0%, #080808 50%, #000 100%)" }} />

      {/* Subtle accent */}
      <div className="absolute top-1/3 right-[-100px] w-[350px] h-[350px] pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(238,52,37,0.04) 0%, transparent 60%)",
        filter: "blur(80px)",
      }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-14 lg:px-20">
        <div className="cv-title mb-12 text-center" style={{ opacity: 0 }}>
          <p className="text-[#ee3425] text-xs font-bold uppercase tracking-[0.2em] mb-4">How We Work</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            Our <span className="text-[#ee3425]">Values</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            These aren&apos;t posters on a wall. They&apos;re the principles that shape every decision we make.
          </p>
        </div>

        <div className="cv-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <div
              key={i}
              className="cv-card group relative rounded-2xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                opacity: 0,
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: "radial-gradient(circle at 50% 0%, rgba(238,52,37,0.06) 0%, transparent 60%)",
              }} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[#ee3425]/30 text-3xl font-black">{v.number}</span>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[#ee3425]" style={{ background: "rgba(238,52,37,0.08)" }}>
                    {v.icon}
                  </div>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{v.title}</h3>
                <p className="text-white/55 text-[14px] leading-[1.75]">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
