"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchSiteSettings, type CtaSection as CtaData } from "@/lib/gonzo";

/**
 * Home-page CTA banner, driven by Gonzo's editable `cta_section`
 * (GET /settings). Fetched client-side so edits go live with no rebuild
 * (the site is `output: "export"`). Starts with the current static copy as a
 * graceful fallback — so the export shell and any fetch failure still show a
 * sensible banner — then swaps to Gonzo's copy on load. Hides entirely once a
 * fetch resolves with no headline.
 */
const FALLBACK: CtaData = {
  headline: "Called to Create",
  body: "Interested in commissioning a painting or attending a workshop? Karen would love to hear from you.",
  button_label: "Get in Touch",
  button_url: "/contact",
};

const BTN_CLASS =
  "inline-block bg-accent-secondary text-fg-primary font-body text-[14px] font-semibold tracking-[1px] px-6 py-3 rounded-lg hover:opacity-90 transition-opacity";

export default function CtaSection() {
  const [cta, setCta] = useState<CtaData | null>(FALLBACK);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchSiteSettings()
      .then((s) => setCta(s.cta_section ?? null))
      .catch(() => {
        /* keep the fallback copy on error */
      })
      .finally(() => setLoaded(true));
  }, []);

  // Hide the whole section once Gonzo resolves with no usable headline.
  if (loaded && (!cta || !cta.headline)) return null;
  if (!cta?.headline) return null;

  const hasButton = Boolean(cta.button_label && cta.button_url);
  const isInternal = hasButton && cta.button_url!.startsWith("/");

  return (
    <section className="bg-surface-inverse py-20 md:py-24 px-6 text-center">
      {cta.eyebrow && (
        <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent-secondary mb-4">
          {cta.eyebrow}
        </p>
      )}
      <h2 className="font-heading text-[36px] md:text-[42px] font-bold text-fg-inverse mb-4">
        {cta.headline}
      </h2>
      {cta.body && (
        <p className="font-body text-[17px] text-border-subtle max-w-xl mx-auto leading-[1.7] mb-10">
          {cta.body}
        </p>
      )}
      {hasButton &&
        (isInternal ? (
          <Link href={cta.button_url!} className={BTN_CLASS}>
            {cta.button_label}
          </Link>
        ) : (
          <a href={cta.button_url!} className={BTN_CLASS}>
            {cta.button_label}
          </a>
        ))}
    </section>
  );
}
