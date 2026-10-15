import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { BRAND } from "@/lib/content";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tarm.tech"),
  title: "WebStore Dev — Ecommerce Website Developer",
  description:
    "I build complete ecommerce websites with admin panel, online ordering, Cash on Delivery and payment integration. Websites that sell.",
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "I build complete ecommerce websites with admin panel, online ordering, Cash on Delivery and payment integration.",
    url: "https://www.tarm.tech",
    siteName: BRAND.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.tarm.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebStore Dev — Ecommerce Website Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "I build complete ecommerce websites with admin panel, online ordering, Cash on Delivery and payment integration.",
    images: ["https://www.tarm.tech/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9075805757065172"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
