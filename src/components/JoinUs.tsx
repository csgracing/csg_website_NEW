export function JoinUs() {
  return (
    <section className="flex min-h-[320px] flex-col items-center justify-center bg-white px-6 py-16 text-center text-[#0d0d0d]">
      <h2 className="text-3xl font-black tracking-tight uppercase sm:text-5xl">Want to join us?</h2>
      <p className="mt-4 text-black/60">Applications are closed now but check back later.</p>

      <button
        type="button"
        disabled
        className="mt-8 cursor-default border border-muted px-6 py-3 text-sm font-semibold tracking-wide text-muted uppercase"
      >
        Apply Now
      </button>
    </section>
  );
}
