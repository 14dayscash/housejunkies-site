"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google?: { maps?: { importLibrary?: (name: string) => Promise<unknown> } };
  }
}

type AutocompleteElement = HTMLElement & { value?: string; placeholder?: string };
type PlacesLibrary = {
  PlaceAutocompleteElement: new (options: Record<string, unknown>) => AutocompleteElement;
};
type SelectEvent = Event & { placePrediction?: { text?: { text?: string } } };

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

// Loaded once per page, shared by every address box on it.
let placesPromise: Promise<PlacesLibrary> | null = null;

function loadPlaces(key: string): Promise<PlacesLibrary> {
  if (placesPromise) return placesPromise;
  placesPromise = new Promise<PlacesLibrary>((resolve, reject) => {
    const ready = () => {
      const pending = window.google?.maps?.importLibrary?.("places");
      if (!pending) {
        reject(new Error("Google Maps is not available"));
        return;
      }
      pending.then((lib) => resolve(lib as PlacesLibrary), reject);
    };
    if (window.google?.maps?.importLibrary) {
      ready();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&loading=async&v=weekly`;
    script.async = true;
    script.onload = ready;
    script.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(script);
  });
  placesPromise.catch(() => {
    placesPromise = null;
  });
  return placesPromise;
}

const cleanAddress = (s: string) => s.replace(/,\s*USA$/, "");

// Address field with Google's Place Autocomplete (the current
// PlaceAutocompleteElement, not the legacy widget).
//
// - Always renders a plain text input first, so there is no blank gap while
//   Google loads and it still works with no API key at all (browser autofill).
// - If NEXT_PUBLIC_GOOGLE_PLACES_API_KEY is set, a moment after mount it swaps
//   in Google's autocomplete box (US addresses only, biased toward Central CA).
// - A hidden input carries the `name`, so FormData-based forms keep working
//   the same either way. onChange fires on every keystroke and on selection.

export function AddressInput({
  id,
  name,
  defaultValue = "",
  placeholder,
  className,
  containerClassName,
  required,
  onChange,
}: {
  id: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [upgraded, setUpgraded] = useState(false);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const sync = useRef((value: string) => {
    if (hiddenRef.current) hiddenRef.current.value = value;
    onChangeRef.current?.(value);
  }).current;

  useEffect(() => {
    if (!API_KEY) return;
    let cancelled = false;
    let el: AutocompleteElement | null = null;

    const timer = window.setTimeout(() => {
      loadPlaces(API_KEY)
        .then((lib) => {
          const host = hostRef.current;
          if (cancelled || !host) return;

          const created = new lib.PlaceAutocompleteElement({
            includedRegionCodes: ["us"],
            includedPrimaryTypes: ["street_address", "premise", "subpremise"],
          });
          el = created;
          try {
            // Bias (not restrict) suggestions toward our Central CA footprint.
            (created as unknown as Record<string, unknown>).locationBias = {
              north: 37.6,
              south: 34.9,
              west: -122.0,
              east: -117.4,
            };
          } catch {
            // Bias is a nice-to-have, suggestions still work without it.
          }
          created.style.setProperty("color-scheme", "light");
          created.style.display = "block";
          created.style.width = "100%";
          if (placeholder) created.placeholder = placeholder;
          created.setAttribute("aria-label", placeholder ?? "Property address");

          const typedSoFar = inputRef.current?.value ?? "";
          if (typedSoFar) created.value = typedSoFar;

          created.addEventListener("input", () => sync(created.value ?? ""));
          created.addEventListener("gmp-select", (event) => {
            const text = (event as SelectEvent).placePrediction?.text?.text;
            if (!text) return;
            const full = cleanAddress(text);
            created.value = full;
            sync(full);
          });

          host.appendChild(created);
          setUpgraded(true);
        })
        .catch(() => {
          // Key missing/restricted or API not enabled: stay on the plain input.
        });
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      el?.remove();
    };
  }, [placeholder, sync]);

  return (
    <div className={containerClassName}>
      <input
        ref={inputRef}
        id={id}
        type="text"
        required={required && !upgraded}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={API_KEY ? "off" : "street-address"}
        className={className}
        style={upgraded ? { display: "none" } : undefined}
        onChange={(e) => sync(e.target.value)}
      />
      <input ref={hiddenRef} type="hidden" name={name} defaultValue={defaultValue} />
      <div ref={hostRef} />
    </div>
  );
}
