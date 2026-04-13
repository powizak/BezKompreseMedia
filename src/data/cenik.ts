export interface PricingCard {
  title: string;
  price: string;
  description: string;
  detail: string;
}

export interface PricingSection {
  id: string;
  title: string;
  description: string;
  cards: PricingCard[];
  note?: string;
  columns: 2 | 3 | 4;
}

export const cenikHero = {
  title: "Ceník",
  subtitle: "Ceník služeb",
  intro:
    "Jistě Vás zajímá, kolik takové služby stojí. Veškeré základní informace najdete níže na stránce. Všechny ceny jsou smluvní a v případě více typů služeb v balíčku zpravidla poskytujeme množstevní slevy – vše je o individuální domluvě.",
};

export const cenikSections: PricingSection[] = [
  {
    id: "svatby",
    title: "Svatby",
    description:
      "Svatební den je důležitý milník v životě každého páru. Proto ke každé svatbě přistupujeme individuálně a snažíme se maximálně přizpůsobit konkrétní události. Rádi Vám zprostředkujeme nezapomenutelné fotografie, ale i dojemné video.",
    columns: 3,
    cards: [
      {
        title: "Základní balíček",
        price: "9 000 Kč",
        description:
          "Zachycení svatebního obřadu, společné záběry s hosty a párové zachycení novomanželů",
        detail: "Maximální délka 3 hodiny",
      },
      {
        title: "Standardní balíček",
        price: "18 500 Kč",
        description:
          "Zachycení příprav, svatebního obřadu, společné záběry s hosty, hostiny, prvního tance a párové zachycení novomanželů",
        detail: "Maximální délka 7 hodin",
      },
      {
        title: "Plnotučný balíček",
        price: "32 000 Kč",
        description:
          "Fotografie a videoklip z příprav, svatebního obřadu, společné záběry s hosty, hostiny, prvního tance a párové zachycení novomanželů",
        detail: "Maximální délka 10 hodin",
      },
    ],
    note: "Součástí každého balíčku je předsvatební schůzka, kde se vzájemně seznámíme a sdělíte nám Vaše představy. V ceně je zahrnuta doprava v okruhu 20 km od Klatov, dále pak dle ceníku uvedeného níže.",
  },
  {
    id: "portretni-foceni",
    title: "Portrétní či párové focení",
    description:
      "Párové či portrétní focení může být skvělý způsob, jak zachytit krásné okamžiky a vytvořit trvalé vzpomínky. Naše služby nabízejí profesionální fotografie, které zdůrazňují Vaši osobnost a vztah. Každá fotografie je pečlivě upravena, aby zachytila vaši jedinečnost a krásu.",
    columns: 2,
    cards: [
      {
        title: "Portrétní či párové focení",
        price: "2 200 Kč",
        description: "10 a více upravených fotografií",
        detail: "Maximální délka 1,5 hodiny",
      },
      {
        title: "Focení Vašich plechových miláčků",
        price: "2 500 Kč",
        description: "10 a více upravených fotografií",
        detail: "Maximální délka 1,5 hodiny",
      },
    ],
    note: "Focení probíhá v ateliéru v Klatovech nebo na předem smluveném místě",
  },
  {
    id: "socialni-site",
    title: "Správa sociálních sítí",
    description:
      "Správa sociálních sítí není jen o bezhlavém přidávání příspěvků. Pro nejlepší výsledky je potřeba také vědět kdy, kam a jaké přidat. Jaké nastavit tagy, slova, jaké typy příspěvků, ale tím Vás nechceme zatěžovat. Svěřte své sociální sítě do našich rukou a jistě nebudete litovat 😉",
    columns: 4,
    cards: [
      {
        title: "Základní nastavení Sociálních sítí",
        price: "2 500 Kč",
        description:
          "Nastavení stránky FB + IG, doplnění správných informací, přidání 3 prvotních příspěvků",
        detail: "Balíček může být i ponížen o již nastavené",
      },
      {
        title: "Nastavení reklamy",
        price: "750 Kč",
        description:
          "Nastavení cílené reklamy dle Vašich požadavků včetně provedení platby (částka vložena do reklamy není součástí balíčku)",
        detail: "Investice do správně nastavené reklamy se doopravdy vyplatí",
      },
      {
        title: "Reels / příspěvek",
        price: "385 Kč",
        description:
          "Grafické zpracování reels/příspěvku včetně SEO optimalizovaného popisu",
        detail: "Každý příspěvek je potřeba přidávat efektivně, nechte to na nás",
      },
      {
        title: "Příběh",
        price: "250 Kč",
        description:
          "Grafické zpracování příběhu včetně SEO optimalizovaného popisu",
        detail: "Příběh je ideální pro ty, kteří Vás již sledují, i na tom záleží",
      },
    ],
    note: "Veškeré tyto služby jsou samozřejmě dodávány v kooperaci s Vámi – vždy máme připravený plán, co a jak kdy a kam přidáme a dokážeme Vám vysvětlit, co proč děláme. Víme, že naše postupy fungují a již mnoho firem se o tom přesvědčilo.",
  },
  {
    id: "dalsi-sluzby",
    title: "Další služby (orientační ceny)",
    description:
      "Jak jsme psali na začátku, vše je o individuální nabídce, a tak Vám níže napíšeme i nějaké orientační ceny jednotlivých prací. Snažíme se naše služby vždy poskytovat komplexně, a tak toto necháváme až nakonec.",
    columns: 4,
    cards: [
      {
        title: "Focení",
        price: "od 1 500 Kč/h",
        description: "",
        detail: "",
      },
      {
        title: "Video",
        price: "od 1 500 Kč/h",
        description: "",
        detail: "",
      },
      {
        title: "Letecké práce",
        price: "od 2 000 Kč/h",
        description: "",
        detail: "",
      },
      {
        title: "Pokročilý postprocessing",
        price: "od 1 000 Kč/h",
        description: "",
        detail: "",
      },
      {
        title: "Webové stránky",
        price: "od 10 000 Kč",
        description: "",
        detail: "",
      },
      {
        title: "Kódování",
        price: "od 1 500 Kč/h",
        description: "",
        detail: "",
      },
      {
        title: "Doprava",
        price: "od 7 Kč/km",
        description: "",
        detail: "",
      },
      {
        title: "Další služby",
        price: "od 1 000 Kč/h",
        description: "",
        detail: "",
      },
    ],
  },
];
