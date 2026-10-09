"use client";

import { useState } from "react";

// Buyer-side inquiry. Reuses /api/contact (saved to contact_messages and
// emailed through Web3Forms) with the subject prefixed so it is easy to tell
// apart from seller leads.

export function BuyerInquiryForm({ topic, placeholder = "Type of property, area, price range" }: { topic: string; placeholder?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = {
      full_name: `${form.get("first_name")} ${form.get("last_name")}`.trim(),
      phone: form.get("phone"),
      email: form.get("email"),
      property_address: `BUYER INQUIRY - ${topic}`,
      description: String(form.get("looking_for") || ""),
    };
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
        <p className="mt-1 text-sm text-gray-700">We will reach out with what we have that fits.</p>
      </div>
    );
  }

  const input = "mt-1 w-full rounded-md border border-gray-300 px-3 py-2";
  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 text-brand-black shadow-sm">
      <h2 className="text-lg font-bold">Tell Us What You&apos;re Looking For</h2>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input id="first_name" name="first_name" required className={input} />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input id="last_name" name="last_name" required className={input} />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input id="phone" name="phone" type="tel" required className={input} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" name="email" type="email" className={input} />
      </div>
      <div>
        <label htmlFor="looking_for" className="block text-sm font-medium text-gray-700">What are you looking for?</label>
        <textarea id="looking_for" name="looking_for" rows={3} placeholder={placeholder} className={input} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-brand-yellow px-4 py-3 font-bold text-black hover:bg-brand-yellow-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send My Request"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">Something went wrong, please call (559) 368-8956 instead.</p>}
    </form>
  );
}
