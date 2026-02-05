import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import CustomSplitServices from "@/components/CustomSplitServices";
import WhyQwqer from "@/components/WhyQwqer";
import Features from "@/components/Features";
import Trusted from "@/components/Trusted";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import ConnectingPath from "@/components/ConnectingPath";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#ee3425] selection:text-white relative">
      <ConnectingPath />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <CustomSplitServices />
      <WhyQwqer />
      <Features />
      <Trusted />
      <Stats />
      <Footer />
    </main>
  );
}
