import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { situations } from "@/lib/situations";
import { counties } from "@/lib/counties";
import { teamProfiles } from "@/lib/teamProfiles";
import { blogPosts } from "@/lib/blogPosts";
import { houseJunkiesPosts } from "@/lib/houseJunkiesPosts";

// A plain-text index for AI assistants and LLM crawlers, hand-built (no
// Yoast/WordPress needed, this is just a text file). Same spirit as
// robots.txt but for AI discovery instead of crawl permissions: a clean
// summary of who we are and a map of the real pages worth citing.

export async function GET() {
  const lines: string[] = [];

  lines.push(`# ${site.name}: We Buy Houses for Cash in Visalia and the Central Valley`);
  lines.push("");
  lines.push(`> ${site.description}`);
  lines.push("");
  lines.push(`${site.name} is part of ${site.parentOrganization}, a vertically integrated real estate operation based in Visalia, CA: acquisitions (${site.name}), construction (House Junkies Construction, ${site.licenses.generalContractor}), and brokerage (${site.legacyRealEstate.name}, ${site.licenses.brokerage}). Ranked ${site.stats.sfrAnalyticsRank} in Visalia by transaction volume (${site.stats.sfrAnalyticsVolume} across ${site.stats.sfrAnalyticsDeals} deals) per ${site.stats.sfrAnalyticsSource}. BBB Accredited, ${site.stats.bbbRating} rating. In business ${site.stats.yearsInBusiness} years. Phone: ${site.phone}.`);
  lines.push("");

  lines.push("## Main Pages");
  lines.push(`- [Home](${site.url}/)`);
  lines.push(`- [About](${site.url}/about): Company structure, licenses, office locations.`);
  lines.push(`- [Our Team](${site.url}/team): Leadership profiles.`);
  lines.push(`- [Reviews](${site.url}/reviews): Real customer reviews.`);
  lines.push(`- [Projects](${site.url}/projects): Real before/after property case studies.`);
  lines.push(`- [FAQ](${site.url}/faq): Common questions about selling for cash.`);
  lines.push(`- [How It Works](${site.url}/how-it-works): The step-by-step process.`);
  lines.push(`- [How We Calculate Your Offer](${site.url}/how-we-calculate-your-offer): The real offer formula.`);
  lines.push(`- [Cash Offer vs. Listing](${site.url}/compare): Side-by-side comparison with a worked example.`);
  lines.push(`- [Partner With Us](${site.url}/partners/agents): Five ways to partner, from referral fees to funding flips.`);
  lines.push(`- [Contact](${site.url}/contact)`);
  lines.push("");

  lines.push("## Team");
  for (const p of teamProfiles) {
    lines.push(`- [${p.name}](${site.url}/team/${p.slug}): ${p.title}.`);
  }
  lines.push("");

  lines.push("## Counties We Serve");
  for (const c of counties) {
    lines.push(`- [${c.name}](${site.url}/counties/${c.slug})`);
  }
  lines.push("");

  lines.push("## Cities We Buy Houses In");
  for (const c of cities) {
    lines.push(`- [${c.name}, CA](${site.url}/we-buy-houses/${c.slug})`);
  }
  lines.push("");

  lines.push("## Situations We Buy In");
  for (const s of situations) {
    lines.push(`- [${s.title}](${site.url}/sell-your-house/${s.slug}): ${s.summary}`);
  }
  lines.push("");

  if (houseJunkiesPosts.length > 0) {
    lines.push("## Blog (House Junkies)");
    for (const p of houseJunkiesPosts) {
      lines.push(`- [${p.title}](${site.url}/blog/${p.slug}): ${p.excerpt}`);
    }
    lines.push("");
  }

  lines.push("## Blog (Dominic McClelland, dominicmcclelland.com)");
  for (const p of blogPosts) {
    lines.push(`- [${p.title}](${p.url}): ${p.summary}`);
  }
  lines.push("");

  lines.push("## Optional");
  lines.push(`- [Sitemap](${site.url}/sitemap.xml)`);

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
