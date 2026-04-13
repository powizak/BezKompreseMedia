export interface Category {
  title: string;
  description: string;
  href?: string;
}

export interface VideoItem {
  youtubeId: string;
}

export interface GallerySection {
  title: string;
  description: string;
  videos: VideoItem[];
  id?: string;
}

export const videoHero = {
  title: "VIDEO",
  subtitle: "Oživujeme Vaše příběhy prostřednictvím poutavých videí.",
  intro: "V Bezkomprese media nejde ve videu pouze o pohybující se obrázky; jde o vytváření poutavých videí, která oslovují vaši cílovou skupinu a přivádějí Vaše příběhy k životu. S našim týmem kreativců vytváříme videa, která Vám pomáhají vyniknout a zanechávají trvalý dojem.",
};

export const videoCategories: Category[] = [
  { title: "Produktové video", description: "Oslovte své zákazníky skvěle zpracovaným produktovým videem.", href: "#produktove" },
  { title: "Časosběrné video", description: "Okamžiky v plynulém pohybu – časosběrná videa vytváříme s precizností.", href: "#casosberne" },
  { title: "Reportážní video", description: "Příběhy, které oslovují – naše reportážní videa vypráví skutečné příběhy.", href: "#reportazni" },
  { title: "Hudební videoklipy", description: "Oživte svou hudbu skvělými vizuálními hudebními videoklipy.", href: "#hudebni" },
  { title: "Svatební video", description: "Vaše svatební okamžiky ve filmové kvalitě – naše svatební videa.", href: "#svatebni" },
  { title: "Reklamy", description: "Zaujměte svět krátkým a účinným reklamním videem.", href: "#reklamy" },
];

export const videoGalleries: GallerySection[] = [
  {
    title: "Produktové video",
    description: "Vytváříme produktová videa, která nejen prezentují vaše zboží, ale také vzbuzují zájem a představivost. Každý detail a vlastnost je zachycen s cílem posílit vaši značku a oslovit vaši cílovou skupinu.",
    id: "produktove",
    videos: [
      { youtubeId: "IPD1T66mrOs" },
      { youtubeId: "3RHYUJ35BX4" },
      { youtubeId: "bca-2FNdTsM" },
      { youtubeId: "SBbyji6UQ9g" },
    ],
  },
  {
    title: "Časosběrné video",
    description: "Naše časosběrná videa jsou digitální umění, které zachycují postup času s úchvatnou precizností. Přinášíme dynamiku a jedinečnost do každého okamžiku, poskytujíc Vám nezapomenutelný vizuální zážitek.",
    id: "casosberne",
    videos: [
      { youtubeId: "p2GxG681MEs" },
      { youtubeId: "D26AvoBXhw0" },
    ],
  },
  {
    title: "Reportážní video",
    description: "Jsme mistři v tvorbě reportážních videí, která nejen dokumentují, ale také emotivně spojují diváky s událostmi a příběhy. Bezkomprese media přináší do každé reportáže profesionalitu, vášeň a hloubku.",
    id: "reportazni",
    videos: [
      { youtubeId: "U-LS9zOfS2g" },
      { youtubeId: "eI6yZ-CY8ag" },
    ],
  },
  {
    title: "Hudební videoklipy",
    description: "Naši tvůrci videoklipů spojují hudební vášeň s vizuálním uměním, vytvárajíce klipy, které nejen doprovázejí hudbu, ale také ji vizuálně posilují. Každý snímek je pečlivě navržen tak, aby podtrhl náladu a výraz Vaší hudby.",
    id: "hudebni",
    videos: [
      { youtubeId: "j9yNqxgtZn4" },
      { youtubeId: "lZLq1dbkerg" },
    ],
  },
  {
    title: "Svatební video",
    description: "Zachycujeme nejkrásnější okamžiky Vašeho velkého dne s ohledem na citlivost a romantiku. Naše svatební videa jsou nejen záznamem, ale také příběhem plným lásky a emocí.",
    id: "svatebni",
    videos: [
      { youtubeId: "SfUR8BrJzB0" },
      { youtubeId: "nC3sIAwe50w" },
    ],
  },
  {
    title: "Reklama",
    description: "Pro naše reklamní videa platí jednoduché pravidlo: krátce, účinně a nezapomenutelně. Každý záběr a zvuk jsou pečlivě vybrány tak, aby podporovaly Vaši značku a vytvářely silný dojem na diváka.",
    id: "reklamy",
    videos: [
      { youtubeId: "6RGelpjMFHE" },
      { youtubeId: "hsrLrUX-_zg" },
    ],
  },
];

export const videoGalleryNote = "Kromě ukázek níže se můžete podívat i na veškeré naše veřejné galerie ZDE.";
