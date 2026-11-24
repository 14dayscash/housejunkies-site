"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// The internal team tools (/deals, /admin) have their own header, so the
// public site header and footer are hidden there (Dominic, 2026-11-24).
export function isInternalPath(path: string | null) {
  return !!path && (path.startsWith("/deals") || path.startsWith("/admin"));
}

export function HideOnInternal({ children }: { children: ReactNode }) {
  const path = usePathname();
  if (isInternalPath(path)) return null;
  return <>{children}</>;
}
