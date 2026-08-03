import type { MetadataRoute } from "next";

/**
 * Canonical production host. Apex is canonical (www 308 -> apex).
 * Read from the environment when present, but always trimmed and stripped of a
 * trailing slash — a trailing newline on a Vercel env var silently corrupts
 * every absolute URL built from it.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://9h3d.com"
).replace(/\/+$/, "");

/**
 * This app is a static export (`output: "export"`) with `trailingSlash: true`,
 * so every <loc> carries a trailing slash — the un-slashed form eats a 308
 * before it resolves.
 *
 * Static routes only. Gonzo-fed content (blog posts, gallery) is fetched at
 * runtime on the client and has no prerendered URL of its own, so there is
 * nothing crawlable to enumerate here. `/blog/post/` is a query-string shell
 * (`?slug=`), not a real page, and is deliberately excluded.
 */
const ROUTES = ["/", "/about", "/gallery", "/videos", "/blog", "/contact"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}/`,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
