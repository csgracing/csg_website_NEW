import { NextResponse } from "next/server";
import { Resend } from "resend";

const TEAM_EMAIL = "enquiries@csg.racing";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email sending isn't configured yet" }, { status: 501 });
  }

  const body = await request.json();
  const { name, email, reason, message } = body as {
    name?: string;
    email?: string;
    reason?: string;
    message?: string;
  };

  const subject = "New enquiry via csg.racing";

  const lines = [
    name && `Name: ${name}`,
    email && `Email: ${email}`,
    reason && `Reason: ${reason}`,
    message && `Message: ${message}`,
  ].filter(Boolean);

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "CSG Racing Website <noreply@csg.racing>",
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
