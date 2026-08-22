import { redirect } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { getCarSeasons } from "@/lib/data";

export default function OurCarsPage() {
  const [latest] = getCarSeasons();

  if (!latest) {
    return <PageHero title="Our Cars" />;
  }

  redirect(`/our-cars/${latest.slug}`);
}
