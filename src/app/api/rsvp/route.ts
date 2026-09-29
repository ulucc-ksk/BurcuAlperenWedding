import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { success: false, error: "RSVP is closed. Thank you!" },
    { status: 410 }
  );
}
