import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import RNRestart from 'react-native-restart';
import { t } from 'i18next';

import {
  ICreateUserData,
  ICurrency,
  IGoogleSignInPayload,
  ILanguageMock,
  ILoginFormData,
  IRecoveryPasswordFormData,
  IRegisterFormData,
  IResponseLogin,
  IUpdateProfilePayload,
  IUser,
  IUserDetail,
} from '@app/types';

import { authActions } from './auth.reducer';
import { getDataInLocalStorage, multiGetDataInLocalStorage, removeDataInLocal, setDataInLocalStorage } from '@app/store/local';
import { generalActions } from '../general/general.slice';

import { languages_mock } from '@app/assets/data/languages';
import { currencies_mock } from '@app/assets/data/currencies';
import i18n from '../../../../i18n';

export const signUpUserService = (crearUserFrom: IRegisterFormData) => async (dispatch: Dispatch) => {
  try {
    dispatch(authActions.clean());
    dispatch(authActions.setIsLoading(true));

    const userCreate: ICreateUserData = {
      phone_code: crearUserFrom.phone_code.slice(1),
      name: crearUserFrom.name,
      surname: crearUserFrom.surname,
      mail: crearUserFrom.mail,
      password: crearUserFrom.password,
      phone: crearUserFrom.phone.replaceAll(' ', ''),
    };

    const { data: {result} } = await axios.post('/user/create', userCreate);

    // status 200 & data.result == 0 is user created
    if (result === 0) {
      const sessionUser: IUser = {
        name: crearUserFrom.name,
        surname: crearUserFrom.surname,
        mail: crearUserFrom.mail,
        phone: crearUserFrom.phone,
        phone_code: crearUserFrom.phone_code,
        // token
      };
      // save in redux storage
      dispatch(authActions.setSessionUser(sessionUser));
      dispatch(authActions.setSuccess(t('auth-service-user-created')));

      /// TODO: remove this after
      // save user in local storage
      await setDataInLocalStorage('USER_DATA', JSON.stringify(sessionUser));
    } else if (result === -1) {
      // status 200 & data.result == -1 is email already registered
      dispatch(authActions.clean());
      dispatch(authActions.setError(t('auth-service-email-already-registered')));
      return;
    } else {
      dispatch(authActions.clean());
      dispatch(authActions.setError(t('auth-service-create-user-error')));
    }
  } catch (error) {
    console.error('error on create user', error);
    dispatch(authActions.setError(t('auth-service-create-user-error')));
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

export const signInUserService = (loginData: ILoginFormData) => async (dispatch: Dispatch) => {
  let resp = false;
  try {
    dispatch(authActions.clean());
    dispatch(authActions.setIsLoading(true));

    const payload = {
      mail: loginData.mail.trim(),
      password: loginData.password.trim(),
      is_mobile: true,
    };

    const { data } = await axios.post('/login/loginUser', payload);
    const response = data as IResponseLogin;

    if (response.result === -1 || response.result === -3) {
      // email or password is invalid
      dispatch(authActions.clean());
      dispatch(authActions.setError(t('auth-service-incorrect-email-or-password')));
    } else if (response.result === -2) {
      // user was registered with google account
      dispatch(authActions.clean());
      dispatch(authActions.setError(t('auth-service-google-login-required')));
    } else if (response.result === 0) {
      // user is correct
      dispatch(authActions.setToken(response.token));
      dispatch(authActions.setIsAuth(true));
      dispatch(authActions.setSuccess(t('auth-service-login-success')));

      await setDataInLocalStorage('USER_TOKEN', response.token);
      // TODO: get user details

      resp = true;
    } else {
      dispatch(authActions.clean());
      dispatch(authActions.setError(t('auth-service-login-error')));
    }
  } catch (error) {
    console.error('error on login user', error);
    dispatch(authActions.setError(t('auth-service-login-error')));
    resp = false;
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
  return resp;
};

export const loadUserDataFromStorage = () => async (dispatch: Dispatch) => {
  try {
    dispatch(authActions.clean());
    dispatch(authActions.setIsLoading(true));

    // load user token
    const [ token, userData, langResponse, currencyResponse ] = await multiGetDataInLocalStorage(['USER_TOKEN', 'USER_DATA', 'LANG', 'CURRENCY']);

    // const token = await getDataInLocalStorage('USER_TOKEN');
    if (token) {
      dispatch(authActions.setToken(token));
      dispatch(authActions.setIsAuth(true));
      dispatch(authActions.setSuccess(t('auth-service-load-user-data-success')));
      if (userData) {
        const parsedUserData = JSON.parse(userData) as IUserDetail;
        dispatch(authActions.setUserDetail(parsedUserData));
      }
    }

    // load language user
    // const langResponse = await getDataInLocalStorage('LANG');
    if (langResponse) {
      const parsedResponse = JSON.parse(langResponse) as ILanguageMock;
      dispatch(generalActions.setLanguageSelected(parsedResponse));
      dispatch(generalActions.setLanguage(parsedResponse.iso));
      i18n.changeLanguage(parsedResponse.iso);
    } else {
      dispatch(generalActions.setLanguageSelected(languages_mock[0]));
      dispatch(generalActions.setLanguage(languages_mock[0].iso));
    }

    // load currency settings
    // const currencyResponse = await getDataInLocalStorage('CURRENCY');
    if (currencyResponse) {
      const parsedResponse = JSON.parse(currencyResponse) as ICurrency;
      dispatch(generalActions.setCurrencySelected(parsedResponse));
      dispatch(generalActions.setCurrency(parsedResponse.iso));
    } else {
      dispatch(generalActions.setCurrencySelected(currencies_mock[0]));
      dispatch(generalActions.setCurrency(currencies_mock[0].iso));
    }
  } catch (error) {
    console.error('error on load user data', error);
    dispatch(authActions.setError(t('auth-service-load-user-data-error')));
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

export const authRecoveryPasswordSendCodeService = (formData: IRecoveryPasswordFormData) => async (dispatch: Dispatch) => {
  try {
    dispatch(authActions.clean());
    dispatch(authActions.setIsLoading(true));

    const payload = {
      lang: i18n.language,
      mail: formData.mail,
    };

    const { data } = await axios.post('/user/recoverPassCode', payload);

    if (data.result === 0) {
      dispatch(authActions.setSuccess(t('auth-service-recovery-email-sent')));
      dispatch(authActions.setRecoveryPassForm(formData));
    } else if (data.result === -1) {
      dispatch(authActions.setError(t('auth-service-email-not-registered')));
    } else if (data.result === -2) {
      dispatch(authActions.setError(t('auth-service-email-send-error')));
    } else {
      dispatch(authActions.setError(t('auth-service-recovery-email-error')));
    }
  } catch (error) {
    console.error('Error al enviar el correo para recuperar la contraseña', error);
    dispatch(authActions.setError(t('auth-service-recovery-email-error')));
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

export const authRecoveryPasswordValidateCodeService = (code: string, mail: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(authActions.clean());
    dispatch(authActions.setIsLoading(true));

    const payload = {
      mail,
      code,
    };

    const { data } = await axios.post('/user/recoverPassCheckCode', payload);
    // data.result
    // 0 = Ok
    // -1 = User not found
    // -2 = Incorrect code
    // -3 = Code expired
    // -99 = Error
    if (data.result === 0) {
      dispatch(authActions.setIsValidCode(true));
      dispatch(authActions.setTokenToRecoveryPass(data.token));
    } else if (data.result === -1) {
      dispatch(authActions.setError(t('auth-service-email-not-registered')));
      dispatch(authActions.setIsValidCode(false));
    } else if (data.result === -2) {
      dispatch(authActions.setError(t('auth-service-invalid-code')));
      dispatch(authActions.setIsValidCode(false));
    } else if (data.result === -3) {
      dispatch(authActions.setError(t('auth-service-code-expired')));
      dispatch(authActions.setIsValidCode(false));
    } else {
      dispatch(authActions.setError(t('auth-service-code-validation-error')));
      dispatch(authActions.setIsValidCode(false));
    }
  } catch (error) {
    console.error('Error al enviar el correo para recuperar la contraseña', error);
    dispatch(authActions.setError(t('auth-service-recovery-email-error-recover')));
    dispatch(authActions.setIsValidCode(false));
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

export const authRecoveryPasswordChangePasswordService = (password: string, token: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(authActions.clean());
    dispatch(authActions.setIsLoading(true));

    const payload = {
      password,
      token,
    };

    const { data } = await axios.post('/user/recoverPassSet', payload);
    // 0 = Ok
    // -1 = Incorrect token
    // -2 = Token expired
    // -99 = Error
    if (data.result === 0) {
      dispatch(authActions.setSuccess(t('auth-service-password-changed')));
    } else if (data.result === -2) {
      dispatch(authActions.setTokenToRecoveryPass(undefined));
      dispatch(authActions.setError(t('auth-service-session-expired')));
      dispatch(authActions.setIsAuth(false));
    } else {
      dispatch(authActions.setError(t('auth-service-password-update-error')));
    }

  } catch (error) {
    console.error('Error al cambiar la contraseña', error);
    dispatch(authActions.setError(t('auth-service-change-password-error')));
    dispatch(authActions.setIsValidCode(false));
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

export const logoutService = () => async (dispatch: Dispatch) => {
  try {
    dispatch(authActions.clean());
    dispatch(authActions.setIsLoading(true));

    dispatch(authActions.setIsAuth(false));
    dispatch(authActions.setToken(undefined));
    dispatch(authActions.setSessionUser(undefined));

    await removeDataInLocal('USER_TOKEN');
    await removeDataInLocal('USER_DATA');

    RNRestart.restart();
  } catch (error) {
    console.error('Error logging out', error);
    dispatch(authActions.setError(t('auth-service-logout-error')));
  } finally {
    dispatch(authActions.clean());
    dispatch(authActions.setIsLoading(false));
  }
};

export const getUserDetails = () => async (dispatch: Dispatch) => {
  try {
    dispatch(authActions.clean());
    dispatch(authActions.setIsLoading(true));

    const token = await getDataInLocalStorage('USER_TOKEN');

    if (!token) {
      dispatch(authActions.setError(t('auth-service-no-session')));
    } else {
      const payload = {
        lang: i18n.language, // Use current language
      };

      const { data, status } = await axios.post('/user/getDetail', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // 200 = Ok
      // 400 = BadRequest
      // 401 = Unauthorized
      // 500 = InternalServerError
      if (status === 200) {
        dispatch(authActions.setUserDetail(data.data[0]));
        dispatch(authActions.setIsAuth(true));
        // save user in local storage
        await setDataInLocalStorage('USER_DATA', JSON.stringify(data.data[0]));
      } else if (status === 401) {
        dispatch(authActions.setError(t('auth-service-unauthorized')));
        dispatch(authActions.setIsAuth(false));
      } else {
        dispatch(authActions.setError(t('auth-service-user-data-error')));
      }
    }
  } catch (error) {
    console.error('Error getting or saver user', error);
    dispatch(authActions.setError(t('auth-service-get-user-data-error')));
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

export const updateProfileService = (payload: IUpdateProfilePayload) => async (dispatch: Dispatch) => {
  try {
    dispatch(authActions.clean());
    dispatch(authActions.setIsLoading(true));

    const url = '/user/updateName'; // '/user/update

    const { data } = await axios.post(url, payload);
    // 0 = Ok
    // -1 = User not found
    // -99 = Error
    if (data.result === 0) {
      dispatch(authActions.setSuccess(t('auth-service-profile-updated')));
    } else if (data.result === -1) {
      dispatch(authActions.setError(t('auth-service-user-not-found')));
    } else {
      dispatch(authActions.setError(t('auth-service-profile-update-error')));
    }
  } catch (error) {
    console.error('Error updating profile', error);
    dispatch(authActions.setError(t('auth-service-update-profile-error')));
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

export const getSesionUserDetail = () => async (dispatch: Dispatch) => {
  try {
    dispatch(authActions.clean());
    dispatch(authActions.setIsLoading(true));

    const token = await getDataInLocalStorage('USER_TOKEN');

    if (!token) {
      dispatch(authActions.setError(t('auth-service-no-session')));
      return;
    }

    const payload = {
      lang: i18n.language,
    };

    const { data, status } = await axios.post('/user/getDetail', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // 200 = Ok
    // 400 = BadRequest
    // 401 = Unauthorized
    // 500 = InternalServerError
    if (status === 200) {
      // dispatch(authActions.setSessionUser(data.data));
      dispatch(authActions.setUserDetail(data.data[0]));
      dispatch(authActions.setIsAuth(true));
      // save user in local storage
      await setDataInLocalStorage('USER_DATA', JSON.stringify(data.data[0]));
    } else if (status === 401) {
      dispatch(authActions.setError(t('auth-service-unauthorized')));
      dispatch(authActions.setIsAuth(false));
    } else {
      dispatch(authActions.setError(t('auth-service-user-data-error')));
    }
  } catch (error) {
    console.error('Error getting user detail', error);
    dispatch(authActions.setError(t('auth-service-get-user-data-error')));
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

export const authGoogleSignInService = (payload: IGoogleSignInPayload) => async (dispatch: Dispatch) => {
  try {
    dispatch(authActions.clean());
    dispatch(authActions.setIsLoading(true));

    const url = '/login/loginUserGoogle';

    const { data, status } = await axios.post(url, payload);
    // 200 = Ok
    // 400 = BadRequest
    // 500 = InternalServerError
    if (status === 200) {
      dispatch(authActions.setToken(data.token));
      dispatch(authActions.setSessionUser(data.user));
      dispatch(authActions.setIsAuth(true));
      // save user in local storage
      await setDataInLocalStorage('USER_TOKEN', data.token);
      dispatch(authActions.setSuccess(t('auth-service-google-signin-success')));
    } else {
      dispatch(authActions.setError(t('auth-service-google-signin-error')));
    }
  } catch (error) {
    console.error('Error getting google sign in payload', error);
    dispatch(authActions.setError(t('auth-service-google-signin-error-try-again')));
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

// export const loginPurchaseAnonymousService = (payload: ILoginPurchaseAnonymousPayload) => async (dispatch: Dispatch) => {
//   try {
//     dispatch(authActions.clean());
//     dispatch(authActions.setIsLoading(true));

//     const url = '/user/loginPurchaseAnonymous';

//     const { data, status } = await axios.post(url, payload);
//     // 200 = Ok
//     // 400 = BadRequest
//     // 500 = InternalServerError
//     // data.result
//     //  0 = Ok
//     // -1 = User not found
//     // -99 = Error
//     if (status === 200 && data.result === 0) {
//       // TODO: handle success purchase
//       // dispatch(authActions.setSuccess('Compra anónima realizada con éxito'));
//       // dispatch(authActions.setToken(data.token));
//       // dispatch(authActions.setSessionUser(data.user));
//       // dispatch(authActions.setIsAuth(true));
//       // save user in local storage
//       // await setDataInLocalStorage('USER_TOKEN', data.token);
//       // await setDataInLocalStorage('USER_DATA', JSON.stringify(data.user));
//     }
//     else if (status === 200 && data.result === -1) {
//       dispatch(authActions.setError('No se encontró el usuario'));
//     } else {
//       dispatch(authActions.setError('Ocurrió un error al iniciar la compra anónima'));
//     }
//   } catch (error) {
//     console.error('Error while login anonymous purchase', error);
//     dispatch(authActions.setError('Error al iniciar compra anónima, intente mas tarde'));
//   } finally {
//     dispatch(authActions.setIsLoading(false));
//   }
// };
