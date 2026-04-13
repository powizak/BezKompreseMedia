export interface GalleryPhoto {
  thumbnail: string;
  full: string;
  alt: string;
}

export interface GalleryItem {
  title: string;
  description: string;
  photos: GalleryPhoto[];
  initialCount?: number;
}

export const galerieHero = {
  title: "GALERIE",
  subtitle: "ZÁBĚRY Z VEŘEJNÝCH AKCÍ",
  intro: "Mrkněte na jakých akcí se v poslední době pohybujeme… Klikněte na název akce pro více fotek 😉",
};

const rozmitalBase = '/images/galleries/rozmitalPodTremsinem';

function createPhotos(prefix: string, count: number, label: string): GalleryPhoto[] {
  return Array.from({ length: count }, (_, i) => ({
    thumbnail: `${rozmitalBase}/${prefix}${i + 1}_600.webp`,
    full: `${rozmitalBase}/${prefix}${i + 1}.jpg`,
    alt: `${label} - foto ${i + 1}`,
  }));
}

const rozmitalPhotos: GalleryPhoto[] = [
  ...createPhotos('Dakar-Buggy-na-zavodech-v-Rozmitale-Winter-Cup-2023-2024-', 2, 'Dakar Buggy na závodech v Rožmitále - Winter Cup 2023/2024'),
  ...createPhotos('RSXV-Buggy-na-zavodech-v-Rozmitale-Winter-Cup-2023-2024-', 38, 'RSXV Buggy na závodech v Rožmitále - Winter Cup 2023/2024'),
];

export const galerieItems: GalleryItem[] = [
  {
    title: "Winter Cup Rožmitál 27.1.2024",
    description: "Fotografie z akce Winter Cupu v Rožmitále pod Třemšínem, který se konal dne 27.1.2024 – pozvání jsme byli jedním z našich věrných zákazníků – BuggyCamp.CZ, kteří od nás mají i webové stránky.",
    photos: rozmitalPhotos,
    initialCount: 8,
  },
];

export const galerieNote = "Další galerie přibudou v blízké budoucnosti";
