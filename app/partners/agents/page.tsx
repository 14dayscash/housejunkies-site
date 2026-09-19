import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: `Partner With Us | Agents & Wholesalers | ${site.name}`,
  description: "Real estate agents, wholesalers, and investors: partner with House Junkies on off-market deals and closings.",
  alternates: { canonical: "/partners/agents" },
};

export default function PartnersPage() {
  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Let's Partner Up</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            {site.parentOrganization} is funded in-house and closes fast. If you bring us
            a deal or a client, we pay, and we pay quickly.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <div className="space-y-5">
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="font-semibold text-brand-black">Real Estate Agents</div>
              <p className="mt-1 text-sm text-gray-600">
                Representing a seller with a property better suited to an investor than
                the MLS? We purchase directly, close quickly, and pay commissions. Agents
                who bring us deals regularly become preferred investment agents.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="font-semibold text-brand-black">Referrals — Property Partners</div>
              <p className="mt-1 text-sm text-gray-600">
                Know someone who needs to sell? Our Property Partners program pays $2,000
                or more, cash or check, the day after closing on any referral that closes.
                No cap.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="font-semibold text-brand-black">Wholesalers & Bird Dogs</div>
              <p className="mt-1 text-sm text-gray-600">
                Bring us off-market properties and get paid a referral fee. Find deals,
                get paid.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="font-semibold text-brand-black">Investors</div>
              <p className="mt-1 text-sm text-gray-600">
                Joint ventures, funding projects, or passive positions. Scale alongside a
                team that's closed {site.stats.homesBought} projects rather than learning
                on your own dollar.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="font-semibold text-brand-black">Building or Remodeling?</div>
              <p className="mt-1 text-sm text-gray-600">
                House Junkies Construction ({site.licenses.generalContractor}) takes
                outside work too, not just our own flips, including full ADU builds from
                design through permitting to turnkey delivery.
              </p>
            </div>
          </div>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
