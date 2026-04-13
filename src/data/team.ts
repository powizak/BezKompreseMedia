export interface Social {
  platform: string;
  url: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  socials: Social[];
}

export const teamHero = {
  title: "NÁŠ TÝM",
  subtitle: "Máme skvělý tým, který se o Vás postará",
  intro: "V Bezkomprese media spojujeme inovace a zkušenosti. Každý člen našeho týmu má mnoholeté zkušenosti ve svém oboru a přináší do projektů své jedinečné dovednosti a nadšení. Věříme, že spolupráce je klíčem k úspěchu, a proto pracujeme jako tým, abychom přinesli optimální výsledky na míru každému zákazníkovi.",
};

export const teamIntro = "Jako jednotlivci fungujeme v oboru již mnoho let a máme za sebou nespočet zakázek a technických řešení na míru pro konkrétního zákazníka.";

export const teamMembers: TeamMember[] = [
  {
    name: "BezKomprese rodina",
    role: "Tým",
    bio: "Všechny nás spojuje láska k autům a jelikož máme všichni bohaté zkušenosti ve svých oborech, spojit se v jeden silný celek byla jasná volba!",
    photo: "/images/global/BKTeamVilik.jpg",
    socials: [
      { platform: "Facebook", url: "" },
      { platform: "Youtube", url: "" },
      { platform: "Twitch", url: "" },
    ],
  },
  {
    name: "Robin Valeš",
    role: "CEO, foto, video, video editor",
    bio: "Váš sen utvořím v realitu.",
    photo: "/images/people/robin.jpg",
    socials: [
      { platform: "Facebook", url: "" },
      { platform: "Instagram", url: "" },
      { platform: "Youtube", url: "" },
    ],
  },
  {
    name: "Petr Motyčka",
    role: "Foto, video, komunikace",
    bio: "Mám řešení dříve, než ho potřebujete.",
    photo: "/images/people/petr.jpg",
    socials: [
      { platform: "Facebook", url: "" },
      { platform: "Instagram", url: "" },
    ],
  },
  {
    name: "Jakub Prošek",
    role: "Web, video, video editor",
    bio: "Když nemůžeš, tak přidej.",
    photo: "/images/people/jakub.jpg",
    socials: [
      { platform: "Linkedin", url: "" },
      { platform: "Facebook", url: "" },
      { platform: "Instagram", url: "" },
      { platform: "Youtube", url: "" },
      { platform: "Twitter", url: "" },
    ],
  },
];
