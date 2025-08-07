// hotel venue detail
export interface IGetVenueDetailsRequest {
  lang: string;
  iso_country: string;
  id_venue: string;
}

export interface IGetVenueDetailsResponse {
  result: number
  data: IHotelVanueDetail[]
  serv_detail: VenueServDetail[]
  venue_nearby: VenueNearby[]
  venue_images: VenueImage[]
}

export interface IHotelVanueDetail {
  name: string
  descp: string
  stars: number
  address: string
  address_obs: any
  lat: number
  lng: number
  rating: number
  rating_descp: string
  reviews: number
  vibes: string
  services: string
}

export interface VenueServDetail {
  id_genserv: number
  name: string
  obs: string
  general_startend: string
}

export interface VenueNearby {
  id_venue: string
  name: string
  distance: number
  image: string
}

export interface VenueImage {
  image: string
}

// hotel venue tickets
export interface IVenueTicketsRequest {
  lang: string
  currency: string
  iso_country: string
  id_venue: string
  date_search: string
}

export interface IHotelVanueTicket {
  id_venue_ticket: number
  id_slot: number
  name: string
  bullet: string
  obs: string
  date_openclose: string
  adult_fare: number
  child_fare: number
  ticket_left: number
  child_allow: boolean
  ticket_general_services: ITicketGeneralService[]
}

export interface ITicketGeneralService {
  id_genserv: number
  name: string
}

// hotel venue reviews
export interface IGetVenueReviewsRequest {
  pagenumber: number
  rowspage: number
  lang: string
  iso_country: string
  id_venue: string
  orderby: number
}

export interface IGetVenueReviewsResponse {
  total_reg: number
  data: IHotelVenueReview[]
}

export interface IHotelVenueReview {
  name: string
  location: string
  date_reg: string
  rating: number
  // rev_title: string
  rev_obs: string
}

// purcharse Venue

export interface IPurchaseVenueCheckPayload {
  id_venue: string
  currency: string
  iso_country: string
  date_reservation: string
  total: number
  purchase_detail: IPurchaseTicketDetail[]
}

export interface IPurchaseVenueCheckResponse {
  result: number;
  current_slot: number;
  current_uds: number;
  current_adult_unity_price: number;
  current_child_unity_price: number;
  shopping_cart_id: string;
}

export interface IPurchaseTicketDetail {
  id_venue_ticket: number
  id_slot: number
  adult_number: number
  adult_unity_price: number
  child_number: number
  child_unity_price: number
  ticketName: string
  fare: number
  isChild: boolean
}

export interface IHotelNearbyRequest {
  lang: string;
  lat: string;
  lng: string;
}

export interface IHotelNearby {
  id_venue: string;
  name: string;
  rating: number;
  rating_descp: string;
  reviews: number;
  distance: string;
  favorite: boolean;
  image: string;
}

export interface IFavoriteVenue {
  iso_country: string
  id_venue: string
  name: string
  address: string
  rating: number
  rating_descp: string
  image: string
}

export interface IShoppingCartPurchaseRequest {
  shopping_cart_id: string
  id_venue: string
  iso_country: string
  lang: string
}

export interface IShoppingCartPurchaseAnonymousRequest {
  shopping_cart_id: string
  id_venue: string
  iso_country: string
  lang: string
}

export interface IShoppingCartPurchaseResponse {
  currency_payment: string
  currency_visor: string
  date_reservation: string
  detail_visor: IShoppingCartPurchaseDetailVisor[]
  payment_authorization: string
  payment_customer: string
  payment_ephemeralKey: string
  result: number
  result_message: any
  show_disclaimer: boolean
  subtotal_visor: number
  tax_visor: number
  total_payment: number
  total_visor: number
  venue: string
  venue_address: string
}

export interface IShoppingCartPurchaseDetailVisor {
  name: string
  number: number
  price: number
}

// executePurchase
export interface IExecutePurchaseRequest {
  shopping_cart_id: string
  id_venue: string
  iso_country: string
  lang: string
  payment_token: string
  user_phone_code: string
  user_phone: string
  user_id_country: number
  accept_marketing: boolean
}

export interface IExecutePurchaseAnonymousRequest extends IExecutePurchaseRequest{
  user_name: string
  user_surname: string
  user_mail: string
}

export interface IExecutePurchaseResponse {
  date_reservation: string
  image: string
  purchase_code: string
  result: number
  tickets: IExecutePurchaseTicket[]
  total: string
  venue_address: string
}

export interface IExecutePurchaseTicket {
  ticket_name: string
}
