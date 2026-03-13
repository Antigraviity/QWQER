import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resources | QWQER - Blogs, Insights & Industry Trends",
    description: "Explore insights, guides, and industry trends to fuel your logistics strategy. Read the latest from QWQER.",
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
