/**
 * Gonzo CMS API — forms subset.
 * Adapted from itK-SiteKit/src/lib/gonzo.ts.
 */

const API_URL = process.env.GONZO_API_URL || "https://gonzo.kennethjackson.tech";
const ORG_SLUG = process.env.GONZO_ORG_SLUG || "";

export const GONZO_API_BASE = API_URL;
export const GONZO_ORG_SLUG = ORG_SLUG;

export interface GonzoFormField {
  id: string;
  type: string;
  label: string;
  slug: string;
  placeholder?: string;
  required: boolean;
  width: "full" | "half";
  default_value?: string;
  options?: string[];
}

export interface GonzoFormDef {
  name: string;
  slug: string;
  fields: GonzoFormField[];
  settings: {
    submit_label?: string;
    success_message?: string;
    honeypot?: boolean;
    success_redirect?: string;
  };
}

export async function getForm(formSlug: string): Promise<GonzoFormDef | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/public/forms/${ORG_SLUG}/${formSlug}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { form?: GonzoFormDef };
    return data.form ?? null;
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Gallery (content) API                                                       */
/* -------------------------------------------------------------------------- */
/**
 * The gallery is fetched CLIENT-SIDE on a fully static export (next.config
 * `output: "export"`), so Karen's edits in Gonzo appear immediately with no
 * rebuild. These must be client-safe values: a static export inlines only
 * `NEXT_PUBLIC_*` env vars at build time, so we default to a constant.
 * Single-tenant site → org slug is hardcoded to `walter-wolfram`.
 */
const GONZO_CONTENT_API =
  process.env.NEXT_PUBLIC_GONZO_API || "https://gonzo.kennethjackson.tech";
const GONZO_CONTENT_ORG =
  process.env.NEXT_PUBLIC_GONZO_ORG || "walter-wolfram";

interface GonzoGalleryListItem {
  title: string;
  slug: string;
}

interface GonzoGalleryPhoto {
  url: string;
  caption: string | null;
  sort_order: number | null;
  artwork_title: string | null;
  medium: string | null;
  focal_x: number | null;
  focal_y: number | null;
}

/** One painting, mapped into the shape the gallery/home grids expect. */
export interface GalleryPainting {
  key: string;
  collection: string;
  title: string;
  medium: string;
  imageUrl: string;
  alt: string;
  /** Crop focal point as percentages (default 50/50 = centered). */
  focalX: number;
  focalY: number;
}

/** A collection (Gonzo gallery) and its paintings, in sort order. */
export interface GalleryGroup {
  title: string;
  slug: string;
  paintings: GalleryPainting[];
}

/**
 * Derive a display title from the image filename when Gonzo has no
 * artwork_title or caption set (God's Work currently has neither). Strips the
 * storage hash prefix, file extension, size qualifiers (-hd/-web/-suggestions),
 * and the artist's name, then title-cases. Karen can override any title by
 * setting a caption in Gonzo.
 */
function titleFromUrl(url: string): string {
  const file = url.split("/").pop() ?? "";
  return file
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/^[0-9a-f]{6,}-/i, "")
    .replace(/-(hd|web|suggestions)$/i, "")
    .replace(/-?karen-wolfram-?/i, "-")
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .trim();
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Gonzo fetch failed (${res.status}): ${url}`);
  return res.json() as Promise<T>;
}

/* -------------------------------------------------------------------------- */
/* Blog posts (content) API                                                    */
/* -------------------------------------------------------------------------- */
/**
 * Shape matches the Gonzo content API (same as itK-SiteKit's `Post`). List and
 * detail return the same object; the list may omit `content_html`.
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_html?: string;
  featured_image_url: string | null;
  /** Crop focal point as percentages (default 50/50 = centered). */
  featured_image_focal?: { x: number; y: number };
  category: { name: string; slug: string } | null;
  tags: string[];
  author: string | null;
  published_at: string;
  reading_time: number;
  seo?: { title?: string; description?: string; og_image_url?: string };
}

/**
 * Fetch published posts (newest first per the API). Used both client-side by
 * the blog index (live, no rebuild) and at build time by the detail route's
 * generateStaticParams.
 */
export async function fetchPosts(limit = 100): Promise<BlogPost[]> {
  const data = await fetchJson<{ posts: BlogPost[] }>(
    `${GONZO_CONTENT_API}/api/content/${GONZO_CONTENT_ORG}/posts?limit=${limit}`,
  );
  return data.posts ?? [];
}

/** Fetch a single post by slug, or null if it doesn't exist. */
export async function fetchPost(slug: string): Promise<BlogPost | null> {
  try {
    const data = await fetchJson<{ post: BlogPost }>(
      `${GONZO_CONTENT_API}/api/content/${GONZO_CONTENT_ORG}/posts/${slug}`,
    );
    return data.post ?? null;
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Site settings (editable CTA section)                                        */
/* -------------------------------------------------------------------------- */
/** Editable home-page CTA banner, managed in Gonzo. */
export interface CtaSection {
  eyebrow?: string;
  headline?: string;
  body?: string;
  button_label?: string;
  button_url?: string;
}

/**
 * Read the org's public settings from Gonzo (client-side, live — no rebuild).
 * Returns an empty object on any failure so callers can fall back gracefully.
 */
export async function fetchSiteSettings(): Promise<
  { cta_section?: CtaSection } & Record<string, unknown>
> {
  try {
    const d = await fetchJson<{ settings?: Record<string, unknown> }>(
      `${GONZO_CONTENT_API}/api/content/${GONZO_CONTENT_ORG}/settings`,
    );
    return (d.settings ?? {}) as { cta_section?: CtaSection };
  } catch {
    return {};
  }
}

/**
 * Fetch every gallery and its photos from Gonzo, mapped into render-ready
 * groups. Always live — no hardcoded titles or slugs, so new collections and
 * Karen's curation changes flow through automatically.
 */
export async function fetchGalleryGroups(): Promise<GalleryGroup[]> {
  const list = await fetchJson<{ galleries: GonzoGalleryListItem[] }>(
    `${GONZO_CONTENT_API}/api/content/${GONZO_CONTENT_ORG}/galleries`,
  );

  return Promise.all(
    list.galleries.map(async (g) => {
      const data = await fetchJson<{
        gallery: { title: string; slug: string; photos: GonzoGalleryPhoto[] };
      }>(
        `${GONZO_CONTENT_API}/api/content/${GONZO_CONTENT_ORG}/galleries/${g.slug}`,
      );
      const gallery = data.gallery;
      const photos = [...gallery.photos].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
      );
      return {
        title: gallery.title,
        slug: gallery.slug,
        paintings: photos.map((p, i): GalleryPainting => {
          const title = p.artwork_title || p.caption || titleFromUrl(p.url);
          return {
            key: `${gallery.slug}-${i}`,
            collection: gallery.title,
            title,
            medium: p.medium || "Oil on Canvas",
            imageUrl: p.url,
            alt: `${title} by Karen Wolfram`,
            focalX: p.focal_x ?? 50,
            focalY: p.focal_y ?? 50,
          };
        }),
      };
    }),
  );
}
