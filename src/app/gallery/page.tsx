import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return <PlaceholderPage title="Gallery" />;
}
