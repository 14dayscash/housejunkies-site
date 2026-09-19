import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: `Contact ${site.name} | Visalia, CA`,
  description: `Get in touch with ${site.name} for a cash offer, a partnership, or a question.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold">Get In Touch</h1>
        <p className="mt-4 text-gray-600">
          Call, text, or send a message below. We respond within 24 hours.
        </p>
        <div className="mt-6 space-y-1 text-gray-700">
          <p>{site.address.street}</p>
          <p>{site.address.city}, {site.address.region} {site.address.postalCode}</p>
          <p><a href={`tel:${site.phoneE164}`} className="hover:underline">{site.phone}</a></p>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
