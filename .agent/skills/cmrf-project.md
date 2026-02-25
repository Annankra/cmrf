---
name: cmrf-project
description: >
  Complete project context for the CMRF (Christian Medical Missions Resource
  Foundation) website. Covers tech stack, architecture decisions, design system,
  data layer conventions, component patterns, and deployment rules. Every agent
  working in this repo MUST read this skill before making any changes.
---

# CMRF Project — Agent Skill

## 1. What Is This Project?

**CMRF** is the website for the *Christian Medical Missions Resource Foundation* — an NGO/501(c)3 that has delivered free medical care to 600+ communities across Ghana and Africa for 30+ years. The site is a **cinematic, content-managed public-facing landing page** with a blog, events calendar, and photo gallery.

**Production domain:** `https://www.cmrfgh.com`

---

## 2. Tech Stack (DO NOT change without explicit instruction)

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| UI Library | React | 19.x |
| CMS | Payload CMS | 3.x |
| Database | PostgreSQL (via Payload Postgres adapter) | — |
| Storage | Supabase (media) | 2.x |
| Styling | Tailwind CSS v4 | 4.x |
| Animations | GSAP + ScrollTrigger | 3.x |
| Icons | Lucide React | 0.5x |
| Auth (admin) | Next Auth v5 beta + Payload built-in | — |
| AI | OpenAI SDK | 6.x |
| Language | TypeScript (strict) | 5.x |

**Key imports to always use:**
- `gsap` + `gsap/ScrollTrigger` for animations — register the plugin at the module level: `gsap.registerPlugin(ScrollTrigger)`
- `lucide-react` for icons (never use heroicons, react-icons, etc.)
- `next/font/google` for fonts — never load fonts via `<link>` tags
- `@/lib/payload` for ALL data fetching (never call Payload's REST API directly from frontend pages)

---

## 3. Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # All public-facing pages
│   │   │   ├── layout.tsx       # Root layout: fonts, Navbar, Footer, NoiseOverlay
│   │   │   ├── page.tsx         # Homepage (assembles all landing page sections)
│   │   │   ├── about/
│   │   │   ├── blog/            # Blog listing + [slug] detail
│   │   │   ├── clinic/
│   │   │   ├── contact/
│   │   │   ├── events/          # Events listing + [slug] detail
│   │   │   ├── gallery/         # Gallery listing + [slug] album detail
│   │   │   ├── get-involved/
│   │   │   └── mission/
│   │   ├── (payload)/           # Payload CMS admin panel routes (DO NOT touch)
│   │   └── globals.css          # Design tokens + utility classes (Tailwind v4)
│   ├── collections/             # Payload CMS collection definitions
│   │   ├── Users.ts
│   │   ├── Media.ts
│   │   ├── Events.ts
│   │   ├── Posts.ts
│   │   └── Albums.ts
│   ├── components/
│   │   ├── animation/           # ScrollReveal.tsx, SmoothPageTransition.tsx
│   │   ├── features/            # ServicesCarousel.tsx + feature card components
│   │   ├── gallery/             # Gallery components
│   │   ├── hero/                # Hero.tsx
│   │   ├── layout/              # Navbar.tsx, Footer.tsx
│   │   ├── philosophy/          # Philosophy.tsx
│   │   ├── protocol/            # StickyStacker.tsx
│   │   ├── sections/            # GetInvolvedTiers.tsx
│   │   └── ui/                  # ImpactMetrics.tsx, NoiseOverlay.tsx
│   ├── lib/
│   │   └── payload.ts           # All Payload Local API data-fetching helpers
│   ├── payload.config.ts        # Payload CMS configuration
│   └── payload-types.ts         # Auto-generated types — NEVER edit manually
├── .env                         # Local env (not committed)
├── next.config.ts               # Wraps Next config with withPayload()
└── package.json
```

---

## 4. Environment Variables

Required in `.env` (see `.env.example`):

```bash
DATABASE_URI=postgresql://postgres:PASSWORD@127.0.0.1:5432/cmrf
PAYLOAD_SECRET=<32+ char random string>
```

For production, `PAYLOAD_SECRET` must be a cryptographically strong secret. Generate with:
```bash
openssl rand -base64 32
```

---

## 5. Design System — "Organic Tech" (Preset A)

All design tokens are defined as CSS custom properties in `src/app/globals.css` under `@theme inline { ... }`. **Never hardcode hex values in components** — always use `var(--color-*)` or the semantic aliases.

### Colour Palette

| Token | Value | Role |
|---|---|---|
| `--color-moss` | `#2E4036` | Primary / nav scrolled bg |
| `--color-clay` | `#CC5833` | Accent (CTAs, highlights, drama text) |
| `--color-cream` | `#F2F0E9` | Background |
| `--color-charcoal` | `#1A1A1A` | Dark backgrounds, body text |
| `--color-ivory` | `#FAF9F6` | Card surfaces |
| `--color-muted` | `#8A8A7A` | Secondary text |

Lighter/darker variants: `--color-moss-light`, `--color-moss-dark`, `--color-clay-light`, `--color-clay-dark`, `--color-cream-dark`.

### Typography

| Variable | Font | Use |
|---|---|---|
| `--font-heading` | Plus Jakarta Sans | All headings (`h1`–`h6`), nav, buttons |
| `--font-drama` | Cormorant Garamond Italic | Large italic accent text (poetry/impact words) |
| `--font-mono` | IBM Plex Mono | Labels, tags, metadata, monospace data |
| `--font-body` | Plus Jakarta Sans | Body copy |

Fonts are loaded in `layout.tsx` via `next/font/google` and injected as CSS variables.

**Typography class shortcuts:**
- `.font-drama` → `font-family: var(--font-drama); font-style: italic;`
- `.font-mono` → `font-family: var(--font-mono);`
- Use `style={{ fontFamily: "var(--font-heading)" }}` inline when Tailwind class isn't available.

### Headline Pattern (every page hero follows this)

```tsx
<h1>
  <span style={{ fontFamily: "var(--font-heading)" }}>The Bold Sans line</span>
  <span className="font-drama text-[var(--color-clay)]">The italic drama word.</span>
</h1>
```

### Radius System

- Cards / containers: `rounded-[2rem]` or `var(--radius-card)` (2rem)
- Pills (buttons/tags): `rounded-full` / `var(--radius-pill)`
- Section containers: `var(--radius-section)` (3rem)
- **No sharp corners anywhere.**

---

## 6. Utility CSS Classes (globals.css)

These custom classes are defined in globals.css — **always prefer these over inline styles**:

| Class | Purpose |
|---|---|
| `.btn` | Base button — pill shape, magnetic hover, overflow-hidden |
| `.btn-primary` | Clay background, white text |
| `.btn-secondary` | Outlined, moss border, fills moss on hover |
| `.btn-ghost` | Transparent, cream border — for dark backgrounds |
| `.btn-text` | Inner `<span>` for text inside button (required for z-index layering) |
| `.card` | Ivory surface, 2rem radius, hover lift (-6px) + shadow |
| `.card-dark` | Dark surface card variant |
| `.section` | Responsive padding: 6rem → 8rem → 10rem vertical |
| `.section-dark` | Charcoal background, cream text |
| `.container-main` | `max-width: 1400px; margin: 0 auto;` |
| `.section-divider` | 80px gradient line separator (clay → moss) |
| `.noise-overlay` | Global SVG noise at 0.05 opacity (fixed, z-9999) |
| `.animate-float` | Gentle bob animation |
| `.animate-pulse-dot` | Status indicator pulse |
| `.animate-cursor` | Blinking text cursor |
| `.scrollbar-hide` | Hides scrollbar cross-browser |
| `.font-drama` | Drama serif italic |
| `.font-mono` | Monospace style |

---

## 7. Component Conventions

### Client vs Server Components
- **Server Components (default):** All pages that fetch CMS data using `src/lib/payload.ts`. Data fetching is async — no `useEffect` for data.
- **Client Components (`"use client"`):** Any component that uses GSAP, React state, event listeners, or browser APIs. Annotate with `"use client"` at the top.

### GSAP Animation Rules (CRITICAL)

1. **Always use `gsap.context()`** scoped to the component's root ref:
   ```tsx
   useEffect(() => {
     const ctx = gsap.context(() => {
       // all tweens here
     }, rootRef);
     return () => ctx.revert(); // mandatory cleanup
   }, []);
   ```
2. **Default easings:** `power3.out` for entrances, `power2.inOut` for morphs.
3. **Stagger values:** `0.08` for text, `0.15` for cards/containers.
4. Register `ScrollTrigger` at the top of each file that uses it:
   ```ts
   gsap.registerPlugin(ScrollTrigger);
   ```
5. `data-*` attributes are used as GSAP selectors (e.g., `[data-hero-line]`, `[data-hero-cta]`).

### Navbar Pattern
- Fixed, pill-shaped, horizontally centered (`fixed top-4 left-1/2 -translate-x-1/2`).
- **Transparent** with cream links when at top of page.
- **Morphs** via GSAP to `bg-cream/60 backdrop-blur-xl` with moss-coloured text and border when `window.scrollY > 80`.
- Mobile: full-screen overlay with large stacked links.
- Nav links are defined in a static array — update this array to add/remove links.

### Data Attribute Pattern for Animations
Use `data-*` attributes for GSAP targeting instead of class selectors:
```tsx
<p data-hero-line>...</p>    // targeted by gsap("[data-hero-line]")
<div data-hero-cta>...</div>
```

---

## 8. Data Layer — Payload CMS

### Collections Reference

| Collection | Slug | Key Fields |
|---|---|---|
| Users | `users` | email, role |
| Media | `media` | url, alt, filename |
| Events | `events` | title, slug, startDate, endDate, location, category, featured, image (→Media), description (textarea), content (richText) |
| Posts | `posts` | title, slug, date, tags[].tag, featured, image (→Media), excerpt (textarea), content (richText) |
| Albums | `albums` | title, slug, year, coverImage (→Media), description, galleryImages[].image (→Media), galleryImages[].caption |

### Data Fetching Rules

**ALL data fetching goes through `src/lib/payload.ts`** using the Payload Local API. Never call `/api/...` endpoints from server components.

```ts
import { getPosts, getEvents, getAlbums, getMediaUrl } from "@/lib/payload";
```

Available helpers:
- `getPayload()` — raw Payload client (for ad-hoc queries)
- `getMediaUrl(media)` — resolves a Media relation to URL string or `null`
- `getMediaAlt(media)` — resolves alt text
- `getEvents()` — all events, sorted by `-startDate`
- `getEventBySlug(slug)` — single event
- `getPosts()` — all posts, sorted by `-date`
- `getPostBySlug(slug)` — single post
- `getAlbums()` — all albums, sorted by `-year`
- `getAlbumBySlug(slug)` — single album (depth: 2 for nested gallery images)

**Always use `depth: 1`** for single-level relations (to populate Media fields). Use `depth: 2` only for nested relations (e.g., `galleryImages[].image`).

### Adding a New Collection

1. Create `src/collections/NewCollection.ts` following the existing pattern.
2. Import and add it to `collections: [...]` in `src/payload.config.ts`.
3. Run `npm run generate:types` to regenerate `payload-types.ts`.
4. Add data-fetching helpers to `src/lib/payload.ts`.

### Adding a New Field to an Existing Collection

1. Edit the collection file in `src/collections/`.
2. Run `npm run generate:types` to sync types.
3. Update any relevant `src/lib/payload.ts` helpers and frontend pages.

---

## 9. Page Structure Conventions

Every frontend page follows this pattern:

```tsx
// 1. Metadata export (server component)
export const metadata: Metadata = {
  title: "Page Title",    // Uses template: "%s | CMRF"
  description: "...",
};

// 2. Async page component for data-fetching pages
export default async function PageName() {
  const data = await getSomeData();  // via src/lib/payload.ts
  // ...
}

// 3. Page hero (inner-page style, not full DVH):
<section className="relative h-[50vh] md:h-[60vh] min-h-[350px] flex items-end overflow-hidden">
  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(...)` }} />
  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/60 to-transparent" />
  <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16">
    <p className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
      Category Label
    </p>
    <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-cream)]" style={{ fontFamily: "var(--font-heading)" }}>
      Page <span className="font-drama text-[var(--color-clay)]">Title.</span>
    </h1>
  </div>
</section>
```

**Fallback pattern:** Always include hardcoded fallback data for when the CMS has no content yet (see `blog/page.tsx` for the canonical example).

---

## 10. Responsive Design Rules

- **Mobile-first.** Stack grids vertically below `md` breakpoint.
- Standard grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Max content width: `1400px` via `.container-main`
- Always include `px-6 md:px-12` horizontal padding inside `container-main`.
- Hero font scaling: `text-3xl md:text-5xl lg:text-6xl` (heading) / `text-6xl md:text-8xl lg:text-[10rem]` (drama).
- Respect `@media (prefers-reduced-motion: reduce)` — it disables all animations via globals.css.

---

## 11. Noise Overlay

A `<NoiseOverlay />` component renders a fixed SVG `<feTurbulence>` filter at `0.05` opacity globally to eliminate flat digital gradients. This is rendered in the root layout. **Never remove it.**

---

## 12. Development Workflow

### Running Locally

```bash
npm run dev          # Next.js + Payload dev server (http://localhost:3000)
```

Payload admin panel: `http://localhost:3000/admin`

### Generating Types (after any collection change)

```bash
npm run generate:types
```

This regenerates `src/payload-types.ts`. **Never edit this file by hand.**

### Linting

```bash
npm run lint
```

Uses `eslint-config-next`. All pages and components must pass lint before commit.

### Building for Production

```bash
npm run build
npm run start
```

### Committing Changes

Use conventional commits:
- `feat:` new page, component, or feature
- `fix:` bug fix
- `content:` CMS collection changes, fallback data updates
- `style:` visual / CSS-only changes
- `refactor:` internal code restructuring

---

## 13. Critical Rules — Never Break These

1. **Never edit `payload-types.ts` manually.** Always regenerate with `npm run generate:types`.
2. **Never hardcode hex colours.** Always use `var(--color-*)` tokens.
3. **Never load Google Fonts via `<link>` tags.** Use `next/font/google` only.
4. **Always return `ctx.revert()` from GSAP useEffect** to prevent memory leaks.
5. **Never make API calls from client components** for CMS data — use RSC + `src/lib/payload.ts`.
6. **Never add sharp corners** — maintain the `rounded-[2rem]` / `rounded-full` radius system.
7. **Always wrap Next's config with `withPayload()`** in `next.config.ts`.
8. **The `(payload)` route group is Payload-managed** — do not add custom routes there.
9. **Always provide fallback data** in pages that fetch from the CMS (empty CMS = the site still works).
10. **Images should use real Unsplash URLs** until production assets are uploaded. Use `?w=1920&q=80&auto=format` query params.

---

## 14. Organisation & Brand Context

| Detail | Value |
|---|---|
| Full Name | Christian Medical Missions Resource Foundation |
| Short Name | CMRF |
| US Entity | CMMRF-USA (501c3) |
| Ghana Entity | CMRF Ghana (NGO) |
| Location | Accra, Ghana |
| Email | cmmrf@usa.com |
| Mission | Mobilizing Christians and resources to deliver free medical care, hope, and God's love across Ghana and Africa |
| Stats | 30+ years · 600+ communities · 5,800+ consultations (2024) |
| Tone | Reverent, warm, mission-driven. Not corporate; not casual. |

---

## 15. Package Scripts Quick Reference

```bash
npm run dev              # Development server
npm run build            # Production build
npm run start            # Serve production build
npm run lint             # ESLint
npm run payload          # Run Payload CLI commands
npm run generate:types   # Re-generate payload-types.ts
```
