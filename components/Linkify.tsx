import Link from "next/link";
import { Fragment } from "react";

// Scans a plain text string for known company/people names and wraps the
// FIRST mention of each (per call) in a real Link, leaving the rest as
// plain text. Built once so we don't have to hand-restructure every bio,
// FAQ answer, and blog paragraph into fragmented JSX across the site.
// Order matters: longer/more specific terms are matched before shorter
// ones they contain (e.g. "House Junkies Construction" before a bare
// "House Junkies" would ever be added).

type Term = { match: string; href: string };

const TERMS: Term[] = [
  { match: "House Junkies Construction", href: "/about" },
  { match: "Legacy Real Estate", href: "/about" },
  { match: "Ulloa Investment Group", href: "/about" },
  { match: "Abel Ulloa", href: "/team/abel-ulloa" },
  { match: "Dominic McClelland", href: "/team/dominic-mcclelland" },
  { match: "Jenny Madrid", href: "/team/jenny-madrid" },
  { match: "Omar Ayon", href: "/team/omar-ayon" },
];

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function Linkify({
  text,
  exclude = [],
}: {
  text: string;
  exclude?: string[]; // hrefs to skip, e.g. self-links on that entity's own page
}) {
  const activeTerms = TERMS.filter((t) => !exclude.includes(t.href));
  if (activeTerms.length === 0) return <>{text}</>;

  const pattern = new RegExp(
    `(${activeTerms.map((t) => escapeRegExp(t.match)).join("|")})`,
    "g"
  );
  const parts = text.split(pattern);
  const linkedOnce = new Set<string>();

  return (
    <>
      {parts.map((part, i) => {
        const term = activeTerms.find((t) => t.match === part);
        if (term && !linkedOnce.has(term.href)) {
          linkedOnce.add(term.href);
          return (
            <Link
              key={i}
              href={term.href}
              className="underline decoration-dotted underline-offset-2 hover:text-brand-yellow-dark"
            >
              {part}
            </Link>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
