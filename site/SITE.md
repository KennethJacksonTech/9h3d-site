# 9th Hour 3rd Day Ministries — Site Reference

## Tech Stack

- **Framework:** Next.js 16.2.1 (App Router, static export)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Fonts:** Playfair Display (400/600/700), Inter (400/500/600/700) via `next/font/google`
- **Export:** Static HTML (`output: "export"`, `trailingSlash: true`, `images: { unoptimized: true }`)

## Routes

| Route | File | Key Sections |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Hero, Mission Statement, Gallery Preview (3 cards), Karen Wolfram Project, CTA Banner |
| `/about` | `src/app/about/page.tsx` | Hero, Bio (portrait + text), Collections (2 cards), CTA Banner |
| `/gallery` | `src/app/gallery/page.tsx` | Hero, Filter Tabs (All/God's Work/God's Creation), Painting Grid (32 paintings from Gonzo CMS) |
| `/blog` | `src/app/blog/page.tsx` | Hero, Featured Post, Recent Posts Grid (3 cards) |
| `/contact` | `src/app/contact/page.tsx` | Hero, Contact Form + Contact Info |

## Shared Components

| Component | File | Notes |
|-----------|------|-------|
| Navigation | `src/components/Navigation.tsx` | Client component. Desktop horizontal + mobile hamburger. Active link highlighting. |
| Footer | `src/components/Footer.tsx` | Server component. Ministry name, nav links, copyright, designer credit. |

## Design System — Sanctuary Light

### Colors (CSS Custom Properties)

| Token | Value | Usage |
|-------|-------|-------|
| `--surface-primary` | `#FAFAF7` | Main background |
| `--surface-secondary` | `#F2EDE6` | Alternate sections |
| `--surface-inverse` | `#1A1A1A` | Dark sections, footer |
| `--foreground-primary` | `#1A1A1A` | Primary text |
| `--foreground-secondary` | `#4A4A4A` | Secondary text |
| `--foreground-inverse` | `#FFFFFF` | Text on dark backgrounds |
| `--accent-primary` | `#8B6F4E` | Buttons, links, labels |
| `--accent-secondary` | `#C4A87C` | Hover states, gold accents |
| `--border-subtle` | `#D4CFC7` | Borders, placeholder images |

### Typography

- Hero: Playfair Display 40-60px, weight 700
- Section title: Playfair Display 36-42px, weight 700
- Card title: Playfair Display 17-18px, weight 600
- Section label: Inter 13px, weight 600, tracking 2-3px, uppercase, accent color
- Body: Inter 16-17px, weight 400, line-height 1.7
- Nav links: Inter 12px, weight 600, tracking 2px, uppercase
- Buttons: Inter 14px, weight 600, tracking 1px

## Build & Deploy

- Build: `npm run build` (static export to `out/`)
- No auto-push — Vercel deploys on push, so push manually
- 32 paintings served from Gonzo CMS (Supabase storage CDN); 6 are thumbnail-only (150px), 3 are 600px — rest are full-res
- Contact form is visual only — needs Formspree/Netlify Forms integration

## What's Next

- ~~Replace placeholder images~~ — Done: 32 paintings wired from Gonzo CMS (Supabase CDN)
- Integrate contact form backend
- Add real blog content / CMS
- YouTube embed for Karen Wolfram Project section
- SEO metadata per page
- Favicon / Open Graph images
