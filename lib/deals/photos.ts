"use client";

import type { SupabaseClient } from "@supabase/supabase-js";

export const PHOTO_BUCKET = "deal-photos";
export const MAX_PHOTOS = 5;
const MAX_SIDE = 1600;

// Shrinks a phone photo to at most 1600px on the long side as a JPEG, so
// uploads are fast and storage stays small. Falls back to the original file.
async function shrink(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
    return blob ?? file;
  } catch {
    return file;
  }
}

// Uploads to <user id>/<deal id>/<random>.jpg and returns the storage path.
export async function uploadDealPhoto(supabase: SupabaseClient, userId: string, dealId: string, file: File) {
  const blob = await shrink(file);
  const path = `${userId}/${dealId}/${crypto.randomUUID()}.jpg`;
  const { error } = await supabase.storage.from(PHOTO_BUCKET).upload(path, blob, { contentType: "image/jpeg", upsert: false });
  if (error) throw error;
  return path;
}

// Private bucket, so photos are shown through short-lived signed links.
export async function signedPhotoUrls(supabase: SupabaseClient, paths: string[]) {
  if (paths.length === 0) return {} as Record<string, string>;
  const { data } = await supabase.storage.from(PHOTO_BUCKET).createSignedUrls(paths, 60 * 60);
  const out: Record<string, string> = {};
  for (const row of data ?? []) if (row.path && row.signedUrl) out[row.path] = row.signedUrl;
  return out;
}
