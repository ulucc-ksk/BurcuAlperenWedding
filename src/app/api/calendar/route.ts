import { NextResponse } from "next/server";
import { weddingConfig, type WeddingEvent } from "@/config/wedding";

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function formatUtcDate(value: Date) {
  return value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function foldIcsLine(line: string) {
  const encoder = new TextEncoder();
  const foldedLines: string[] = [];
  let currentLine = "";
  let byteLimit = 75;

  for (const character of line) {
    if (encoder.encode(currentLine + character).length > byteLimit) {
      foldedLines.push(currentLine);
      currentLine = character;
      byteLimit = 74;
    } else {
      currentLine += character;
    }
  }

  foldedLines.push(currentLine);
  return foldedLines.join("\r\n ");
}

function buildCalendar(events: WeddingEvent[]) {
  const now = formatUtcDate(new Date());
  const eventLines = events.flatMap((eventItem) => {
    const start = new Date(`${eventItem.date}T${eventItem.time}:00+03:00`);
    const end = new Date(`${eventItem.date}T${eventItem.endTime}:00+03:00`);

    if (end <= start) {
      end.setDate(end.getDate() + 1);
    }
    const location = [eventItem.venue, eventItem.address].filter(Boolean).join(", ");

    return [
      "BEGIN:VEVENT",
      `UID:burcu-alperen-${eventItem.type}-20260919@davetiye`,
      `DTSTAMP:${now}`,
      `SUMMARY:${escapeIcsText(eventItem.calendarTitle)}`,
      `DESCRIPTION:${escapeIcsText(weddingConfig.common.invitationText)}`,
      `DTSTART:${formatUtcDate(start)}`,
      `DTEND:${formatUtcDate(end)}`,
      `LOCATION:${escapeIcsText(location)}`,
      "BEGIN:VALARM",
      "TRIGGER:-P7D",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeIcsText(`${eventItem.calendarTitle} bir hafta sonra`)}`,
      "END:VALARM",
      "END:VEVENT"
    ];
  });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Burcu Alperen Davetiye//TR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...eventLines,
    "END:VCALENDAR"
  ].map(foldIcsLine).join("\r\n") + "\r\n";
}

export function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type");
  const isCombined = type === "nikah_ve_dugun";
  const events = isCombined
    ? [weddingConfig.nikah, weddingConfig.dugun]
    : type === "nikah"
      ? [weddingConfig.nikah]
      : null;

  if (!events) {
    return NextResponse.json({ error: "Invalid calendar type." }, { status: 400 });
  }

  const filename = isCombined
    ? "burcu-alperen-nikah-ve-dugun.ics"
    : "burcu-alperen-nikah.ics";

  return new Response(buildCalendar(events), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store"
    }
  });
}

