"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const subsidiaries = [
  {
    name: "Qwy Technologies Pvt. Ltd.",
    role: "Parent Company",
    desc: "Group holding entity headquartered in Bangalore, overseeing all operations.",
    primary: true,
  },
  {
    name: "Qwy Express Pvt. Ltd.",
    role: "Line Haul Subsidiary",
    desc: "Manages time-critical deliveries, real-time tracking, and rapid intracity/hyperlocal last-mile execution.",
    color: "#5b4bd5",
  },
  {
    name: "Qwy Fleet Pvt. Ltd.",
    role: "Urban Haul Subsidiary",
    desc: "Manages fleet operations, driver networks, and on-ground execution across all routes.",
    color: "#3b5ee8",
  },
];

export default function CorporateStructure() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hide everything initially
      gsap.set(".cs-label", { opacity: 0, y: 15 });
      gsap.set(".cs-heading", { opacity: 0, y: 25 });
      gsap.set(".cs-parent", { opacity: 0, y: 30, scale: 0.95 });
      gsap.set(".cs-line-v", { scaleY: 0, transformOrigin: "top center" });
      gsap.set(".cs-line-h", { scaleX: 0, transformOrigin: "center center" });
      gsap.set(".cs-line-branch", { scaleY: 0, transformOrigin: "top center" });
      gsap.set(".cs-node", { scale: 0 });
      gsap.set(".cs-child", { opacity: 0, y: 30 });
      gsap.set(".cs-body", { opacity: 0, y: 20 });

      // Master timeline — plays once on scroll
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

      // 1. Label
      tl.to(".cs-label", { opacity: 1, y: 0, duration: 0.2 });
      // 2. Heading
      tl.to(".cs-heading", { opacity: 1, y: 0, duration: 0.25 }, "-=0.1");
      // 3. Parent card scales in
      tl.to(".cs-parent", { opacity: 1, y: 0, scale: 1, duration: 0.3 }, "-=0.1");
      // 4. Vertical line draws down
      tl.to(".cs-line-v", { scaleY: 1, duration: 0.25, ease: "power2.inOut" });
      // 5. Center node pops
      tl.to(".cs-node", { scale: 1, duration: 0.15, stagger: 0.04, ease: "back.out(3)" }, "-=0.1");
      // 6. Horizontal line draws
      tl.to(".cs-line-h", { scaleX: 1, duration: 0.3, ease: "power2.inOut" }, "-=0.1");
      // 7. Branch lines drop
      tl.to(".cs-line-branch", { scaleY: 1, duration: 0.2, stagger: 0.05, ease: "power2.inOut" }, "-=0.1");
      // 8. Child cards appear
      tl.to(".cs-child", { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 });
      // 9. Body text
      tl.to(".cs-body", { opacity: 1, y: 0, duration: 0.25 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-14 md:py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(238,52,37,0.04)", filter: "blur(100px)" }} />

      <div className="max-w-[1100px] mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="cs-label inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ border: "1px solid rgba(238,52,37,0.2)", background: "rgba(238,52,37,0.05)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ee3425] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#ee3425]/80">Corporate Structure</span>
          </div>
          <h2 className="cs-heading text-[48px] font-extrabold text-white leading-tight tracking-tight">
            Our Group <span className="text-white">Entities</span>
          </h2>
        </div>

        {/* ── Org Chart ─────────────────────────────────────────── */}
        <div className="relative flex flex-col items-center">

          {/* Parent Company Card */}
          <div className="cs-parent relative z-10 w-full max-w-xs">
            <div className="relative p-5 md:p-6 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #ee3425 0%, #c4271b 100%)" }}>
              {/* Dot pattern */}
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: "radial-gradient(white 0.8px, transparent 0.8px)", backgroundSize: "20px 20px" }} />
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/80">Parent Company</span>
                </div>
                <h3 className="text-lg md:text-xl font-extrabold text-white">Qwy Technologies Pvt. Ltd.</h3>
                <p className="text-white/60 text-xs mt-1">Headquartered in Bangalore</p>
              </div>
            </div>
          </div>

          {/* ── Connector Lines ──────────────────────────────── */}
          <div className="relative w-full flex flex-col items-center">
            {/* Vertical line from parent */}
            <div className="cs-line-v w-[2px] bg-[#ee3425]/30 relative" style={{ height: "50px" }}>
              {/* Node dot */}
              <div className="cs-node absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rounded-full bg-black border-2 border-[#ee3425]" />
            </div>

            {/* Horizontal line */}
            <div className="cs-line-h hidden md:block absolute h-[2px] bg-[#ee3425]/30" style={{ top: "50px", left: "25%", right: "25%" }}>
              {/* Left node */}
              <div className="cs-node absolute -left-[5px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-black border-2 border-[#ee3425]" />
              {/* Right node */}
              <div className="cs-node absolute -right-[5px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-black border-2 border-[#ee3425]" />
            </div>

            {/* Branch lines down to children */}
            <div className="hidden md:flex justify-between absolute" style={{ top: "50px", left: "25%", right: "25%", height: "40px" }}>
              <div className="cs-line-branch w-[2px] bg-[#ee3425]/30 h-full" />
              <div className="cs-line-branch w-[2px] bg-[#ee3425]/30 h-full" />
            </div>
          </div>

          {/* ── Subsidiary Cards ─────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-5 w-full mt-8 md:mt-16">
            {subsidiaries.slice(1).map((s, i) => {
              const c = s.color || "#ee3425";
              return (
                <div key={i} className="cs-child group">
                  <div className="relative p-6 rounded-2xl border transition-all duration-500 h-full overflow-hidden flex flex-col items-center text-center" style={{ borderColor: `${c}30`, background: `${c}08` }}>


                    {/* Role badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4" style={{ border: `1px solid ${c}25`, background: `${c}10` }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
                      <span className="text-[10px] uppercase tracking-[0.15em] font-semibold" style={{ color: `${c}cc` }}>{s.role}</span>
                    </div>

                    <h3 className="text-white font-bold text-lg mb-2 transition-colors duration-300" style={{ color: c }}>
                      {s.name}
                    </h3>
                    <p className="text-white/70 text-base leading-[1.7] group-hover:text-white/85 transition-colors duration-300">
                      {s.desc}
                    </p>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700" style={{ background: `linear-gradient(to right, ${c}, transparent)` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Body Text ────────────────────────────────────── */}
          <div className="cs-body-wrap mt-12 max-w-2xl mx-auto text-center">
            <p className="cs-body text-white/70 text-base leading-[1.8]">
              Across its group entities, QWQER combines technology development, fleet operations, and execution management to support enterprise logistics requirements across multiple industries and geographies.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
