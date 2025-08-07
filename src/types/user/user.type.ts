export interface IUser {
  name: string;
  surname: string;
  mail: string;
  phone: string;
  phone_code: string;
}

export interface IUserDetail {
  name: string
  surname: string
  mail: string
  phone_code: string
  phone: string
  id_country: number
  name_country: string
  is_membership: boolean
  period_dto_pct_membership: number
  period_dto_abs_membership: number
  date_to_membership: string
}
