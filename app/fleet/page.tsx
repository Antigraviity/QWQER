"use client";

import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import HeroScroll from "@/components/fleet/HeroScroll";
import WhyQwqerFleet from "@/components/fleet/WhyQwqerFleet";
import FleetCustomers from "@/components/fleet/FleetCustomers";
import FleetTrusted from "@/components/fleet/FleetTrusted";
import FleetVendors from "@/components/fleet/FleetVendors";
import FleetServicesTypes from "@/components/fleet/FleetServicesTypes";
import FleetIndustries from "@/components/fleet/FleetIndustries";
import FleetFooterScroll from "@/components/fleet/FleetFooterScroll";

export default function FleetPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#3b82f6] selection:text-white relative font-sans">
            <ScrollProgress />
            <Navbar />

            {/* Fleet Page Sections */}
            <div className="pt-0 pb-0">
                <HeroScroll />
                <WhyQwqerFleet />
                <FleetCustomers />
                <FleetTrusted />
                <FleetVendors />
                <FleetServicesTypes />
                <FleetIndustries />
                <FleetFooterScroll />
            </div>

            <Footer />
        </main>
    );
}
