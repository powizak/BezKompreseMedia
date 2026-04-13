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
      { platform: "Facebook", url: "https://www.facebook.com/bezkomprese" },
      { platform: "Youtube", url: "https://www.youtube.com/@BezKomprese" },
      { platform: "Twitch", url: "https://www.twitch.tv/bezkomprese" },
    ],
  },
  {
    name: "Robin Valeš",
    role: "CEO, foto, video, video editor",
    bio: "Váš sen utvořím v realitu.",
    photo: "/images/people/robin.jpg",
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/RobinValesu" },
      { platform: "Instagram", url: "https://www.instagram.com/bez_komprese" },
      { platform: "Youtube", url: "https://www.youtube.com/@ROBINVALES" },
    ],
  },
  {
    name: "Petr Motyčka",
    role: "Foto, video, komunikace",
    bio: "Mám řešení dříve, než ho potřebujete.",
    photo: "/images/people/petr.jpg",
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/motyckapetr" },
      { platform: "Instagram", url: "https://www.instagram.com/koblihacz/" },
    ],
  },
  {
    name: "Jakub Prošek",
    role: "Web, video, video editor",
    bio: "Když nemůžeš, tak přidej.",
    photo: "/images/people/jakub.jpg",
    socials: [
      { platform: "Linkedin", url: "https://www.linkedin.com/in/jakub-pro%C5%A1ek-940814144/" },
      { platform: "Facebook", url: "https://www.facebook.com/JamesPowiz" },
      { platform: "Instagram", url: "https://www.instagram.com/powizak/" },
      { platform: "Youtube", url: "https://youtube.com/@powizak" },
      { platform: "Twitter", url: "https://twitter.com/powizak" },
    ],
  },
];
