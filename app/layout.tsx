import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Modern sans-serif
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
// We'll import smooth scroll wrapper here once created, or create it inline if simple.
// but clean code suggests a component.

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QWQER - Transportation Solutions",
  description: "Transportation solutions, built to move business.",
  icons: {
    icon: "/favicon.webp",
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
