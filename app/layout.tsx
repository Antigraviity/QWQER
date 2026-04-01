import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const outfit = Outfit({ subsets: ["latin"], weight: ['400', '500', '600', '700', '800', '900'], variable: '--font-outfit' });
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL("https://qwqer.in"),
  title: {
    default: "QWQER - Transportation Solutions Built to Move Businesses",
    template: "%s | QWQER",
  },
  description:
    "QWQER provides reliable express delivery and fleet logistics solutions across India. From hyperlocal last-mile to intercity FTL operations — built for speed, scale, and enterprise reliability.",
  keywords: [
    "QWQER",
    "logistics",
    "transportation",
    "express delivery",
    "fleet management",
    "hyperlocal delivery",
    "last mile delivery",
    "FTL",
    "LCV",
    "intracity logistics",
    "delivery partner India",
    "fleet logistics India",
  ],
  authors: [{ name: "QWQER", url: "https://qwqer.in" }],
  creator: "QWQER",
  publisher: "QWY Technologies Pvt. Ltd.",
  icons: {
    icon: "/favicon.webp",
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://qwqer.in",
    siteName: "QWQER",
    title: "QWQER - Transportation Solutions Built to Move Businesses",
    description:
      "Reliable express delivery and fleet logistics across India. Hyperlocal last-mile to intercity FTL — built for speed, scale, and enterprise reliability.",
  },
  twitter: {
    card: "summary_large_image",
    title: "QWQER - Transportation Solutions Built to Move Businesses",
    description:
      "Reliable express delivery and fleet logistics across India. Built for speed, scale, and enterprise reliability.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://qwqer.in",
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization JSON-LD
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "QWQER",
    legalName: "QWY Technologies Private Limited",
    url: "https://qwqer.in",
    logo: "https://qwqer.in/qwqer-logo.png",
    description:
      "A transportation solution provider built for express delivery and fleet operations across India.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1st Floor, Anthill IQ, 20, SR-2 Cunningham Rd, Vasanth Nagar",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560052",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-2250534575",
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [
      "https://www.instagram.com/qwqerindia/",
      "https://www.linkedin.com/company/qwqer-india/",
    ],
    foundingDate: "2019",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "100+",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} ${inter.variable} ${outfit.className}`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
