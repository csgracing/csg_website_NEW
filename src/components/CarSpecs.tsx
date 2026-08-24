import Image from "next/image";

const PLACEHOLDER_SPECS = [
  { label: "Weight", value: "250 kg" },
  { label: "Motor", value: "ME1616" },
  { label: "Power", value: "51 kW" },
  { label: "Torque", value: "120 Nm peak" },
  { label: "Acceleration", value: "4.84 s" },
];

export function CarSpecs() {
  return (
    <section className="bg-background px-6 py-16 sm:py-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">
        <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden">
          <Image src="/images/cars/workshop-1.jpg" alt="Team working on the car in the workshop" fill style={{ objectFit: "cover" }} />
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

        <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden">
          <Image src="/images/cars/workshop-2.jpg" alt="Team member assembling the car chassis" fill style={{ objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
}
