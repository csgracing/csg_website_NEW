import { NextResponse } from "next/server";
import { Resend } from "resend";

const TEAM_EMAIL = "team@csg.racing";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email sending isn't configured yet" }, { status: 501 });
  }

  const body = await request.json();
  const { type, name, email, reason, message } = body as {
    type: "application" | "enquiry";
    name?: string;
    email?: string;
    reason?: string;
    message?: string;
  };

  const subject = type === "application" ? "New application via csg.racing" : "New enquiry via csg.racing";

  const lines = [
    name && `Name: ${name}`,
    email && `Email: ${email}`,
    reason && `Reason: ${reason}`,
    message && `Message: ${message}`,
  ].filter(Boolean);

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "CSG Racing Website <onboarding@resend.dev>",
      to: TEAM_EMAIL,
      replyTo: email || undefined,
      subject,
      text: lines.length > 0 ? lines.join("\n") : "No additional details submitted.",
    });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
