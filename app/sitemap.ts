import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { situations } from "@/lib/situations";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "about", "contact", "reviews", "how-it-works",
    "how-we-calculate-your-offer", "partners/agents", "projects", "privacy", "terms",
  ].map((route) => ({
    url: `${site.url}/${route}`,
    lastModified: new Date(),
  }));

  const cityRoutes = cities
    .filter((c) => !c.needsRealContent)
    .map((c) => ({
      url: `${site.url}/we-buy-houses/${c.slug}`,
      lastModified: new Date(),
    }));

  const situationRoutes = situations.map((s) => ({
    url: `${site.url}/sell-your-house/${s.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...cityRoutes, ...situationRoutes];
}
