import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - Get in Touch with Our Team",
    description: "Have questions about QWQER Express or Fleet services? Reach out to our team for enquiries, support, or partnership opportunities across Bengaluru, Chennai, Kochi, and Hyderabad.",
    openGraph: {
        title: "Contact QWQER - Get in Touch",
        description: "Reach out to QWQER for enquiries, support, or partnership opportunities.",
        url: "https://qwqer.in/contact",
    },
    alternates: { canonical: "https://qwqer.in/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
