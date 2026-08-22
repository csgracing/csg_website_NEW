import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "Instagram integration not yet implemented" },
    { status: 501 },
  );
}
