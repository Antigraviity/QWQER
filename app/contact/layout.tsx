import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | QWQER - Get in Touch with Our Team",
    description: "Have questions about QWQER Express or Fleet services? Reach out to our team for enquiries, support, or partnership opportunities.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
