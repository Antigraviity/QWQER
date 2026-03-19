import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareersHero from "@/components/careers/CareersHero";
import CareersWhy from "@/components/careers/CareersWhy";
import CareersValues from "@/components/careers/CareersValues";
import CareersProcess from "@/components/careers/CareersProcess";
import CareersOpenings from "@/components/careers/CareersOpenings";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Careers - Solve Real Problems, Build Real Impact",
  description: "Join QWQER and work on real transportation challenges across on-demand express delivery and fleet logistics. We value execution, ownership, and structured growth.",
  openGraph: {
    title: "Careers at QWQER - Solve Real Problems, Build Real Impact",
    description: "Work on real transportation challenges across express delivery and fleet logistics.",
    url: "https://qwqer.in/careers",
  },
  alternates: { canonical: "https://qwqer.in/careers" },
};

export default async function CareersPage() {
  const careers = await db.career.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#ee3425] selection:text-white relative overflow-x-hidden">
      <Navbar />
      <CareersHero />
      <CareersWhy />
      <CareersValues />
      {careers.length > 0 && <CareersOpenings careers={careers} />}
      <Footer />
    </main>
  );
}
