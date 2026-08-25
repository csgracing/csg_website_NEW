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
const RENAMED_GALLERY_FILES_2025_2026: Record<number, string> = {
  15: "photo-15-v3.jpg",
  16: "photo-16-v2.jpg",
  17: "photo-17-v2.jpg",
  45: "photo-45-v2.jpg",
};

const RENAMED_GALLERY_FILES_2024_2025: Record<number, string> = {
  23: "photo-23-v2.jpg",
};

function galleryPhotos(folder: string, count: number, renamed: Record<number, string> = {}) {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    const file = renamed[n] ?? `photo-${String(n).padStart(2, "0")}.jpg`;
    return `/images/gallery/${folder}/${file}`;
  });
}

const REAL_PHOTOS_BY_SLUG: Record<string, string[]> = {
  "fsuk-class-1-2025-2026": galleryPhotos("2025-2026", 50, RENAMED_GALLERY_FILES_2025_2026),
  "fsuk-concept-2024-2025": galleryPhotos("2024-2025", 40, RENAMED_GALLERY_FILES_2024_2025),
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
