"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const STATS = [
  { value: "7+", label: "Cities" },
  { value: "10K+", label: "Deliveries Daily" },
  { value: "99%", label: "On-Time Rate" },
];

const PILLARS = [
  {
    num: "01",
    title: "Fleet Design & Standards",
    desc: "Custom-built fleets with rigorous driver protocols, optimized for speed and reliability across every route.",
  },
  {
    num: "02",
    title: "Real-Time Monitoring",
    desc: "End-to-end visibility with live tracking, proactive alerts, and exception handling before issues escalate.",
  },
  {
    num: "03",
    title: "Operational Discipline",
    desc: "Standardized processes and strict SLAs across mid-mile and last-mile — ensuring every delivery is on time.",
  },
];

export default function AboutCard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Hide all content initially ──
      gsap.set(".ac-label", { opacity: 0, y: 25 });
      gsap.set(".ac-accent", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".ac-heading", { opacity: 0, y: 30 });
      gsap.set(".ac-body", { opacity: 0, y: 25 });
      gsap.set(".ac-stat", { opacity: 0, y: 20, scale: 0.85 });
      gsap.set(".ac-line-h", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".ac-pillar", { opacity: 0, y: 30 });

      // Mascot starts off-screen right, hidden
      gsap.set(mascotRef.current, { x: 500, y: -100, opacity: 0, scale: 0.6, rotation: -15 });

      // ── Master timeline — plays once when section enters viewport ──
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => tl.play(),
      });

      // ── Mascot flies in ──
      tl.to(mascotRef.current, {
        x: 40, y: 0, opacity: 1, scale: 1, rotation: 0,
        duration: 0.5, ease: "power3.out",
      });

      // ── Swoops left → reveals label ──
      tl.to(mascotRef.current, {
        x: -480, y: -40, rotation: 10, scale: 1.05,
        duration: 0.35, ease: "power3.inOut",
      });
      tl.to(".ac-label", { opacity: 1, y: 0, duration: 0.15 }, "<+=0.1");
      tl.to(".ac-accent", { scaleX: 1, duration: 0.15 }, "<");

      // ── Dips down → reveals heading ──
      tl.to(mascotRef.current, {
        x: -380, y: 60, rotation: -5, scale: 1,
        duration: 0.3, ease: "power3.inOut",
      });
      tl.to(".ac-heading", { opacity: 1, y: 0, duration: 0.2 }, "<+=0.1");

      // ── Sweeps down → reveals body ──
      tl.to(mascotRef.current, {
        x: -440, y: 180, rotation: 6, scale: 0.98,
        duration: 0.3, ease: "power3.inOut",
      });
      tl.to(".ac-body", { opacity: 1, y: 0, duration: 0.2 }, "<+=0.1");

      // ── Mascot slides back to resting position ──
      tl.to(mascotRef.current, {
        x: 40, y: 50, rotation: 0, scale: 1,
        duration: 0.6, ease: "power3.inOut",
      });

      // ── While mascot returns, stats + timeline fade in ──
      tl.to(".ac-stat", {
        opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.06,
      }, "<+=0.1");
      tl.to(".ac-line-h", { scaleX: 1, duration: 0.4 }, "<+=0.1");
      tl.to(".ac-pillar", {
        opacity: 1, y: 0, duration: 0.25, stagger: 0.08,
      }, "<+=0.1");

      // ── After mascot returns, start idle float + ring spin ──
      tl.call(() => {
        gsap.to(mascotRef.current, {
          y: "-=30", duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
        gsap.to(".ac-shadow", {
          scale: 0.6, opacity: 0.1, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
        gsap.to(".ac-ring-outer", {
          rotation: 360, duration: 20, repeat: -1, ease: "none",
        });
        gsap.to(".ac-ring-inner", {
          rotation: -360, duration: 25, repeat: -1, ease: "none",
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-14 md:py-16 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(90,94,136,0.05) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">

          {/* ── Left Column: Content ─────────────────────────── */}
          <div ref={contentRef} className="flex-1 order-2 lg:order-1">

            {/* Label */}
            <div className="ac-label mb-3">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#dfd54b" }}>
                Who we are
              </span>
              <div className="ac-accent mt-2 h-[2px] w-14 rounded-full" style={{ backgroundColor: "#dfd54b" }} />
            </div>

            {/* Heading */}
            <h2 className="ac-heading text-[48px] font-extrabold text-white leading-[1.1] tracking-[-0.02em] max-w-2xl">
              Operators who understand{" "}
              <span style={{ color: "#dfd54b" }}>every mile</span>{" "}
              of the journey
            </h2>

            {/* Body */}
            <p className="ac-body mt-5 text-white/40 text-base md:text-[17px] leading-[1.8] max-w-lg">
              QWQER is led by seasoned transportation operators, logistics
              professionals, and technology leaders who have built and managed
              operations at scale. This leadership shapes everything — from
              fleet design to end-to-end planning across mid-mile and
              last-mile logistics.
            </p>

            {/* Stats */}
            <div className="flex gap-10 md:gap-14 mt-9">
              {STATS.map((s, i) => (
                <div key={i} className="ac-stat">
                  <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-white/30 mt-1 font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Pillars — horizontal */}
            <div className="relative mt-10">
              {/* Horizontal line */}
              <div className="absolute left-0 right-0 top-[10px] h-[2px]">
                <div className="absolute inset-0 bg-white/[0.05] rounded-full" />
                <div
                  className="ac-line-h absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(to right, #dfd54b, rgba(223,213,75,0.2))",
                  }}
                />
              </div>

              <div className="flex gap-6 pt-7">
                {PILLARS.map((p, i) => (
                  <div key={i} className={`ac-pillar ac-pillar-${i} relative group flex-1`}>
                    {/* Timeline dot */}
                    <div
                      className="absolute -top-7 left-4 w-[20px] h-[20px] rounded-full flex items-center justify-center z-10"
                      style={{ backgroundColor: "#0a0a0a", border: "2px solid #dfd54b" }}
                    >
                      <div className="w-[6px] h-[6px] rounded-full bg-[#dfd54b]" />
                    </div>

                    <span className="text-[#dfd54b]/40 text-xs font-black">{p.num}</span>
                    <h3 className="text-white font-bold text-[15px] mt-1.5 mb-2 group-hover:text-[#dfd54b] transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className="text-white/30 text-[13px] leading-[1.7] group-hover:text-white/45 transition-colors duration-300">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column: Mascot ──────────────────────── */}
          <div className="flex-shrink-0 order-1 lg:order-2 relative self-center">

            {/* Large glow reflection behind mascot */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[480px] md:h-[480px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(223,213,75,0.22) 0%, rgba(223,213,75,0.08) 30%, rgba(223,213,75,0.02) 55%, transparent 75%)",
                filter: "blur(15px)",
              }}
            />

            {/* Secondary warm glow — offset */}
            <div
              className="absolute top-[38%] left-[42%] -translate-x-1/2 -translate-y-1/2 w-[250px] h-[300px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(223,213,75,0.15) 0%, transparent 65%)",
                filter: "blur(25px)",
              }}
            />

            {/* Bright center glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(223,213,75,0.18) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Outer semi-circle ring — rotating */}
            <div
              className="ac-ring-outer absolute top-1/2 left-1/2 w-[320px] h-[320px] md:w-[390px] md:h-[390px] rounded-full pointer-events-none"
              style={{
                transform: "translate(-50%, -50%)",
                borderTop: "2.5px solid rgba(223,213,75,0.5)",
                borderRight: "2.5px solid rgba(223,213,75,0.3)",
                borderBottom: "2.5px solid transparent",
                borderLeft: "2.5px solid transparent",
                boxShadow: "0 0 25px rgba(223,213,75,0.1), inset 0 0 25px rgba(223,213,75,0.03)",
                animation: "spinRing1 8s linear infinite",
              }}
            />

            {/* Middle semi-circle ring — rotating opposite */}
            <div
              className="ac-ring-inner absolute top-1/2 left-1/2 w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full pointer-events-none"
              style={{
                transform: "translate(-50%, -50%)",
                borderTop: "2px solid transparent",
                borderRight: "2px solid transparent",
                borderBottom: "2px solid rgba(223,213,75,0.4)",
                borderLeft: "2px solid rgba(223,213,75,0.25)",
                animation: "spinRing2 10s linear infinite",
              }}
            />

            {/* Inner semi-circle ring — slow reverse */}
            <div
              className="absolute top-1/2 left-1/2 w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full pointer-events-none"
              style={{
                transform: "translate(-50%, -50%)",
                borderTop: "1.5px solid rgba(223,213,75,0.25)",
                borderRight: "1.5px solid transparent",
                borderBottom: "1.5px solid transparent",
                borderLeft: "1.5px solid rgba(223,213,75,0.15)",
                animation: "spinRing3 14s linear infinite",
              }}
            />

            {/* Mascot */}
            <div ref={mascotRef} className="relative z-10">
              <Image
                src="/mascot-img.png"
                alt="QWQER Mascot"
                width={320}
                height={400}
                className="h-[260px] md:h-[340px] w-auto object-contain"
                style={{
                  filter: "drop-shadow(0 0 50px rgba(223,213,75,0.3)) drop-shadow(0 0 80px rgba(223,213,75,0.12)) drop-shadow(0 20px 30px rgba(0,0,0,0.4))",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            {/* Shadow beneath mascot */}
            <div
              className="ac-shadow absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-[120px] h-[18px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(223,213,75,0.2) 0%, transparent 70%)",
              }}
            />

            {/* Ring rotation keyframes */}
            <style jsx>{`
              @keyframes spinRing1 {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
              }
              @keyframes spinRing2 {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(-360deg); }
              }
              @keyframes spinRing3 {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
              }
            `}</style>
          </div>

        </div>
      </div>
    </section>
  );
}
