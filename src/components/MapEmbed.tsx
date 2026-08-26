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
            href="https://www.esri.com/en-us/legal/terms/data-attributions"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            © Esri
          </a>{" "}
          &mdash; HERE, Garmin,{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            © OpenStreetMap
          </a>{" "}
          contributors
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
  const pathname = usePathname();

  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-black/10 shadow-lg shadow-black/20 sm:h-72">
      <LocationMap key={pathname} />
      <MapAttribution />
    </div>
  );
}
