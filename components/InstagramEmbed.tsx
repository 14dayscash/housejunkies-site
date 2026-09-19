"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

// Renders a real, live Instagram post via Instagram's own official embed
// widget — not a screenshot or a copy. Nothing here is rehosted; the post
// stays on Instagram's servers and Instagram's script renders it in place.
export function InstagramEmbed({ permalink }: { permalink: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [permalink]);

  return (
    <div ref={ref} className="mx-auto max-w-md">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
        style={{ background: "#FFF", width: "100%", margin: "0 auto" }}
      />
    </div>
  );
}
