// Build-time JSON export of site data for the PHP MCP server (public/mcp.php).
// Keeps a single source of truth: the same src/data/*.ts modules that render
// the pages are exported here and read by mcp.php at request time.
// Excluded from the sitemap in astro.config.mjs.
import type { APIRoute } from 'astro';
import { siteContact, contactAddress, contactOpeningHours } from '../data/contact';
import { cenikSections } from '../data/cenik';
import { faqItems } from '../data/faq';
import { fotoHero } from '../data/foto';
import { videoHero } from '../data/video';
import { webHero } from '../data/web';
import { socialHero } from '../data/social';

export const GET: APIRoute = () => {
  const data = {
    services: [
      {
        name: 'Tvorba webových stránek',
        url: 'https://bezkompresemedia.cz/web/',
        description: webHero.intro,
      },
      {
        name: 'Fotografické služby',
        url: 'https://bezkompresemedia.cz/foto/',
        description: fotoHero.intro,
      },
      {
        name: 'Video produkce',
        url: 'https://bezkompresemedia.cz/video/',
        description: videoHero.intro,
      },
      {
        name: 'Správa sociálních sítí',
        url: 'https://bezkompresemedia.cz/socialni-site/',
        description: socialHero.intro,
      },
    ],
    pricing: cenikSections.map((section) => ({
      section: section.title,
      note: section.note ?? null,
      items: section.cards
        .filter((card) => card.price)
        .map((card) => ({
          name: card.title,
          price: card.price,
          description: card.description || null,
          detail: card.detail || null,
        })),
    })),
    contact: {
      phone: siteContact.phone,
      email: siteContact.email,
      address: `${contactAddress.name}, ${contactAddress.street}, ${contactAddress.city}`,
      openingHours: contactOpeningHours.map((h) => `${h.day}: ${h.time}`),
      inquiryForm: 'https://bezkompresemedia.cz/contact/',
    },
    faq: faqItems.map((item) => ({ question: item.question, answer: item.answer })),
  };

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
