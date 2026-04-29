import type { MetadataRoute } from "next";
import { aiArticles } from "@/content/aiArticles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();
  const papers: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/ai-papers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...aiArticles.map((a) => ({
      url: `${baseUrl}/ai-papers/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/youtube-videos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...papers,
  ];
}
