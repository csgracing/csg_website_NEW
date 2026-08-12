import Link from "next/link";
import { Icon } from "@/components/Icon";

// White section closing out the car page — how the competition itself
// went. Left-aligned and left-anchored (unlike CarNameOrigin's centered
// column) so it doesn't read as a repeat of that section, plus a closing
// link out to the Gallery for photos from the event.
export function CarCompetitionRecap() {
  return (
    <section className="flex min-h-[80vh] flex-col justify-center bg-white px-6 py-16 text-[#0d0d0d] sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-bold tracking-wide text-brand uppercase">How The Competition Went</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight uppercase sm:text-4xl">
          Placeholder Heading
        </h2>
        <p className="mt-6 max-w-2xl text-base text-black/60">
          Placeholder paragraph text goes here — swap this copy out once we know exactly what it
          should say.
        </p>

        <Link
          href="/gallery"
          className="mt-8 inline-flex items-center gap-2 border border-brand px-6 py-3 text-sm font-semibold tracking-wide uppercase text-brand transition-colors hover:bg-brand hover:text-white"
        >
          <Icon name="photo" className="h-4 w-4" />
          See More From The Comp In The Gallery
        </Link>
      </div>
    </section>
  );
}
