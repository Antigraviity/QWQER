"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  {
    step: "01",
    title: "Apply",
    desc: "Submit your application through our careers page. We review every single one.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  },
  {
    step: "02",
    title: "Screening",
    desc: "A quick call to understand your background, goals, and what excites you about QWQER.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>,
  },
  {
    step: "03",
    title: "Task / Interview",
    desc: "A practical assessment relevant to the role. We value thinking and problem-solving over textbook answers.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
  },
  {
    step: "04",
    title: "Final Round",
    desc: "Meet the team lead or founder. We discuss culture fit, expectations, and mutual goals.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
  },
  {
    step: "05",
    title: "Offer & Onboarding",
    desc: "Clear offer, fast process. Once you accept, we get you started with a structured onboarding.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  },
];

export default function CareersProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(".cp-title", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Dotted line grows as you scroll
      gsap.fromTo(".cp-line-progress", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: {
          trigger: ".cp-timeline",
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.8,
        },
      });

      // Each step reveals on scroll
      gsap.utils.toArray<HTMLElement>(".cp-step").forEach((step, i) => {
        // Card slides in
        gsap.fromTo(step, { x: -40, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          },
        });

        // Dot pulses when revealed
        const dot = step.querySelector(".cp-dot");
        if (dot) {
          gsap.fromTo(dot, { scale: 0 }, {
            scale: 1, duration: 0.5, ease: "back.out(2)",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
            },
          });
        }

        // Icon spins in
        const icon = step.querySelector(".cp-icon");
        if (icon) {
          gsap.fromTo(icon, { scale: 0, rotation: -90 }, {
            scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #000 0%, #0a0a0a 50%, #000 100%)" }} />

      <div className="absolute top-1/2 left-[-100px] -translate-y-1/2 w-[300px] h-[300px] pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(238,52,37,0.04) 0%, transparent 60%)",
        filter: "blur(80px)",
      }} />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-14 lg:px-20">
        <div className="cp-title mb-12 text-center" style={{ opacity: 0 }}>
          <p className="text-[#ee3425] text-xs font-bold uppercase tracking-[0.2em] mb-4">Hiring Process</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            How We <span className="text-[#ee3425]">Hire</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            A transparent, straightforward process. No surprises, no endless rounds.
          </p>
        </div>

        {/* Timeline */}
        <div className="cp-timeline relative pl-8 md:pl-12">

          {/* Background dotted line (always visible, faint) */}
          <div className="absolute left-[18px] md:left-[26px] top-0 bottom-0 w-[2px]"
            style={{
              backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 6px, transparent 6px, transparent 14px)",
            }}
          />

          {/* Scroll-reveal progress line (red, grows on scroll) */}
          <div className="absolute left-[18px] md:left-[26px] top-0 bottom-0 w-[2px] overflow-hidden">
            <div className="cp-line-progress w-full h-full origin-top"
              style={{
                backgroundImage: "repeating-linear-gradient(to bottom, #ee3425 0px, #ee3425 6px, transparent 6px, transparent 14px)",
                transform: "scaleY(0)",
              }}
            />
          </div>

          <div className="space-y-0">
            {STEPS.map((s, i) => (
              <div key={i} className="cp-step relative flex gap-6 md:gap-8" style={{ opacity: 0 }}>

                {/* Dot on timeline */}
                <div className="absolute left-[-32px] md:left-[-48px] top-2 z-10">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 -m-2 rounded-full" style={{
                    background: "radial-gradient(circle, rgba(238,52,37,0.15) 0%, transparent 70%)",
                  }} />
                  {/* Dot */}
                  <div className="cp-dot w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center" style={{
                    background: i === STEPS.length - 1
                      ? "#ee3425"
                      : "rgba(238,52,37,0.12)",
                    border: `2px solid ${i === STEPS.length - 1 ? "#ee3425" : "rgba(238,52,37,0.4)"}`,
                    transform: "scale(0)",
                  }}>
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${i === STEPS.length - 1 ? "bg-white" : "bg-[#ee3425]"}`} />
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 pb-12 md:pb-14">
                  <div className="group rounded-xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5" style={{
                    background: "linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                      background: "radial-gradient(circle at 0% 50%, rgba(238,52,37,0.05) 0%, transparent 50%)",
                    }} />

                    <div className="relative z-10 flex items-start gap-4">
                      {/* Icon */}
                      <div className="cp-icon flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-[#ee3425]" style={{
                        background: "rgba(238,52,37,0.08)",
                        border: "1px solid rgba(238,52,37,0.15)",
                      }}>
                        {s.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="text-[#ee3425]/40 text-[10px] font-bold uppercase tracking-[0.2em]">Step {s.step}</span>
                        </div>
                        <h3 className="text-white font-bold text-base md:text-lg mb-2 group-hover:text-[#ee3425] transition-colors duration-300">{s.title}</h3>
                        <p className="text-white/50 text-[13px] md:text-[14px] leading-[1.75]">{s.desc}</p>
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
