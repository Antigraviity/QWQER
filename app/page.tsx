import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import CustomSplitServices from "@/components/CustomSplitServices";
import WhyQwqer from "@/components/WhyQwqer";
import GlobeFleet from "@/components/GlobeFleet";
import Trusted from "@/components/Trusted";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import ConnectingPath from "@/components/ConnectingPath";
import ScrollIndicator from "@/components/ScrollIndicator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QWQER - Transportation Solutions Built to Move Businesses",
  description: "From intercity FTL operations to hyperlocal deliveries, QWQER helps businesses move goods across India with visibility, control, and consistency.",
  openGraph: {
    title: "QWQER - Transportation Solutions Built to Move Businesses",
    description: "From intercity FTL operations to hyperlocal deliveries, QWQER helps businesses move goods across India.",
    url: "https://qwqer.in",
  },
  alternates: {
    canonical: "https://qwqer.in",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#ee3425] selection:text-white relative">
      <ConnectingPath />
      <ScrollProgress />
      <ScrollIndicator />
      <Navbar />
      <Hero />
      <CustomSplitServices />
      <WhyQwqer />
      <GlobeFleet />
      <Trusted />
      <Stats />
      <Footer />
    </main>
  );
}
