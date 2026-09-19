import Link from "next/link";

// Real HTTP 404 status (Next.js sets this automatically for not-found.tsx),
// unlike the old Base44 app's in-app-only "404 Page Not Found" render.

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Page Not Found</h1>
      <p className="mt-4 text-gray-600">
        That page may have moved. Try the homepage, or one of the links below.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <Link href="/" className="text-brand-yellow-dark underline">Home</Link>
        <Link href="/we-buy-houses/visalia" className="text-brand-yellow-dark underline">We Buy Houses</Link>
        <Link href="/contact" className="text-brand-yellow-dark underline">Contact</Link>
      </div>
    </div>
  );
}
