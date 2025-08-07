import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { t } from 'i18next';

import i18n from '../../../../i18n';

import { searchActions } from './search.slice';

import { createQueryParams } from '@app/utils/query.util';

export const getExplorerSearchPredictionService = (search: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(searchActions.clean());
    dispatch(searchActions.setIsLoading(true));

    const query = {
      lang: i18n.language,
      search: search,
    };

    const url = `/search/getPrediction?${createQueryParams(query)}`;
    const {data, status} = await axios.get(url);

    if (status === 200) {
      dispatch(searchActions.setSuccess(t('search-service-prediction-loaded')));
      dispatch(searchActions.setSearchPredictionList(data.data));
    } else {
      dispatch(searchActions.setError(t('search-service-prediction-error')));
      dispatch(searchActions.setSearchPredictionList([]));
    }

  } catch (error) {
    console.error('error on load search prediction, with error', error);
    dispatch(searchActions.setError(t('search-service-prediction-error-try-again')));
    dispatch(searchActions.setSearchPredictionList([]));
  } finally {
    dispatch(searchActions.setIsLoading(false));
  }
};
