// White section beneath CarShowcase explaining where the car's name came
// from — same white/brand-subtitle language as AboutIntro, but a single
// centered text column since there's no accompanying image here.
export function CarNameOrigin() {
  return (
    <section className="flex flex-col justify-center bg-white px-6 py-16 text-[#0d0d0d] sm:py-24">
      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="text-sm font-bold tracking-wide text-brand uppercase">Where The Name Comes From</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight uppercase sm:text-4xl">
          Placeholder Heading
        </h2>
        <p className="mt-6 text-base text-black/60">
          Placeholder paragraph text goes here — swap this copy out once we know exactly what it
          should say.
        </p>
      </div>
    </section>
  );
}
