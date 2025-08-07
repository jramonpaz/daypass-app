export interface IHotelListItem {
  id_venue: string;
  images: string;
  name: string;
  rating: number;
  rating_descp: string;
  reviews: number;
  stars: number;
  services: StringServiceVibesApiDataType[];
  tickets: StringTicketAPIData[];
  vibes: StringServiceVibesApiDataType[];
  lat: number;
  lng: number;
  locationCity?: string;
}

export type StringServiceVibesApiDataType = {
  id: string,
  es: string,
  en: string,
}

export type StringTicketAPIData = {
  name: string;
  pvp: string;
  isIncluded: boolean;
  remainingTickets: number;
}
