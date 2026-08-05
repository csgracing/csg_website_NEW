"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const LocationMap = dynamic(() => import("./LocationMap").then((mod) => mod.LocationMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-black/5 text-sm text-black/40">
      Loading map…
    </div>
  ),
});

// OSM/CARTO's free-tile terms require this credit somewhere; collapsed to
// a small "i" badge that expands on click instead of a permanent strip.
function MapAttribution() {
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const collapse = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setExpanded(false);
    };
    window.addEventListener("mousedown", collapse);
    return () => window.removeEventListener("mousedown", collapse);
  }, [expanded]);

  return (
    <div ref={rootRef} className="absolute right-2 bottom-2 z-[1000] flex items-center justify-end">
      {expanded && (
        <p className="mr-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[10px] leading-none whitespace-nowrap text-white/70 backdrop-blur-sm">
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            © OpenStreetMap
          </a>{" "}
          contributors{" "}
          <a
            href="https://carto.com/attributions"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            © CARTO
          </a>
        </p>
      )}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label="Map data attribution"
        className="flex h-4 w-4 items-center justify-center rounded-full bg-black/60 text-[9px] leading-none font-serif text-white/70 transition-colors hover:bg-black/80 hover:text-white"
      >
        i
      </button>
    </div>
  );
}

export function MapEmbed() {
  // The Footer lives in the root layout and never unmounts on client-side
  // navigation, so key the map on pathname to reset it to its default view
  // (rather than keeping whatever pan state a visitor left it in) on every
  // route change.
  const pathname = usePathname();

  return (
    // Only rounded/shadowed element on the site (rest favours sharp edges)
    // — a plain rectangle read too much like a raw Google Maps embed.
    <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-black/10 shadow-lg shadow-black/20 sm:h-96">
      <LocationMap key={pathname} />
      <MapAttribution />
    </div>
  );
}
