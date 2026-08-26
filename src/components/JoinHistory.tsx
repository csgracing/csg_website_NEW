import Link from "next/link";

export function JoinHistory() {
  return (
    <section className="flex min-h-[320px] flex-col items-center justify-center bg-background px-6 py-16 text-center">
      <h2 className="text-3xl font-black tracking-tight uppercase sm:text-5xl">
        Want To Join Us And Make History Together?
      </h2>
      <p className="mt-4 text-white/70">Applications are open, take your first step onto the team.</p>

      <Link
        href="/contact-us#applications"
        className="mt-8 border border-brand px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-brand hover:text-white"
      >
        Apply Now
      </Link>
    </section>
  );
}
