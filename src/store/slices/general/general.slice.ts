import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CurrencyNameType, ICurrency, ILanguageMock, IPrivacyPolicyItem, ITermsConditionItem } from '@app/types';
import { currencies_mock } from '@app/assets/data/currencies';

interface IGeneralSliceState {
  privacyPolices: IPrivacyPolicyItem[] | null;
  termsAndConditions: ITermsConditionItem[] | null;
  currency: CurrencyNameType;
  currencies: ICurrency[],
  currencySelected: ICurrency,
  language: string;
  languages: ILanguageMock[];
  languageSelected: ILanguageMock;
  // common
  success: string | null,
  error: string | null,
  isLoading: boolean;
}

const initialState: IGeneralSliceState = {
  privacyPolices: null,
  termsAndConditions: null,
  currency: 'USD',
  currencies: [],
  currencySelected: currencies_mock[0],
  language: 'es',
  languages: [],
  languageSelected: {
    id: '1',
    title: 'English',
    subtitle: 'US',
    country: 'USA',
    iso: 'en',
    icon: require('@app/assets/icons/flag-usa.png'),
 },
  // common
  success: null,
  error: null,
  isLoading: false,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setPrivacyPolicy: (state, action: PayloadAction<IPrivacyPolicyItem[] | null>) => {
      state.privacyPolices = action.payload;
    },
    setTermsAndConditions: (state, action: PayloadAction<ITermsConditionItem[] | null>) => {
      state.termsAndConditions = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setLanguages: (state, action: PayloadAction<ILanguageMock[]>) => {
      state.languages = action.payload;
    },
    setLanguageSelected: (state, action: PayloadAction<ILanguageMock>) => {
      state.languageSelected = action.payload;
      // state.language = action.payload.;
      state.language = action.payload.iso;
    },
    setCurrencySelected: (state, action: PayloadAction<ICurrency>) => {
      state.currencySelected = action.payload;
    },
    setCurrencies: (state, action: PayloadAction<ICurrency[]>) => {
      state.currencies = action.payload;
    },
    // common
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string | null>) => {
      state.success = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clean: (state) => {
      state.error = null;
      state.success = null;
      state.isLoading = false;
    },
  },
});

export const GeneralReducer = generalSlice.reducer;

export const generalActions = generalSlice.actions;
