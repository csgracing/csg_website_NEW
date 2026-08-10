export interface SeasonEntry {
  slug: string;
  title: string;
  // Optional hero photo for this season's placeholder page (e.g. a team
  // photo behind the title). Most seasons won't set this.
  backgroundImage?: string;
  // Optional CSS object-position for backgroundImage (e.g. "center 25%")
  // to bias a wide/short crop toward faces instead of dead space.
  backgroundPosition?: string;
  // Optional override for the heading shown on the season's own page.
  // `title` still drives the nav dropdown label — this only replaces what's
  // displayed once you're on the page itself.
  pageTitle?: string;
}
