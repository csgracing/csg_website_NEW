// Same shell as the homepage's AboutPreview (white section, brand subtitle,
// heading + copy next to an image), mirrored — text on the left, image on
// the right — so About Us doesn't read as an exact duplicate of the
// homepage section.
export function AboutIntro() {
  return (
    <section className="flex flex-col justify-center bg-white px-6 pt-16 pb-24 text-[#0d0d0d]">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-bold tracking-wide text-brand uppercase">Placeholder Subtitle</p>

        <div className="mt-8 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-3xl font-black tracking-tight uppercase sm:text-4xl">
              Placeholder Heading
            </h2>
            <p className="mt-4 text-base text-black/60">
              Placeholder paragraph text goes here. Swap this copy and image out once we know what
              this section should say.
            </p>
          </div>

          <div className="flex aspect-[4/3] w-full items-center justify-center border border-dashed border-black/20 bg-black/5 text-sm text-black/40 uppercase">
            Image placeholder
          </div>
        </div>
      </div>
    </section>
  );
}
