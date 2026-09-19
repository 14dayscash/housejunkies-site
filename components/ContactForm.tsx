"use client";

import { useState } from "react";

// Matches the exact field set requested: Full Name, Phone, Email, Property
// Address, Brief Description, "Get My Cash Offer" - this is the dedicated
// contact page form, deliberately fuller than the 2-field city-page LeadForm
// since someone reaching the Contact page has already decided to engage.

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-brand-yellow/30 bg-brand-yellow/10 p-6 text-brand-black">
        <p className="font-semibold">Got it, thanks.</p>
        <p className="mt-1 text-sm text-gray-600">We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input id="full_name" name="full_name" required className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input id="phone" name="phone" type="tel" required className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" name="email" type="email" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="property_address" className="block text-sm font-medium text-gray-700">Property Address</label>
        <input id="property_address" name="property_address" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Brief Description</label>
        <textarea id="description" name="description" rows={4} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Tell us a bit about the property and your situation" />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-brand-yellow px-4 py-3 font-bold text-black hover:bg-brand-yellow-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Get My Cash Offer"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">Something went wrong, please call instead.</p>}
    </form>
  );
}
