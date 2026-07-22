# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static website for bezkompresemedia.cz (Czech media company — photo, video, web, social media). Astro 6.x, static output, TypeScript strict, plain CSS custom properties. All UI text is Czech; code and comments are English.

## Commands

```bash
npm run dev           # Dev server at http://localhost:4321
npm run build         # Production build → dist/
npm run preview       # Preview production build
npm run format        # Prettier write (src/**/*.{astro,css,js,ts})
npm run format:check  # Prettier check
```

No tests or linter. Node ≥ 22.12.0 required. Platform note: `@rollup/rollup-win32-x64-msvc` and `@img/sharp-win32-x64` are pinned in `dependencies`, and the Linux equivalents in `optionalDependencies`, to work around npm's optional-dependency bug — don't remove them.

## Deployment — pushing to master deploys to production

GitHub Actions (`.github/workflows/deploy.yml`) builds and FTP-deploys `dist/` to WEDOS hosting (`www/` doc root) on every push to `master`. The server is Apache + PHP only — no Node runtime; the contact form backend is PHP (`public/contact-handler.php`).

Nothing is hardcoded: `PUBLIC_*` values come from `.env` locally and from GitHub secrets in CI (baked in at build time). The server-side hCaptcha secret is written by CI into `dist/config.php` (WEDOS cannot set env vars); `.htaccess` denies direct access to it. Required GitHub secrets: `PUBLIC_HCAPTCHA_SITE_KEY`, `PUBLIC_COOKIEYES_ID`, `HCAPTCHA_SECRET_KEY`, `FTP_SERVER`, `FTP_USER`, `FTP_PASSWORD`.

## Architecture

- **Single layout**: `src/layouts/BaseLayout.astro` — head/SEO/OG tags, self-hosted Fontsource fonts, deferred CookieYes script, hamburger nav script, scroll-animations. It defines the `allPages` array that drives both header nav and footer links; **new pages must be added there**. Header/footer markup lives in `SiteHeader.astro` / `SiteFooter.astro`. `noindex` prop available (used by `/dekujeme/`).
- **Pages**: `src/pages/*.astro`, file-based routing, `trailingSlash: 'always'` (enforced by `.htaccess` too — do not change).
- **Data layer**: each service page has a typed `.ts` file in `src/data/` exporting content objects. `src/data/contact.ts` exports `siteContact` — the single source of truth for phone/email used by SiteFooter, PageCTA, QuickContact, and the contact page. No CMS, no API calls.
- **Styling**: design tokens as CSS custom properties in `src/styles/global.css`; component-scoped `<style>` elsewhere. No Tailwind, no preprocessors. Mobile-first, desktop breakpoint 769px. `prefers-reduced-motion` respected.
- **Fonts**: self-hosted via `@fontsource/inter` + `@fontsource/space-grotesk` (400/700), imported in BaseLayout. No Google Fonts CDN.
- **Images, two regimes**: `src/assets/` (hero, logo, icons, reference logos) → optimized by Astro/Sharp at build with responsive `srcset`; `public/images/` → gallery photos served raw with pre-generated `_600.webp` thumbnails (predictable URLs for GLightbox).
- **Galleries**: `GalleryGrid.astro` is the shared photo-grid component (configurable columns, optional "show more" via `hidden` attribute, fixed 3/2 aspect ratio → no CLS). `Lightbox.astro` bundles GLightbox init + styles and is included **only** on pages with galleries (foto, galerie) — never load it globally.
- **Contact form**: `ContactForm.astro` (section `id="form"`, target of `/contact/#form` links) posts to `public/contact-handler.php` — hCaptcha (lazy-loaded when the form nears the viewport) + honeypot + Origin check + session rate limiting (3/hr). On success PHP redirects to `/dekujeme/`. Keep the split: form logic belongs in PHP, not Astro. Note: `Astro.url.searchParams` never works on a static build — don't add query-param logic to pages.
  - **Email deliverability**: `From:` MUST stay the site domain (`info@bezkompresemedia.cz`), never the visitor's address — otherwise Gmail evaluates the visitor domain's DMARC against WEDOS and the mail hard-fails to spam. Visitor address goes in `Reply-To`. The mail also sets `MIME-Version` and RFC 2047-encodes the Czech subject. DNS: SPF must be `v=spf1 mx a include:_spf.we.wedos.net -all` (note `_spf.we.wedos.net`, not `_spf.wedos.net` — a wrong include silently softfails) and DMARC `_dmarc` TXT is set to `p=none`. DKIM cannot align with the domain for PHP `mail()` on shared WEDOS hosting (WEDOS signs with a shared key, `shared.dkim-wes1.wedos.net`) — DMARC still passes on SPF alignment alone, so this is expected and not a bug — see README.
- **Client JS**: `src/scripts/scroll-animations.js` (IntersectionObserver, `.scroll-reveal`/`.visible`, `data-delay`/`data-threshold`).

## Do not

- Add CSS frameworks or preprocessors
- Change `trailingSlash: 'always'`
- Move gallery photos into `src/assets/` (Astro renames them; galleries need stable `public/` paths)
- Remove CookieYes or hCaptcha (GDPR compliance / spam protection)
- Load GLightbox or other page-specific JS globally in BaseLayout
