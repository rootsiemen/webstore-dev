import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, BRAND } from "@/lib/content";
import { SectionHead, Icon, btnPrimary } from "@/components/ui";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.tarm.tech";
const PAGE_TITLE = "Web Development Services — WebStore Dev";
const PAGE_DESC =
  "Custom business websites, full stack websites with admin panels, landing pages and online ordering with COD, JazzCash and Easypaisa integration.";
const PAGE_URL = `${SITE_URL}/services`;
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

const PROCESS = [
  ["Tell me about your project", "Fill the contact form or message me on WhatsApp with your business details and products."],
  ["I design & build", "You approve the design, then I build your complete website — usually within 5–10 days."],
  ["Review & launch", "You review everything, I make revisions, then we launch your site and I show you how to run it."],
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        url: `${SITE_URL}/services/${s.slug}`,
        description: s.desc,
      })),
    },
  },
];

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-emerald-50 dot-grid py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 mb-3">Services</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900">What I can build for you</h1>
          <p className="mt-4 text-stone-600 max-w-2xl">Six core services, one goal: a website that brings you customers and sales.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid gap-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-3xl border border-stone-200 p-8 hover:shadow-xl hover:border-emerald-200 transition flex gap-6 group"
            >
              <div className="shrink-0">
                <span className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 grid place-items-center">
                  <Icon name={s.icon} className="w-7 h-7" />
                </span>
                <p className="text-center font-display font-bold text-stone-400 mt-2 text-lg">{String(i + 1).padStart(2, "0")}</p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-stone-900 mb-3 group-hover:text-emerald-800 transition">{s.title}</h2>
                <p className="text-stone-600 leading-relaxed">{s.desc}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-bold text-emerald-800">
                  View details <Icon name="arrow" className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHead eyebrow="How it works" title="Simple 3-step process" />
          <div className="grid gap-5 md:grid-cols-3">
            {PROCESS.map(([t, d], i) => (
              <div key={t} className="rounded-2xl bg-white border border-stone-200 p-7">
                <span className="w-10 h-10 rounded-full bg-amber-400 text-emerald-950 font-display font-bold grid place-items-center mb-4">{i + 1}</span>
                <h3 className="font-bold text-stone-900 mb-2">{t}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/contact" className={btnPrimary}>Start Step 1 — It's Free <Icon name="arrow" className="w-5 h-5" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
