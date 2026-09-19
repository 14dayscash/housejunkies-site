import { site } from "@/lib/site";
export const metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose">
      <h1>Privacy Policy</h1>
      <p>
        {/* TODO: replace with real reviewed privacy policy before launch — this is a
            placeholder structure, not legal copy. Carry over language from
            dominicmcclelland.com/privacy where it applies to {site.name} too. */}
        This page explains how {site.name} collects, uses, and protects information
        submitted through this website. Full policy text to come.
      </p>
    </div>
  );
}
