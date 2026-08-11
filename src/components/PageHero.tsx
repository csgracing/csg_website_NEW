import { PlaceholderPage } from "@/components/PlaceholderPage";

// Shared title-section design — taller blurred-black hero + the red-edged
// divider bar beneath it (first built for the Gallery page). Every page
// whose real layout hasn't been designed yet pulls from here so they read
// as one consistent system instead of each re-implementing the same look.
export function PageHero({ title }: { title: string }) {
  return (
    <PlaceholderPage title={title} minHeightClassName="min-h-[60vh]" blurredBlackBackground showDivider />
  );
}
