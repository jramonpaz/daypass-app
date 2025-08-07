import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { t } from 'i18next';

import i18n from '../../../../i18n';

import { generalActions } from './general.slice';

import { getDataInLocalStorage, setDataInLocalStorage } from '@app/store/local';

import { createQueryParams } from '@app/utils/query.util';

import { currencies_mock } from '@app/assets/data/currencies';
import { languages_mock } from '@app/assets/data/languages';

import { ICurrency, ILanguageMock, IPrivacyPolicyQueryParams, ITermsConditionQueryParams } from '@app/types';

const defaultQuery: IPrivacyPolicyQueryParams = {
  lang: i18n.language,
};

export const getGeneralPolPrivacy = (query: IPrivacyPolicyQueryParams = defaultQuery) => async (dispatch: Dispatch) => {
  try {
    dispatch(generalActions.clean());
    dispatch(generalActions.setIsLoading(true));

    const url = `/general/getPolPrivacy?${createQueryParams(query)}`;
    const { data: response, status } = await axios.get(url);
    // 200 = Ok
    // 400 = BadRequest
    // 500 = InternalServerError

    if (status === 200) {
      dispatch(generalActions.setPrivacyPolicy(response.data));
      dispatch(generalActions.setSuccess(t('general-service-privacy-policy-loaded')));
    } else {
      dispatch(generalActions.setError(t('general-service-privacy-policy-error')));
    }
  } catch (error) {
    console.error('Error getting general privacy policy', error);
    dispatch(generalActions.setError(t('general-service-privacy-policy-error')));
  } finally {
    dispatch(generalActions.setIsLoading(false));
  }
};

const defTermsQuery: ITermsConditionQueryParams = {
  lang: i18n.language,
};

export const getGeneralTermsConditions = (query: ITermsConditionQueryParams = defTermsQuery) => async (dispatch: Dispatch) => {
  try {
    dispatch(generalActions.clean());
    dispatch(generalActions.setIsLoading(true));

    const url = `/general/getTermsCond?${createQueryParams(query)}`;
    const { data: response, status } = await axios.get(url);
    // 200 = Ok
    // 400 = BadRequest
    // 500 = InternalServerError

    if (status === 200) {
      dispatch(generalActions.setTermsAndConditions(response.data));
      dispatch(generalActions.setSuccess(t('general-service-terms-loaded')));
    } else {
      dispatch(generalActions.setError(t('general-service-terms-error')));
    }
  } catch (error) {
    console.error('Error getting general terms conditions', error);
    dispatch(generalActions.setError(t('general-service-terms-error')));
  } finally {
    dispatch(generalActions.setIsLoading(false));
  }
};

export const getGeneralLanguages = () => async (dispatch: Dispatch) => {
  try {
    dispatch(generalActions.clean());
    dispatch(generalActions.setIsLoading(true));

    // TODO: get languages from API, for now its not working
    const languages = languages_mock;

    dispatch(generalActions.setLanguages(languages));

  } catch (error) {
    console.error('Errorn getting all languages', error);
    dispatch(generalActions.setError(t('general-service-languages-error')));
  } finally {
    dispatch(generalActions.setIsLoading(false));
  }
};

export const saveGeneralSelectedLanguage = (lng: ILanguageMock) => async (dispatch: Dispatch) => {
  try {
    dispatch(generalActions.clean());
    dispatch(generalActions.setIsLoading(true));

    await setDataInLocalStorage('LANG', JSON.stringify(lng));
    i18n.changeLanguage(lng.iso);
    dispatch(generalActions.setLanguageSelected(lng));
  } catch (error) {
    console.error('Error saving general languaga selected', error);
    dispatch(generalActions.setError(t('general-service-language-save-error')));
  } finally {
    dispatch(generalActions.setIsLoading(false));
  }
};

export const readGeneralSelectedLanguage = () => async (dispatch: Dispatch) => {
  try {
    dispatch(generalActions.clean());
    dispatch(generalActions.setIsLoading(true));

    const response = await getDataInLocalStorage('LANG');

    if (response) {
      const parsedResponse = JSON.parse(response) as ILanguageMock;
      dispatch(generalActions.setLanguageSelected(parsedResponse));
      dispatch(generalActions.setLanguage(parsedResponse.iso));
    } else {
      dispatch(generalActions.setLanguageSelected(languages_mock[0]));
      dispatch(generalActions.setLanguage(languages_mock[0].iso));
    }
  } catch (error) {
    console.error('Error saving general languaga selected', error);
    dispatch(generalActions.setError(t('general-service-language-save-error')));
  } finally {
    dispatch(generalActions.setIsLoading(false));
  }
};

export const getGeneralCurrencies = () => async (dispatch: Dispatch) => {
  try {
    dispatch(generalActions.clean());
    dispatch(generalActions.setIsLoading(true));

    // TODO: get currencies from API, for now its not working
    const currencies = currencies_mock;

    dispatch(generalActions.setCurrencies(currencies));
  } catch (error) {
    console.error('Error loading general currencies', error);
    dispatch(generalActions.setError(t('general-service-currencies-load-error')));
  } finally {
    dispatch(generalActions.setIsLoading(false));
  }
};

export const saveGeneralCurrencySelected = (currency: ICurrency) => async (dispatch: Dispatch) => {
  try {
    dispatch(generalActions.clean());
    dispatch(generalActions.setIsLoading(true));

    await setDataInLocalStorage('CURRENCY', JSON.stringify(currency));
    dispatch(generalActions.setCurrencySelected(currency));
  } catch (error) {
    console.error('Error saving general currency', error);
    dispatch(generalActions.setError(t('general-service-currency-save-error')));
  } finally {
    dispatch(generalActions.setIsLoading(false));
  }
};

export const readGeneralCurrencySelected = () => async (dispatch: Dispatch) => {
  try {
    dispatch(generalActions.clean());
    dispatch(generalActions.setIsLoading(true));

    const response = await getDataInLocalStorage('CURRENCY');

    if (response) {
      const parsedResponse = JSON.parse(response) as ICurrency;
      dispatch(generalActions.setCurrencySelected(parsedResponse));
      dispatch(generalActions.setCurrency(parsedResponse.iso));
    } else {
      dispatch(generalActions.setCurrencySelected(currencies_mock[0]));
      dispatch(generalActions.setCurrency(currencies_mock[0].iso));
    }
  } catch (error) {
    console.error('Error reading general currency selected');
    dispatch(generalActions.setError(t('general-service-currency-read-error')));
  } finally {
    dispatch(generalActions.setIsLoading(false));
  }
};
