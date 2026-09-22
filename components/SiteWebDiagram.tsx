import Link from "next/link";
import { counties } from "@/lib/counties";
import { teamProfiles } from "@/lib/teamProfiles";
import { houseJunkiesPosts } from "@/lib/houseJunkiesPosts";

// A real, clickable site tree, not a decorative graph. Every label here is
// an actual Link. Cities and situations roll up to their overview pages
// instead of listing all 21/12 individually, that's what keeps this
// readable instead of a wall of nodes. Left border lines do the "connected
// web" visual honestly, without fragile absolute-position SVG math that
// breaks on narrow screens.

type TreeNode = {
  label: string;
  href: string;
  children?: TreeNode[];
};

const tree: TreeNode[] = [
  {
    label: "About",
    href: "/about",
    children: teamProfiles.map((p) => ({ label: p.name, href: `/team/${p.slug}` })),
  },
  { label: "Reviews", href: "/reviews" },
  { label: "Projects", href: "/projects" },
  {
    label: "Blog",
    href: "/blog",
    children: houseJunkiesPosts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` })),
  },
  { label: "FAQ", href: "/faq" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "How We Calculate Your Offer", href: "/how-we-calculate-your-offer" },
  { label: "Cash Offer vs. Listing", href: "/compare" },
  { label: "Partner With Us", href: "/partners/agents" },
  { label: "Contact", href: "/contact" },
  {
    label: "We Buy Houses",
    href: "/we-buy-houses",
    children: [
      { label: "All 21 Cities", href: "/we-buy-houses" },
      ...counties.map((c) => ({ label: c.name, href: `/counties/${c.slug}` })),
    ],
  },
  {
    label: "Sell Your House",
    href: "/sell-your-house",
    children: [{ label: "All 12 Situations", href: "/sell-your-house" }],
  },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

function Node({ node }: { node: TreeNode }) {
  return (
    <li>
      <Link
        href={node.href}
        className="inline-block rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-brand-black hover:border-brand-yellow-dark hover:bg-brand-yellow/10 hover:text-brand-yellow-dark"
      >
        {node.label}
      </Link>
      {node.children && node.children.length > 0 && (
        <ul className="mt-2 space-y-2 border-l-2 border-brand-yellow/40 pl-5">
          {node.children.map((child) => (
            <Node key={child.href + child.label} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function SiteWebDiagram() {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 sm:p-8">
      <Link
        href="/"
        className="inline-block rounded-full bg-brand-black px-6 py-3 font-bold text-brand-yellow hover:bg-brand-charcoal"
      >
        Home
      </Link>
      <ul className="mt-4 space-y-3 border-l-2 border-brand-yellow/40 pl-5">
        {tree.map((node) => (
          <Node key={node.href + node.label} node={node} />
        ))}
      </ul>
    </div>
  );
}
