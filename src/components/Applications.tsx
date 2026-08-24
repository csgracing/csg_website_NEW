import { SwirlDecoration } from "@/components/SwirlDecoration";

export function Applications() {
  return (
    <section
      id="applications"
      className="scroll-mt-[61px] relative overflow-hidden bg-white px-6 py-16 text-[#0d0d0d] sm:py-20"
    >
      <SwirlDecoration side="left" className="top-16 hidden lg:block" />
      <SwirlDecoration side="right" className="top-16 hidden lg:block" />
      <SwirlDecoration side="left" className="bottom-16 hidden lg:block" />
      <SwirlDecoration side="right" className="bottom-16 hidden lg:block" />
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-center text-sm font-bold tracking-wide text-brand uppercase">Recruitment</p>
        <h2 className="mt-2 text-center font-black tracking-tight uppercase">
          <span className="block text-3xl sm:text-5xl">Applications Aren&apos;t Open Yet</span>
          <span className="mt-1 block text-lg text-black/60 sm:text-2xl">For The 2026/27 Season</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-black/60">
          We&apos;re not accepting applications just yet, but they&apos;ll be opening soon. Check
          back here or follow us on social media for updates.
        </p>

        <div className="mt-12 flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              disabled
              className="cursor-not-allowed border border-brand/40 px-8 py-4 text-sm font-semibold tracking-wide text-black/40 uppercase opacity-60"
            >
              Applications Closed
            </button>
          </div>

          <div className="flex w-full max-w-xl flex-col items-center border border-dashed border-black/20 bg-black/5 p-8 text-center">
            <p className="text-lg font-bold uppercase">Don&apos;t know which department is best for your skills?</p>
            <p className="mt-3 text-sm text-black/60">
              Take a look at how the team is structured, what each department does and where you might
              fit in.
            </p>
            <a
              href="/documents/csg-racing-team-structure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 border border-brand px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-brand"
            >
              Click Here
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
