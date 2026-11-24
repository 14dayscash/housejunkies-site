import type { Metadata, Viewport } from "next";
import { DealsApp } from "@/components/deals/DealsApp";

// Internal team tool. Not in the sitemap or nav, and marked noindex.
export const metadata: Metadata = {
  title: { absolute: "Deals | House Junkies Team" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function DealsPage() {
  return <DealsApp />;
}

// Black phone status bar on the team tools.
export const viewport: Viewport = { themeColor: "#0a0a0a" };
