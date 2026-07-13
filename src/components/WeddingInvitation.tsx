"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { weddingConfig, type WeddingEvent } from "@/config/wedding";
import EnvelopeIntro from "@/components/EnvelopeIntro";

type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type WeddingInvitationProps = {
  title: string;
  envelopeText: string;
  countdownTitle: string;
  countdownEvent: WeddingEvent;
  events: WeddingEvent[];
  rsvpPath?: string;
  calendarPath?: string;
};

const navigationItems = [
  { label: "Ana Sayfa", href: "#ana-sayfa" },
  { label: "Detaylar", href: "#detaylar" }
];

function getEventDate(event: WeddingEvent) {
  return new Date(`${event.date}T${event.time}:00+03:00`);
}

function getCountdown(targetDate: Date): CountdownValue {
  const difference = Math.max(targetDate.getTime() - Date.now(), 0);

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60)
  };
}

function formatTime(event: WeddingEvent) {
  return event.time.replace(":", ".");
}

export default function WeddingInvitation({
  title,
  envelopeText,
  countdownTitle,
  countdownEvent,
  events,
  rsvpPath,
  calendarPath
}: WeddingInvitationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const countdownDate = useMemo(() => getEventDate(countdownEvent), [countdownEvent]);
  const [countdown, setCountdown] = useState<CountdownValue | null>(null);

  useEffect(() => {
    setCountdown(getCountdown(countdownDate));

    const timer = window.setInterval(() => {
      setCountdown(getCountdown(countdownDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [countdownDate]);

  if (!isInvitationOpen) {
    return (
      <EnvelopeIntro
        envelopeText={envelopeText}
        coupleName={weddingConfig.couple.displayName}
        initials={weddingConfig.couple.initials}
        onOpened={() => setIsInvitationOpen(true)}
      />
    );
  }

  return (
    <main className="invitation-page relative min-h-screen overflow-hidden text-umber">
      <div className="floral-wash pointer-events-none absolute inset-0" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pb-12 pt-4 sm:px-6 lg:px-8 lg:pb-16">
        <Header
          isMenuOpen={isMenuOpen}
          rsvpPath={rsvpPath}
          onMenuToggle={() => setIsMenuOpen((value) => !value)}
        />

        <section
          id="ana-sayfa"
          className="grid min-h-[calc(100vh-6rem)] scroll-mt-24 items-center gap-8 py-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12 lg:py-10"
        >
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-gold">
              {title}
            </p>
            <p className="mt-5 font-serif text-base uppercase tracking-[0.22em] text-mocha/75">
              {weddingConfig.common.fullDate}
            </p>
            <h1 className="script-title mx-auto mt-4 max-w-2xl text-6xl leading-[0.9] text-umber sm:text-7xl lg:mx-0 lg:text-8xl">
              {weddingConfig.couple.bride}
              <span className="mx-2 text-gold">&</span>
              {weddingConfig.couple.groom}
            </h1>
            <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3 text-gold lg:mx-0 lg:justify-start">
              <span className="h-px flex-1 bg-gold/45" />
              <span className="divider-mark" aria-hidden="true" />
              <span className="h-px flex-1 bg-gold/45" />
            </div>
            <p className="mx-auto mt-6 max-w-md font-serif text-xl leading-8 text-mocha lg:mx-0">
              {weddingConfig.common.invitationText}
            </p>

            <Countdown title={countdownTitle} countdown={countdown} />

            {rsvpPath || calendarPath ? (
              <div className="mt-7 grid gap-3 sm:mx-auto sm:max-w-sm lg:mx-0">
                {rsvpPath ? (
                  <ActionLink id="katilim" href={rsvpPath} variant="primary">
                    {weddingConfig.labels.rsvp}
                  </ActionLink>
                ) : null}
                {calendarPath ? (
                  <ActionLink href={calendarPath} variant="secondary" newTab>
                    {weddingConfig.labels.calendar}
                  </ActionLink>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="order-1 lg:order-2">
            <div className="hero-art-frame mx-auto w-full max-w-[22rem] sm:max-w-[28rem] lg:max-w-[34rem]">
              <Image
                src={weddingConfig.common.artworkPath}
                alt={weddingConfig.common.artworkAlt}
                width={1024}
                height={1536}
                priority
                sizes="(max-width: 768px) 92vw, 44vw"
                className="hero-art-image"
              />
            </div>
          </div>
        </section>

        <section id="detaylar" className="scroll-mt-24 py-10 lg:py-14">
          <SectionHeading eyebrow="Davetiye Detayları" title={title} />
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-2">
            {events.map((event) => (
              <EventCard key={event.type} event={event} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Header({
  isMenuOpen,
  rsvpPath,
  onMenuToggle
}: {
  isMenuOpen: boolean;
  rsvpPath?: string;
  onMenuToggle: () => void;
}) {
  return (
    <header className="sticky top-3 z-40 rounded-[22px] border border-gold/25 bg-cream/82 px-4 py-3 shadow-soft backdrop-blur-xl lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <a href="#ana-sayfa" className="font-serif text-3xl leading-none text-gold" aria-label="Ana sayfa">
          B<span className="-mx-1 text-xl">&</span>A
        </a>

        <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-umber/78 lg:flex">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        {rsvpPath ? (
          <a
            href={rsvpPath}
            className="rsvp-attention hidden rounded-full border-2 border-[#7a2638] bg-gold px-5 py-3 text-sm font-semibold text-white shadow-button transition hover:-translate-y-0.5 hover:bg-bronze focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:inline-flex"
          >
            {weddingConfig.labels.rsvp}
          </a>
        ) : null}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-white/45 text-umber lg:hidden"
          aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={isMenuOpen}
          onClick={onMenuToggle}
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
          </span>
        </button>
      </div>

      {isMenuOpen ? (
        <nav className="mt-4 grid gap-2 border-t border-gold/20 pt-4 text-sm font-semibold text-umber lg:hidden">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-3 py-2 hover:bg-white/55">
              {item.label}
            </a>
          ))}
          {rsvpPath ? (
            <a href={rsvpPath} className="rsvp-attention rounded-full border-2 border-[#7a2638] bg-gold px-4 py-3 text-center text-white">
              {weddingConfig.labels.rsvp}
            </a>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}

function Countdown({ title, countdown }: { title: string; countdown: CountdownValue | null }) {
  const items = [
    ["Gün", countdown?.days],
    ["Saat", countdown?.hours],
    ["Dakika", countdown?.minutes],
    ["Saniye", countdown?.seconds]
  ];

  return (
    <section id="geri-sayim" className="mx-auto mt-8 max-w-xl lg:mx-0" aria-label={title}>
      <h2 className="font-serif text-2xl text-mocha">{title}</h2>
      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
        {items.map(([label, value]) => (
          <div key={label} className="countdown-card">
            <div className="font-serif text-3xl leading-none text-umber sm:text-4xl">
              {typeof value === "number" ? String(value).padStart(2, "0") : "--"}
            </div>
            <div className="mt-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-mocha/70 sm:text-[10px]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EventCard({ event }: { event: WeddingEvent }) {
  return (
    <article className="event-card">
      <div className="flex items-start gap-4">
        <div className="event-icon" aria-hidden="true">
          {event.title.slice(0, 1)}
        </div>
        <div>
          <h3 className="font-serif text-4xl italic text-umber">{event.title}</h3>
          <dl className="mt-5 space-y-4 text-base leading-7 text-mocha sm:text-[17px]">
            <EventDetail label="Tarih" value={event.displayDate} />
            <EventDetail label="Saat" value={formatTime(event)} />
            <EventDetail label="Mekan" value={event.venue} />
            {event.address ? <EventDetail label="Adres" value={event.address} /> : null}
          </dl>
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-gold/45 bg-white/45 px-5 text-[15px] font-semibold text-umber transition hover:-translate-y-0.5 hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {weddingConfig.labels.directions}
          </a>
        </div>
      </div>
    </article>
  );
}

function EventDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl uppercase tracking-[0.08em] text-umber sm:text-5xl">{title}</h2>
      <div className="mx-auto mt-4 flex max-w-[14rem] items-center justify-center gap-3 text-gold">
        <span className="h-px flex-1 bg-gold/45" />
        <span className="divider-mark" aria-hidden="true" />
        <span className="h-px flex-1 bg-gold/45" />
      </div>
    </div>
  );
}

function ActionLink({
  id,
  href,
  children,
  variant,
  newTab = false
}: {
  id?: string;
  href: string;
  children: ReactNode;
  variant: "primary" | "secondary";
  newTab?: boolean;
}) {
  const className =
    variant === "primary"
      ? "rsvp-attention border-2 border-[#7a2638] bg-gold text-white shadow-button hover:bg-bronze"
      : "border border-gold/55 bg-white/42 text-umber hover:bg-white/70";

  return (
    <a
      id={id}
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
      className={`inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${className}`}
    >
      {children}
    </a>
  );
}
