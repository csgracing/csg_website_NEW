import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "The Team",
};

export default function TheTeamsPage() {
  return <PlaceholderPage title="The Team" />;
}
