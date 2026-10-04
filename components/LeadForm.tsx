"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Same shape everywhere on the site: First Name, Last Name, Phone, Email,
// Property Address, "Get My Cash Offer". On success, redirects to
// /get-offer-success (a dedicated URL) instead of showing an inline
// message, so Google Ads conversion tracking can fire on one consistent
// URL regardless of which page the form was submitted from.

export function LeadForm({
  sourcePage,
  initialAddress = "",
}: {
  sourcePage: string;
  initialAddress?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const firstName = form.get("first_name");
    const lastName = form.get("last_name");
    const payload = {
      full_name: `${firstName} ${lastName}`.trim(),
      phone: form.get("phone"),
      email: form.get("email"),
      property_address: form.get("property_address"),
      source_page: sourcePage,
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      router.push(`/get-offer-success?source=${encodeURIComponent(sourcePage)}`);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 text-brand-black shadow-xl">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            id="first_name" name="first_name" type="text" required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            id="last_name" name="last_name" type="text" required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          id="phone" name="phone" type="tel" required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email" name="email" type="email"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="property_address" className="block text-sm font-medium text-gray-700">Property Address</label>
        <input
          id="property_address" name="property_address" type="text" required
          defaultValue={initialAddress}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-brand-yellow px-4 py-3 font-bold text-black hover:bg-brand-yellow-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Get My Cash Offer"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong, call us instead at the number above.</p>
      )}
      <p className="text-xs text-gray-600">No obligation. No fees. We respond within 24 hours.</p>
    </form>
  );
}
