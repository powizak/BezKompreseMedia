export interface Category {
  title: string;
  description: string;
}

export interface PhotoItem {
  src: string;
  alt: string;
}

export interface GallerySection {
  title: string;
  description: string;
  photos: PhotoItem[];
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

const svatbyPhotos: PhotoItem[] = [
  { src: "/images/photos/svatby/DSC00213.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/DSC00443.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/PM_photo-114.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/PM_photo-149.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/PM_photo-15.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/PM_photo-17.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/PM_photo-2-1.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/PM_photo-204.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/PM_photo-24-1.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/PM_photo-25.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/PM_photo-29.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/PM_photo-3-1.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/PM_photo-31.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/PM_photo-47.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/foto_10.jpg", alt: "Svatební fotografie" },
  { src: "/images/photos/svatby/rakovnik_002.jpg", alt: "Svatební fotografie" },
];

const portretyPhotos: PhotoItem[] = [
  { src: "/images/photos/portrety/portfolio-6.jpg", alt: "Portrét" },
  { src: "/images/photos/portrety/PM_photo-1-4.jpg", alt: "Portrét" },
  { src: "/images/photos/portrety/PM_photo-12-1.jpg", alt: "Portrét" },
  { src: "/images/photos/portrety/PM_photo-12.jpg", alt: "Portrét" },
  { src: "/images/photos/portrety/PM_photo-5.jpg", alt: "Portrét" },
  { src: "/images/photos/portrety/PM_photo-9-1.jpg", alt: "Portrét" },
  { src: "/images/photos/portrety/PORTFOLIO-4.jpg", alt: "Portrét" },
  { src: "/images/photos/portrety/foto_01.jpg", alt: "Portrét" },
];

const rodinaPhotos: PhotoItem[] = [
  { src: "/images/photos/rodina/skvosty_13.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/DSC03544.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/DSC07488.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-1-2-1.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-1-2-2.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-116-1.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-14.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-2-2.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-21-1.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-21-2.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-217.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-218.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-23.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-24-2.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-3-3.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-33.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-34-1.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-35.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-39.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-59.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-7-1.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-7.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-71.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-75.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-77.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-91.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/PM_photo-fotokoutek-38.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/ROB03327.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/denik_34.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/foto-15.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/sti_1.jpg", alt: "Rodinné focení" },
  { src: "/images/photos/rodina/sti_2.jpg", alt: "Rodinné focení" },
];

const reportazPhotos: PhotoItem[] = [
  { src: "/images/photos/reportaz/2018-skvosty_13.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/DSC07488.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-116-1.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-21-1.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-21-2.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-217.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-218.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-23.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-24-2.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-33.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-34-1.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-39.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-59.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-7-1.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-7.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-71.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-75.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-77.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-91.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/PM_photo-fotokoutek-38.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/denik_34.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/foto-15.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/sti_1.jpg", alt: "Reportážní fotografie" },
  { src: "/images/photos/reportaz/sti_2.jpg", alt: "Reportážní fotografie" },
];

const korporatPhotos: PhotoItem[] = [
  { src: "/images/photos/korporat/07-2020-portfolio-6.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/2018-skvosty_13.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/DSC03544.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/DSC07488.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-1-2-1.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-1-2-2.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-1-4.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-116-1.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-12-1.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-12.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-14.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-17.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-2-1.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-2-2.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-21-1.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-21-2.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-217.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-218.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-23.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-24-1.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-24-2.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-25.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-29.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-3-1.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-3-3.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-33.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-34-1.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-35.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-39.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-5.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-59.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-7-1.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-7.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-71.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-75.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-77.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-9-1.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-91.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PM_photo-fotokoutek-38.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/PORTFOLIO-4.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/ROB03327.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/denik_34.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/foto-15.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/foto_01.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/foto_10.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/rakovnik_002.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/sti_1.jpg", alt: "Korporátní fotografie" },
  { src: "/images/photos/korporat/sti_2.jpg", alt: "Korporátní fotografie" },
];

const autaPhotos: PhotoItem[] = [
  { src: "/images/photos/auta/2018-skvosty_13.jpg", alt: "Autofotografie" },
  { src: "/images/photos/auta/DSC07488.jpg", alt: "Autofotografie" },
  { src: "/images/photos/auta/PM_photo-21-2.jpg", alt: "Autofotografie" },
  { src: "/images/photos/auta/PM_photo-24-2.jpg", alt: "Autofotografie" },
  { src: "/images/photos/auta/PM_photo-7-1.jpg", alt: "Autofotografie" },
  { src: "/images/photos/auta/foto-15.jpg", alt: "Autofotografie" },
  { src: "/images/photos/auta/sti_1.jpg", alt: "Autofotografie" },
  { src: "/images/photos/auta/sti_2.jpg", alt: "Autofotografie" },
];

export const fotoGalleries: GallerySection[] = [
  { title: "Svatební fotografie", description: "Naše fotografie svateb jsou více než jen záznamem události – jsou emocionální cestou, která zvýrazňuje lásku a radost novomanželů.", photos: svatbyPhotos },
  { title: "Portréty", description: "Každý portrét, který vytvoříme, je jedinečným vyjádřením osobnosti a krásy jednotlivce.", photos: portretyPhotos },
  { title: "Rodinné focení", description: "S láskou a trpělivostí zachycujeme radostné chvíle plné rodinné sounáležitosti a poutavých momentů.", photos: rodinaPhotos },
  { title: "Reportáže", description: "Bez ohledu na to, zda dokumentujeme kulturní akce, sportovní události nebo každodenní život. Naším cílem je zachytit autentičnost a atmosféru daného okamžiku.", photos: reportazPhotos },
  { title: "Korporátní zákazníci", description: "S důrazem na firemní identitu přinášíme fotografie, které zaujmou a osloví Vaše potencionální zákazníky.", photos: korporatPhotos },
  { title: "Auta", description: "S inovativními technikami a kreativním přístupem přinášíme fotografie, které přesně odhalují jedinečnost a krásu každého automobilu.", photos: autaPhotos },
];

export const fotoGalleryNote = "Kromě ukázek níže se můžete podívat i na veškeré naše veřejné galerie ZDE.";
