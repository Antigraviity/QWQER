"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FaMapMarkerAlt, FaClock, FaBriefcase, FaArrowRight } from "react-icons/fa";

type Career = {
    id: string;
    title: string;
    slug: string;
    department: string;
    location: string;
    type: string;
    experience: string | null;
};

export default function CareersOpenings({ careers }: { careers: Career[] }) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(".co-title", { y: 30, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
            });
            gsap.fromTo(".co-card", { y: 40, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Group by department
    const grouped = careers.reduce((acc: Record<string, Career[]>, career) => {
        if (!acc[career.department]) acc[career.department] = [];
        acc[career.department].push(career);
        return acc;
    }, {});

    return (
        <section ref={sectionRef} className="relative py-24 md:py-32">
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #000 0%, #0a0505 50%, #000 100%)" }} />

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                {/* Section Header */}
                <div className="co-title text-center mb-16" style={{ opacity: 0 }}>
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-[#ee3425] border border-[#ee3425]/20 bg-[#ee3425]/5 mb-6">
                        Open Positions
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                        Find Your <span className="text-[#ee3425]">Role</span>
                    </h2>
                    <p className="text-white/50 text-base max-w-lg mx-auto">
                        We&apos;re looking for people who want to build something meaningful. Check out our current openings.
                    </p>
                </div>

                {/* Job Listings */}
                <div className="space-y-10">
                    {Object.entries(grouped).map(([dept, jobs]) => (
                        <div key={dept}>
                            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 pl-1">{dept}</h3>
                            <div className="space-y-3">
                                {jobs.map((career) => (
                                    <Link
                                        key={career.id}
                                        href={`/careers/${career.slug}`}
                                        className="co-card group flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#ee3425]/20 transition-all duration-300"
                                        style={{ opacity: 0 }}
                                    >
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-white group-hover:text-[#ee3425] transition-colors mb-2">
                                                {career.title}
                                            </h4>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
                                                <span className="flex items-center gap-1.5">
                                                    <FaMapMarkerAlt className="w-3 h-3" /> {career.location}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <FaBriefcase className="w-3 h-3" /> {career.type}
                                                </span>
                                                {career.experience && (
                                                    <span className="flex items-center gap-1.5">
                                                        <FaClock className="w-3 h-3" /> {career.experience}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#ee3425] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                            View Details <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
