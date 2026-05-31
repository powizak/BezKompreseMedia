# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-31
**Commit:** 68168c6
**Branch:** master

## OVERVIEW

Static website for [bezkompresemedia.cz](https://bezkompresemedia.cz) — Czech media company offering photography, video, web development, and social media management. Built with Astro 6.x (static output), CSS custom properties (no preprocessors), TypeScript strict mode.

## STRUCTURE

```
bkMedia/
├── public/                  # Static assets copied to dist/ as-is
│   ├── contact-handler.php  # PHP form handler (hCaptcha validation, rate limiting)
│   ├── .htaccess            # Apache: HTTPS redirect, gzip, caching, security headers
│   └── images/              # Photo galleries, references, team photos (served raw)
├── src/
│   ├── assets/              # Images optimized by Astro at build (→ WebP)
│   │   └── icons/           # SVG icons used in components
│   ├── components/          # Reusable UI sections (11 Astro components)
│   ├── data/                # Typed data exports per service (content layer)
│   ├── layouts/             # BaseLayout.astro — shared header/footer/nav (507 lines)
│   ├── pages/               # File-based routing (9 pages)
│   ├── scripts/             # Client-side JS (scroll-animations via IntersectionObserver)
│   └── styles/              # global.css — design tokens + CSS reset + utilities
├── astro.config.mjs         # Site config: static output, trailingSlash: always, sitemap
└── tsconfig.json            # Extends astro/tsconfigs/strict
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add a new page | `src/pages/<name>.astro` | Must use BaseLayout, add to `navItems` in BaseLayout |
| Add a new service | `src/data/<service>.ts` + `src/pages/<service>.astro` | Data file exports typed objects; page imports and renders |
| Change navigation | `src/layouts/BaseLayout.astro` → `navItems` array (line ~19) | Also update `footerServices` array (line ~30) |
| Change colors/spacing | `src/styles/global.css` → `:root` | All design tokens are CSS custom properties |
| Add gallery photos | `public/images/photos/<category>/` + update data file | Photos in `public/` served raw; in `src/assets/` Astro optimizes |
| Modify contact form | `src/components/ContactForm.astro` + `public/contact-handler.php` | PHP handler uses hCaptcha + honeypot + session rate limiting |
| Change fonts | `src/layouts/BaseLayout.astro` → Google Fonts `<link>` + `global.css` → `--font-display`, `--font-body` | Space Grotesk (headings) + Inter (body), weights 400+700 only |
| SEO meta tags | `src/layouts/BaseLayout.astro` → `<head>` (defaults) or per-page props | `title` and `description` props on BaseLayout |
| Apache/server config | `public/.htaccess` | WEDOS hosting — HTTPS redirect, gzip, security headers, caching |
| Cookie banner | `src/layouts/BaseLayout.astro` → CookieYes script tag (line ~73) | Hardcoded site ID `a7112a29b80640e7b97f9df6` |
| Lightbox | `src/layouts/BaseLayout.astro` → GLightbox init (line ~222) | Global instance on `window.GLightboxInstance`, use `.glightbox` class |
| Scroll animations | `src/scripts/scroll-animations.js` + CSS `.scroll-reveal` / `.visible` | Supports `data-delay` and `data-threshold` attributes |

## CONVENTIONS

- **Language**: All UI text is Czech. Variable names and code comments in English.
- **Routing**: File-based (Astro default). All routes use trailing slash (`trailingSlash: 'always'`).
- **Data layer**: Each service has a typed `.ts` file in `src/data/` exporting typed objects. Pages import these — no CMS, no API calls.
- **Styling**: CSS custom properties only. No Tailwind, no preprocessors. Scoped `<style>` in Astro components, global tokens in `global.css`.
- **Responsive**: Mobile-first. Desktop breakpoint at 768px (`@media (min-width: 769px)`).
- **Fonts**: Google Fonts loaded via `<link>` (not self-hosted). Two font families, two weights each.
- **Images**: Photos in `public/images/` served as-is. Images in `src/assets/` auto-optimized by Astro (WebP). `passthroughImageService` configured.
- **Form handling**: PHP on backend (WEDOS). hCaptcha + honeypot + session-based rate limiting (3/hr).
- **Deploy**: `npm run build` → upload `dist/` via FTP to WEDOS. No CI/CD pipeline.

## ANTI-PATTERNS (THIS PROJECT)

- **DO NOT** add CSS preprocessors (Sass, Less) — project uses plain CSS custom properties
- **DO NOT** add a CSS framework (Tailwind, Bootstrap) — all custom CSS
- **DO NOT** change `trailingSlash: 'always'` — Apache `.htaccess` enforces trailing slashes
- **DO NOT** put form handler logic in Astro — contact form uses PHP (`public/contact-handler.php`)
- **DO NOT** import photos from `src/assets/` for gallery display — those get optimized/renamed by Astro; use `public/images/` for predictable paths
- **DO NOT** remove CookieYes or hCaptcha — they are required for GDPR compliance and spam protection

## UNIQUE STYLES

- Fluid typography via `clamp()` in all `--text-*` tokens (375px → ∞)
- Scroll-reveal animation: `.scroll-reveal` elements fade up on viewport entry (IntersectionObserver, threshold 0.15)
- GLightbox for photo galleries with custom dark overlay (`rgba(0,0,0,0.92)`) and brand-color hover on controls
- Sticky header with `backdrop-filter: blur(12px)` glass effect
- `.sr-only` utility class for accessible hidden text
- `prefers-reduced-motion` fully respected — all animations/transitions disabled

## COMMANDS

```bash
npm run dev       # Dev server at http://localhost:4321
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

## NOTES

- **Hosting**: WEDOS (Apache + PHP). No Node.js runtime on server. Deploy via FTP only.
- **Node.js**: Requires ≥ 22.12.0
- **Rollup on Windows**: `@rollup/rollup-win32-x64-msvc` pinned in dependencies to avoid npm optional dependency bug
- **CookieYes ID**: Hardcoded in BaseLayout, not via env var. Change directly in the script URL.
- **hCaptcha**: Secret key placeholder in `contact-handler.php`. Site key placeholder in `ContactForm.astro`.
- **Gallery images**: ~190 photos in `public/images/` — largest portion of repo by file count
- **Single layout**: `BaseLayout.astro` is the only layout (507 lines) — contains header, nav, footer, all scripts
