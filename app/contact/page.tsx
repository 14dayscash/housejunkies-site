import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: `Contact Us | Visalia, CA`,
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
        <div className="order-2 md:order-1">
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
            <div className="flex gap-4 pt-3 text-sm">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-brand-yellow-dark hover:underline">Facebook</a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-yellow-dark hover:underline">Instagram</a>
              <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="text-brand-yellow-dark hover:underline">YouTube</a>
            </div>
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
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <Link href="/faq" className="font-semibold text-brand-yellow-dark hover:underline">
              Read our FAQ →
            </Link>
            <Link href="/compare" className="font-semibold text-brand-yellow-dark hover:underline">
              Cash offer vs. listing →
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <ContactForm />
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-bold text-brand-black">What Happens After You Reach Out</h2>
          <ol className="mt-4 grid gap-4 md:grid-cols-4">
            {[
              { t: "You Tell Us About the House", b: "Call, text, or use the form. Give us the address, the condition, and what is going on. No appraisal or inspection is needed at this stage." },
              { t: "We Research It", b: "We look at the property and local comps, and we build a real renovation number with our own construction crew." },
              { t: "You Get a Cash Offer", b: "Within 24 hours you get a fair, no-obligation cash offer. We walk through how we got to the number if you want." },
              { t: "You Pick the Closing Date", b: "If you say yes, you choose a closing date from 7 to 30 days out. We cover closing costs and there are no commissions." },
            ].map((s, i) => (
              <li key={s.t} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-sm font-bold text-black">{i + 1}</div>
                <div className="mt-3 font-semibold text-brand-black">{s.t}</div>
                <p className="mt-1 text-sm text-gray-600">{s.b}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-gray-600">
            Want the full details first? Read{" "}
            <Link href="/how-it-works" className="font-semibold text-brand-yellow-dark hover:underline">how it works</Link>
            , see{" "}
            <Link href="/how-we-calculate-your-offer" className="font-semibold text-brand-yellow-dark hover:underline">how we calculate your offer</Link>
            , or look through our{" "}
            <Link href="/faq" className="font-semibold text-brand-yellow-dark hover:underline">frequently asked questions</Link>.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-brand-black">What to Have Ready</h2>
          <p className="mt-3 text-gray-600">
            You do not need any paperwork to call us. It helps if you can tell us a few things, but
            if you do not know the answer to something, just say so.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
            <li>The address of the house</li>
            <li>What shape it is in, including any damage, repairs, or open city notices</li>
            <li>Whether it is lived in, rented, or empty</li>
            <li>Whether there is a mortgage, a lien, or back taxes on it</li>
            <li>Whether it is in probate, was inherited, or is part of a divorce</li>
            <li>When you would like to be done selling</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold text-brand-black">Who to Contact for What</h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="font-semibold text-brand-black">Selling Your House for Cash</div>
              <p className="mt-1 text-sm text-gray-600">
                That is us, {site.name}, at {site.address.street} in {site.address.city}. Call{" "}
                <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow-dark hover:underline">{site.phone}</a>{" "}
                or use the form on this page.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="font-semibold text-brand-black">Remodeling, Repairs, or an ADU</div>
              <p className="mt-1 text-sm text-gray-600">
                House Junkies Construction ({site.licenses.generalContractor}) is at {site.entityAddresses.construction}. See the{" "}
                <Link href="/construction" className="font-semibold text-brand-yellow-dark hover:underline">construction page</Link>{" "}
                or ask for an estimate.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="font-semibold text-brand-black">Listing Your House with an Agent</div>
              <p className="mt-1 text-sm text-gray-600">
                {site.legacyRealEstate.name} ({site.legacyRealEstate.dre}) is at {site.entityAddresses.brokerage}.
                Not sure whether to list or sell for cash? Read our{" "}
                <Link href="/compare" className="font-semibold text-brand-yellow-dark hover:underline">cash offer vs. listing</Link>{" "}
                comparison.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="font-semibold text-brand-black">Partnering, Referring a Deal, or Lending</div>
              <p className="mt-1 text-sm text-gray-600">
                See the five ways to{" "}
                <Link href="/partners/agents" className="font-semibold text-brand-yellow-dark hover:underline">partner with us</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-bold text-brand-black">Our Offices</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {site.officeLocations.map((loc) => (
              <div key={loc.label} className="rounded-lg border border-gray-200 p-4">
                <div className="text-sm font-semibold text-brand-yellow-dark">{loc.label}</div>
                <p className="mt-1 text-sm text-gray-600">{loc.street}</p>
                <p className="text-sm text-gray-600">{loc.city}, {loc.region} {loc.postalCode}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-xl font-bold text-brand-black">Where We Buy Houses</h2>
          <p className="mt-3 text-gray-600">
            We buy houses across the Central Valley, on the Central Coast, and in the Eastern Sierra.
            Start with your county, or see every city on our{" "}
            <Link href="/we-buy-houses" className="font-semibold text-brand-yellow-dark hover:underline">service area page</Link>.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {[
              ["Tulare County", "/counties/tulare-county"],
              ["Kings County", "/counties/kings-county"],
              ["Fresno County", "/counties/fresno-county"],
              ["Kern County", "/counties/kern-county"],
              ["Monterey County", "/counties/monterey-county"],
              ["San Luis Obispo County", "/counties/san-luis-obispo-county"],
              ["San Benito County", "/counties/san-benito-county"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="rounded-full border border-gray-200 px-3 py-1 text-gray-700 hover:border-brand-yellow hover:text-brand-yellow-dark">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
