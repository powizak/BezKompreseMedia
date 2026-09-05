// webmcp.ts — WebMCP (W3C draft) tool registration for AI agents in the browser.
// Spec: https://webmachinelearning.github.io/webmcp · Chrome docs: https://developer.chrome.com/docs/ai/webmcp
//
// The page acts as an in-page MCP server: we expose read-only info tools
// (contact, pricing, page info) and navigation tools (service pages, inquiry).
// All data comes from src/data/*.ts — no duplicated content.
//
// WebMCP is a progressive enhancement: on browsers without the API
// (anything but recent Chrome) this script is a harmless no-op.
// Requires HTTPS (secure context); gated by the `tools` Permissions-Policy
// which defaults to `self` and is set explicitly in public/.htaccess.

import { siteContact, contactAddress, contactOpeningHours } from '../data/contact.ts';
import { cenikSections } from '../data/cenik.ts';

// ── Minimal WebMCP typings (not yet in TS lib.dom) ──────────────────────

interface WebMcpContent {
  type: 'text';
  text: string;
}

interface WebMcpToolResult {
  content: WebMcpContent[];
}

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (args: Record<string, unknown>) => Promise<WebMcpToolResult>;
}

interface WebMcpModelContext {
  registerTool: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => Promise<void>;
}

function getModelContext(): WebMcpModelContext | undefined {
  // Chrome 150+ exposes document.modelContext; older origin-trial builds navigator.modelContext.
  const doc = document as Document & { modelContext?: WebMcpModelContext };
  const nav = navigator as Navigator & { modelContext?: WebMcpModelContext };
  const mc = doc.modelContext ?? nav.modelContext;
  return mc && typeof mc.registerTool === 'function' ? mc : undefined;
}

function textResult(text: string): WebMcpToolResult {
  return { content: [{ type: 'text', text }] };
}

// ── Tool data (single source: src/data) ─────────────────────────────────

const pageTargets: Record<string, string> = {
  home: '/',
  foto: '/foto/',
  video: '/video/',
  web: '/web/',
  'socialni-site': '/socialni-site/',
  galerie: '/galerie/',
  cenik: '/cenik/',
  kontakt: '/contact/',
};

const pricingText = [
  'Ceník BezKomprese Media (všechny ceny jsou smluvní, orientační; u kombinací poskytujeme množstevní slevy):',
  ...cenikSections.map(
    (section) =>
      `${section.title}: ` +
      section.cards
        .filter((card) => card.price)
        .map((card) => `${card.title} ${card.price}`)
        .join('; '),
  ),
  `Kontakt pro nezávaznou poptávku: ${siteContact.phone}, ${siteContact.email}, https://bezkompresemedia.cz/contact/`,
].join('\n');

const contactText = [
  `BezKomprese Media — ${contactAddress.name}`,
  `${contactAddress.street}, ${contactAddress.city}`,
  `Telefon: ${contactAddress.phone}`,
  `E-mail: ${contactAddress.email}`,
  'Otevírací doba: ' + contactOpeningHours.map((h) => `${h.day} ${h.time}`).join(', '),
  'Poptávkový formulář: https://bezkompresemedia.cz/contact/',
].join('\n');

// ── Tool registration ───────────────────────────────────────────────────

function registerWebMcpTools(): void {
  const mc = getModelContext();
  if (!mc) return; // WebMCP not supported — graceful no-op

  const controller = new AbortController();
  const options = { signal: controller.signal };

  void mc.registerTool(
    {
      name: 'navigate',
      description:
        'Přejde na stránku webu bezkompresemedia.cz. Služby: foto (fotografické služby), video (video produkce), web (tvorba webových stránek), socialni-site (správa sociálních sítí). Dále: cenik, galerie, kontakt, home.',
      inputSchema: {
        type: 'object',
        properties: {
          target: {
            type: 'string',
            enum: Object.keys(pageTargets),
            description: 'Cílová stránka',
          },
        },
        required: ['target'],
      },
      async execute(args) {
        const target = String(args.target ?? '');
        const href = pageTargets[target];
        if (!href)
          return textResult(
            `Neznámý cíl "${target}". Dostupné: ${Object.keys(pageTargets).join(', ')}.`,
          );
        location.assign(href);
        return textResult(`Naviguji na ${location.origin}${href}`);
      },
    },
    options,
  );

  void mc.registerTool(
    {
      name: 'get_contact_info',
      description:
        'Vrátí kontaktní údaje BezKomprese Media (telefon, e-mail, adresa, otevírací doba) pro spojení s multimediální agenturou v Klatovech.',
      inputSchema: { type: 'object', properties: {} },
      annotations: { readOnlyHint: true },
      async execute() {
        return textResult(contactText);
      },
    },
    options,
  );

  void mc.registerTool(
    {
      name: 'get_pricing',
      description:
        'Vrátí orientační ceník služeb BezKomprese Media: svatby, portrétní focení, správa sociálních sítí, webové stránky, focení a video na hodinové bázi.',
      inputSchema: { type: 'object', properties: {} },
      annotations: { readOnlyHint: true },
      async execute() {
        return textResult(pricingText);
      },
    },
    options,
  );

  void mc.registerTool(
    {
      name: 'get_page_info',
      description:
        'Vrátí informace o aktuálně otevřené stránce (URL, titulek, jazyk) — užitečné pro orientaci agenta na webu.',
      inputSchema: { type: 'object', properties: {} },
      annotations: { readOnlyHint: true },
      async execute() {
        return textResult(
          `URL: ${location.href}\nTitulek: ${document.title}\nJazyk: ${document.documentElement.lang}`,
        );
      },
    },
    options,
  );

  void mc.registerTool(
    {
      name: 'start_inquiry',
      description:
        'Otevře nezávaznou poptávkovou formu BezKomprese Media (kontaktní formulář). Použij, když chce uživatel poptat služby (focení, video, web, sociální sítě).',
      inputSchema: { type: 'object', properties: {} },
      async execute() {
        location.assign('/contact/#form');
        return textResult('Otevírám poptávkový formulář na https://bezkompresemedia.cz/contact/');
      },
    },
    options,
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => registerWebMcpTools(), { once: true });
} else {
  registerWebMcpTools();
}
