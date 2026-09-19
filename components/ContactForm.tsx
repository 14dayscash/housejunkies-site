"use client";

import { useState } from "react";

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
      <div className="rounded-lg bg-brand-green/10 p-6 text-brand-green">
        Message sent. We'll get back to you within 24 hours.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full name</label>
        <input id="full_name" name="full_name" required className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" name="email" type="email" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input id="phone" name="phone" type="tel" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea id="message" name="message" required rows={4} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-brand-green px-4 py-3 font-semibold text-white hover:bg-brand-green/90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">Something went wrong, please call instead.</p>}
    </form>
  );
}
