"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FLEET_FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
    ),
    title: "Consistent, High-Quality Business",
    desc: "Access steady delivery demand from verified businesses and institutions, reducing reliance on unpredictable spot-market loads.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
    ),
    title: "Better Vehicle Utilisation",
    desc: "Keep vehicles running on planned, time-critical routes to improve asset utilisation and overall earnings.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
    ),
    title: "Operator-Led, Structured Execution",
    desc: "Benefit from centralized planning, route coordination, and active operational monitoring — so you can focus on managing your fleet.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
    ),
    title: "Transparent Rates & Predictable Payments",
    desc: "Clear commercial terms, detailed trip reporting, and reliable payment cycles ensure financial clarity and trust.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
    ),
    title: "Reduced Operational Overhead",
    desc: "QWQER teams handle coordination, tracking, and exception management, lowering day-to-day operational stress.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438a2.25 2.25 0 01-1.228 2.445l-.18.09-.312.078" /></svg>
    ),
    title: "Pan-India Growth Opportunities",
    desc: "Participate in transportation operations across key cities and corridors through a single partner relationship.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>
    ),
    title: "Technology-Enabled Fleet Management",
    desc: "Access real-time tracking, reporting, and payment visibility through QWQER's fleet systems.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
    ),
    title: "Compliance & Safety Framework",
    desc: "Operate within a vetted, compliant ecosystem focused on safety standards and risk reduction.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
    ),
    title: "Flexible Scaling Without Lock-Ins",
    desc: "Scale routes, volumes, or geographies as needed without rigid contracts or long-term commitments.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
    ),
    title: "Dedicated Partner Support",
    desc: "Work closely with experienced operations teams to ensure smooth, consistent execution.",
  },
];

export default function PartnerFleet() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".pf-badge", { y: 14, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.fromTo(".pf-title", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
      gsap.fromTo(".pf-card", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".pf-grid", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const B = "#3563E9"; // blue accent

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #000 0%, #080808 30%, #0c0c0c 50%, #080808 70%, #000 100%)" }} />

      {/* Side glow */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-[200px] w-[500px] h-[500px] pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(53,99,233,0.08) 0%, transparent 60%)",
        filter: "blur(80px)",
      }} />

      {/* Separator line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px]" style={{
        width: "min(60%, 700px)",
        background: "linear-gradient(90deg, transparent, rgba(53,99,233,0.15) 30%, rgba(53,99,233,0.25) 50%, rgba(53,99,233,0.15) 70%, transparent)",
      }} />

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-14 lg:px-20">
        {/* Badge */}
        <div className="pf-badge mb-4 flex justify-center" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{
            border: "1px solid rgba(53,99,233,0.35)",
            background: "rgba(53,99,233,0.1)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#5b8af5"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-1 1l1.96 2.5H17V9h2zm-11 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H10.22zM18.5 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: "rgba(91,138,245,0.9)" }}>
              For Fleet Owners
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="pf-title text-center text-3xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ opacity: 0 }}>
          QWQER Fleet <span style={{ color: "#5b8af5" }}>for Fleet Owners</span>
        </h2>
        <p className="pf-title text-center text-white/70 text-base md:text-lg max-w-xl mx-auto mb-14" style={{ opacity: 0 }}>
          Scale your fleet operations with consistent demand and structured support.
        </p>

        {/* Cards Grid — 5 columns for 10 items */}
        <div className="pf-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {FLEET_FEATURES.map((f, i) => (
            <div
              key={i}
              className="pf-card group relative rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 cursor-default"
              style={{
                background: "linear-gradient(145deg, rgba(53,99,233,0.06) 0%, rgba(53,99,233,0.02) 100%)",
                border: "1px solid rgba(53,99,233,0.15)",
                opacity: 0,
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: "radial-gradient(circle at 50% 0%, rgba(53,99,233,0.12) 0%, transparent 60%)",
              }} />
              {/* Top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-10 h-[2px] rounded-full transition-all duration-500" style={{ background: "#5b8af5" }} />

              {/* Icon */}
              <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300" style={{
                background: "rgba(53,99,233,0.12)",
                color: "#5b8af5",
              }}>
                {f.icon}
              </div>

              {/* Text */}
              <h3 className="text-white font-bold text-[14px] mb-1.5 leading-snug">{f.title}</h3>
              <p className="text-white/70 text-sm md:text-[15px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
