export interface OpeningHour {
  day: string;
  time: string;
}

export const contactIntro = "Máte-li zájem o naše služby nebo máte dotazy, neváhejte nás kontaktovat. Jsme tu, abychom Vám pomohli dosáhnout digitálního úspěchu. Bezkomprese media – Společně jdeme dál!";

export const contactAddress = {
  name: "BezKomprese Shop",
  street: "Tyršova 682/IV",
  city: "339 01 Klatovy",
  phone: "+420 731 466 375",
  phoneLabel: "+420 731 466 375 (Robin)",
  email: "info@bezkompresemedia.cz",
};

export const contactOpeningHours: OpeningHour[] = [
  { day: "Středa", time: "9:00 - 17:00" },
  { day: "Sobota", time: "9:00 - 12:00" },
  { day: "Po domluvě", time: "kdykoliv" },
];
