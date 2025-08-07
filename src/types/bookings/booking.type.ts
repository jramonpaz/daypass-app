export interface IGetAllBookingsPurchasesRequest {
  lang: string
  id_purch_code_user: string
  date_from: string
  date_to: string
}

export interface IBookingsPurchase {
  id_purch: string
  id_purch_code_user: string
  date_purch: string
  venue_name: string
  country: string
  date_reservation: string
  total: number
  currency: string
}

export interface IBookingsPurchasesDetail {
  result: number
  id_purch: string
  id_purch_code: string
  id_purch_code_user: string
  date_purch: string
  venue_name: string
  venue_address: string
  date_reservation: string
  purch_gross: number
  cancel_gross: number
  tax: number
  total: number
  currency: string
  venue_contact_mail: string
  venue_contact_phone: string
  venue_rating: number
  venue_rating_descp: string
  image: string
  detailPurch: IDetailPurch[]
  detailCheckin: IDetailCheckin[]
}

export interface IDetailPurch {
  name_ticket: string
  adult_number: number
  adult_unity_price: number
  child_number: number
  child_unity_price: number
}

export interface IDetailCheckin {
  status: number
  line_purch: number
  line: number
  name_ticket: string
  is_child: boolean
  pax_name: string
  openclose_ticket: string
  token_control: string
  date_status_change: string
}

export interface ICancelTicketRequet {
  id_purch: string
  tickets: ICancelTicket[]
}

export interface ICancelTicket {
  line_purch: number
  line: number
}

export interface IGetPurchaseDetailPayload {
  lang: string
  id_purch: string
}
