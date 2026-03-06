"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const team = [
  {
    name: "Prakash Velayudhan",
    role: "Managing Director",
    image: "/team/prakash.png",
    back: ["Founder & MD, QWY Group", "25+ years Telecom & Tech"],
  },
  {
    name: "Aditya Nair",
    role: "VP, Fleet",
    image: "/team/aditya.png",
    back: ["14 years in Indian startups", "Education, Hospitality, Logistics Expertise"],
  },
  {
    name: "Vineetha Chidambaran",
    role: "COO, Express",
    image: "/team/vineetha.png",
    back: ["22 years in multi-function experience", "Ops, Hiring, Marketing, Solutions"],
  },
  {
    name: "Rakesh J",
    role: "CFO",
    image: "/team/rakesh.png",
    back: ["18 year cross-industry experience", "CA with dual master's"],
  },
  {
    name: "Clement Robinson",
    role: "Sr. VP, Express",
    image: "/team/clement.png",
    back: ["20+ years in logistics operations", "End-to-end supply chain expertise"],
  },
  {
    name: "Resmi Ramsen",
    role: "Head HR",
    image: "/team/resmi.png",
    back: ["15+ years in HR management", "Talent acquisition & culture building"],
  },
  {
    name: "Remya Nair",
    role: "VP, Marketing",
    image: "/team/remya.png",
    back: ["16 years in brand & marketing", "Digital strategy & growth"],
  },
  {
    name: "Girish Ramanan",
    role: "Head of Technology",
    image: "/team/girish.png",
    back: ["20+ years in technology", "Platform architecture & engineering"],
  },
];

function FlipCard({ member, index }: { member: typeof team[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="team-card cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full aspect-[3/4] transition-transform duration-600"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s ease-in-out",
        }}
      >
        {/* ── Front ────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.07]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="relative w-full h-[calc(100%-60px)] bg-gray-900">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
              onError={(e) => {
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <span class="text-6xl font-black" style="color: rgba(89,93,135,0.3)">${member.name[0]}</span>
                    </div>
                  `;
                }
              }}
            />
          </div>
          <div className="h-[60px] flex flex-col justify-center px-4">
            <h4 className="text-white font-bold text-sm leading-tight">{member.name}</h4>
            <p className="text-gray-500 text-xs mt-0.5">{member.role}</p>
          </div>
        </div>

        {/* ── Back ─────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #595d87 0%, #3d405c 100%)",
          }}
        >
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(white 0.8px, transparent 0.8px)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl font-black text-white/80">{member.name[0]}</span>
            </div>
            <h4 className="text-white font-bold text-base mb-1">{member.name}</h4>
            <p className="text-white/50 text-[11px] uppercase tracking-wider mb-5">{member.role}</p>
            <div className="w-10 h-[2px] bg-white/20 mx-auto mb-5 rounded-full" />
            {member.back.map((line, j) => (
              <p key={j} className="text-white/75 text-[13px] leading-relaxed mb-2">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MeetTheTeam() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll(".team-word");
      if (words) {
        gsap.fromTo(words,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          }
        );
      }

      gsap.fromTo(".team-card",
        { y: 60, opacity: 0, scale: 0.93 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: { each: 0.1, from: "start", grid: "auto" },
          duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".team-grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-14 md:py-16 px-4 md:px-8 relative overflow-hidden"
    >
      <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-[#595d87]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        <h2
          ref={headingRef}
          className="text-[48px] font-bold text-white mb-14 tracking-tight"
        >
          {"Meet Our Team".split(" ").map((word, i) => (
            <span key={i} className="team-word inline-block mr-4">{word}</span>
          ))}
        </h2>

        <div className="team-grid grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <FlipCard key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
