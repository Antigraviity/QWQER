"use client";

import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import HeroExpress from "@/components/express/HeroExpress";
import WhyQwqerExpress from "@/components/express/WhyQwqerExpress";
import ExpressSolutions from "@/components/express/ExpressSolutions";
import ExpressTrusted from "@/components/express/ExpressTrusted";
import ExpressIndustries from "@/components/express/ExpressIndustries";
import ExpressJoin from "@/components/express/ExpressJoin";
import PartnerCTA from "@/components/partner/PartnerCTA";

export default function ExpressPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#7c3aed] selection:text-white relative">
            <ScrollProgress />
            <Navbar />

            {/* Express Page Sections */}
            <div className="pt-0 pb-0">
                <HeroExpress />
                <WhyQwqerExpress />
                <ExpressSolutions />
                <ExpressTrusted />
                <ExpressIndustries />
                <ExpressJoin />
                <PartnerCTA />
            </div>

            <Footer />
        </main>
    );
}
