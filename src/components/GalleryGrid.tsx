"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";

export type GallerySeason = {
  slug: string;
  label: string;
  shortLabel: string;
  count: number;
};

const PILL_HIDE_DELAY_MS = 500;

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
  const [activeSlug, setActiveSlug] = useState<string | undefined>(undefined);
  const entryBySlug = useRef<Map<string, IntersectionObserverEntry>>(new Map());
  const [pillVisible, setPillVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting), {
      threshold: 0,
    });

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = Array.from(sectionRefs.current.values());
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
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
