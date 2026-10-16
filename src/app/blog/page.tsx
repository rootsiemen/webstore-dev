import Link from "next/link";
import { getDb, mapBlogPost } from "@/lib/db";
import { BRAND } from "@/lib/content";
import { SectionHead, Icon } from "@/components/ui";
import { formatDate } from "@/lib/blog";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.tarm.tech";
const PAGE_TITLE = `Blog — ${BRAND.name}`;
const PAGE_DESC =
  "Practical guides on websites, ecommerce, SEO and online selling in Pakistan — actionable tips and checklists from the WebStore Dev team.";
const PAGE_URL = `${SITE_URL}/blog`;
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    type: "website",
    siteName: BRAND.name,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "WebStore Dev Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: [OG_IMAGE],
  },
};

export default async function BlogPage() {
  const db = await getDb();
  const posts = (await db
    .prepare("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY id DESC")
    .all())
    .map(mapBlogPost);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: PAGE_URL },
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
        itemListElement: posts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/blog/${p.slug}`,
          name: p.title,
        })),
      },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-emerald-50 dot-grid py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 mb-3">Blog</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900">Guides & Insights</h1>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl">
            Practical advice on websites, ecommerce, SEO and selling online — written for business owners, not developers.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <SectionHead eyebrow="Coming soon" title="Fresh articles on the way" sub="We're writing practical guides for business owners. Check back soon!" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="rounded-3xl border border-stone-200 p-7 hover:shadow-xl hover:border-emerald-200 transition group flex flex-col"
                >
                  <div className="flex items-center gap-3 text-xs mb-4">
                    <span className="font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 rounded-full px-3 py-1">{p.category}</span>
                    <span className="text-stone-400">{formatDate(p.createdAt.slice(0, 10))}</span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-stone-900 mb-3 group-hover:text-emerald-800 transition leading-snug">
                    {p.title}
                  </h2>
                  <p className="text-sm text-stone-600 leading-relaxed flex-1">{p.excerpt}</p>
                  <span className="inline-flex items-center gap-1 mt-5 text-sm font-bold text-emerald-800">
                    Read article <Icon name="arrow" className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
