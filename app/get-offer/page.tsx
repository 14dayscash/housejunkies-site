import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: `Get Your Cash Offer | ${site.name}`,
  description: "Finish your details and we'll call you within 24 hours with a free, no-obligation cash offer.",
  alternates: { canonical: "/get-offer" },
};

export default function GetOfferPage({
  searchParams,
}: {
  searchParams: { address?: string };
}) {
  const address = searchParams.address ?? "";

  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-2xl px-4 py-14 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Almost Done</h1>
          <p className="mt-3 text-white/70">
            A few details and we'll call you within 24 hours with a free, no-obligation cash
            offer on your property.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-lg px-4 py-12">
        <LeadForm sourcePage="/get-offer" initialAddress={address} />
      </section>
    </div>
  );
}
