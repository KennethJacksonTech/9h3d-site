"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { GONZO_CONTENT_API, GONZO_CONTENT_ORG } from "@/lib/gonzo";
import {
  isPlausibleEmail,
  subscribeErrorMessage,
  type ResolvedNewsletter,
} from "@/lib/newsletter";

type Status = "idle" | "sending" | "success" | "error";

/**
 * "Join Our Mailing List" band. Logic ported from itK-SiteKit `db7776e`
 * (`newsletter-section.tsx`), skinned to this site's Sanctuary Light palette.
 *
 * Renders only when the caller passes a resolved config — see
 * resolveNewsletter(), which gates on the org having authored a header in
 * Gonzo. The header and body come from the server component at build time; the
 * submit runs in the browser, which is what lets this work under
 * `output: "export"`.
 *
 * POST {apiBase}/api/newsletter/{orgSlug}/subscribe
 *   { email, first_name?, last_name?, source_page?, website }
 *   200 {ok:true} · 400 {ok:false,error} · 429
 */
const INPUT_CLASS =
  "w-full bg-surface-primary border border-border-subtle rounded-lg px-4 py-3 font-body text-[15px] text-fg-primary placeholder:text-fg-secondary/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors";

export default function NewsletterSection({
  config,
}: {
  config: ResolvedNewsletter;
}) {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    // Honeypot: bots fill every field they find. Humans never see this one, so
    // a non-empty value means bot — show the success state and send nothing,
    // so the bot gets no signal that it was caught.
    const website =
      (
        e.currentTarget.elements.namedItem(
          "website",
        ) as HTMLInputElement | null
      )?.value || "";
    if (website.trim() !== "") {
      setStatus("success");
      return;
    }

    if (!isPlausibleEmail(email)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch(
        `${GONZO_CONTENT_API}/api/newsletter/${GONZO_CONTENT_ORG}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            ...(config.fields.firstName && firstName.trim()
              ? { first_name: firstName.trim() }
              : {}),
            ...(config.fields.lastName && lastName.trim()
              ? { last_name: lastName.trim() }
              : {}),
            source_page: pathname || "/",
            website: "",
          }),
        },
      );

      if (res.ok) {
        setStatus("success");
        return;
      }
      const body = (await res.json().catch(() => null)) as {
        error?: unknown;
      } | null;
      setError(subscribeErrorMessage(res.status, body?.error));
      setStatus("error");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section
      className="bg-surface-secondary py-20 md:py-24 px-6"
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-xl mx-auto text-center">
        <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent mb-4">
          Stay Connected
        </p>
        <h2
          id="newsletter-heading"
          className="font-heading text-[36px] md:text-[42px] font-bold text-fg-primary mb-4"
        >
          {config.header}
        </h2>
        {config.body && (
          <p className="font-body text-[17px] text-fg-secondary leading-[1.7] mb-10">
            {config.body}
          </p>
        )}

        {status === "success" ? (
          <p
            className="font-body text-[17px] text-fg-primary leading-[1.7]"
            role="status"
          >
            You&rsquo;re on the list. Thank you for joining us.
          </p>
        ) : (
          <form
            className="flex flex-col gap-3 text-left"
            onSubmit={handleSubmit}
            noValidate
          >
            {config.fields.firstName && (
              <label>
                <span className="sr-only">First name</span>
                <input
                  type="text"
                  name="first_name"
                  autoComplete="given-name"
                  placeholder="First name"
                  value={firstName}
                  onChange={(ev) => setFirstName(ev.target.value)}
                  className={INPUT_CLASS}
                />
              </label>
            )}
            {config.fields.lastName && (
              <label>
                <span className="sr-only">Last name</span>
                <input
                  type="text"
                  name="last_name"
                  autoComplete="family-name"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(ev) => setLastName(ev.target.value)}
                  className={INPUT_CLASS}
                />
              </label>
            )}
            <label>
              <span className="sr-only">Email address</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(ev) => {
                  setEmail(ev.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setError(null);
                  }
                }}
                aria-invalid={status === "error" || undefined}
                aria-describedby={error ? "newsletter-error" : undefined}
                className={INPUT_CLASS}
              />
            </label>

            {/* Honeypot. Visually hidden rather than display:none — some bots
                skip fields that are obviously not rendered. Never focusable. */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="newsletter-website">Website</label>
              <input
                id="newsletter-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 bg-accent text-white font-body text-[14px] font-semibold tracking-[1px] px-6 py-3 rounded-lg hover:bg-accent-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Subscribing…" : config.ctaLabel}
            </button>

            {error && (
              <p
                id="newsletter-error"
                role="alert"
                className="font-body text-[14px] text-[var(--color-error)]"
              >
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
