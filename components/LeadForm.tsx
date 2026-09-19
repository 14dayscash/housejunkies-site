"use client";

import { useState } from "react";

// Two-field first-touch form per the SEO audit's CRO finding: the old site's
// 8-field form was costing completions. Address + phone only; everything else
// (condition, situation, timeline) gets asked on the qualifying call.

export function LeadForm({ sourcePage }: { sourcePage: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = {
      full_name: form.get("full_name"),
      phone: form.get("phone"),
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
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg bg-brand-green/10 p-6 text-brand-green">
        <p className="font-semibold">Got it, thanks.</p>
        <p className="mt-1 text-sm">We'll call you within 24 hours to talk through your offer. No obligation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full name</label>
        <input
          id="full_name" name="full_name" type="text" required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="property_address" className="block text-sm font-medium text-gray-700">Property address</label>
        <input
          id="property_address" name="property_address" type="text" required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          id="phone" name="phone" type="tel" required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-brand-green px-4 py-3 font-semibold text-white hover:bg-brand-green/90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Get My Cash Offer"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong, call us instead at the number above.</p>
      )}
      <p className="text-xs text-gray-400">No obligation. No fees. We respond within 24 hours.</p>
    </form>
  );
}
