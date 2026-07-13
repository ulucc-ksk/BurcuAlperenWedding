"use client";

import { useState } from "react";

type EnvelopeIntroProps = {
  envelopeText: string;
  coupleName: string;
  initials: string;
  onOpened: () => void;
};

export default function EnvelopeIntro({
  envelopeText,
  coupleName,
  initials,
  onOpened
}: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false);

  function openEnvelope() {
    if (isOpening) {
      return;
    }

    setIsOpening(true);
    window.setTimeout(onOpened, 850);
  }

  return (
    <section
      className={`envelope-intro ${isOpening ? "is-opening" : ""}`}
      aria-label={`${coupleName} davetiye zarfı`}
    >
      <div className="envelope-ornament envelope-ornament-left" aria-hidden="true" />
      <div className="envelope-ornament envelope-ornament-right" aria-hidden="true" />

      <button
        type="button"
        className="envelope-stage"
        aria-label={envelopeText}
        onClick={openEnvelope}
      >
        <span className="envelope-card-preview">
          <span className="preview-initials">{initials}</span>
          <span className="preview-line" />
        </span>

        <span className="premium-envelope" aria-hidden="true">
          <span className="envelope-back" />
          <span className="envelope-letter-shadow" />
          <span className="envelope-left-fold" />
          <span className="envelope-right-fold" />
          <span className="envelope-bottom-fold" />
          <span className="envelope-top-flap" />
          <span className="wax-seal">{initials}</span>
        </span>
      </button>

      <div className="mt-8 text-center">
        <p className="envelope-prompt">{envelopeText}</p>
      </div>
    </section>
  );
}
