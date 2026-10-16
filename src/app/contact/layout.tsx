import type { Metadata } from "next";
import { BRAND } from "@/lib/content";

const SITE_URL = "https://www.tarm.tech";
const PAGE_TITLE = "Contact — Get Your Website Built";
const PAGE_DESC =
  "Tell me about your project and get a free quote. Message on WhatsApp or use the contact form — I reply within 24 hours, usually much faster.";
const PAGE_URL = `${SITE_URL}/contact`;
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    type: "website",
    siteName: BRAND.name,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: [OG_IMAGE],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contact", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    mainEntity: {
      "@type": "ProfessionalService",
      name: BRAND.name,
      url: SITE_URL,
      email: BRAND.email,
    },
  },
];

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
