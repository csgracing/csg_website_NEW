"use client";

import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("./LocationMap").then((mod) => mod.LocationMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-black/5 text-sm text-black/40">
      Loading map…
    </div>
  ),
});

export function MapEmbed() {
  return (
    <div className="h-80 w-full overflow-hidden border border-black/10 sm:h-96">
      <LocationMap />
    </div>
  );
}
