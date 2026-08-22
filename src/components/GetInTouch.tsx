"use client";

import { useState, type FormEvent } from "react";

const REASONS = ["Sponsoring Us", "Enquiries", "Learn More", "Other"];

const inputClass =
  "w-full border border-black/20 bg-transparent px-4 py-2 text-sm text-[#0d0d0d] placeholder:text-black/40 focus:border-brand focus:outline-none";

type Status = "idle" | "sending" | "sent" | "error";

export function GetInTouch() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "enquiry",
          name: form.get("name"),
          email: form.get("email"),
          reason: form.get("reason"),
          message: form.get("message"),
        }),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="get-in-touch" className="scroll-mt-[61px] bg-white px-6 py-16 text-[#0d0d0d] sm:py-20">
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-center text-sm font-bold tracking-wide text-brand uppercase">Contact Us</p>
        <h2 className="mt-2 text-center text-3xl font-black tracking-tight uppercase sm:text-5xl">Get In Touch</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-black/60">
          Whether you want to sponsor us, ask a question, or just learn more about the team, drop us a
          line below.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
          <input type="text" name="name" placeholder="Full name" required className={inputClass} />
          <input type="email" name="email" placeholder="Email address" required className={inputClass} />
          <select name="reason" defaultValue="" required className={inputClass}>
            <option value="" disabled>
              What&apos;s this about?
            </option>
            {REASONS.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
          <textarea name="message" placeholder="Your message" rows={4} required className={inputClass} />

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 self-start border border-brand px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-brand disabled:cursor-default disabled:opacity-60 disabled:hover:bg-transparent"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "sent" && <p className="text-sm text-black/60">Thanks, your message has been sent!</p>}
          {status === "error" && (
            <p className="text-sm text-black/60">Something went wrong, please try again shortly.</p>
          )}
        </form>
      </div>
    </section>
  );
}
