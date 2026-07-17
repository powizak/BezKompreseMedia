# BezKomprese Media — Web

[![Build & Deploy](https://github.com/powizak/BezKompreseMedia/actions/workflows/deploy.yml/badge.svg)](https://github.com/powizak/BezKompreseMedia/actions/workflows/deploy.yml)

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
| Fonty | Space Grotesk (nadpisy) + Inter (text) — 400, 700, self-hosted přes [Fontsource](https://fontsource.org/) |
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
│   ├── images/              # Fotogalerie (servírované beze změny, s _600.webp náhledy)
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

### Proměnné prostředí (lokální vývoj)

Zkopírujte `.env.example` do `.env` a doplňte skutečné hodnoty:

```bash
cp .env.example .env
```

| Proměnná | Popis | Kde získat |
|---|---|---|
| `PUBLIC_COOKIEYES_ID` | CookieYes site ID | [cookieyes.com](https://www.cookieyes.com/) → Settings |
| `PUBLIC_HCAPTCHA_SITE_KEY` | hCaptcha site key (veřejná) | [dashboard.hcaptcha.com](https://dashboard.hcaptcha.com/) |
| `HCAPTCHA_SECRET_KEY` | hCaptcha secret key (tajná) | hCaptcha dashboard |

Hodnoty s prefixem `PUBLIC_` se při buildu zapečou do HTML. Nikde v kódu nejsou hardcoded — vše se čte z `.env` (lokálně) nebo z GitHub Secrets (CI).

## Nasazení (GitHub Actions → WEDOS FTP)

Každý push do větve `master` automaticky spustí build a nahraje `dist/` na WEDOS přes FTP (`.github/workflows/deploy.yml`). Workflow jde spustit i ručně (Actions → Build & Deploy → Run workflow).

### Potřebné GitHub Secrets

V repozitáři: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Popis |
|---|---|
| `PUBLIC_HCAPTCHA_SITE_KEY` | hCaptcha site key (zapeče se do HTML) |
| `PUBLIC_COOKIEYES_ID` | CookieYes site ID (zapeče se do HTML) |
| `HCAPTCHA_SECRET_KEY` | hCaptcha secret key — při deployi se zapíše do `config.php` na serveru (přímý přístup k souboru blokuje `.htaccess`) |
| `FTP_SERVER` | FTP host z WEDOS administrace (Hosting → FTP), např. `ftp.bezkompresemedia.cz` |
| `FTP_USER` | FTP uživatel |
| `FTP_PASSWORD` | FTP heslo |

FTP účet vede přímo do document rootu, proto workflow nahrává do `./` (`server-dir` v `deploy.yml`). Pozor: dřívější hodnota `www/` vytvořila na serveru vnořenou složku `/www/` — pokud změníte hosting, ověřte, kam FTP účet skutečně směřuje.

Poznámka: WEDOS nepodporuje SSH/rsync ani nastavení proměnných prostředí, proto FTP + generovaný `config.php`.

### E-mail — doručitelnost formuláře (DNS)

Kontaktní formulář odesílá e-maily přes PHP `mail()` ze serveru WEDOS. Aby nepadaly do spamu, musí mít doména `bezkompresemedia.cz` nastavené autentizační DNS záznamy (WEDOS admin → DNS):

| Typ | Název | Hodnota |
|---|---|---|
| TXT (SPF) | `@` (kořen domény) | `v=spf1 include:_spf.wedos.net ~all` |
| TXT (DMARC) | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@bezkompresemedia.cz` |
| DKIM | — | zapnout v administraci WEDOSu (WEDOS klíč sám vygeneruje a zveřejní) |

DKIM je nejdůležitější — přežije i přeposílání (`info@` je forward na Gmail). DMARC začněte na `p=none` (monitoring), po ověření lze zpřísnit na `p=quarantine`. Ověření: pošlete testovací poptávku a v hlavičce hledejte `spf=pass` a `dkim=pass`, nebo použijte [mail-tester.com](https://www.mail-tester.com/).

**Kód (`public/contact-handler.php`) je záměrně nastaven tak, že `From:` je vždy doména** (`info@bezkompresemedia.cz`), nikdy adresa návštěvníka — jinak Gmail kontroluje DMARC cizí domény (gmail.com) a e-mail tvrdě propadne. Adresa návštěvníka je v `Reply-To`.

### Po nasazení — kontrolní seznam

- [ ] Web načte na `https://bezkompresemedia.cz/`
- [ ] HTTPS a www → bez-www přesměrování funguje
- [ ] Všechny navigační odkazy fungují (Domů, Náš tým, Foto, Video, Web, Sociální sítě, Galerie, Ceník, Kontakt)
- [ ] Kontaktní formulář odesílá emaily (test s reálným hCaptcha) a přesměruje na `/dekujeme/`
- [ ] CookieYes banner se zobrazí
- [ ] Mobilní verze vypadá správně
- [ ] Rychlost načítání je dobrá ([PageSpeed Insights](https://pagespeed.web.dev/))
- [ ] Sitemap je dostupná na `/sitemap-index.xml`

## Řešení problémů (Troubleshooting)

### Chyba Rollupu na Windows (Missing optional dependency)

Pokud se při spuštění `npm run dev` nebo `npm run build` na Windows objeví chyba:
`Error: Cannot find module @rollup/rollup-win32-x64-msvc. npm has a bug related to optional dependencies...`

**Příčina:**
Některé verze `npm` na Windows špatně zpracovávají volitelné závislosti (`optionalDependencies`), zejména pokud byl `package-lock.json` generován na Linuxu.

**Řešení:**
V projektu jsme toto ošetřili vynucením instalace Windows binárek přes `dependencies` v `package.json`. Pokud by se chyba opakovala:
1. Smažte `node_modules` a `package-lock.json`.
2. Spusťte `npm install`.
3. Pokud chyba přetrvává, nainstalujte konkrétní balíčky ručně:
   ```bash
   npm install @rollup/rollup-win32-x64-msvc @img/sharp-win32-x64
   ```

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
| Loga referencí | `src/assets/references/` + upravte `References.astro` |
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
