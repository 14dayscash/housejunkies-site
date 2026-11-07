// Line icons for the homepage Situations grid, one per situation slug.
// Paths adapted from Lucide (ISC license), drawn on a 24x24 grid.

const paths: Record<string, JSX.Element> = {
  "inherited-property": (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M12 17.5s-3-1.8-3-3.8a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 2-3 3.8-3 3.8z" />
    </>
  ),
  probate: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M8 13h8M8 17h5" />
    </>
  ),
  foreclosure: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h8" />
      <circle cx="17" cy="17" r="4" />
      <path d="M17 15v2l1.2 1" />
    </>
  ),
  divorce: (
    <>
      <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
      <path d="m12 5-1.5 4 3 2-2 4" />
    </>
  ),
  "fire-damage": (
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.2a2.5 2.5 0 0 0 2.5 2.7z" />
  ),
  "water-damage": (
    <>
      <path d="M12 2.7 6.3 8.6a8 8 0 1 0 11.4 0z" />
      <path d="M8.5 14a3.5 3.5 0 0 0 3.5 3.5" />
    </>
  ),
  "code-violations": (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 2h6v4H9z" />
      <path d="m10 11 4 4M14 11l-4 4" />
    </>
  ),
  "with-tenants": (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" />
      <path d="M16 3.1a4 4 0 0 1 0 7.8M22 21v-1a6 6 0 0 0-4-5.7" />
    </>
  ),
  vacant: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M10 21v-6h4v6" />
      <path d="M9 11h.01M15 11h.01" />
    </>
  ),
  liens: (
    <>
      <path d="M4 2v20l2.5-1.5L9 22l3-1.5 3 1.5 2.5-1.5L20 22V2l-2.5 1.5L15 2l-3 1.5L9 2 6.5 3.5z" />
      <path d="M14.5 8H11a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3H9.5M12 6.5v1.5M12 14v1.5" />
    </>
  ),
  "hoarder-house": (
    <>
      <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
      <path d="m3 8 9 5 9-5M12 13v8" />
    </>
  ),
  "as-is": (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" />
  ),
  relocating: (
    <>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.7a1 1 0 0 0-.2-.6l-3.5-4.3a1 1 0 0 0-.8-.4H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </>
  ),
  other: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" />
    </>
  ),
};

export function SituationIcon({ slug, className = "h-9 w-9" }: { slug: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[slug] ?? paths.other}
    </svg>
  );
}
