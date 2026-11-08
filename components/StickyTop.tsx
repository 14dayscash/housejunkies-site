"use client";

import { useState } from "react";
import { Header } from "./Header";
import { StickyOfferBar, useShowOffer } from "./StickyOfferBar";

// Holds the mobile-menu-open state and shares it between Header and
// StickyOfferBar, so the offer bar can hide itself while the hamburger
// menu is open instead of the two sitting on top of each other.

export function StickyTop() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const showOffer = useShowOffer();

  return (
    <div className="sticky top-0 z-50">
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} showOffer={showOffer} />
      <StickyOfferBar show={showOffer && !mobileOpen} />
    </div>
  );
}
