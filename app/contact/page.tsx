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
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Get In Touch</h1>
          <p className="mt-3 max-w-xl text-white/70">
            Call, text, or send a message below. We respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <div className="space-y-1 text-gray-700">
            <p className="font-semibold text-brand-black">{site.name}</p>
            <p>{site.address.street}</p>
            <p>{site.address.city}, {site.address.region} {site.address.postalCode}</p>
            <p className="pt-2">
              <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow-dark hover:underline">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="text-brand-yellow-dark hover:underline">
                {site.email}
              </a>
            </p>
            <p className="pt-2 text-sm text-gray-500">
              {site.hours.weekday} · Weekends {site.hours.weekend}
            </p>
          </div>

          {/* Google Maps embed, same pattern as dominicmcclelland.com */}
          <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
            <iframe
              title={`${site.name} location`}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3214.2749466497953!2d-119.30014460000001!3d36.3298857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80952faa5888361d%3A0x404fb85892fcdb84!2sHouse%20Junkies%20Inc.!5e0!3m2!1sen!2sus!4v1788719427287!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
