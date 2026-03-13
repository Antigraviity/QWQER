"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const team = [
  {
    name: "Prakash Velayudhan",
    role: "Managing Director",
    image: "/leaders/Prakash.jpg.webp",
    imagePos: "object-center",
    back: ["Founder & MD, QWY Group", "25+ years Telecom & Tech"],
  },
  {
    name: "Aditya Nair",
    role: "VP, Fleet",
    image: "/leaders/Aditya.webp",
    back: ["14 years in Indian startups", "Education, Hospitality, Logistics Expertise"],
  },
  {
    name: "Vineetha Chidambaran",
    role: "COO, Express",
    image: "/leaders/Vineetha Chidambaran - COO Express.webp",
    back: ["22 years in multi-function experience", "Ops, Hiring, Marketing, Solutions"],
  },
  {
    name: "Rakesh J",
    role: "CFO",
    image: "/leaders/Rakesh.jpg.webp",
    back: ["18 year cross-industry experience", "CA with dual master's"],
  },
  {
    name: "Clement Robinson",
    role: "Sr. VP, Express",
    image: "/leaders/clement.webp",
    back: ["20+ years in logistics operations", "End-to-end supply chain expertise"],
  },
  {
    name: "Resmi Ramsen",
    role: "Head HR",
    image: "/leaders/resmi.webp",
    back: ["15+ years in HR management", "Talent acquisition & culture building"],
  },
  {
    name: "Remya Nair",
    role: "VP, Marketing",
    image: "/leaders/remya.webp",
    back: ["16 years in brand & marketing", "Digital strategy & growth"],
  },
  {
    name: "Girish Ramanan",
    role: "Head of Technology",
    image: "/leaders/girish.webp",
    back: ["20+ years in technology", "Platform architecture & engineering"],
  },
];

function FlipCard({ member, index }: { member: typeof team[0] & { imageStyle?: string }; index: number }) {
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
              className={`object-cover ${member.imagePos || "object-top"} ${member.imageStyle || ""}`}
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
            <h4 className="text-white font-bold text-base leading-tight">{member.name}</h4>
            <p className="text-white/70 text-sm mt-0.5">{member.role}</p>
          </div>
        </div>

        {/* ── Back ─────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#0a0a0a",
          }}
        >
          {/* Background image with low opacity */}
          <div className="absolute inset-0">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className={`object-cover ${member.imagePos || "object-top"} opacity-[0.75] ${member.imageStyle || ""}`}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          </div>

          <div className="relative z-10">
            <h4 className="text-white font-bold text-lg mb-1">{member.name}</h4>
            <p className="text-white/70 text-xs uppercase tracking-wider mb-5">{member.role}</p>
            <div className="w-10 h-[2px] bg-white/20 mx-auto mb-5 rounded-full" />
            {member.back.map((line, j) => (
              <p key={j} className="text-white/80 text-[15px] leading-relaxed mb-2">
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
