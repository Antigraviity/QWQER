import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaMapMarkerAlt, FaBriefcase, FaClock } from "react-icons/fa";
import JobApplicationForm from "@/components/careers/JobApplicationForm";
import type { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const career = await db.career.findUnique({
        where: { slug: params.slug },
        select: { title: true, department: true, location: true },
    });
    if (!career) return { title: 'Position Not Found | QWQER' };
    return {
        title: `${career.title} - ${career.department} | QWQER Careers`,
        description: `Join QWQER as ${career.title} in ${career.location}. Apply now!`,
    };
}

export default async function CareerDetailPage({ params }: { params: { slug: string } }) {
    const career = await db.career.findUnique({
        where: { slug: params.slug },
    });

    if (!career || !career.published) notFound();

    return (
        <main className="min-h-screen bg-white text-gray-900 selection:bg-[#ee3425] selection:text-white" data-blog-detail="true">
            <Navbar />

            <div className="pt-28 pb-4 px-6 max-w-4xl mx-auto">
                <Link href="/careers" className="inline-flex items-center text-gray-400 hover:text-[#ee3425] transition-colors text-sm font-medium">
                    <FaArrowLeft className="mr-2" /> Back to Careers
                </Link>
            </div>

            <article className="max-w-4xl mx-auto px-6 pb-20">
                {/* Header */}
                <div className="mb-10">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#ee3425]/10 text-[#ee3425] mb-4">
                        {career.department}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                        {career.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                            <FaMapMarkerAlt className="w-4 h-4 text-[#ee3425]" /> {career.location}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaBriefcase className="w-4 h-4 text-[#ee3425]" /> {career.type}
                        </span>
                        {career.experience && (
                            <span className="flex items-center gap-2">
                                <FaClock className="w-4 h-4 text-[#ee3425]" /> {career.experience}
                            </span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <style dangerouslySetInnerHTML={{ __html: `
                    .career-content h2 { font-size: 1.5rem; font-weight: 800; color: #111827; margin-top: 2rem; margin-bottom: 0.75rem; }
                    .career-content h3 { font-size: 1.2rem; font-weight: 700; color: #1f2937; margin-top: 1.5rem; margin-bottom: 0.5rem; }
                    .career-content p { font-size: 1rem; color: #4b5563; line-height: 1.85; margin-bottom: 1rem; }
                    .career-content strong { color: #111827; font-weight: 700; }
                    .career-content ul { margin: 0.75rem 0 1.25rem; padding-left: 1.5rem; }
                    .career-content ul li { font-size: 1rem; color: #4b5563; line-height: 1.85; margin-bottom: 0.4rem; padding-left: 0.5rem; }
                    .career-content ul li::marker { color: #ee3425; }
                    .career-content ol { margin: 0.75rem 0 1.25rem; padding-left: 1.5rem; }
                    .career-content ol li { font-size: 1rem; color: #4b5563; line-height: 1.85; margin-bottom: 0.4rem; }
                ` }} />
                <div className="career-content max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: career.description }} />
                </div>

                {/* Apply Form */}
                <div className="mt-12">
                    <JobApplicationForm careerTitle={career.title} careerSlug={career.slug} />
                </div>
            </article>

            <Footer />
        </main>
    );
}
