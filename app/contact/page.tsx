import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import {
  FactList,
  PageHero,
  Pills,
  ReviewsSection,
  Section,
  SectionHeader,
  cardCls,
  linkCls,
} from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: `Contact Us | Visalia, CA`,
  description: `Get in touch with ${site.name} for a cash offer, a partnership, or a question.`,
  alternates: { canonical: "/contact" },
};

const afterSteps = [
  { t: "You Tell Us About the House", b: "Call, text, or use the form. Give us the address, the condition, and what is going on. No appraisal or inspection is needed at this stage." },
  { t: "We Research It", b: "We look at the property and local comps, and we build a real renovation number with our own construction crew." },
  { t: "You Get a Cash Offer", b: "Within 24 hours you get a fair, no-obligation cash offer. We walk through how we got to the number if you want." },
  { t: "You Pick the Closing Date", b: "If you say yes, you choose a closing date from 7 to 30 days out. We cover closing costs and there are no commissions." },
];

const countyLinks: [string, string][] = [
  ["Tulare County", "/counties/tulare-county"],
  ["Kings County", "/counties/kings-county"],
  ["Fresno County", "/counties/fresno-county"],
  ["Kern County", "/counties/kern-county"],
  ["Monterey County", "/counties/monterey-county"],
  ["San Luis Obispo County", "/counties/san-luis-obispo-county"],
  ["San Benito County", "/counties/san-benito-county"],
];

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact House Junkies"
        title="Get In Touch"
        sub={<>Call, text, or send a message below.<br />We respond within 24 hours.</>}
      >
        <a
          href={`tel:${site.phoneE164}`}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand-yellow px-6 py-3 font-bold text-black transition-colors hover:bg-brand-yellow-dark"
        >
          Call or Text {site.phone}
        </a>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
        <div className="order-2 md:order-1">
          <div className={cardCls}>
            <p className="text-lg font-bold text-brand-black">{site.name}</p>
            <p className="mt-2 text-gray-700">{site.address.street}</p>
            <p className="text-gray-700">{site.address.city}, {site.address.region} {site.address.postalCode}</p>
            <p className="mt-3">
              <a href={`tel:${site.phoneE164}`} className={linkCls}>{site.phone}</a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="text-brand-yellow-dark hover:underline">{site.email}</a>
            </p>
            <p className="mt-3 text-sm text-gray-500">{site.hours.weekday}</p>
            <p className="text-sm text-gray-500">Weekends {site.hours.weekend}</p>
            <p className="mt-1 text-sm font-semibold text-brand-black">¡Se habla español!</p>
            <div className="mt-4 flex gap-4 text-sm">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className={linkCls}>Facebook</a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={linkCls}>Instagram</a>
              <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className={linkCls}>YouTube</a>
            </div>
          </div>

          {/* Google Maps embed, same pattern as dominicmcclelland.com */}
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
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
            <Link href="/faq" className={linkCls}>Read Our FAQ →</Link>
            <Link href="/compare" className={linkCls}>Cash Offer vs. Listing →</Link>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <ContactForm />
        </div>
      </section>

      <Section gray>
        <SectionHeader eyebrow="Next Steps" title="What Happens After You Reach Out" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {afterSteps.map((s, i) => (
            <li key={s.t} className={cardCls}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow text-sm font-bold text-black">{i + 1}</span>
              <h3 className="mt-4 font-bold text-brand-black">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.b}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-center text-sm text-gray-600">
          Want the full details first? Read <Link href="/how-it-works" className={linkCls}>How It Works</Link>,
          <br className="sm:hidden" /> see <Link href="/how-we-calculate-your-offer" className={linkCls}>How We Calculate Your Offer</Link>,
          <br className="sm:hidden" /> or look through our <Link href="/faq" className={linkCls}>Frequently Asked Questions</Link>.
        </p>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-brand-black">What to Have Ready</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              You do not need any paperwork to call us. It helps if you can tell us a few things,
              but if you do not know the answer to something, just say so.
            </p>
            <div className="mt-6">
              <FactList
                single
                items={[
                  "The address of the house",
                  "What shape it is in, including any damage, repairs, or open city notices",
                  "Whether it is lived in, rented, or empty",
                  "Whether there is a mortgage, a lien, or back taxes on it",
                  "Whether it is in probate, was inherited, or is part of a divorce",
                  "When you would like to be done selling",
                ]}
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-black">Who to Contact for What</h2>
            <div className="mt-6 space-y-4">
              <div className={cardCls}>
                <h3 className="font-bold text-brand-black">Selling Your House for Cash</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  That is us, {site.name}, at {site.address.street} in {site.address.city}. Call{" "}
                  <a href={`tel:${site.phoneE164}`} className={linkCls}>{site.phone}</a> or use the form on this page.
                </p>
              </div>
              <div className={cardCls}>
                <h3 className="font-bold text-brand-black">Remodeling, Repairs, or an ADU</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  House Junkies Construction ({site.licenses.generalContractor}) is at {site.entityAddresses.construction}. See the{" "}
                  <Link href="/construction" className={linkCls}>construction page</Link> or ask for an estimate.
                </p>
              </div>
              <div className={cardCls}>
                <h3 className="font-bold text-brand-black">Listing Your House with an Agent</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {site.legacyRealEstate.name} ({site.legacyRealEstate.dre}) is at {site.entityAddresses.brokerage}.
                  Not sure whether to list or sell for cash? Read our{" "}
                  <Link href="/compare" className={linkCls}>cash offer vs. listing</Link> comparison.
                </p>
              </div>
              <div className={cardCls}>
                <h3 className="font-bold text-brand-black">Partnering, Referring a Deal, or Lending</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  See the five ways to <Link href="/partners/agents" className={linkCls}>partner with us</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section gray>
        <SectionHeader eyebrow="Find Us" title="Our Offices" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.officeLocations.map((loc) => (
            <div key={loc.label} className={`${cardCls} text-center`}>
              <h3 className="text-sm font-bold text-brand-yellow-dark">{loc.label}</h3>
              <p className="mt-2 text-sm text-gray-600">{loc.street}</p>
              <p className="text-sm text-gray-600">{loc.city}, {loc.region} {loc.postalCode}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeader
            title="Where We Buy Houses"
            sub={
              <>
                We buy houses across the Central Valley, on the Central Coast, and in the Eastern Sierra.
                <br className="hidden md:block" /> Start with your county, or see every city on our{" "}
                <Link href="/we-buy-houses" className={linkCls}>service area page</Link>.
              </>
            }
          />
          <div className="mt-8">
            <Pills items={countyLinks.map(([label, href]) => ({ href, label }))} />
          </div>
        </div>
      </Section>

      <ReviewsSection gray={false} />
    </div>
  );
}
