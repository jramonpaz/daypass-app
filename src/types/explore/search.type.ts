export interface ISearchExplorerForm {
  search: string;
  date: Date;
  peoples: string;
}

export interface ISearchExplorerState {
  search: string;
  date?: Date;
  peoples?: number;
  location: SearchPrediction | undefined;
  searchPredictions: SearchPrediction[]
}

export interface SearchPrediction {
  id_search: string;
  iso_country: string;
  name: string;
  address: string;
}

export type CurrencyNameType = 'MXN' | 'USD' | 'EUR' | string;

export interface IAPIExplorerSearchNoDate {
  id_search_pred: string;
  iso_country_pred: string;
  lang: 'en' | 'es';
  currency: CurrencyNameType;
  pagenumber: number;
  rowspage: number;
  stars: string;
  ticket_genserv: string;
  ticket_type: string;
  venue_vibes: string;
}

export interface IAPIExplorerSearch {
  pagenumber: number;
  rowspage: number;
  lang: 'en' | 'es' | string;
  currency: CurrencyNameType;
  iso_country_pred: string;
  id_search_pred: string;
  date_search: string;
  pax: number;
  stars: string;
  ticket_type: string;
  venue_vibes: string;
  ticket_genserv: string;
  price_from: number;
  price_to: number;
  getPriceMinMax: boolean;
  orderby: 0 | 1 | 2; // price order: 0 best, 1=ordenado por precio más bajo, 2=ordenado por precio más alto
  onlyAvailable: boolean
}

export interface ISearchExplorerData {
  hasDate: boolean,
  data: IAPIExplorerSearchNoDate | IAPIExplorerSearch,
}
