import { NextResponse } from "next/server";

type RsvpPayload = {
  invitationCode?: unknown;
  invitationType?: unknown;
  fullName?: unknown;
  dugunGuestCount?: unknown;
};

const invitationTypes = new Set(["nikah", "nikah_ve_dugun"]);

export async function POST(request: Request) {
  const endpoint = process.env.GOOGLE_SHEETS_WEB_APP_URL;
  const webhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  if (!endpoint || !webhookSecret) {
    return NextResponse.json(
      { success: false, error: "Google Sheets connection is not configured." },
      { status: 503 }
    );
  }

  let payload: RsvpPayload;

  try {
    payload = (await request.json()) as RsvpPayload;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const fullName = typeof payload.fullName === "string" ? payload.fullName.trim() : "";
  const invitationCode =
    typeof payload.invitationCode === "string" ? payload.invitationCode.trim() : "";
  const invitationType =
    typeof payload.invitationType === "string" ? payload.invitationType : "";
  const count =
    payload.dugunGuestCount === null
      ? null
      : typeof payload.dugunGuestCount === "number"
        ? payload.dugunGuestCount
        : Number.NaN;

  const isValid =
    fullName.length >= 2 &&
    fullName.length <= 120 &&
    invitationCode.length >= 1 &&
    invitationCode.length <= 100 &&
    invitationTypes.has(invitationType) &&
    (count === null || (Number.isInteger(count) && count >= 0 && count <= 20));

  if (!isValid) {
    return NextResponse.json({ success: false, error: "Invalid form values." }, { status: 400 });
  }

  try {
    const sheetsResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: webhookSecret,
        invitationCode,
        invitationType,
        fullName,
        dugunGuestCount: count
      }),
      cache: "no-store",
      redirect: "follow"
    });

    const result = (await sheetsResponse.json()) as { success?: boolean; error?: string };

    if (!sheetsResponse.ok || !result.success) {
      throw new Error(result.error || "Google Sheets rejected the request.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP Google Sheets error:", error);
    return NextResponse.json(
      { success: false, error: "The response could not be saved." },
      { status: 502 }
    );
  }
}

