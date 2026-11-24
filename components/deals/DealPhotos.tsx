"use client";

import { useEffect, useRef, useState } from "react";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import { MAX_PHOTOS, PHOTO_BUCKET, signedPhotoUrls, uploadDealPhoto } from "@/lib/deals/photos";
import type { Deal } from "@/lib/deals/calc";

export function DealPhotos({ deal, readOnly, onChanged }: { deal: Deal; readOnly?: boolean; onChanged?: () => Promise<void> }) {
  const supabase = dealsSupabase()!;
  const photos = deal.photos ?? [];
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const key = photos.join("|");

  useEffect(() => {
    let alive = true;
    signedPhotoUrls(supabase, photos).then((u) => alive && setUrls(u));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  async function add(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    const room = MAX_PHOTOS - photos.length;
    const picked = Array.from(files).slice(0, room);
    if (files.length > room) setError(`Only ${MAX_PHOTOS} photos per deal. The first ${room} were added.`);
    setBusy(true);
    try {
      const { data } = await supabase.auth.getUser();
      const userId = data.user!.id;
      const added: string[] = [];
      for (const f of picked) added.push(await uploadDealPhoto(supabase, userId, deal.id, f));
      const { error } = await supabase.from("deals").update({ photos: [...photos, ...added] }).eq("id", deal.id);
      if (error) throw error;
      await onChanged?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed. Try again.");
    }
    setBusy(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function remove(path: string) {
    if (!window.confirm("Delete this photo?")) return;
    setBusy(true);
    const { error } = await supabase.from("deals").update({ photos: photos.filter((p) => p !== path) }).eq("id", deal.id);
    if (!error) await supabase.storage.from(PHOTO_BUCKET).remove([path]);
    if (error) setError(error.message);
    else await onChanged?.();
    setBusy(false);
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-extrabold text-brand-black">
          PHOTOS <span className="text-sm font-bold text-gray-400">({photos.length}/{MAX_PHOTOS})</span>
        </h2>
        {!readOnly && photos.length < MAX_PHOTOS && (
          <button
            type="button"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-yellow px-3 py-2 text-sm font-bold text-black hover:bg-brand-yellow-dark disabled:opacity-60"
          >
            {busy ? "UPLOADING..." : "+ ADD PHOTOS"}
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => add(e.target.files)} />
      </div>

      {photos.length === 0 ? (
        readOnly && <p className="mt-2 text-gray-600">No photos yet.</p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {photos.map((p, i) => (
            <li key={p} className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
              {urls[p] ? (
                <a href={urls[p]} target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={urls[p]} alt={`Property photo ${i + 1}`} className="h-full w-full object-cover" />
                </a>
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-400">Loading...</div>
              )}
              {!readOnly && (
                <button
                  type="button"
                  onClick={() => remove(p)}
                  aria-label="Delete photo"
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-lg font-bold leading-none text-white hover:bg-red-600"
                >
                  &times;
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
    </div>
  );
}
