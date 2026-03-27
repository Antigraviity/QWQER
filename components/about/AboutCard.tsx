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
      // ── Initial state: everything off-screen right ──
      gsap.set(".ac-mascot-wrap", { opacity: 0 });
      // Hide content elements individually — they’ll slide in like train carriages
      gsap.set(".ac-label", { x: "-100vw", opacity: 0 });
      gsap.set(".ac-accent", { x: "-100vw", opacity: 0 });
      gsap.set(".ac-heading", { x: "-100vw", opacity: 0 });
      gsap.set(".ac-body", { x: "-100vw", opacity: 0 });
      gsap.set(".ac-stat", { x: "-100vw", opacity: 0 });
      gsap.set(".ac-line-h", { x: "-100vw", opacity: 0 });
      gsap.set(".ac-pillar", { x: "-100vw", opacity: 0 });
      // Mascot starts off-screen left
      gsap.set(".ac-flying-mascot", { x: "-100vw", opacity: 1 });

      // ── Master timeline ──
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => tl.play(),
      });

      // Everything lands at t=3.5s
      const LAND = 3.5;

      // ── Mascot is the engine — flies the full duration and arrives at LAND ──
      tl.to(".ac-flying-mascot", { x: 0, duration: LAND, ease: "power2.out" }, 0);

      // ── Content follows like train carriages, last pillar lands at LAND ──
      tl.to(".ac-label", { x: 0, opacity: 1, duration: 1.4 }, 0.3);
      tl.to(".ac-accent", { x: 0, opacity: 1, duration: 1.4 }, 0.5);
      tl.to(".ac-heading", { x: 0, opacity: 1, duration: 1.6 }, 0.7);
      tl.to(".ac-body", { x: 0, opacity: 1, duration: 1.6 }, 1.0);
      tl.to(".ac-stat", { x: 0, opacity: 1, duration: 1.4, stagger: 0.2 }, 1.4);
      tl.to(".ac-line-h", { x: 0, opacity: 1, duration: 1.4 }, 2.0);
      // 3 pillars with 0.25 stagger: starts at 2.1, last one starts at 2.6, + 0.9 duration = lands at 3.5
      tl.to(".ac-pillar", { x: 0, opacity: 1, duration: 0.9, stagger: 0.25 }, 2.1);

      // ── Mascot wobbles gently during flight ──
      tl.to(".ac-flying-mascot-img", { rotation: -8, duration: 0.6, ease: "power1.out" }, 0);
      tl.to(".ac-flying-mascot-img", { rotation: 5, duration: 0.8, ease: "sine.inOut" }, 0.6);
      tl.to(".ac-flying-mascot-img", { rotation: -3, duration: 0.8, ease: "sine.inOut" }, 1.4);
      tl.to(".ac-flying-mascot-img", { rotation: 2, duration: 0.7, ease: "sine.inOut" }, 2.2);
      tl.to(".ac-flying-mascot-img", { rotation: 0, duration: 0.6, ease: "power2.out" }, 2.9);

      // ── Mascot settles and starts idle float (at LAND) ──
      tl.call(() => {
        gsap.to(".ac-flying-mascot", {
          y: "-=20", duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
      }, [], LAND);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-6 md:py-8 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(90,94,136,0.05) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Flying mascot (engine of the train) ── */}
      <div className="ac-curtain-wrap absolute inset-0 z-30 pointer-events-none overflow-hidden">
        <div className="ac-flying-mascot absolute top-1/2 -translate-y-1/2 right-[5%] z-20">

          {/* ── BG: Radial pulse waves ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="ac-wave" style={{ width: "200px", height: "200px", animationDelay: "0s" }} />
            <div className="ac-wave" style={{ width: "200px", height: "200px", animationDelay: "1s" }} />
            <div className="ac-wave" style={{ width: "200px", height: "200px", animationDelay: "2s" }} />
          </div>

          {/* ── BG: Warm glow ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full pointer-events-none ac-mglow" />

          {/* ── BG: Speed lines (motion trail) ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[350px] pointer-events-none">
            <div className="ac-speedline" style={{ top: "15%", left: "5%", width: "60px", animationDelay: "0s" }} />
            <div className="ac-speedline" style={{ top: "30%", left: "0%", width: "80px", animationDelay: "0.4s" }} />
            <div className="ac-speedline" style={{ top: "45%", left: "3%", width: "50px", animationDelay: "0.8s" }} />
            <div className="ac-speedline" style={{ top: "60%", left: "8%", width: "70px", animationDelay: "0.2s" }} />
            <div className="ac-speedline" style={{ top: "75%", left: "2%", width: "55px", animationDelay: "0.6s" }} />
            <div className="ac-speedline" style={{ top: "22%", left: "80%", width: "45px", animationDelay: "1.0s" }} />
            <div className="ac-speedline" style={{ top: "50%", left: "85%", width: "60px", animationDelay: "0.3s" }} />
            <div className="ac-speedline" style={{ top: "70%", left: "78%", width: "50px", animationDelay: "0.7s" }} />
          </div>

          {/* ── BG: Sparkle dots ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none">
            <div className="ac-sparkle" style={{ top: "10%", left: "50%", animationDelay: "0s" }} />
            <div className="ac-sparkle" style={{ top: "25%", left: "80%", animationDelay: "0.5s" }} />
            <div className="ac-sparkle" style={{ top: "50%", left: "90%", animationDelay: "1.0s" }} />
            <div className="ac-sparkle" style={{ top: "80%", left: "70%", animationDelay: "1.5s" }} />
            <div className="ac-sparkle" style={{ top: "85%", left: "30%", animationDelay: "0.8s" }} />
            <div className="ac-sparkle" style={{ top: "20%", left: "15%", animationDelay: "1.3s" }} />
          </div>

          {/* ── Mascot image ── */}
          <div className="ac-flying-mascot-img relative z-10">
            <Image
              src="/mascot-img.png"
              alt="QWQER Mascot"
              width={280}
              height={350}
              className="h-[220px] md:h-[300px] w-auto object-contain"
              style={{
                filter: "drop-shadow(-20px 0 40px rgba(0,0,0,0.5)) drop-shadow(0 0 30px rgba(223,213,75,0.3))",
                transform: "scaleX(-1)",
              }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .ac-wave {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 1.5px solid rgba(223,213,75,0.2);
          transform: translate(-50%, -50%) scale(0.3);
          opacity: 0;
          animation: mWave 3s ease-out infinite;
        }
        .ac-mglow {
          background: radial-gradient(circle, rgba(223,213,75,0.12) 0%, rgba(223,213,75,0.04) 40%, transparent 70%);
          animation: mGlow 3s ease-in-out infinite;
        }
        .ac-speedline {
          position: absolute;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, transparent, rgba(223,213,75,0.3), transparent);
          animation: mSpeed 1.5s ease-in-out infinite;
        }
        .ac-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: rgba(223,213,75,0.6);
          box-shadow: 0 0 8px rgba(223,213,75,0.4);
          animation: mSparkle 2s ease-in-out infinite;
        }
        @keyframes mWave {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
        @keyframes mGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.9; }
        }
        @keyframes mSpeed {
          0%, 100% { opacity: 0; transform: scaleX(0.3); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes mSparkle {
          0%, 100% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 relative min-h-[500px]">

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
            <p className="ac-body mt-5 text-white/70 text-base md:text-[17px] leading-[1.8] max-w-lg">
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
                  <div className="text-[11px] uppercase tracking-[0.15em] text-white/70 mt-1 font-medium">
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
                    <p className="text-white/70 text-[15px] leading-[1.7] group-hover:text-white/85 transition-colors duration-300">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column: Mascot ──────────────────────── */}
          <div className="ac-mascot-wrap flex-shrink-0 order-1 lg:order-2 relative self-center hidden">

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


          </div>

        </div>
      </div>
    </section>
  );
}
