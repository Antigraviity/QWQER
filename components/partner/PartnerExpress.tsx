"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EXPRESS_FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    title: "Flexible Work, Your Way",
    desc: "Choose when and how long you want to work. Log in based on your availability and accept orders that fit your schedule.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    title: "Steady Earnings Per Order",
    desc: "Access consistent order demand from verified business and consumer customers, enabling regular earnings.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ),
    title: "Transparent Pay & On-Time Payouts",
    desc: "See clear earnings breakdowns for every order, with reliable and timely payouts.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
    ),
    title: "Simple, Rider-Friendly App",
    desc: "Manage orders, navigation, updates, and support through an easy-to-use app designed for quick execution.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>
    ),
    title: "24/7 Rider Support",
    desc: "Dedicated support teams are available round the clock to assist with order issues, coordination, and on-ground help.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
    ),
    title: "No Contracts or Lock-Ins",
    desc: "Work freely without long-term commitments. Take breaks, scale up, or stop anytime.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
    ),
    title: "Safe & Structured Operations",
    desc: "Verified orders, clear processes, and operational oversight ensure smoother and safer deliveries.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
    ),
    title: "Earn More with Growing Demand",
    desc: "Increase earnings through consistent performance, peak-hour demand, and expanded service zones.",
  },
];

export default function PartnerExpress() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".pe-badge", { y: 14, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.fromTo(".pe-title", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
      gsap.fromTo(".pe-card", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".pe-grid", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const A = "#ee3425";

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #000 0%, #0a0a0a 50%, #000 100%)" }} />

      {/* Accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{
        background: "radial-gradient(ellipse, rgba(238,52,37,0.06) 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-14 lg:px-20">
        {/* Badge */}
        <div className="pe-badge mb-4 flex justify-center" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{
            border: "1px solid rgba(238,52,37,0.25)",
            background: "rgba(238,52,37,0.06)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={A}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: "rgba(238,52,37,0.85)" }}>
              For Riders
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="pe-title text-center text-3xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ opacity: 0 }}>
          QWQER Express <span style={{ color: A }}>for Riders</span>
        </h2>
        <p className="pe-title text-center text-white/40 text-sm md:text-base max-w-xl mx-auto mb-14" style={{ opacity: 0 }}>
          Your ride, your rules. Join thousands of riders earning on their own schedule.
        </p>

        {/* Cards Grid */}
        <div className="pe-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXPRESS_FEATURES.map((f, i) => (
            <div
              key={i}
              className="pe-card group relative rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 cursor-default"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                opacity: 0,
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: "radial-gradient(circle at 50% 0%, rgba(238,52,37,0.08) 0%, transparent 60%)",
              }} />
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-12 h-[2px] rounded-full transition-all duration-500" style={{ background: A }} />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300" style={{
                background: "rgba(238,52,37,0.08)",
                color: A,
              }}>
                {f.icon}
              </div>

              {/* Text */}
              <h3 className="text-white font-bold text-[15px] mb-2 leading-snug">{f.title}</h3>
              <p className="text-white/35 text-[13px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
