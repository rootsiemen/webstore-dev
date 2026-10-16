import type { MetadataRoute } from "next";

const AI_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Google-Extended",
  "anthropic-ai",
  "ClaudeBot",
  "Applebot-Extended",
  "Cohere-ai",
  "Diffbot",
  "FacebookBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicitly welcome AI search crawlers (GEO / AI-search visibility).
      // These bots must NOT be blocked — they power ChatGPT Search, Perplexity,
      // Google AI Overviews / AI Mode, and Claude's web search.
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: ["/api/", "/admin/", "/account/", "/cart/", "/checkout/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/account/", "/cart/", "/checkout/"],
      },
    ],
    sitemap: "https://www.tarm.tech/sitemap.xml",
  };
}
