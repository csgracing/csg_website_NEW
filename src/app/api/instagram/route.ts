import { NextResponse } from "next/server";

// Placeholder route for proxying Instagram content (e.g. latest posts feed).
// Once we have API access, fetch from here using a token stored in
// process.env.INSTAGRAM_ACCESS_TOKEN (see .env.local.example) so the
// token never reaches the client.
export async function GET() {
  return NextResponse.json(
    { error: "Instagram integration not yet implemented" },
    { status: 501 },
  );
}
