"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PILLARS = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></svg>,
    label: "Operations-first thinking",
    text: "On-demand express delivery and execution-led fleet logistics at scale. Every decision is driven by operational efficiency.",
    stat: "30+",
    statLabel: "Cities Operational",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
    label: "Led by experience",
    text: "Practical, structured leadership that knows logistics from the inside out. Our leaders have built supply chains, not just managed them.",
    stat: "15+",
    statLabel: "Years Combined Experience",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" /><path d="M16.5 6h5.25v5.25" /></svg>,
    label: "Grow with the business",
    text: "Build your career as we expand across cities, services, and systems. Your growth is directly tied to the company\u2019s growth.",
    stat: "3x",
    statLabel: "Team Growth This Year",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    label: "Real-world impact",
    text: "No vanity metrics. Your work affects real businesses, real deliveries, and real livelihoods across India every single day.",
    stat: "1M+",
    statLabel: "Deliveries Powered",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
    label: "Small team, big ownership",
    text: "No layers of bureaucracy. You work directly with decision-makers. Your ideas get heard, tested, and shipped \u2014 fast.",
    stat: "100+",
    statLabel: "Team Members",
  },
];

export default function CareersWhy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(".cw-title", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Dotted line grows as you scroll
      gsap.fromTo(".cw-line-progress", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: {
          trigger: ".cw-timeline",
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.8,
        },
      });

      // Each step reveals on scroll
      gsap.utils.toArray<HTMLElement>(".cw-step").forEach((step) => {
        // Card slides in
        gsap.fromTo(step, { x: -40, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 80%" },
        });

        // Dot pulses when revealed
        const dot = step.querySelector(".cw-dot");
        if (dot) {
          gsap.fromTo(dot, { scale: 0 }, {
            scale: 1, duration: 0.5, ease: "back.out(2)",
            scrollTrigger: { trigger: step, start: "top 80%" },
          });
        }

        // Icon spins in
        const icon = step.querySelector(".cw-icon");
        if (icon) {
          gsap.fromTo(icon, { scale: 0, rotation: -90 }, {
            scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.5)",
            scrollTrigger: { trigger: step, start: "top 80%" },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #000 0%, #0a0a0a 50%, #000 100%)" }} />

      <div className="absolute top-1/2 -translate-y-1/2 -left-[150px] w-[400px] h-[400px] pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(238,52,37,0.05) 0%, transparent 60%)",
        filter: "blur(80px)",
      }} />
      <div className="absolute top-1/4 right-[-100px] w-[300px] h-[300px] pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(238,52,37,0.03) 0%, transparent 60%)",
        filter: "blur(60px)",
      }} />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-14 lg:px-20">
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

        {/* Timeline */}
        <div className="cw-timeline relative pl-8 md:pl-12">

          {/* Background dotted line */}
          <div className="absolute left-[18px] md:left-[26px] top-0 bottom-0 w-[2px]"
            style={{
              backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 6px, transparent 6px, transparent 14px)",
            }}
          />

          {/* Scroll-reveal progress line */}
          <div className="absolute left-[18px] md:left-[26px] top-0 bottom-0 w-[2px] overflow-hidden">
            <div className="cw-line-progress w-full h-full origin-top"
              style={{
                backgroundImage: "repeating-linear-gradient(to bottom, #ee3425 0px, #ee3425 6px, transparent 6px, transparent 14px)",
                transform: "scaleY(0)",
              }}
            />
          </div>

          <div className="space-y-0">
            {PILLARS.map((p, i) => (
              <div key={i} className="cw-step relative flex gap-6 md:gap-8" style={{ opacity: 0 }}>

                {/* Dot on timeline */}
                <div className="absolute left-[-32px] md:left-[-48px] top-2 z-10">
                  <div className="absolute inset-0 -m-2 rounded-full" style={{
                    background: "radial-gradient(circle, rgba(238,52,37,0.15) 0%, transparent 70%)",
                  }} />
                  <div className="cw-dot w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center" style={{
                    background: i === PILLARS.length - 1 ? "#ee3425" : "rgba(238,52,37,0.12)",
                    border: `2px solid ${i === PILLARS.length - 1 ? "#ee3425" : "rgba(238,52,37,0.4)"}`,
                    transform: "scale(0)",
                  }}>
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${i === PILLARS.length - 1 ? "bg-white" : "bg-[#ee3425]"}`} />
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 pb-12 md:pb-14">
                  <div className="group rounded-xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5" style={{
                    background: "linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                      background: "radial-gradient(circle at 0% 50%, rgba(238,52,37,0.05) 0%, transparent 50%)",
                    }} />

                    <div className="relative z-10 flex items-start gap-4">
                      {/* Icon */}
                      <div className="cw-icon flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-[#ee3425]" style={{
                        background: "rgba(238,52,37,0.08)",
                        border: "1px solid rgba(238,52,37,0.15)",
                      }}>
                        {p.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Stat badge */}
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="text-[#ee3425] text-xl font-black">{p.stat}</span>
                          <span className="text-[10px] text-white/35 uppercase tracking-[0.15em] font-medium">{p.statLabel}</span>
                        </div>
                        <h3 className="text-white font-bold text-base md:text-lg mb-2 group-hover:text-[#ee3425] transition-colors duration-300">{p.label}</h3>
                        <p className="text-white/50 text-[13px] md:text-[14px] leading-[1.75]">{p.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
