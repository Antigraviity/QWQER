import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "QWQER Express | Hyperlocal Delivery That Scales Business Fulfilment",
    description: "Fast, flexible and reliable last-mile delivery across cities. Real-time tracking, system-ready integration, and multiple delivery models for your business.",
};

export default function ExpressLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
