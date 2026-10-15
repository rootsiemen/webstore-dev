import type { MetadataRoute } from "next";
import { getDb, mapBlogPost } from "@/lib/db";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.tarm.tech";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/portfolio", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "daily" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  let posts: { url: string; lastModified: Date; changeFrequency: "monthly"; priority: number }[] = [];
  try {
    const db = await getDb();
    const rows = await db.prepare("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY id DESC").all();
    posts = rows.map((row) => {
      const post = mapBlogPost(row);
      return {
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.createdAt ? new Date(post.createdAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });
  } catch {
    // sitemap still works without DB access
  }

  return [
    ...staticPages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...posts,
  ];
}
