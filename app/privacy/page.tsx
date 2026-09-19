import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects information submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold text-brand-black">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-400">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-8 space-y-6 text-gray-600">
        <p>
          This Privacy Policy explains how {site.name} ("House Junkies," "we," "us," or "our")
          collects, uses, and protects information submitted through {site.url} (the "Site").
        </p>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Information We Collect</h2>
          <p className="mt-2">
            When you submit a form on this Site (a cash offer request, a contact message, or a
            partner inquiry), we collect the information you provide, which may include your
            name, phone number, email address, property address, and any additional details you
            choose to share about your property or situation.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">How We Use Your Information</h2>
          <p className="mt-2">We use the information you submit to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Contact you about a potential cash offer on your property</li>
            <li>Respond to questions or messages you send us</li>
            <li>Evaluate partnership, referral, or investment inquiries</li>
            <li>Improve our website and services</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Communication Consent</h2>
          <p className="mt-2">
            By submitting a form on this Site, you consent to be contacted by {site.name} by
            phone, text message (SMS), and email regarding your inquiry, using the contact
            information you provided. Message and data rates may apply for SMS communications.
            You can opt out of text messages at any time by replying STOP, and you can ask to be
            removed from our contact list at any time by calling {site.phone} or emailing{" "}
            {site.email}.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">How We Share Information</h2>
          <p className="mt-2">
            We do not sell your personal information to third parties. We may share information
            with:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Service providers who help us operate the Site (such as our form and hosting providers)</li>
            <li>Title companies, escrow companies, and other parties directly involved in a transaction you choose to move forward with</li>
            <li>Legal authorities, if required by law</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Data Retention and Security</h2>
          <p className="mt-2">
            We retain the information you submit for as long as reasonably necessary to respond
            to your inquiry or, if you become a seller or partner, for as long as needed for that
            relationship and our recordkeeping. We use reasonable technical and organizational
            measures to protect the information you submit, though no method of transmission or
            storage is completely secure.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Your Choices</h2>
          <p className="mt-2">
            You can request access to, correction of, or deletion of the information you've
            submitted to us by contacting us at {site.email} or {site.phone}.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Changes to This Policy</h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated revision date.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-black">Contact Us</h2>
          <p className="mt-2">
            Questions about this policy can be sent to {site.email}, or {site.phone}, or by mail
            to {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}.
          </p>
        </div>

        <p className="border-t border-gray-200 pt-4 text-xs text-gray-400">
          This policy is a general template intended to describe our current practices and has
          not been reviewed by an attorney. It is not a substitute for legal advice.
        </p>
      </div>
    </div>
  );
}
