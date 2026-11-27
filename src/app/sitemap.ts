import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";
import { PORTFOLIO_PROJECTS } from "@/data/projects";

/** Generates the XML sitemap covering all core Web Guru routes and case study pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticLastModified = new Date("2026-11-27T00:00:00.000Z");

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_CONFIG.siteUrl,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_CONFIG.siteUrl}/services`,
      lastModified: staticLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.siteUrl}/work`,
      lastModified: staticLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_CONFIG.siteUrl}/about`,
      lastModified: staticLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.siteUrl}/contact`,
      lastModified: staticLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_CONFIG.siteUrl}/privacy`,
      lastModified: staticLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = PORTFOLIO_PROJECTS.map(
    (project) => ({
      url: `${SITE_CONFIG.siteUrl}/work/${project.slug}`,
      lastModified: staticLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...coreRoutes, ...caseStudyRoutes];
}
