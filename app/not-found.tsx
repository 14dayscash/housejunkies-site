import Link from "next/link";
import { btnYellow, linkCls } from "@/components/sections/Shared";

// Real HTTP 404 status (Next.js sets this automatically for not-found.tsx),
// unlike the old Base44 app's in-app-only "404 Page Not Found" render.

export default function NotFound() {
  return (
    <section className="bg-brand-black px-4 py-20 text-center text-white md:py-28">
      <div className="mx-auto max-w-xl">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">404</p>
        <h1 className="mt-2 text-3xl font-bold md:text-5xl">Page Not Found</h1>
        <p className="mt-4 text-white/75">
          That page may have moved.
          <br />
          Try the homepage, or one of the links below.
        </p>
        <Link href="/" className={`${btnYellow} mt-8`}>
          Back to the Homepage <span aria-hidden="true">→</span>
        </Link>
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm [&_a]:text-brand-yellow">
          <Link href="/we-buy-houses" className={linkCls}>We Buy Houses →</Link>
          <Link href="/get-offer" className={linkCls}>Get My Cash Offer →</Link>
          <Link href="/contact" className={linkCls}>Contact →</Link>
        </div>
      </div>
    </section>
  );
}
