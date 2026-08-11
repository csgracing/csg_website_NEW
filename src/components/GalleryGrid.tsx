"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";

export type GallerySeason = {
  slug: string;
  label: string;
  shortLabel: string;
  count: number;
};

// How long the floating season pill stays visible after the last scroll
// event before it starts fading out — mirrors the iOS Photos app's date
// scrubber. The fade itself is a separate, slower transition (see
// transition-opacity below) so it disappears gradually, not abruptly.
const PILL_HIDE_DELAY_MS = 500;

// Repeating cycle of tile shapes (in grid cells) so the gallery reads as a
// varied mosaic instead of a uniform grid — mixes squares, wide, and tall
// rectangles. Cycled by index, not randomised, so layout is stable across
// re-renders. Only kicks in at sm+ — mobile stays a plain square grid, since
// there isn't enough column width for the variation to read as intentional.
const TILE_SHAPES = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "sm:row-span-2",
  "",
  "sm:col-span-2",
  "",
  "sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
];

export function GalleryGrid({ seasons }: { seasons: GallerySeason[] }) {
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  // undefined = not currently inside any season's image section (e.g. still
  // up in the Gallery title/hero) — the pill has nothing to show then.
  const [activeSlug, setActiveSlug] = useState<string | undefined>(undefined);
  const entryBySlug = useRef<Map<string, IntersectionObserverEntry>>(new Map());
  const [pillVisible, setPillVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hide the pill once the footer is on screen — there's no season left to
  // be scrubbing through at that point.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting), {
      threshold: 0,
    });

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Track whichever season section currently sits in a thin band around
  // the vertical center of the viewport.
  useEffect(() => {
    const sections = Array.from(sectionRefs.current.values());
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The callback only reports entries whose intersection just changed,
        // not every observed section — so track full state ourselves to know
        // whether *anything* is currently in the band, not just what moved.
        entries.forEach((entry) => {
          const slug = entry.target.getAttribute("data-season-slug");
          if (slug) entryBySlug.current.set(slug, entry);
        });

        const centered = Array.from(entryBySlug.current.values())
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top),
          )[0];

        setActiveSlug(centered?.target.getAttribute("data-season-slug") ?? undefined);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [seasons]);

  // Show the pill while scrolling, hide it a moment after scrolling stops.
  useEffect(() => {
    function handleScroll() {
      setPillVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setPillVisible(false), PILL_HIDE_DELAY_MS);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const activeSeason = seasons.find((season) => season.slug === activeSlug);

  return (
    <div className="relative">
      {/* Floating "which season am I looking at" pill, Photos-app style. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 top-24 z-40 flex justify-center transition-opacity duration-500 ${
          pillVisible && activeSeason && !footerInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="rounded-full border border-white/10 bg-black/80 px-5 py-2 text-sm font-semibold tracking-wide text-white uppercase backdrop-blur-md">
          {activeSeason?.shortLabel}
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {seasons.map((season) => (
          <section
            key={season.slug}
            ref={(el) => {
              if (el) sectionRefs.current.set(season.slug, el);
              else sectionRefs.current.delete(season.slug);
            }}
            data-season-slug={season.slug}
            className="mb-20 last:mb-0"
          >
            <h2 className="mb-6 text-xs font-bold tracking-[0.2em] text-white/50 uppercase">
              {season.label}
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[140px] sm:gap-6 sm:grid-flow-dense lg:grid-cols-6 lg:auto-rows-[160px]">
              {Array.from({ length: season.count }).map((_, index) => (
                <div
                  key={index}
                  className={`relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.45)] sm:aspect-auto ${
                    TILE_SHAPES[index % TILE_SHAPES.length]
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center text-white/15">
                    <Icon name="photo" className="h-8 w-8" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
