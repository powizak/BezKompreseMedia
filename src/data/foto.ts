export interface Category {
  title: string;
  description: string;
}

export interface GallerySection {
  title: string;
  description: string;
}

export const fotoHero = {
  title: "FOTO",
  subtitle: "Zachycujeme Vaše důležité momenty a vzpomínky.",
  intro: "Ve firmě Bezkomprese media přistupujeme k fotografii jako k umění zachycování okamžiků. Naše fotografické služby nejsou pouze o pořizování snímků; jsou o zachycení podstaty chvilek a přetvoření jich na nezapomenutelné vzpomínky. Nabízíme své služby jak jednotlivcům, tak firemním zákazníkům, a to vždy na profesionální úrovni!",
};

export const fotoCategories: Category[] = [
  { title: "Svatby", description: "Vytváříme nezapomenutelné video vzpomínky z Vaší svatby." },
  { title: "Korporátní zákazníci", description: "Profesionální fotografie pro vaše firemní vizuály a události." },
  { title: "Portréty", description: "Zachycujeme jedinečnost a krásu v každém portrétu." },
  { title: "Rodinné focení", description: "Společně tvoříme poutavé rodinné vzpomínky na celý život pro generace." },
  { title: "Reportáže", description: "Fotografie, které vyprávějí silné příběhy a zachycují okamžiky." },
  { title: "Auta", description: "Vyfotografujeme Vaše vozidlo v tom nejlepším světle, každý detail se počítá." },
];

export const fotoGalleries: GallerySection[] = [
  { title: "Svatební fotografie", description: "Naše fotografie svateb jsou více než jen záznamem události – jsou emocionální cestou, která zvýrazňuje lásku a radost novomanželů." },
  { title: "Korporátní zákazníci", description: "S důrazem na firemní identitu přinášíme fotografie, které zaujmou a osloví Vaše potencionální zákazníky." },
  { title: "Portréty", description: "Každý portrét, který vytvoříme, je jedinečným vyjádřením osobnosti a krásy jednotlivce." },
  { title: "Rodinné focení", description: "S láskou a trpělivostí zachycujeme radostné chvíle plné rodinné sounáležitosti a poutavých momentů." },
  { title: "Reportáže", description: "Bez ohledu na to, zda dokumentujeme kulturní akce, sportovní události nebo každodenní život. Naším cílem je zachytit autentičnost a atmosféru daného okamžiku." },
  { title: "Auta", description: "S inovativními technikami a kreativním přístupem přinášíme fotografie, které přesně odhalují jedinečnost a krásu každého automobilu." },
];

export const fotoGalleryNote = "Kromě ukázek níže se můžete podívat i na veškeré naše veřejné galerie ZDE.";
