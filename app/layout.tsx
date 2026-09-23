import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { PageTransition } from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700", "800"] });

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "SUDMO Company Limited",
      alternateName: "SUDMO",
      description:
        "SUDMO Company Limited provides business development and training, IT planning and development, real estate, warehousing, construction materials, computer equipment, and electronics services in Kenya and East Africa.",
      url: "https://web-mfik-eight.vercel.app/",
      email: "sudmocompany@gmail.com",
      telephone: "0713768539",
      address: {
        "@type": "PostalAddress",
        postOfficeBoxNumber: "P.O. Box 30031 - 00100",
        addressLocality: "JAMIA",
        addressRegion: "Nairobi",
        addressCountry: "KE",
      },
      areaServed: ["Kenya", "East Africa"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "sudmocompany@gmail.com",
        telephone: "0713768539",
        areaServed: ["Kenya", "East Africa"],
      },
    },
    {
      "@type": "LocalBusiness",
      name: "SUDMO Company Limited",
      image: "https://web-mfik-eight.vercel.app/",
      url: "https://web-mfik-eight.vercel.app/",
      email: "sudmocompany@gmail.com",
      telephone: "0713768539",
      address: {
        "@type": "PostalAddress",
        postOfficeBoxNumber: "P.O. Box 30031 - 00100",
        addressLocality: "JAMIA",
        addressRegion: "Nairobi",
        addressCountry: "KE",
      },
      areaServed: ["Kenya", "East Africa"],
      description:
        "SUDMO Company Limited provides business development and training, IT planning and development, real estate, warehousing, construction materials, computer equipment, and electronics solutions in Kenya and East Africa.",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://web-mfik-eight.vercel.app"),
  title: "SUDMO Company Limited | Business Development, IT, Real Estate & Supply Kenya",
  description:
    "SUDMO Company Limited provides business development and training, IT planning and development, real estate, warehousing, construction materials, computer equipment and electronics services in Kenya and East Africa.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "SUDMO Company Limited | Business Development, IT, Real Estate & Supply Kenya",
    description:
      "SUDMO Company Limited provides business development and training, IT planning and development, real estate, warehousing, construction materials, computer equipment and electronics services in Kenya and East Africa.",
    url: "https://web-mfik-eight.vercel.app/",
    siteName: "SUDMO Company Limited",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUDMO Company Limited | Business Development, IT, Real Estate & Supply Kenya",
    description:
      "SUDMO Company Limited provides business development and training, IT planning and development, real estate, warehousing, construction materials, computer equipment and electronics services in Kenya and East Africa.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-ivory text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navigation />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
