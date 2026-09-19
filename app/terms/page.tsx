import { site } from "@/lib/site";
export const metadata = { title: "Terms of Service", alternates: { canonical: "/terms" } };
export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose">
      <h1>Terms of Service</h1>
      <p>
        {/* TODO: replace with real reviewed terms before launch. */}
        These terms govern use of this website, operated by {site.name}. Full terms to come.
      </p>
    </div>
  );
}
