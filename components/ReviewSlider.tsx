"use client";

import { useRef, useState } from "react";

// Homepage Google review slider (Dominic, 2026-11-07). Review text is quoted
// word for word from lib/reviews.ts, only shortened with "..." for the card.
// Arrows, dots and swipe to move between reviews.

export type SliderReview = { name: string; rating: number; text: string };

const GBP = "https://share.google/a8MBePgETXLdYaMqs";
const SEE_REVIEWS = "https://share.google/ECflKJ4L9kjEdvdAI";
const LEAVE_REVIEW = "https://g.page/r/CYTb_JJYuE9AEBM/review";
const MAX_CHARS = 190;

function clip(text: string) {
  if (text.length <= MAX_CHARS) return text;
  const cut = text.slice(0, MAX_CHARS);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[.,!?;:]+$/, "") + "…";
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous review" : "Next review"}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-brand-black shadow-sm transition-colors hover:border-brand-yellow-dark hover:bg-brand-yellow"
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5">
        <path
          d={dir === "prev" ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function ReviewSlider({ reviews }: { reviews: SliderReview[] }) {
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = reviews.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const r = reviews[i];

  return (
    <div>
      <div className="flex items-center justify-center gap-3 md:gap-6">
        <div className="hidden sm:block">
          <Arrow dir="prev" onClick={() => go(-1)} />
        </div>

        <figure
          className="relative flex min-h-[340px] w-full max-w-xl flex-col items-center rounded-2xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white px-6 pb-8 pt-7 text-center shadow-[0_20px_40px_rgba(0,0,0,0.08)] md:px-10"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
          aria-live="polite"
        >
          <span aria-hidden="true" className="absolute left-5 top-2 font-display text-7xl leading-none text-brand-yellow/40">
            &ldquo;
          </span>
          <a href={GBP} target="_blank" rel="noopener noreferrer" aria-label="House Junkies on Google">
            <img
              src="/images/google-reviews-badge.png"
              alt="Google Reviews, 5 stars"
              width={400}
              height={225}
              className="h-16 w-auto"
            />
          </a>
          <blockquote className="mt-5 flex flex-1 items-center text-lg leading-relaxed text-gray-700">
            <p>&ldquo;{clip(r.text)}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-6">
            <p className="font-bold text-brand-black">{r.name}</p>
            <p className="mt-0.5 text-sm text-brand-yellow-dark" aria-label={`${r.rating} out of 5 stars`}>
              {"★".repeat(r.rating)}
            </p>
          </figcaption>
        </figure>

        <div className="hidden sm:block">
          <Arrow dir="next" onClick={() => go(1)} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <div className="sm:hidden">
          <Arrow dir="prev" onClick={() => go(-1)} />
        </div>
        <div className="flex gap-2">
          {reviews.map((rv, k) => (
            <button
              key={rv.name}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show review from ${rv.name}`}
              className={`h-2.5 rounded-full transition-all ${k === i ? "w-7 bg-brand-yellow-dark" : "w-2.5 bg-gray-300"}`}
            />
          ))}
        </div>
        <div className="sm:hidden">
          <Arrow dir="next" onClick={() => go(1)} />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={SEE_REVIEWS}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-yellow px-6 py-3 font-bold text-black transition-colors hover:bg-brand-yellow-dark sm:w-auto"
        >
          See Our Google Reviews <span aria-hidden="true">→</span>
        </a>
        <a
          href={LEAVE_REVIEW}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-brand-black px-6 py-2.5 font-bold text-brand-black transition-colors hover:bg-brand-black hover:text-white sm:w-auto"
        >
          Leave a Review <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
