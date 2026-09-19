import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { PageTransition } from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Sudmo Company Limited | Professional Services Kenya",
  description:
    "Sudmo Company Limited provides premium real estate, technology, finance, marketing and business advisory services across Kenya and East Africa.",
  openGraph: {
    title: "Sudmo Company Limited | Professional Services Kenya",
    description:
      "Sudmo Company Limited provides premium real estate, technology, finance, marketing and business advisory services across Kenya and East Africa.",
    type: "website",
  },
  metadataBase: new URL("https://horizonalliance.co.ke"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-ivory text-charcoal antialiased">
        <Navigation />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
