import { redirect } from "next/navigation";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { getTeamSeasons } from "@/lib/data";

export default function TheTeamsPage() {
  const [latest] = getTeamSeasons();

  if (!latest) {
    return (
      <PlaceholderPage
        title="The Team"
        minHeightClassName="min-h-[60vh]"
        showDivider
        dividerBorderClassName="border-t-2 border-t-background/40 border-b-[3px] border-b-brand"
      />
    );
  }

  redirect(`/the-teams/${latest.slug}`);
}
