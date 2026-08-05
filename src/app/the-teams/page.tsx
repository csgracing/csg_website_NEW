import { redirect } from "next/navigation";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { getTeamSeasons } from "@/lib/data";

// Stands in for "whichever season is current" — hands off to that season's
// own page (the-teams/[slug]), which titles itself "Our Team" when it's the
// latest one. Temporary redirect, not permanent: next season this needs to
// point elsewhere.
export default function TheTeamsPage() {
  const [latest] = getTeamSeasons();

  if (!latest) {
    return <PlaceholderPage title="The Team" />;
  }

  redirect(`/the-teams/${latest.slug}`);
}
