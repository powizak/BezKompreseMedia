export interface Category {
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface PortfolioItem {
  title: string;
  tags: string[];
  url: string;
  urlText: string;
  image: string;
}

export const webHero = {
  title: "WEB",
  subtitle: "Designujeme moderní a responzivní webové stránky, které zdůrazňují unikátnost vaší firmy.",
  intro: "Naše webové prezentace jsou více než jen esteticky příjemné stránky. Jsou to digitální prostředky, které reflektují jedinečnost Vaší firmy. S důrazem na moderní design a responzivitu vytváříme stránky, které nejen přitahují, ale také udržují návštěvníky.",
};

export const webCategories: Category[] = [
  { title: "Webdesign a Vývoj", description: "Vývoj špičkových webů na míru s kreativním designem." },
  { title: "SEO Optimalizace", description: "Zvyšujeme viditelnost vašeho webu pomocí SEO." },
  { title: "E-commerce Řešení", description: "Rozbíháme efektivní e-commerce platformy." },
  { title: "Copywriting a Obsahový Marketing", description: "Píšeme texty, které oslovují a angažují." },
  { title: "Technický servis", description: "Postaráme se o kompletní správu Vašeho webu od založení po správu do budoucna." },
  { title: "Responzivita", description: "Vaše weby budou zobrazitelné na všech typech zařízení." },
];

export const webProcessIntro = "Co vše od Vás potřebujeme vědět a jak budeme postupovat? To se dozvíte právě zde. Pokud se chcete podívat rovnou na naše realizace, jsou o kousek níže.";

export const webProcessSteps: ProcessStep[] = [
  { number: "1", title: "Konzultace a Analýza požadavků", description: "Na začátku probíhá setkání zaměřené na pochopení vašich potřeb a cílů. Následuje detailní analýza konkurence a specifik vašeho projektu." },
  { number: "2", title: "Návrh Konceptu a jeho schválení", description: "Na základě analýzy Vašich potřeb, cílů a představ Vám navrhneme ideální formát webu vč. designových prvků, v této fázi se bude jednat o osobní či online schůzku, abychom se co nejlépe domluvili a vzali v potaz Vaše případné připomínky" },
  { number: "3", title: "Obstarání technického pozadí a vývoj", description: "Zařídíme Vám nejspolehlivější webhosting, který můžete u nás sehnat za velmi příznivou cenu a k němu samozřejmě i doménu. Vše nastavíme, od zabezpečení webu, přes certifikáty až po emailové schránky. Vytvoříme web s důrazem na Vaše požadavky a uživatelský zážitek." },
  { number: "4", title: "Testování a předání", description: "Důkladně otestujeme web na různých zařízeních a prohlížečích. Provádíme finální úpravy na základě připomínek a předáváme kompletní a optimalizovaný web." },
];

export const webPortfolio: PortfolioItem[] = [
  {
    title: "Apartmány nad Rybníkem - Železná Ruda",
    tags: ["Vícejazyčná verze webu", "SEO optimalizace", "Responzivní web", "Copywriting", "Implementace bookovacího systému", "Webhosting"],
    url: "www.apartmentszeleznaruda.cz",
    urlText: "www.apartmentszeleznaruda.cz",
    image: "/images/webReferences/ApartmentsPrezentaceLoop.webp",
  },
  {
    title: "BezKomprese Servis",
    tags: ["Vyvinuto pomocí AI", "SEO optimalizace", "Responzivní web", "Copywriting", "Webhosting", "Extrémně rychlý web"],
    url: "www.bezkompreseservis.cz",
    urlText: "www.bezkompreseservis.cz",
    image: "/images/webReferences/bkservisweb.webp",
  },
];
