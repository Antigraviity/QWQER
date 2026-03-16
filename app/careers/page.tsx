import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareersHero from "@/components/careers/CareersHero";
import CareersWhy from "@/components/careers/CareersWhy";
import CareersOpenings from "@/components/careers/CareersOpenings";
import CareersJoin from "@/components/careers/CareersJoin";
import { db } from "@/lib/db";

export const revalidate = 0;

export const metadata = {
  title: "Careers | QWQER - Solve Real Problems, Build Real Impact",
  description: "Join QWQER and work on real transportation challenges across on-demand express delivery and fleet logistics. We value execution, ownership, and structured growth.",
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
      {careers.length > 0 && <CareersOpenings careers={careers} />}
      <CareersJoin />
      <Footer />
    </main>
  );
}
