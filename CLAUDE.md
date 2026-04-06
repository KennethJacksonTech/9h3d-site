# 9th Hour 3rd Day Ministries — Client Site Project

> **This file is the single source of truth for all Code sessions working on this project.**
> Populated by Della from site audit + LCARS on 2026-03-30.
> Do NOT overwrite — append updates at the bottom.

---

## Quick Reference

- **Customer:** Walter Wolfram (long-time client)
- **Ministry Lead:** Karen Wolfram (artist, teacher, ministry founder)
- **Company:** 9th Hour 3rd Day Ministries
- **Address:** Amarillo, TX
- **Current Site:** https://9h3d.com (WordPress — Twenty Twenty-Five theme)
- **New Site:** Static Next.js at itK-Clients/9h3d/dev/
- **Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4
- **Deployment:** Vercel (static export)
- **Style:** Clean & Light — gallery-focused, elegant
- **Primary CTA:** "Explore the Gallery" / "Watch the Series"
- **ATLAS Phase:** Design + Build (Phase 3)
---

## Social Media & External Links

- **Facebook:** https://www.facebook.com/KarenWolframArts
- **YouTube:** https://www.youtube.com/channel/UCK4dTWHI7g4DzTqNLK_fPcA
- **Gallery Domain:** godswork.gallery (currently down — redirect to new site gallery page)

---

## Brand

- **Visual Style:** Clean & Light — white/cream backgrounds, elegant presentation, let the paintings breathe
- **Mood:** Reverent, serene, artistic, approachable, spiritual
- **Font (current site):** Manrope (body), Fira Code (monospace)
- **Font (new site):** Heading: Playfair Display or similar serif, Body: Inter or similar clean sans
- **Logo:** None identified — use ministry name in elegant serif typography

### Color Palette — Suggested: Sanctuary Light

| Token | Hex | Usage |
|---|---|---|
| `--surface-primary` | `#FAFAF7` | Page background — warm white |
| `--surface-secondary` | `#F2EDE6` | Card backgrounds, gallery frames |
| `--surface-inverse` | `#1A1A1A` | Footer, dark sections |
| `--foreground-primary` | `#1A1A1A` | Headings, primary text |
| `--foreground-secondary` | `#4A4A4A` | Body text, descriptions |
| `--foreground-inverse` | `#FFFFFF` | Text on dark backgrounds |
| `--accent-primary` | `#8B6F4E` | Warm gold-brown — CTAs, links, accents |
| `--accent-secondary` | `#C4A87C` | Lighter gold — hover states, subtle accents |
| `--border-subtle` | `#D4CFC7` | Card borders, dividers |

**Hard Rule:** No blue anywhere. No garish colors — reverent and elegant.
---

## About Karen Wolfram

- Native Texan painter based in Amarillo, TX
- **Education:** MA from West Texas University, BS from Texas A&M University, art leveling from Amarillo College (Art Faculty Award recipient)
- **Teaching:** Former volunteer faculty at Amarillo College (Colored Pencil), former Director of Children's Department at Amarillo Art Institute
- **Collectors:** Work owned across Texas, New Mexico, and Florida
- **Exhibition History:** Taos Connections / Nichols Taos Gallery (2006), Red Gallery Abilene TX (2009), Panhandle Art Center "Six Texas Gals" (2009)

### Art Collections

**God's Work Series** — Ten oil and acrylic on canvas paintings portraying Jesus' message, purpose, and command. Titles include: "The Bible", "Take Up Your Cross", "Persecution", "Faith Rising", "Drowning Souls", and others. Permanent exhibition — not for sale. These are the heart of the ministry.

**God's Creation Series** — Landscape and nature paintings: "The Bridge", "Caprock Canyon", "Giant White Hibiscus", "Garden Walk", and others. Celebrates God's creation through natural beauty.

### The Karen Wolfram Project

A practical guide to walking with the Lord — video/written teaching series with 56+ episodes. Topics include receiving Jesus, living in the spirit, spiritual growth, overcoming the flesh. Published as blog posts and likely YouTube videos.

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero with ministry name/tagline, featured painting, intro to Karen Wolfram Project, CTA to gallery |
| `/about` | Karen's bio, education, exhibition history, artist statement, photo of Karen |
| `/gallery` | Two collections: God's Work (spiritual paintings) and God's Creation (landscapes). Grid layout with lightbox. |
| `/blog` | Karen Wolfram Project teachings — episode list, latest posts. Migrated from current WordPress blog posts. |
| `/contact` | Contact form (name, email, message) + social links (Facebook, YouTube) |
---

## Home Page Section Order

1. **Hero** — Ministry name in elegant serif, tagline "Jesus Loves You!", warm background, featured painting or abstract art texture
2. **Mission Statement** — Brief intro to the ministry's purpose (art as worship, spreading Jesus' message)
3. **Featured Gallery Preview** — 3-4 painting thumbnails from God's Work series with link to /gallery
4. **Karen Wolfram Project Intro** — Brief description + latest episode with link to /blog
5. **CTA Banner** — "Explore the Gallery" or "Watch the Latest Teaching"
6. **Footer** — Ministry name, social links, copyright, "Designed by KennethJackson.Tech"

---

## Content Sources

- **Current WordPress posts:** 2 blog posts (Episode 56 "Seed", Episode 40 "Desire God's Wisdom")
- **About page content:** Karen's bio from current site /about-karen-wolfram/
- **Paintings:** No images found in current WordPress HTML — may need Walter to provide painting photos, or use AI-generated placeholder gallery images
- **YouTube channel:** UCK4dTWHI7g4DzTqNLK_fPcA — likely has Karen Wolfram Project video episodes
- **Facebook:** KarenWolframArts — may have additional photos and content

**Content approach:** We build from what we know. Write copy from the audit data above. Use AI-generated images for placeholders. Walter reviews and provides real painting photos.
---

## Technical

- **Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4
- **Build Mode:** Static export (output: "export", trailingSlash: true, images: { unoptimized: true })
- **Deployment:** Vercel (static) — do NOT auto-push
- **Domain:** 9h3d.com (currently WordPress — DNS cutover after review)
- **Footer:** "Designed by KennethJackson.Tech"
- **Copyright:** Lee Blakney (from current site — confirm with Walter)

---

## GOTCHA Framework

GOTCHA was initialized 2026-03-25. **Do NOT recreate — check and preserve.**

```
itK-Clients/9h3d/
├── CLAUDE.md          ← This file (source of truth)
├── goals/             ← Process definitions (build_app.md, manifest.md)
├── memory/            ← Session history (MEMORY.md)
├── tools/             ← Scripts (manifest.md — none yet)
├── design/            ← Pencil .pen file (created during this session)
└── dev/               ← Next.js application (built by Code)
```

---

## Anti-Patterns

- No blue anywhere
- No auto-push (Vercel auto-deploys)
- Pencil wireframe before code
- No font-light (weight 300) if using Playfair Display
- Footer on every page
- No CMS — static site, content managed by itK-Tech
- App Router only — no pages/ router

---

## Session Log

- **2026-03-25:** GOTCHA directories scaffolded
- **2026-03-30 (Della):** Audit of 9h3d.com complete, Discovery complete, CLAUDE.md populated, Pencil design + Code prompt pending

- **2026-03-30 (Della):** Pencil design complete — 5 pages (Home, About, Gallery, Blog, Contact) fully wireframed with Sanctuary Light palette, stock images, and consistent nav/footer. GOTCHA code prompt written and saved to itK-Della/Della/code-prompt_9h3d-build.md. Ready for Code.
