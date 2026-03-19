import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "QWQER Express - Fast Hyperlocal & On-Demand Delivery",
    description: "Fast, flexible and reliable last-mile delivery across cities. Real-time tracking, optimized routes, and on-demand express delivery for businesses across India.",
    openGraph: {
        title: "QWQER Express - Fast Hyperlocal & On-Demand Delivery",
        description: "Fast, flexible and reliable last-mile delivery across Indian cities with real-time tracking.",
        url: "https://qwqer.in/express",
    },
    alternates: {
        canonical: "https://qwqer.in/express",
    },
};

export default function ExpressLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
