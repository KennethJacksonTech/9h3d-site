import type { NewsletterSettings } from "./gonzo";

/**
 * Mailing-list section resolution + validation. Ported from itK-SiteKit
 * `db7776e` (`src/lib/newsletter.ts`) so the gate behaves identically across
 * the fleet. Pure and separate from rendering so it stays inspectable.
 */

/** Which optional name inputs the org's form asks for. `email` is implicit. */
export interface NewsletterFields {
  firstName: boolean;
  lastName: boolean;
}

export interface ResolvedNewsletter {
  header: string;
  body?: string;
  ctaLabel: string;
  fields: NewsletterFields;
}

/** Fallback when the org left the CTA blank. The column defaults to
 *  "Subscribe" fleet-wide, so this is belt-and-braces. */
const DEFAULT_CTA_LABEL = "Subscribe";

/**
 * The render gate. Returns null — meaning render nothing — unless the org has
 * authored a mailing-list HEADER.
 *
 * Gate on the header specifically, and on falsiness:
 *
 *  - NOT `newsletter_cta_label` or `newsletter_fields`: both carry column
 *    defaults ("Subscribe" / ["email"]) on EVERY org, so they are non-empty
 *    fleet-wide and cannot distinguish an opted-in org from an untouched one.
 *  - Falsy, not `!== null`: the Gonzo Settings editor can write an empty
 *    string, which round-trips as `""`. Clearing the field in the admin must
 *    switch the section OFF, so `""` has to gate the same as null.
 *    Whitespace-only is treated as empty for the same reason.
 */
export function resolveNewsletter(
  settings: NewsletterSettings,
): ResolvedNewsletter | null {
  const header = settings.newsletter_header?.trim();
  if (!header) return null;

  const raw = Array.isArray(settings.newsletter_fields)
    ? settings.newsletter_fields
    : [];
  const asked = new Set(raw.filter((f): f is string => typeof f === "string"));

  return {
    header,
    body: settings.newsletter_body?.trim() || undefined,
    ctaLabel: settings.newsletter_cta_label?.trim() || DEFAULT_CTA_LABEL,
    fields: {
      firstName: asked.has("first_name"),
      lastName: asked.has("last_name"),
    },
  };
}

/**
 * Browser-side email sanity check only — the server is the authority and its
 * 400 body is what the user actually sees on rejection. This exists to avoid a
 * pointless round trip on an obviously empty or malformed value, not to
 * re-implement RFC 5322.
 */
export function isPlausibleEmail(value: string): boolean {
  const v = value.trim();
  if (v.length < 3 || v.length > 254) return false;
  if (/\s/.test(v)) return false;
  const at = v.indexOf("@");
  if (at < 1 || at !== v.lastIndexOf("@")) return false;
  const domain = v.slice(at + 1);
  return domain.includes(".") && !domain.startsWith(".") && !domain.endsWith(".");
}

/** Map a subscribe-endpoint response to the message the user should see.
 *  Contract: 200 {ok:true} · 400 {ok:false,error} · 429 · 404. */
export function subscribeErrorMessage(
  status: number,
  serverError?: unknown,
): string {
  if (status === 429) return "Too many attempts — please try again shortly.";
  if (status === 400 && typeof serverError === "string" && serverError.trim()) {
    return serverError.trim();
  }
  return "Something went wrong. Please try again.";
}
