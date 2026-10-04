"use client";

import { useState } from "react";
import { Header } from "./Header";
import { StickyOfferBar } from "./StickyOfferBar";

// Holds the mobile-menu-open state and shares it between Header and
// StickyOfferBar, so the offer bar can hide itself while the hamburger
// menu is open instead of the two sitting on top of each other.

export function StickyTop() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <StickyOfferBar hidden={mobileOpen} />
    </div>
  );
}
