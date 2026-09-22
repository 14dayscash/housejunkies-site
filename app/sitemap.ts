import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { situations } from "@/lib/situations";
import { counties } from "@/lib/counties";
import { houseJunkiesPosts } from "@/lib/houseJunkiesPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "about", "team", "contact", "reviews", "how-it-works",
    "how-we-calculate-your-offer", "compare", "faq", "we-buy-houses",
    "partners/agents", "projects", "blog", "privacy", "terms",
  ].map((route) => ({
    url: `${site.url}/${route}`,
    lastModified: new Date(),
  }));

  const cityRoutes = cities.map((c) => ({
    url: `${site.url}/we-buy-houses/${c.slug}`,
    lastModified: new Date(),
  }));

  const situationRoutes = situations.map((s) => ({
    url: `${site.url}/sell-your-house/${s.slug}`,
    lastModified: new Date(),
  }));

  const countyRoutes = counties.map((c) => ({
    url: `${site.url}/counties/${c.slug}`,
    lastModified: new Date(),
  }));

  const houseJunkiesBlogRoutes = houseJunkiesPosts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...cityRoutes,
    ...situationRoutes,
    ...countyRoutes,
    ...houseJunkiesBlogRoutes,
  ];
}
