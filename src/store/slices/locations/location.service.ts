import { Dispatch } from '@reduxjs/toolkit';
import { t } from 'i18next';

import { locationData } from '@app/assets/data/location';

import { locationsActions } from './locations.slice';

export const getLocationsServices = () => async (dispatch: Dispatch) => {
  try {
    dispatch(locationsActions.setIsLoading(true));
    // api call with get/post/put/patch/delete data

    await setTimeout(() => {
      dispatch(locationsActions.setAll(locationData));
      dispatch(locationsActions.setIsLoading(false));
    }, 800);
  } catch (error) {
    dispatch(locationsActions.setError(t('locations-service-get-locations-error')));
    dispatch(locationsActions.setIsLoading(false));
  }
};
