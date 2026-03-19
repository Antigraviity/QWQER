import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerHero from "@/components/partner/PartnerHero";
import PartnerExpress from "@/components/partner/PartnerExpress";
import PartnerFleet from "@/components/partner/PartnerFleet";
import PartnerCTA from "@/components/partner/PartnerCTA";

export const metadata = {
  title: "Partner With Us - Deliver, Earn, and Grow",
  description: "Join QWQER as a rider or fleet owner. Flexible work, transparent pay, no contracts. Start earning anytime with QWQER Express and QWQER Fleet.",
  openGraph: {
    title: "Partner With QWQER - Deliver, Earn, and Grow",
    description: "Join as a rider or fleet owner. Flexible work, transparent pay, no contracts.",
    url: "https://qwqer.in/partner",
  },
  alternates: { canonical: "https://qwqer.in/partner" },
};

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#ee3425] selection:text-white relative overflow-x-hidden">
      <Navbar />
      <PartnerHero />
      <PartnerExpress />
      <PartnerFleet />
      <PartnerCTA />
      <Footer />
    </main>
  );
}
