export interface IRegisterFormData {
  name: string;
  surname: string;
  mail: string;
  password: string;
  terms: boolean;
  phone: string;
  phone_code: string;
}

export interface ICreateUserData {
  name: string;
  surname: string;
  mail: string;
  password: string;
  phone: string;
  phone_code: string;
}

export interface ILoginFormData {
  mail: string;
  password: string;
}

export interface IResponseLogin {
  result: number;
  name: string;
  token: string;
}

export interface IRecoveryPasswordFormData {
  mail: string;
}

export interface IChangePasswordFormData {
  password: string;
  confirm_password: string;
}

export interface IUpdateProfileFormData {
  name: string;
  surname: string;
  mail: string;
  // password: string;
  // terms: boolean;
  phone: string;
  phone_code: string;
  country: string;
  birthdate: Date | null;
}

export interface IUpdateProfilePasswordFormData {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface IUpdateProfilePayload {
  name: string
  surname: string
  phone_code: string
  phone: string
  id_country: number
}

export interface ISignInAnonymousFromData {
  name: string
  surname: string
  mail: string
  phone_code: string
  phone: string
}

export interface IGoogleSignInPayload {
  mail: string
  name: string
  surname: string
  is_mobile: boolean
}

export interface ILoginPurchaseAnonymousPayload {
  user_mail: string
  purch_code: string
}
