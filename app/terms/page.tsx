import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern use of ${site.url}, operated by ${site.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold text-brand-black">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-400">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-8 space-y-6 text-gray-600">
        <p>
          These Terms of Service ("Terms") govern your use of {site.url} (the "Site"), operated
          by {site.name}. By using this Site, you agree to these Terms.
        </p>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Use of the Site</h2>
          <p className="mt-2">
            This Site is provided to give homeowners information about selling property to{" "}
            {site.name} and to let visitors submit inquiries. You agree to provide accurate
            information when submitting a form and not to use the Site for any unlawful purpose.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">No Obligation, No Guarantee of Offer</h2>
          <p className="mt-2">
            Submitting a form on this Site does not obligate you to sell your property to{" "}
            {site.name}, and does not obligate {site.name} to make an offer. Any cash offer is
            subject to a review of the property and is not final until reflected in a signed
            purchase agreement.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Not Legal, Financial, or Tax Advice</h2>
          <p className="mt-2">
            Content on this Site, including blog posts and situation pages covering topics like
            probate, foreclosure, or ADU law, is provided for general informational purposes only
            and is not legal, financial, or tax advice. Laws and thresholds referenced on this
            Site change over time. Always confirm current requirements with a licensed attorney,
            tax professional, or the relevant government agency before making a decision based on
            anything you read here.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Partnership and Investment Content</h2>
          <p className="mt-2">
            Information on this Site about referral fees, joint ventures, equity partnerships, or
            funding arrangements is general and not a specific offer. Any such arrangement is
            negotiated individually and documented in a separate written agreement. Real estate
            investing carries risk, including the risk of loss, and past performance does not
            guarantee future results. Nothing on this Site is an offer to sell securities.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Intellectual Property</h2>
          <p className="mt-2">
            The content, design, and branding of this Site belong to {site.name} and{" "}
            {site.parentOrganization} and may not be copied or reused without permission.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Third-Party Links</h2>
          <p className="mt-2">
            This Site may link to third-party content, including our blog posts hosted on
            dominicmcclelland.com and our social media profiles. We are not responsible for the
            content or practices of third-party sites.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Limitation of Liability</h2>
          <p className="mt-2">
            This Site and its content are provided "as is" without warranties of any kind. To the
            fullest extent permitted by law, {site.name} is not liable for any damages arising
            from your use of this Site or reliance on its content.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Changes to These Terms</h2>
          <p className="mt-2">
            We may update these Terms from time to time. Continued use of the Site after changes
            are posted means you accept the updated Terms.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Contact Us</h2>
          <p className="mt-2">
            Questions about these Terms can be sent to {site.email} or {site.phone}.
          </p>
        </div>

        <p className="border-t border-gray-200 pt-4 text-xs text-gray-400">
          These Terms are a general template and have not been reviewed by an attorney. They are
          not a substitute for legal advice.
        </p>
      </div>
    </div>
  );
}
