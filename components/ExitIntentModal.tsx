"use client";

import { useEffect, useState } from "react";
import { LeadForm } from "./LeadForm";

// Fires once per browser session when the cursor leaves toward the top of the
// viewport (the classic "about to close the tab / hit back" signal), same
// idea as the ExitIntentModal on the old Base44 site. Doesn't fire on mobile
// (no mouse), and never fires twice in one visit.

export function ExitIntentModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("hj_exit_intent_shown")) return;

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem("hj_exit_intent_shown", "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl">
        <button
          onClick={() => setShow(false)}
          aria-label="Close"
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <h2 className="pr-6 text-xl font-bold text-brand-black">
          Wait, don't leave without your offer!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Get a free, no-obligation cash offer before you go. Takes less than a minute.
        </p>
        <div className="mt-4">
          <LeadForm sourcePage="exit-intent-modal" />
        </div>
      </div>
    </div>
  );
}
