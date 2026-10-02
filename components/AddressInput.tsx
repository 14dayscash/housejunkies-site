"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts?: Record<string, unknown>
          ) => {
            addListener: (event: string, handler: () => void) => void;
            getPlace: () => { formatted_address?: string };
          };
        };
      };
    };
  }
}

// Plain text input by default. If NEXT_PUBLIC_GOOGLE_PLACES_API_KEY is set,
// upgrades itself to real Google Places address autocomplete (live
// suggestions as you type). Without a key, it still works, just as a
// normal text field with the browser's own address autofill
// (autoComplete="street-address"), no live suggestions, no API cost.

export function AddressInput({
  id,
  name,
  defaultValue = "",
  placeholder,
  className,
  required,
  onChange,
}: {
  id: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey || !inputRef.current) return;

    function initAutocomplete() {
      if (!window.google?.maps?.places || !inputRef.current) return;
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["address"],
        componentRestrictions: { country: "us" },
      });
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address && inputRef.current) {
          inputRef.current.value = place.formatted_address;
          onChange?.(place.formatted_address);
        }
      });
    }

    if (window.google?.maps?.places) {
      initAutocomplete();
      return;
    }

    const existing = document.getElementById("google-places-script");
    if (existing) {
      existing.addEventListener("load", initAutocomplete);
    } else {
      const script = document.createElement("script");
      script.id = "google-places-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    }
  }, [onChange]);

  return (
    <input
      ref={inputRef}
      id={id}
      name={name}
      type="text"
      required={required}
      defaultValue={defaultValue}
      placeholder={placeholder}
      autoComplete="street-address"
      className={className}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
