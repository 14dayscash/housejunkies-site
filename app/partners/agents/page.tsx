import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: `Partner With Us | Agents & Wholesalers | ${site.name}`,
  description: "Real estate agents and wholesalers: partner with House Junkies on off-market deals and closings.",
  alternates: { canonical: "/partners/agents" },
};

export default function PartnersPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold">Let's Partner Up</h1>
        <p className="mt-4 text-gray-600">
          Agents: represent us on deals and earn a commission when we close. Wholesalers
          and bird dogs: bring us off-market properties for a referral fee. Investors:
          joint venture on a flip, we bring the capital.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
