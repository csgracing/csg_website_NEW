import { getStats } from "@/lib/data";

export function Stats() {
  const stats = getStats();

  return (
    <section className="border-b border-brand/40 bg-background px-6 pb-12">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-x-12 gap-y-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-3">
            <span className="text-6xl font-black text-brand/40 sm:text-7xl">{stat.value}</span>
            <span className="text-sm font-semibold tracking-wide text-foreground uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
