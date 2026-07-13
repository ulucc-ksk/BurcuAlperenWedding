"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { weddingConfig, type WeddingEvent } from "@/config/wedding";

type RsvpFormProps = {
  title: string;
  invitationCode: string;
  events: WeddingEvent[];
  backHref: string;
};

type FormState = {
  fullName: string;
  counts: Record<string, string>;
};

export default function RsvpForm({ title, invitationCode, events, backHref }: RsvpFormProps) {
  const attendanceEvents = events.filter((eventItem) => eventItem.type === "dugun");
  const [formState, setFormState] = useState<FormState>(() => ({
    fullName: "",
    counts: Object.fromEntries(attendanceEvents.map((eventItem) => [eventItem.type, "1"]))
  }));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  function updateCount(eventType: string, value: string) {
    setFormState((current) => ({
      ...current,
      counts: {
        ...current.counts,
        [eventType]: value
      }
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    const dugunCount = formState.counts.dugun;

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitationCode,
          invitationType: events.length > 1 ? "nikah_ve_dugun" : "nikah",
          fullName: formState.fullName,
          dugunGuestCount: dugunCount === undefined ? null : Number(dugunCount)
        })
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("RSVP submission failed");
      }

      setIsSubmitted(true);
    } catch {
      setSubmissionError(
        "Kat\u0131l\u0131m bilginiz kaydedilemedi. L\u00fctfen tekrar deneyin."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 text-umber sm:px-6 lg:px-8">
      <div className="floral-wash pointer-events-none absolute inset-0" />
      <section className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-3xl items-center">
        <div className="rsvp-card w-full p-6 sm:p-8 lg:p-10">
          <a
            href={backHref}
            className="inline-flex text-sm font-semibold text-gold transition hover:text-bronze"
          >
            {weddingConfig.labels.backToInvitation}
          </a>

          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
            Katılım Bilgisi
          </p>
          <h1 className="mt-3 font-serif text-4xl text-umber sm:text-5xl">{title}</h1>
          <p className="mt-4 font-serif text-xl leading-8 text-mocha">
            Lütfen katılım bilginizi aşağıdaki kısa form ile paylaşın.
          </p>

          {!isSubmitted ? (
            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  İsim Soyisim
                </span>
                <input
                  required
                  type="text"
                  value={formState.fullName}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, fullName: event.target.value }))
                  }
                  className="rsvp-input"
                  placeholder="İsim Soyisim"
                />
              </label>

              {attendanceEvents.map((eventItem) => (
                <label key={eventItem.type} className="grid gap-2 text-left">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    {events.length === 1
                      ? "Kaç kişi katılacak?"
                      : `${eventItem.title} için kişi sayısı`}
                  </span>
                  <input
                    required
                    min="0"
                    max="20"
                    type="number"
                    inputMode="numeric"
                    value={formState.counts[eventItem.type] ?? "1"}
                    onChange={(inputEvent) => updateCount(eventItem.type, inputEvent.target.value)}
                    className="rsvp-input"
                  />
                </label>
              ))}

              {submissionError ? (
                <p
                  role="alert"
                  className="rounded-2xl border border-red-900/15 bg-white/45 p-4 text-center text-sm text-red-900"
                >
                  {submissionError}
                </p>
              ) : null}

              <button
                disabled={isSubmitting}
                type="submit"
                className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-white shadow-button transition hover:-translate-y-0.5 hover:bg-bronze focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "G\u00f6nderiliyor..." : weddingConfig.labels.rsvp}
              </button>
            </form>
          ) : (
            <div className="mt-8 rounded-[18px] border border-gold/25 bg-white/45 p-5 text-center shadow-soft sm:p-7">
              <p className="font-serif text-2xl leading-9 text-umber">
                Katılım bilgisi için teşekkür ederiz, takviminize eklemek için buraya tıklayın
              </p>
              <CalendarOptions
                calendarHref={`/api/calendar?type=${events.length > 1 ? "nikah_ve_dugun" : "nikah"}`}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );

}
function CalendarOptions({ calendarHref }: { calendarHref: string }) {
  return (
    <div className="mt-6">
      <a
        href={calendarHref}
        target="_blank"
        rel="noreferrer"
        download
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-white shadow-button transition hover:-translate-y-0.5 hover:bg-bronze focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        {weddingConfig.labels.calendar}
      </a>
    </div>
  );
}