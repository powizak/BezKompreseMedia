export interface Category {
  title: string;
  description: string;
}

export interface GallerySection {
  title: string;
  description: string;
}

export const videoHero = {
  title: "VIDEO",
  subtitle: "Oživujeme Vaše příběhy prostřednictvím poutavých videí.",
  intro: "V Bezkomprese media nejde ve videu pouze o pohybující se obrázky; jde o vytváření poutavých videí, která oslovují vaši cílovou skupinu a přivádějí Vaše příběhy k životu. S našim týmem kreativců vytváříme videa, která Vám pomáhají vyniknout a zanechávají trvalý dojem.",
};

export const videoCategories: Category[] = [
  { title: "Produktové video", description: "Oslovte své zákazníky skvěle zpracovaným produktovým videem." },
  { title: "Časosběrné video", description: "Okamžiky v plynulém pohybu – časosběrná videa vytváříme s precizností." },
  { title: "Reportážní video", description: "Příběhy, které oslovují – naše reportážní videa vypráví skutečné příběhy." },
  { title: "Hudební videoklipy", description: "Oživte svou hudbu skvělými vizuálními hudebními videoklipy." },
  { title: "Svatební video", description: "Vaše svatební okamžiky ve filmové kvalitě – naše svatební videa." },
  { title: "Reklamy", description: "Zaujměte svět krátkým a účinným reklamním videem." },
];

export const videoGalleries: GallerySection[] = [
  { title: "Produktové video", description: "Vytváříme produktová videa, která nejen prezentují vaše zboží, ale také vzbuzují zájem a představivost. Každý detail a vlastnost je zachycen s cílem posílit vaši značku a oslovit vaši cílovou skupinu." },
  { title: "Časosběrné video", description: "Naše časosběrná videa jsou digitální umění, které zachycují postup času s úchvatnou precizností. Přinášíme dynamiku a jedinečnost do každého okamžiku, poskytujíc Vám nezapomenutelný vizuální zážitek." },
  { title: "Reportážní video", description: "Jsme mistři v tvorbě reportážních videí, která nejen dokumentují, ale také emotivně spojují diváky s událostmi a příběhy. Bezkomprese media přináší do každé reportáže profesionalitu, vášeň a hloubku." },
  { title: "Hudební videoklipy", description: "Naši tvůrci videoklipů spojují hudební vášeň s vizuálním uměním, vytvářejíce klipy, které nejen doprovázejí hudbu, ale také ji vizuálně posilují. Každý snímek je pečlivě navržen tak, aby podtrhl náladu a výraz Vaší hudby." },
  { title: "Svatební video", description: "Zachycujeme nejkrásnější okamžiky Vašeho velkého dne s ohledem na citlivost a romantiku. Naše svatební videa jsou nejen záznamem, ale také příběhem plným lásky a emocí." },
  { title: "Reklama", description: "Pro naše reklamní videa platí jednoduché pravidlo: krátce, účinně a nezapomenutelně. Každý záběr a zvuk jsou pečlivě vybrány tak, aby podporovaly Vaši značku a vytvářely silný dojem na diváka." },
];

export const videoGalleryNote = "Kromě ukázek níže se můžete podívat i na veškeré naše veřejné galerie ZDE.";
