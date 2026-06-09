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
}

/** One painting, mapped into the shape the gallery/home grids expect. */
export interface GalleryPainting {
  key: string;
  collection: string;
  title: string;
  medium: string;
  imageUrl: string;
  alt: string;
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
          };
        }),
      };
    }),
  );
}
