import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "QWQER Fleet - Execution-Driven Goods Transportation Solutions",
    description: "Reliable FTL and LCV-based intracity logistics. Structured operations, flexible vehicle mix, and real-time visibility for predictable large-scale goods movement across India.",
    openGraph: {
        title: "QWQER Fleet - Execution-Driven Goods Transportation",
        description: "Reliable FTL and LCV-based intracity logistics with real-time visibility across India.",
        url: "https://qwqer.in/fleet",
    },
    alternates: {
        canonical: "https://qwqer.in/fleet",
    },
};

export default function FleetLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
