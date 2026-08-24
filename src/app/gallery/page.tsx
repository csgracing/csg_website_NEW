import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid, type GallerySeason } from "@/components/GalleryGrid";
import { getTeamSeasons } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
};

const DEFAULT_PLACEHOLDER_COUNT = 25;

// Filenames for photos that were replaced in place after publishing; renamed (rather than
// overwritten) so browsers that cached the old bytes under the original filename aren't stuck.
const RENAMED_GALLERY_FILES: Record<number, string> = {
  15: "photo-15-v3.jpg",
  17: "photo-17-v2.jpg",
  45: "photo-45-v2.jpg",
};

const REAL_PHOTOS_BY_SLUG: Record<string, string[]> = {
  "fsuk-class-1-2025-2026": Array.from(
    { length: 50 },
    (_, i) => {
      const n = i + 1;
      const file = RENAMED_GALLERY_FILES[n] ?? `photo-${String(n).padStart(2, "0")}.jpg`;
      return `/images/gallery/2025-2026/${file}`;
    },
  ),
};

export default function GalleryPage() {
  const seasons = getTeamSeasons();

  const gallerySeasons: GallerySeason[] = seasons.map((season) => {
    const yearMatch = season.slug.match(/(\d{4}-\d{4})/);
    const images = REAL_PHOTOS_BY_SLUG[season.slug];

    return {
      slug: season.slug,
      label: season.title,
      shortLabel: yearMatch ? yearMatch[1] : season.title,
      count: images ? images.length : DEFAULT_PLACEHOLDER_COUNT,
      images,
    };
  });

  return (
    <>
      <PageHero title="Gallery" />
      <GalleryGrid seasons={gallerySeasons} />
    </>
  );
}
