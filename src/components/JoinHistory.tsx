export function JoinHistory() {
  return (
    <section className="flex min-h-[320px] flex-col items-center justify-center bg-background px-6 py-16 text-center">
      <h2 className="text-3xl font-black tracking-tight uppercase sm:text-5xl">
        Want To Join Us And Make History Together?
      </h2>
      <p className="mt-4 text-white/70">Applications aren&apos;t open yet, but they&apos;ll be opening soon.</p>

      <span
        aria-disabled="true"
        className="mt-8 cursor-not-allowed border border-brand/40 px-6 py-3 text-sm font-semibold tracking-wide text-white/40 uppercase opacity-60"
      >
        Applications Closed
      </span>
    </section>
  );
}
