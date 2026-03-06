"use client";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PILLARS = [
  {
    title: "End-to-End Visibility",
    desc: "Experienced teams to actively manage every movement end to end.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4",
  },
  {
    title: "Consistent Monitoring",
    desc: "Structured planning and monitoring to ensure consistent performance.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    title: "Structured Logistics",
    desc: "Design that supports multi-location and time-critical logistics.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Combined Operations",
    desc: "Combined delivery and fleet operations across hyperlocal, intracity and intercity routes.",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    title: "Operational Oversight",
    desc: "Real-time tracking with hands-on operational oversight.",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  },
];

export default function DisciplinedExecution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const ghostRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate path from card corner positions
  const buildPath = useCallback(() => {
    if (!containerRef.current) return "";
    const cRect = containerRef.current.getBoundingClientRect();

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length < 5) return "";

    // Dot is 28px, positioned at -top-[14px] -right-[14px]
    // This means the dot's top-left is at (card.right - 14, card.top - 14)
    // The dot's CENTER is at (card.right - 14 + 14, card.top - 14 + 14) = (card.right, card.top)
    // So the center of the dot aligns exactly with the card's top-right corner
    const pts = cards.map((card) => {
      const r = card.getBoundingClientRect();
      return {
        x: r.right - cRect.left,
        y: r.top - cRect.top,
      };
    });

    // Path order: card0 → card1 → card2 → down to card4(last card, far right) → left to card3(middle)
    // Card indices: 0,1,2 = row1 left-to-right, 3=row2 middle, 4=row2 right
    // Visual path: top-left → top-center → top-right → bottom-right → bottom-middle
    const order = [0, 1, 2, 4, 3];
    const ordered = order.map((i) => pts[i]);

    // Build an L-shaped path with right angles:
    // Horizontal across top (card0 → card1 → card2)
    // Vertical down right side (card2 → card4, same X)
    // Horizontal across bottom (card4 → card3)
    const d = [
      `M ${ordered[0].x} ${ordered[0].y}`,  // card 1
      `L ${ordered[1].x} ${ordered[1].y}`,  // card 2
      `L ${ordered[2].x} ${ordered[2].y}`,  // card 3 (top-right)
      `L ${ordered[2].x} ${ordered[3].y}`,  // drop straight down (same x as card3, y of card5)
      `L ${ordered[3].x} ${ordered[3].y}`,  // card 5 (may be same point)
      `L ${ordered[4].x} ${ordered[4].y}`,  // card 4
    ].join(" ");

    return d;
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading
      const words = headingRef.current?.querySelectorAll(".exec-word");
      if (words) {
        gsap.fromTo(words,
          { y: 40, opacity: 0, rotateX: -30 },
          {
            y: 0, opacity: 1, rotateX: 0,
            stagger: 0.08, duration: 0.6, ease: "back.out(1.7)",
            scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
          }
        );
      }

      // Hide cards & markers — use only opacity, no y offset that affects position
      gsap.set(".de-stop-card", { opacity: 0 });
      gsap.set(".de-stop-marker", { scale: 0 });

      // Build initial path and set up line
      // Use requestAnimationFrame to ensure layout is settled
      requestAnimationFrame(() => {
        const d = buildPath();
        if (!d || !routeRef.current || !ghostRef.current) return;

        routeRef.current.setAttribute("d", d);
        ghostRef.current.setAttribute("d", d);

        const totalLen = routeRef.current.getTotalLength();
        gsap.set(routeRef.current, { strokeDasharray: totalLen, strokeDashoffset: totalLen });

        // Parse the actual waypoints from the path to compute real segment lengths
        const pointStrings = d.replace(/[ML]/g, "").trim().split(/\s+(?=\d)/);
        const waypoints: { x: number; y: number }[] = [];
        for (let i = 0; i < pointStrings.length; i += 2) {
          waypoints.push({ x: parseFloat(pointStrings[i]), y: parseFloat(pointStrings[i + 1]) });
        }

        // Calculate cumulative distances for each waypoint
        const cumDist: number[] = [0];
        for (let i = 1; i < waypoints.length; i++) {
          const dx = waypoints[i].x - waypoints[i - 1].x;
          const dy = waypoints[i].y - waypoints[i - 1].y;
          cumDist.push(cumDist[i - 1] + Math.sqrt(dx * dx + dy * dy));
        }
        const pathTotal = cumDist[cumDist.length - 1];

        // Fraction of total path at each waypoint
        const fractions = cumDist.map((d) => d / pathTotal);

        // 6 waypoints: card0, card1, card2, corner-bend, card4, card3
        const cardOrder = [0, 1, 2, -1, 4, 3];

        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 68%",
          once: true,
          onEnter: () => tl.play(),
        });

        cardOrder.forEach((cardIdx, stepIdx) => {
          // Draw line exactly to this waypoint's real position
          tl.to(routeRef.current, {
            strokeDashoffset: totalLen * (1 - fractions[stepIdx]),
            duration: stepIdx === 0 ? 0.01 : 0.2,
            ease: "power2.inOut",
          });
          // Card + marker appear strictly AFTER line arrives
          if (cardIdx >= 0) {
            tl.to(`.de-marker-${cardIdx}`, { scale: 1, duration: 0.15, ease: "back.out(3)" }, "+=0");
            tl.to(`.de-card-${cardIdx}`, { opacity: 1, duration: 0.15 }, "-=0.1");
          }
        });
      });

      // Recalculate on resize
      const onResize = () => {
        const d = buildPath();
        if (d && routeRef.current && ghostRef.current) {
          routeRef.current.setAttribute("d", d);
          ghostRef.current.setAttribute("d", d);
        }
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);

    }, sectionRef);

    return () => ctx.revert();
  }, [buildPath]);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-14 md:py-16 px-4 md:px-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(222,126,61,0.05)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[350px] rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(222,126,61,0.03)" }} />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Heading */}
        <div className="mb-10 md:mb-14 text-right">
          <h2 ref={headingRef} className="text-[48px] font-bold leading-tight tracking-tight" style={{ perspective: "800px" }}>
            {"Disciplined execution".split(" ").map((word, i) => (
              <span key={i} className="exec-word inline-block ml-3" style={{ color: "#de7e3d" }}>{word}</span>
            ))}
            {" "}
            {"is our key".split(" ").map((word, i) => (
              <span key={i + 10} className="exec-word inline-block ml-3" style={{ color: "white" }}>{word}</span>
            ))}
          </h2>
          <p className="text-white/30 text-sm md:text-base leading-relaxed mt-4">
            Every delivery follows a disciplined chain of operations built for consistency.
          </p>
        </div>

        {/* Cards + Route */}
        <div ref={containerRef} className="de-route-section relative">

          {/* SVG route line */}
          <svg className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none z-[0]" style={{ overflow: "visible" }}>
            <path ref={ghostRef} stroke="rgba(255,255,255,0.03)" strokeWidth="2" fill="none" />
            <path ref={routeRef} stroke="#de7e3d" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
          </svg>

          {/* Row 1 */}
          <div className="relative grid md:grid-cols-3 gap-5 md:gap-6 z-[2]">
            {PILLARS.slice(0, 3).map((p, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`de-stop-card de-card-${i} relative`}
              >
                {/* Dot at top-right corner */}
                <div className={`de-stop-marker de-marker-${i} absolute -top-[14px] -right-[14px] z-10`}>
                  <div className="w-7 h-7 rounded-full bg-black border-2 flex items-center justify-center"
                    style={{ borderColor: "#de7e3d", boxShadow: "0 0 14px rgba(222,126,61,0.4)" }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: "#de7e3d" }} />
                  </div>
                </div>

                <div className="group relative p-6 pt-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#de7e3d]/25 hover:bg-white/[0.05] transition-all duration-500 h-full overflow-hidden">
                  <div className="absolute top-3 right-5 text-6xl font-black transition-colors duration-500 select-none" style={{ color: "rgba(222,126,61,0.06)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                      <path d={p.icon} />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-[17px] mb-2 group-hover:text-[#de7e3d] transition-colors duration-300">{p.title}</h3>
                  <p className="text-white/30 text-[13px] leading-[1.7] group-hover:text-white/45 transition-colors duration-300">{p.desc}</p>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700" style={{ background: "linear-gradient(to right, #de7e3d, transparent)" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="relative grid md:grid-cols-3 gap-5 md:gap-6 mt-5 md:mt-6 z-[2]">
            <div className="hidden md:block" />
            {PILLARS.slice(3, 5).map((p, i) => (
              <div
                key={i + 3}
                ref={(el) => { cardRefs.current[i + 3] = el; }}
                className={`de-stop-card de-card-${i + 3} relative`}
              >
                {/* Dot at top-right corner */}
                <div className={`de-stop-marker de-marker-${i + 3} absolute -top-[14px] -right-[14px] z-10`}>
                  <div className="w-7 h-7 rounded-full bg-black border-2 flex items-center justify-center"
                    style={{ borderColor: "#de7e3d", boxShadow: "0 0 14px rgba(222,126,61,0.4)" }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: "#de7e3d" }} />
                  </div>
                </div>

                <div className="group relative p-6 pt-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#de7e3d]/25 hover:bg-white/[0.05] transition-all duration-500 h-full overflow-hidden">
                  <div className="absolute top-3 right-5 text-6xl font-black transition-colors duration-500 select-none" style={{ color: "rgba(222,126,61,0.06)" }}>
                    {String(i + 4).padStart(2, "0")}
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                      <path d={p.icon} />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-[17px] mb-2 group-hover:text-[#de7e3d] transition-colors duration-300">{p.title}</h3>
                  <p className="text-white/30 text-[13px] leading-[1.7] group-hover:text-white/45 transition-colors duration-300">{p.desc}</p>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700" style={{ background: "linear-gradient(to right, #de7e3d, transparent)" }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
