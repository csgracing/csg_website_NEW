import { redirect } from "next/navigation";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { getCarSeasons } from "@/lib/data";

// Stands in for "whichever season is current" — hands off to that season's
// own page (our-cars/[slug]), which titles itself "Our Car" when it's the
// latest one. Temporary redirect, not permanent: next season this needs to
// point elsewhere.
export default function OurCarsPage() {
  const [latest] = getCarSeasons();

  if (!latest) {
    return <PlaceholderPage title="Our Cars" />;
  }

  redirect(`/our-cars/${latest.slug}`);
}
