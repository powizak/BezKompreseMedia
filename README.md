# BezKomprese Media — Web

Statický web pro [bezkompresemedia.cz](https://bezkompresemedia.cz) postavený na [Astro](https://astro.build).

## Přehled

- Moderní avantgardní design s asymetrickým layoutem
- Statický web (HTML/CSS/JS + PHP formulář) pro rychlé načítání
- Responzivní design (mobile-first, 375px → ∞)
- Optimalizace obrázků (automatický WebP přes Astro)
- Cookie banner (CookieYes) a ochrana formuláře (hCaptcha)
- Bezpečnostní hlavičky, gzip komprese a browser caching přes `.htaccess`
- Automatický sitemap generátor

## Technologický stack

| Kategorie | Technologie |
|---|---|
| Framework | Astro 6.x (static output) |
| Styly | CSS custom properties (žádný preprocessor) |
| Fonty | Space Grotesk (nadpisy) + Inter (text) — 400, 700 |
| Formulář | PHP handler s hCaptcha ochranou |
| Hosting | WEDOS (Apache, PHP) |
| Cookie banner | CookieYes |
| Node.js | ≥ 22.12.0 |

## Struktura projektu

```
bkm-web/
├── public/                  # Statické soubory (kopírují se do dist/ beze změny)
│   ├── contact-handler.php  # PHP formulářový handler (hCaptcha validace)
│   ├── .htaccess            # Apache: HTTPS redirect, gzip, caching, security headers
│   ├── robots.txt           # SEO directives
│   ├── images/references/   # Loga referencí (PNG/WebP)
│   └── favicon*             # Favikony
├── src/
│   ├── pages/               # Stránky (Astro komponenty → routování podle názvu souboru)
│   │   ├── index.astro      # Homepage
│   │   ├── contact.astro    # Kontaktní stránka
│   │   ├── foto.astro       # Služba: Foto
│   │   ├── video.astro      # Služba: Video
│   │   ├── web.astro        # Služba: Web
│   │   ├── socialni-site.astro  # Služba: Sociální sítě
│   │   ├── galerie.astro    # Služba: Galerie
│   │   └── nas-tym.astro    # Náš tým
│   ├── components/          # Sekce homepage (Hero, Services, References, CTA, atd.)
│   ├── layouts/             # Sdílený layout (BaseLayout) s header/footer/nav
│   ├── styles/              # Globální CSS s design tokeny (barvy, mezery, typografie)
│   ├── scripts/             # JavaScript utility (scroll animace)
│   └── assets/              # Obrázky optimalizované Astrou při buildu (WebP)
├── astro.config.mjs         # Konfigurace Asta (site, trailingSlash, sitemap)
├── .env.example             # Šablona proměnných prostředí
└── package.json
```

## Lokální vývoj

```bash
# Instalace závislostí
npm install

# Spuštění dev serveru (http://localhost:4321)
npm run dev

# Produkční build
npm run build

# Náhled produkčního buildu
npm run preview
```

## Konfigurace

### Proměnné prostředí

Zkopírujte `.env.example` do `.env` a doplňte skutečné hodnoty:

```bash
cp .env.example .env
```

| Proměnná | Popis | Kde získat |
|---|---|---|
| `COOKIEYES_ID` | CookieYes site ID | [cookieyes.com](https://www.cookieyes.com/) → Settings |
| `HCAPTCHA_SITE_KEY` | hCaptcha site key (veřejná) | [dashboard.hcaptcha.com](https://dashboard.hcaptcha.com/) |
| `HCAPTCHA_SECRET_KEY` | hCaptcha secret key (tajná) | hCaptcha dashboard |

### CookieYes

V `src/layouts/BaseLayout.astro` je odkaz na CookieYes script. Aktuálně je nakonfigurované ID `a7112a29b80640e7b97f9df6` (hardcoded v layoutu). Pro změnu ID upravte URL scriptu v `<head>` sekci layoutu.

### hCaptcha

1. Zaregistrujte se na [hcaptcha.com](https://www.hcaptcha.com/)
2. Vytvořte nový site — přidejte doménu `bezkompresemedia.cz`
3. Site Key vložte do `src/components/ContactForm.astro` (nahraďte placeholder)
4. Secret Key vložte do `public/contact-handler.php` (nahraďte placeholder)

## Nasazení na WEDOS (FTP)

### Příprava

1. Spusťte produkční build:

   ```bash
   npm run build
   ```

2. Výsledný adresář `dist/` obsahuje vše pro nasazení:
   - Statické HTML stránky
   - Optimalizované obrázky (WebP)
   - CSS a JavaScript
   - PHP formulářový handler
   - `.htaccess` a `robots.txt`

### FTP nahrání

**Přihlášení:** Údaje najdete ve WEDOS administraci → Hosting → FTP

1. Připojte se na FTP (např. pomocí [FileZilla](https://filezilla-project.org/), [WinSCP](https://winscp.net/) nebo příkazovou řádkou)

2. **Smažte** starý obsah na serveru
   - Pokud na serveru běží WordPress nebo jiný starý web, smažte jeho soubory z document root
   - ⚠️ **Zálohujte si** `wp-config.php` a `wp-content/uploads/` pokud potřebujete zachovat data
   - Smažte vše kromě adresářů, které chcete zachovat

3. Nahrajte **celý obsah** adresáře `dist/` do document root na serveru
   - Všechny soubory a adresáře z `dist/` → do rootu webu
   - Struktura na serveru musí vypadat takto:

   ```
   /index.html
   /contact/index.html
   /foto/index.html
   /nas-tym/index.html
   /video/index.html
   /web/index.html
   /socialni-site/index.html
   /galerie/index.html
   /contact-handler.php
   /.htaccess
   /robots.txt
   /sitemap-index.xml
   /images/              ← loga referencí
   /_astro/              ← CSS, JS, optimalizované obrázky
   ```

4. **Ověřte** že PHP funguje — navštivte web a otestujte kontaktní formulář

### FTP přes příkazovou řádku (lftp)

```bash
# Build
npm run build

# Nahrání přes lftp (instalace: sudo apt install lftp)
lftp -u "FTP_USER,FTP_PASSWORD" "ftp://ftp.bezkompresemedia.cz" <<EOF
  mirror --reverse --delete --verbose dist/ /
  quit
EOF
```

Poznámka: WEDOS běžně nepodporuje SSH/rsync, proto je FTP primární metoda nasazení.

### Po nasazení — kontrolní seznam

- [ ] Web načte na `https://bezkompresemedia.cz/`
- [ ] HTTPS přesměrování funguje (http → https)
- [ ] Všechny navigační odkazy fungují (Domů, Náš tým, Foto, Video, Web, Sociální sítě, Galerie, Kontakt)
- [ ] Kontaktní formulář odesílá emaily (test s reálným hCaptcha)
- [ ] CookieYes banner se zobrazí
- [ ] Mobilní verze vypadá správně
- [ ] Rychlost načítání je dobrá ([PageSpeed Insights](https://pagespeed.web.dev/))
- [ ] Sitemap je dostupná na `/sitemap-index.xml`

## Údržba

### Přidání nové stránky

1. Vytvořte nový soubor v `src/pages/` (např. `src/pages/nova-stranka.astro`)
2. Použijte BaseLayout:

   ```astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   ---
   <BaseLayout title="Název stránky">
     <section>
       <h1>Nadpis</h1>
       <p>Obsah stránky...</p>
     </section>
   </BaseLayout>
   ```

3. Přidejte odkaz do navigace — upravte pole `navItems` v `src/layouts/BaseLayout.astro`
4. Spusťte `npm run build` a nahrajte `dist/` na server

### Změna obsahu

| Co měnit | Kde |
|---|---|
| Texty sekcí homepage | `src/components/*.astro` |
| Obrázky | `src/assets/` (Astro je automaticky optimalizuje) |
| Loga referencí | `public/images/references/` + upravte `References.astro` |
| Barvy a design tokeny | `src/styles/global.css` |
| SEO meta tagy | `src/layouts/BaseLayout.astro` (výchozí hodnoty) nebo props jednotlivých stránek |
| Kontantní údaje | Footer v `src/layouts/BaseLayout.astro` |
| Apache pravidla | `public/.htaccess` |

## Kontakt

- **Web:** [bezkompresemedia.cz](https://bezkompresemedia.cz)
- **Email:** info@bezkompresemedia.cz
- **Telefon:** +420 731 466 375
- **Adresa:** Tyršova 682/IV, 339 01 Klatovy

### Provozovatelé

- Robin Valeš (IČ: 08850771)
- Petr Motyčka (IČ: 10698671)
- Jakub Prošek (IČ: 88204511)

## Licence

© 2026 BezKomprese Media. Všechna práva vyhrazena.
