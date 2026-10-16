import Link from "next/link";
import { Linkify } from "@/components/Linkify";

// Plain-text paragraphs that can carry real internal links written as
// [link text](/path). Everything outside a link still goes through Linkify,
// so company and people names keep their automatic links too.
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return <Linkify key={i} text={part} />;
        const [, label, href] = m;
        const cls = "font-semibold text-brand-yellow-dark hover:underline";
        return href.startsWith("http") ? (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {label}
          </a>
        ) : (
          <Link key={i} href={href} className={cls}>
            {label}
          </Link>
        );
      })}
    </>
  );
}
