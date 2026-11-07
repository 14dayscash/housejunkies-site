import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Linkify } from "@/components/Linkify";

// Renders a House Junkies blog post body. Each string in `body` is one block:
//
//   "## Heading"            H2
//   "### Heading"           H3
//   "![caption](/images/x)" photo (property photos link to their project page)
//   "- item"                bullet list (consecutive lines group into one list)
//   "1. item"               numbered list (consecutive lines group into one list)
//   "| a | b |\n|---|---|\n| 1 | 2 |"   table (one string, rows split by \n)
//   "[[FAQ]]"               where the post's FAQ block renders (optional)
//   anything else           paragraph
//
// Inside any paragraph, list item or table cell:
//   **bold**, *italic*, [link text](/path or https://...), and phone numbers
//   like (559) 368-8956 become tap-to-call links. Company and people names
//   still auto-link through Linkify.

const PHONE = /\(\d{3}\) \d{3}-\d{4}/;
const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\*[^*\s][^*]*\*|\(\d{3}\) \d{3}-\d{4})/g;
const linkCls = "font-semibold text-brand-yellow-dark hover:underline";

export function Inline({ text }: { text: string }) {
  const parts = text.split(INLINE).filter((p) => p !== "");
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return (
            <strong key={i} className="font-bold text-brand-black">
              <Inline text={part.slice(2, -2)} />
            </strong>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          return href.startsWith("http") ? (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {label}
            </a>
          ) : (
            <Link key={i} href={href} className={linkCls}>
              {label}
            </Link>
          );
        }
        if (PHONE.test(part) && part.match(PHONE)?.[0] === part) {
          const digits = part.replace(/\D/g, "");
          return (
            <a key={i} href={`tel:+1${digits}`} className={linkCls}>
              {part}
            </a>
          );
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return (
            <em key={i}>
              <Inline text={part.slice(1, -1)} />
            </em>
          );
        }
        return <Linkify key={i} text={part} />;
      })}
    </>
  );
}

function BlogImage({ line }: { line: string }) {
  const m = line.match(/^!\[(.*)\]\((.+)\)$/);
  if (!m) return <p>{line}</p>;
  const [, caption, src] = m;
  const slug = src.match(/^\/images\/properties\/(.+)\.jpg$/)?.[1];
  const img = <img src={src} alt={caption} loading="lazy" className="w-full rounded-lg border border-gray-200" />;
  return (
    <figure className="py-2">
      {slug ? <Link href={`/projects/${slug}`}>{img}</Link> : img}
      <figcaption className="mt-2 text-sm text-gray-500">
        {slug ? (
          <Link href={`/projects/${slug}`} className="hover:text-brand-yellow-dark hover:underline">
            {caption}
          </Link>
        ) : (
          caption
        )}
      </figcaption>
    </figure>
  );
}

function splitRow(row: string) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function BlogTable({ source }: { source: string }) {
  const rows = source.split("\n").filter((r) => r.trim().startsWith("|"));
  const body = rows.filter((r) => !/^\|?\s*:?-{2,}/.test(r.trim()));
  const [head, ...rest] = body.map(splitRow);
  if (!head) return null;
  return (
    <div className="my-2 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead className="bg-brand-black text-white">
          <tr>
            {head.map((cell, i) => (
              <th key={i} className="px-3 py-2 font-semibold">
                <Inline text={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rest.map((row, r) => (
            <tr key={r} className={r % 2 ? "bg-gray-50" : "bg-white"}>
              {row.map((cell, c) => (
                <td key={c} className={`px-3 py-2 align-top ${c === 0 ? "font-medium text-brand-black" : ""}`}>
                  <Inline text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type BlogFaq = { question: string; answer: string };

export function BlogFaqs({ faqs }: { faqs: BlogFaq[] }) {
  return (
    <div>
      <h2 className="pt-4 text-2xl font-bold text-brand-black">Frequently Asked Questions</h2>
      <div className="mt-4 space-y-5">
        {faqs.map((f, i) => (
          <div key={i}>
            <h3 className="text-lg font-bold text-brand-black">{f.question}</h3>
            <p className="mt-1">
              <Inline text={f.answer} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlogBody({ body, faqs }: { body: string[]; faqs?: BlogFaq[] }) {
  const blocks: ReactNode[] = [];
  let faqPlaced = false;
  let i = 0;

  while (i < body.length) {
    const line = body[i];

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < body.length && body[i].startsWith("- ")) items.push(body[i++].slice(2));
      blocks.push(
        <ul key={`ul${i}`} className="list-disc space-y-2 pl-6 marker:text-brand-yellow-dark">
          {items.map((it, k) => (
            <li key={k}>
              <Inline text={it} />
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < body.length && /^\d+\. /.test(body[i])) items.push(body[i++].replace(/^\d+\. /, ""));
      blocks.push(
        <ol key={`ol${i}`} className="list-decimal space-y-2 pl-6 marker:font-bold marker:text-brand-yellow-dark">
          {items.map((it, k) => (
            <li key={k}>
              <Inline text={it} />
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    if (line === "[[FAQ]]") {
      if (faqs && faqs.length > 0) {
        blocks.push(<BlogFaqs key={`faq${i}`} faqs={faqs} />);
        faqPlaced = true;
      }
    } else if (line.startsWith("![")) {
      blocks.push(<BlogImage key={i} line={line} />);
    } else if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={i} className="pt-4 text-2xl font-bold text-brand-black">
          {line.slice(3)}
        </h2>,
      );
    } else if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={i} className="pt-2 text-xl font-bold text-brand-black">
          {line.slice(4)}
        </h3>,
      );
    } else if (line.trim().startsWith("|")) {
      blocks.push(<BlogTable key={i} source={line} />);
    } else {
      blocks.push(
        <p key={i}>
          <Inline text={line} />
        </p>,
      );
    }
    i++;
  }

  if (!faqPlaced && faqs && faqs.length > 0) {
    blocks.push(<BlogFaqs key="faq-end" faqs={faqs} />);
  }

  return (
    <div className="space-y-4 text-gray-600">
      {blocks.map((b, k) => (
        <Fragment key={k}>{b}</Fragment>
      ))}
    </div>
  );
}
