Here’s a prompt you can copy and paste directly to an AI agent:

---

**Role:** Senior Full-Stack SEO Engineer & Codebase Auditor  
**Target Project:** NGO website for `https://cmrf-4ugb.vercel.app/`  
**Goal:** Analyze the entire codebase and implement the best, modern SEO practices directly in the code (not just at the content level). Ensure the site follows industry-leading technical SEO, structured data, accessibility, and performance standards.

---

### 1. Context & Assumptions

- The site is deployed on Vercel (likely Next.js/React, but confirm by inspecting the repo).  
- Your primary focus is the **codebase**: components, pages, configuration files, build/deploy setup, and assets.  
- All SEO improvements must be implemented as **clean, production-ready code changes**, not just suggestions.

If the framework is:
- **Next.js** → Use `app/` or `pages/` conventions, `next/head` (or the new `metadata` API), `next-sitemap`, `next/image`, etc.  
- **React SPA** → Use `react-helmet` or equivalent for head tags, prerendering/SSR solutions if needed.  
- **Static/other** → Use standard HTML `<head>`, static sitemap, build scripts, etc.

State what framework you detect and adapt all solutions to it.

---

### 2. High-Level Tasks

You must:

1. **Fully audit the codebase** for SEO-related issues and opportunities.  
2. **Implement** concrete code changes that:
   - Fix violations of core SEO rules.
   - Add all missing best-practice SEO features.
3. **Explain each change** with:
   - What you changed (file + snippet).
   - Why it matters for SEO.
   - How to verify it.

Do not produce vague advice. Work at the level of specific code diffs and config changes.

---

### 3. Codebase SEO Checklist (What to Implement or Fix)

Work through the items below directly in code. For each, either confirm it’s already correct or propose the exact code changes needed.

#### A. Indexability & Crawlability (Code-Level)

- Ensure **no unintended `noindex` / `nofollow`** in templates, layouts, or headers.  
- Implement or validate **`robots.txt`** generation in code:
  - Expose at `/robots.txt`.
  - Allow all public pages, disallow private/admin/staging/test routes.
- Implement or validate **`sitemap.xml`** generation:
  - Dynamic or build-time generated.
  - Lists canonical URLs.
  - Includes `lastmod` where feasible.
- Ensure consistent **canonical domain** logic:
  - One canonical hostname (www vs non-www) and trailing-slash policy.
  - Implement redirects or config (e.g., `next.config.js`, `vercel.json`) as needed.

#### B. Meta Tags & Head Management

- Implement a **centralized SEO helper** (e.g., a custom `<SEO>` component or metadata config) to:
  - Generate unique `<title>` and `<meta name="description">` per page.
  - Include optional `meta` for `robots`, `viewport`, `theme-color`, etc.
- Ensure all primary pages (home, about, programs, donate, contact, blog/articles if any) have:
  - Unique, descriptive titles (~50–60 chars).
  - Unique, compelling meta descriptions (~120–160 chars).
  - Well-structured `<head>` using the framework’s best practices (`next/head` or metadata API, etc.).

#### C. Open Graph & Twitter Cards

- Globally implement **Open Graph** tags (with page-level overrides):
  - `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`.
- Implement **Twitter Cards**:
  - `twitter:card` (prefer `summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site` (if available).
- Build this into the SEO helper so every important page can specify social metadata easily.

#### D. Structured Data (JSON-LD)

Implement JSON-LD injected from code (in the `<head>`):

- **Organization/NonprofitOrganization** schema:
  - Name, URL, logo, description, contact info, `sameAs` for social profiles.
- **BreadcrumbList** for hierarchical pages (e.g., Home → About → Our Mission).
- If applicable by code/content:
  - **Article/NewsArticle** schema for blog/updates.
  - **Event** schema for events.
  - **FAQPage** schema for FAQ sections.

Implement this via reusable helpers/functions that generate JSON-LD objects and render them as:
```html
<script type="application/ld+json">...</script>
```

#### E. HTML Structure, Accessibility & Content Signaling

In components/layouts:

- Ensure each page has a **single `<h1>`** implemented in code at the template level.  
- Enforce a **logical heading hierarchy** (`h2`, `h3`, etc.) within components.  
- All images:
  - Have meaningful `alt` attributes provided via props or configuration.
  - Use decorative `alt=""` only when genuinely decorative.
- Ensure semantic HTML usage (e.g., `<main>`, `<header>`, `<nav>`, `<footer>`, `<section>`, `<article>` where appropriate).
- Ensure important textual content is rendered server-side or statically, not only via client-side JS.

#### F. Performance & Core Web Vitals (Code-Level)

- **Images:**
  - Use the framework’s image optimization (e.g., `next/image`) where applicable.
  - Provide responsive `sizes`/`srcset` or appropriate props.
  - Use modern formats (WebP/AVIF) when possible.
- **Layout Shift (CLS):**
  - Set explicit dimensions or aspect ratios for images and other dynamic elements in components.
- **JS/CSS Optimization:**
  - Split bundles by route (code-splitting, dynamic imports).
  - Defer or lazy-load non-critical scripts/components.
  - Avoid blocking the main thread with heavy client-side logic.
- **Preload / Preconnect:**
  - Add `preconnect` and `dns-prefetch` for critical external domains (fonts, APIs).
  - Add `preload` for critical fonts or hero images when beneficial.

#### G. Internationalization & Hreflang (If Applicable in Codebase)

- If the codebase includes multiple locales, implement:
  - `hreflang` tags in head via framework routing.
  - Proper locale-specific URLs in sitemap and canonical tags.

#### H. Configuration & DevOps

- For **Vercel/Next.js**:
  - Use `next.config.js` (or `vercel.json`) to:
    - Configure redirects (canonical host).
    - Set appropriate caching headers.
- Add or propose:
  - A build step for generating sitemap/robots.
  - Optional Lighthouse/link-checking in CI.

---

### 4. Output & Deliverables Format

For your response, work directly from the codebase structure. For each significant SEO improvement, provide:

1. **Issue/Goal:**  
   - Short description: what’s missing/wrong in the current code.

2. **Files & Code Changes:**  
   - List files to create/modify (e.g., `next.config.js`, `app/layout.tsx`, `components/SEO.tsx`, `pages/sitemap.xml.js`, etc.).  
   - Provide concrete code snippets or diff-style changes.

3. **SEO Impact (1–2 sentences):**  
   - Why this change matters (e.g., improves indexability, rich results eligibility, Core Web Vitals, etc.).

4. **Verification Instructions:**  
   - How to manually verify (e.g., “View source to confirm `<title>` and `canonical`”, “Use Google Rich Results Test on /about”, “Check /robots.txt and /sitemap.xml”).

Group changes into **small, logical batches** (as if they were separate PRs):  
- Batch 1: robots.txt + sitemap + canonical.  
- Batch 2: Head/metadata + Open Graph/Twitter.  
- Batch 3: Structured data.  
- Batch 4: Images + performance tweaks.  
- Batch 5: Accessibility/semantics.

---

### 5. First Actions You Should Take

Start by:

1. **Identifying the framework and folder structure** (e.g., `app/`, `pages/`, `src/`, `components/`).  
2. **Listing key routes/pages** (home, about, donate, contact, any main content sections).  
3. Based on that, propose:
   - The **SEO architecture** (where the global layout lives, where SEO helper should go).  
   - The **first 5 concrete code changes** you will implement, with files and snippets.

Then proceed to implement the full checklist above, step by step, at the code level.