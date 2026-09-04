// FAQ content — single source of truth for the visible FAQ section (FaqSection.astro)
// and the FAQPage JSON-LD (schema.ts). Answers must stay plain text (no markup)
// so the rendered section and structured data match exactly; optional `links`
// linkify a phrase in the rendered version only (JSON-LD keeps plain text).

export interface FaqLink {
  /** Exact phrase in the answer to turn into a link (must occur exactly once). */
  text: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  links?: FaqLink[];
}

export const faqItems: FaqItem[] = [
  {
    question: 'Jaké služby BezKomprese Media poskytuje?',
    answer:
      'Jsme multimediální agentura z Klatov. Tvoříme moderní webové stránky, poskytujeme fotografické služby (svatby, portréty, rodinné a firemní focení, reportáže, fotografie aut), věnujeme se video produkci (reklamy, produktová a svatební videa, hudební klipy, časosběry) a komplexně spravujeme sociální sítě.',
    links: [
      { text: 'webové stránky', href: '/web/' },
      { text: 'fotografické služby', href: '/foto/' },
      { text: 'video produkci', href: '/video/' },
      { text: 'spravujeme sociální sítě', href: '/socialni-site/' },
    ],
  },
  {
    question: 'V jaké oblasti působíte? Dojedete i za Klatovy?',
    answer:
      'Sídlo máme v Klatovech na Tyršově ulici, působíme v celém Plzeňském krahu i dále — pracujeme pro klienty po celé České republice. U svateb je doprava v okruhu 20 km od Klatov v ceně balíčku, nadále ji účtujeme 7 Kč/km.',
  },
  {
    question: 'Kolik vaše služby stojí?',
    answer:
      'Všechny ceny jsou smluvní a závisí na rozsahu zakázky. Orientačně: svatební balíčky od 9 000 Kč, portrétní focení od 2 200 Kč, webové stránky od 10 000 Kč a správa sociálních sítí od 250 Kč. Při kombinaci více služeb poskytujeme množstevní slevy — kompletní přehled najdete na stránce Ceník.',
    links: [{ text: 'stránce Ceník', href: '/cenik/' }],
  },
  {
    question: 'Jak dlouho trvá tvorba webových stránek?',
    answer:
      'Náročnost se odvíjí od rozsahu — od jednoduché firemní prezentace po e-shop s rezervačním systémem. Postupujeme ve čtyřech krocích: konzultace a analýza požadavků, návrh konceptu, zajištění technického pozadí a vývoj, testování a předání. Přesný termín vždy domluvíme na úvodní schůzce.',
  },
  {
    question: 'Jak dlouho trvá dodání fotografií či videa?',
    answer:
      'Každou zakázku pečlivě zpracováváme — fotografie upravujeme jednotlivě, videa stříháme a barevně ladíme. Dodání se odvíjí od rozsahu: u portrétního focení mluvíme o dnech, u svatebních fotografií a videa o týdnech. Přesný termín potvrdíme vždy předem při objednávce.',
  },
  {
    question: 'Můžu si objednat více služeb najednou?',
    answer:
      'Ano — právě kombinace služeb je naše silná stránka. Nejčastější kombinací je svatební fotografie s videem, u firem pak komplexní balíček web + focení + správa sociálních sítí. U kombinovaných zakázek poskytujeme množstevní slevy.',
  },
  {
    question: 'Jak probíhá objednávka?',
    answer:
      'Nejjednodušší je vyplnit nezávaznou poptávku v kontaktním formuláři, zavolat na +420 731 466 375 nebo napsat na info@bezkompresemedia.cz. Domluvíme si schůzku — osobně i online — probereme Vaše představy a připravíme nabídku na míru.',
    links: [{ text: 'kontaktním formuláři', href: '/contact/#form' }],
  },
];
