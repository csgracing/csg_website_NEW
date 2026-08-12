// Car name above a single centered placeholder image, full content-column
// width (unlike AboutIntro's half-width image) — this section exists to
// show off the car itself, not to sit next to body copy.
export function CarShowcase({ carName }: { carName: string }) {
  return (
    <section className="bg-background px-6 pt-12 pb-6 text-center sm:pt-14 sm:pb-10">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="text-2xl font-black tracking-tight uppercase sm:text-4xl">{carName}</h2>

        <div className="mx-auto mt-6 flex aspect-video w-full items-center justify-center border border-dashed border-white/20 bg-white/5 text-sm text-white/40 uppercase">
          Car image placeholder
        </div>
      </div>
    </section>
  );
}
