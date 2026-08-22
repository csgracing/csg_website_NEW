import { PlaceholderPage } from "@/components/PlaceholderPage";

export function PageHero({ title }: { title: string }) {
  return (
    <PlaceholderPage title={title} minHeightClassName="min-h-[60vh]" blurredBlackBackground showDivider />
  );
}
