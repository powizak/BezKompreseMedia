// Structured data (JSON-LD) for SEO — single source of truth for schema.org markup.
// Mirrors src/data/*.ts content (services, prices) and README contact info.
// Rendered by BaseLayout.astro via <script type="application/ld+json" set:html={...} />.

const SITE_URL = 'https://bezkompresemedia.cz';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const areaServed = [
  { '@type': 'City', name: 'Klatovy' },
  { '@type': 'AdministrativeArea', name: 'Plzeňský kraj' },
  { '@type': 'Country', name: 'Česko' },
];

// "od X Kč" price — rendered as PriceSpecification with minPrice
function priceFrom(minPrice: number): object {
  return {
    '@type': 'PriceSpecification',
    minPrice,
    priceCurrency: 'CZK',
  };
}

function offer(name: string, minPrice: number, description: string): object {
  return {
    '@type': 'Offer',
    name,
    description,
    priceSpecification: priceFrom(minPrice),
  };
}

function offerCatalog(name: string, offers: object[]): object {
  return {
    '@type': 'OfferCatalog',
    name,
    itemListElement: offers,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(index < items.length - 1 ? { item: `${SITE_URL}${item.path}` } : {}),
    })),
  };
}

// ── Organization / LocalBusiness (rendered on every page) ───────────────

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'BezKomprese Media',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo.png`,
  image: [`${SITE_URL}/og-image.png`, `${SITE_URL}/images/logo.png`],
  description:
    'Multimediální agentura z Klatov. Tvorba webových stránek, profesionální fotografie (svatby, portréty, firemní focení), video produkce a správa sociálních sítí.',
  telephone: '+420731466375',
  email: 'info@bezkompresemedia.cz',
  priceRange: 'od 250 Kč',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Tyršova 682/IV',
    addressLocality: 'Klatovy',
    postalCode: '339 01',
    addressCountry: 'CZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 49.391,
    longitude: 13.2947,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'https://schema.org/Wednesday',
      opens: '09:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'https://schema.org/Saturday',
      opens: '09:00',
      closes: '12:00',
    },
  ],
  founder: [
    { '@type': 'Person', name: 'Robin Valeš', jobTitle: 'CEO', taxID: '08850771' },
    { '@type': 'Person', name: 'Petr Motyčka', taxID: '10698671' },
    { '@type': 'Person', name: 'Jakub Prošek', taxID: '88204511' },
  ],
  sameAs: [
    'https://www.facebook.com/bezkomprese',
    'https://www.instagram.com/bez_komprese',
    'https://www.youtube.com/@BezKomprese',
    'https://www.twitch.tv/bezkomprese',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+420731466375',
    email: 'info@bezkompresemedia.cz',
    availableLanguage: ['cs'],
  },
  areaServed,
};

// ── WebSite + homepage (rendered on the homepage) ───────────────────────

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'BezKomprese Media',
  url: `${SITE_URL}/`,
  inLanguage: 'cs-CZ',
  publisher: { '@id': ORG_ID },
};

export const homePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  name: 'Multimediální služby: tvorba webu, fotografie, video | BezKomprese Media',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORG_ID },
  inLanguage: 'cs-CZ',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Tvorba webových stránek',
        url: `${SITE_URL}/web/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Fotografické služby',
        url: `${SITE_URL}/foto/`,
      },
      { '@type': 'ListItem', position: 3, name: 'Video produkce', url: `${SITE_URL}/video/` },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Správa sociálních sítí',
        url: `${SITE_URL}/socialni-site/`,
      },
    ],
  },
};

// ── Service pages ───────────────────────────────────────────────────────

export const fotoServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/foto/#service`,
  name: 'Fotografické služby',
  serviceType: 'Fotografie',
  url: `${SITE_URL}/foto/`,
  image: `${SITE_URL}/images/photos/svatby/DSC00213.jpg`,
  description:
    'Profesionální fotografie v Klatovech a okolí: svatby, portréty, párové a rodinné focení, firemní fotografie, reportáže a fotografie aut.',
  provider: { '@id': ORG_ID },
  areaServed,
  hasOfferCatalog: offerCatalog('Fotografické balíčky', [
    offer(
      'Základní svatební balíček',
      9000,
      'Zachycení svatebního obřadu, společné záběry s hosty a párové zachycení novomanželů (až 3 hodiny).',
    ),
    offer(
      'Standardní svatební balíček',
      18500,
      'Fotografie příprav, obřadu, hostiny, prvního tance a párové focení novomanželů (až 7 hodin).',
    ),
    offer(
      'Plnotučný svatební balíček',
      32000,
      'Fotografie i videoklip z celého svatebního dne (až 10 hodin).',
    ),
    offer(
      'Portrétní či párové focení',
      2200,
      '10 a více profesionálně upravených fotografií, až 1,5 hodiny focení.',
    ),
    offer(
      'Focení automobilů',
      2500,
      'Profesionální fotografie vozidel s důrazem na detail, až 1,5 hodiny focení.',
    ),
    offer('Firemní a reportážní focení', 1500, 'Focení na hodinové bázi (Kč/hod).'),
  ]),
};

export const videoServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/video/#service`,
  name: 'Video produkce',
  serviceType: 'Video produkce',
  url: `${SITE_URL}/video/`,
  description:
    'Profesionální video produkce: reklamní spoty, produktová videa, svatební filmy, hudební videoklipy, reportáže a časosběry.',
  provider: { '@id': ORG_ID },
  areaServed,
  hasOfferCatalog: offerCatalog('Video služby', [
    offer(
      'Reklamní video',
      1500,
      'Krátce, účinně, nezapomenutelně — reklamní spot na míru (Kč/hod).',
    ),
    offer(
      'Produktové video',
      1500,
      'Prezentace produktu, která vzbuzuje zájem a posiluje značku (Kč/hod).',
    ),
    offer('Svatební video', 9000, 'Filmové zachycení svatebního dne — příběh plný lásky a emocí.'),
    offer('Hudební videoklip', 1500, 'Vizuální zpracování hudebního klipu na míru (Kč/hod).'),
    offer(
      'Časosběrné video',
      2000,
      'Časosběry zachycující postup času s precizností (Letecké práce, Kč/hod).',
    ),
    offer('Reportážní video', 1500, 'Dokumentace akcí a příběhů s emoční hloubkou (Kč/hod).'),
  ]),
};

export const webServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/web/#service`,
  name: 'Tvorba webových stránek',
  serviceType: 'Webdesign a vývoj webu',
  url: `${SITE_URL}/web/`,
  image: `${SITE_URL}/images/webReferences/strelnicesklep.webp`,
  description:
    'Moderní responzivní webové stránky na míru: webdesign, vývoj, SEO optimalizace, e-commerce řešení, copywriting, webhosting a technický servis.',
  provider: { '@id': ORG_ID },
  areaServed,
  hasOfferCatalog: offerCatalog('Webové služby', [
    offer(
      'Webové stránky na míru',
      10000,
      'Kompletní tvorba webu včetně designu, vývoje, SEO a nasazení na hostingu.',
    ),
    offer('E-commerce řešení', 10000, 'Rozběhnutí efektivní e-commerce platformy.'),
    offer('SEO optimalizace', 1500, 'Zvyšování viditelnosti webu ve vyhledávačích (Kč/hod).'),
    offer(
      'Kódování a technický servis',
      1500,
      'Kompletní správa webu od založení do budoucna (Kč/hod).',
    ),
  ]),
};

export const socialServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/socialni-site/#service`,
  name: 'Správa sociálních sítí',
  serviceType: 'Správa sociálních médií',
  url: `${SITE_URL}/socialni-site/`,
  description:
    'Kompletní správa sociálních sítí: založení a nastavení profilů, tvorba obsahu, cílená reklama, kampaně, soutěže a analýza výkonu.',
  provider: { '@id': ORG_ID },
  areaServed,
  hasOfferCatalog: offerCatalog('Balíčky sociálních sítí', [
    offer(
      'Základní nastavení sociálních sítí',
      2500,
      'Nastavení stránky FB + IG, doplnění informací a 3 prvotní příspěvky.',
    ),
    offer(
      'Nastavení cílené reklamy',
      750,
      'Nastavení reklamy dle požadavků včetně provedení platby.',
    ),
    offer(
      'Reels / příspěvek',
      385,
      'Grafické zpracování reels/příspěvku včetně SEO optimalizovaného popisu.',
    ),
    offer('Příběh (Story)', 250, 'Grafické zpracování příběhu včetně SEO optimalizovaného popisu.'),
  ]),
};

// ── Other pages ─────────────────────────────────────────────────────────

export const cenikPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/cenik/#webpage`,
  url: `${SITE_URL}/cenik/`,
  name: 'Ceník multimediálních služeb | BezKomprese Media',
  description:
    'Ceník fotografických, video, webových a sociálních služeb. Všechny ceny jsou smluvní, u balíčků poskytujeme množstevní slevy.',
  inLanguage: 'cs-CZ',
  isPartOf: { '@id': WEBSITE_ID },
  mainEntity: offerCatalog('Ceník služeb', [
    offer('Svatba — základní balíček', 9000, 'Až 3 hodiny zachycení svatebního dne.'),
    offer('Svatba — standardní balíček', 18500, 'Až 7 hodin zachycení svatebního dne.'),
    offer('Svatba — plnotučný balíček', 32000, 'Až 10 hodin, fotografie + videoklip.'),
    offer('Portrétní či párové focení', 2200, '10 a více upravených fotografií.'),
    offer('Focení plechových miláčků (aut)', 2500, '10 a více upravených fotografií.'),
    offer('Nastavení sociálních sítí', 2500, 'Základní nastavení FB + IG včetně 3 příspěvků.'),
    offer('Nastavení reklamy', 750, 'Cílená reklama na sociálních sítích.'),
    offer('Reels / příspěvek', 385, 'Grafické zpracování včetně SEO popisu.'),
    offer('Příběh (Story)', 250, 'Grafické zpracování včetně SEO popisu.'),
    offer('Focení', 1500, 'Hodinová sazba (Kč/h).'),
    offer('Video', 1500, 'Hodinová sazba (Kč/h).'),
    offer('Letecké práce', 2000, 'Hodinová sazba (Kč/h).'),
    offer('Pokročilý postprocessing', 1000, 'Hodinová sazba (Kč/h).'),
    offer('Webové stránky', 10000, 'Web na míru včetně designu a nasazení.'),
    offer('Kódování', 1500, 'Hodinová sazba (Kč/h).'),
    offer('Další služby', 1000, 'Hodinová sazba (Kč/h).'),
  ]),
};

export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/contact/#webpage`,
  url: `${SITE_URL}/contact/`,
  name: 'Kontakt | BezKomprese Media',
  inLanguage: 'cs-CZ',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORG_ID },
};

export const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/nas-tym/#webpage`,
  url: `${SITE_URL}/nas-tym/`,
  name: 'Náš tým | BezKomprese Media',
  inLanguage: 'cs-CZ',
  isPartOf: { '@id': WEBSITE_ID },
  mainEntity: {
    '@type': 'Organization',
    '@id': ORG_ID,
    employee: [
      {
        '@type': 'Person',
        name: 'Robin Valeš',
        jobTitle: 'CEO, fotograf, kameraman, video editor',
        worksFor: { '@id': ORG_ID },
      },
      {
        '@type': 'Person',
        name: 'Petr Motyčka',
        jobTitle: 'Fotograf, kameraman, komunikace',
        worksFor: { '@id': ORG_ID },
      },
      {
        '@type': 'Person',
        name: 'Jakub Prošek',
        jobTitle: 'Web developer, AI implementace, automatizace',
        worksFor: { '@id': ORG_ID },
      },
    ],
  },
};

export const galeriePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/galerie/#webpage`,
  url: `${SITE_URL}/galerie/`,
  name: 'Galerie | BezKomprese Media',
  inLanguage: 'cs-CZ',
  isPartOf: { '@id': WEBSITE_ID },
  mainEntity: {
    '@type': 'ImageGallery',
    name: 'Galerie akcí BezKomprese Media',
    associatedMedia: [
      {
        '@type': 'ImageGallery',
        name: 'Winter Cup Rožmitál pod Třemšínem 2024',
        description: 'Fotografie ze závodů RSXV Buggy a Dakar Buggy na Winter Cupu v Rožmitále.',
      },
    ],
  },
};
