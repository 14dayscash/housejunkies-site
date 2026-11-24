import type { Metadata } from "next";
import { AdminApp } from "@/components/deals/AdminApp";

// Internal admin view of every account and deal. Not in the sitemap or nav,
// and marked noindex. Data access is limited to admins by the database.
export const metadata: Metadata = {
  title: { absolute: "Admin | House Junkies Team" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function AdminPage() {
  return <AdminApp />;
}
