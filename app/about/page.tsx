import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutCard from "@/components/about/AboutCard";
import DisciplinedExecution from "@/components/about/DisciplinedExecution";
import CorporateStructure from "@/components/about/CorporateStructure";
import MeetTheTeam from "@/components/about/MeetTheTeam";

export const metadata = {
  title: "About Us | QWQER - Built by Operators, Powered by Precision",
  description: "QWQER is led by seasoned transportation operators, logistics professionals and technology leaders delivering disciplined mid-mile and last-mile logistics at scale.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#ee3425] selection:text-white relative overflow-x-hidden">
      <Navbar />
      <AboutHero />
      <AboutCard />
      <DisciplinedExecution />
      <CorporateStructure />
      <MeetTheTeam />
      <Footer />
    </main>
  );
}
