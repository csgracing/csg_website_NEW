// Spec sheet — a label/value list flanked by two small image placeholders
// (left/right on larger screens, stacked above/below on mobile). Exact
// placement of the images is still undecided, so this is a rough starting
// layout to swap around once that's settled.
const PLACEHOLDER_SPECS = [
  { label: "Weight", value: "TBD" },
  { label: "Engine", value: "TBD" },
  { label: "Power", value: "TBD" },
  { label: "0–100 km/h", value: "TBD" },
  { label: "Chassis", value: "TBD" },
  { label: "Drivetrain", value: "TBD" },
];

export function CarSpecs() {
  return (
    <section className="bg-background px-6 py-16 sm:py-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">
        <div className="mx-auto flex aspect-square w-full max-w-xs items-center justify-center border border-dashed border-white/20 bg-white/5 text-sm text-white/40 uppercase">
          Image placeholder
        </div>

        <div className="w-full lg:w-80">
          <p className="text-center text-sm font-bold tracking-wide text-brand uppercase lg:text-left">
            Spec Sheet
          </p>

          <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {PLACEHOLDER_SPECS.map((spec) => (
              <div key={spec.label} className="flex items-center justify-between py-3">
                <dt className="text-sm font-semibold tracking-wide text-white/60 uppercase">
                  {spec.label}
                </dt>
                <dd className="text-sm font-bold text-white">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto flex aspect-square w-full max-w-xs items-center justify-center border border-dashed border-white/20 bg-white/5 text-sm text-white/40 uppercase">
          Image placeholder
        </div>
      </div>
    </section>
  );
}
