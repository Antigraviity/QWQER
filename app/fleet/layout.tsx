import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "QWQER Fleet | Mid-Mile & Intercity Logistics Solutions",
    description: "Structured operations for predictable, large-scale movement. Flexible vehicle mix, real-time tracking, and operational precision across India.",
};

export default function FleetLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
