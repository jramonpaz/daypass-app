import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { t } from 'i18next';

import i18n from '../../../../i18n';

import { exploreActions } from './explore.slice';
import { hotelActions } from '../hotels';
import { searchActions } from '../search/search.slice';

import { createQueryParams } from '@app/utils/query.util';
import {
  parseFcknJvsSearchGeneralTickesAPIData,
  parseFcknJvsServicesOrVibesAPIData,
} from '@app/utils/apiParser.util';

import { IAPIExplorerSearch, IHotelListItem, IHotelNearbyRequest } from '@app/types';

export const general_getAllTicketTypeService = () => async (dispatch: Dispatch) => {
  try {
    dispatch(exploreActions.clean());
    dispatch(exploreActions.setIsLoading(true));

    const query = {
      lang: i18n.language,
    };

    const url = `/general/getAllTicketType?${createQueryParams(query)}`;
    const { data: response, status } = await axios.get(url);
    // 200 = Ok
    // 400 = BadRequest
    // 500 = InternalServerError
    if (status === 200) {
      dispatch(exploreActions.setSuccess(t('explore-service-tickets-loaded')));
      dispatch(exploreActions.setTicketsMoodList(response.data));
    } else {
      dispatch(exploreActions.setError(t('explore-service-get-tickets-error')));
      dispatch(exploreActions.setTicketsMoodList([]));
    }

  } catch (error) {
    console.error('Error getting all tickets', error);
    dispatch(exploreActions.setSuccess(null));
    dispatch(exploreActions.setError(t('explore-service-get-tickets-error-try-again')));
  } finally {
    dispatch(exploreActions.setIsLoading(false));
  }
};

export const general_getAllVibeService = () => async (dispatch: Dispatch) => {
  try {
    dispatch(exploreActions.clean());
    dispatch(exploreActions.setIsLoading(true));

    const query = {
      lang: i18n.language, // Use current language
    };

    const url = `/general/getAllVibe?${createQueryParams(query)}`;
    const { data: response, status } = await axios.get(url);
    // 200 = Ok
    // 400 = BadRequest
    // 500 = InternalServerError
    if (status === 200) {
      dispatch(exploreActions.setSuccess(t('explore-service-vibes-loaded')));
      dispatch(exploreActions.setVibesList(response.data));
    } else {
      dispatch(exploreActions.setError(t('explore-service-get-vibes-error')));
      dispatch(exploreActions.setVibesList([])); // Corrected: setVibesList, not setTicketsMoodList
    }

  } catch (error) {
    console.error('Error getting all vibes', error);
    dispatch(exploreActions.setSuccess(null));
    dispatch(exploreActions.setError(t('explore-service-get-vibes-error-try-again')));
  } finally {
    dispatch(exploreActions.setIsLoading(false));
  }
};

export const general_searchGeneral = (payload: IAPIExplorerSearch) => async  (dispatch: Dispatch) => {
  try {
    dispatch(exploreActions.clean());
    dispatch(hotelActions.setIsLoading(true));
    dispatch(exploreActions.setIsLoading(true));

    dispatch(hotelActions.setHotelGeneralSearch([]));

    const url = '/search/searchGeneral';

    const {data, status} = await axios.post(url, payload);
    // 200 = Ok
    // 400 = BadRequest
    // 500 = InternalServerError
    if (status === 200) {
      const hotels: IHotelListItem[] = data.data.map((hotelRaw: any) => {
        return {
          ...hotelRaw,
          services: parseFcknJvsServicesOrVibesAPIData(hotelRaw.services),
          vibes: parseFcknJvsServicesOrVibesAPIData(hotelRaw.vibes),
          tickets: parseFcknJvsSearchGeneralTickesAPIData(hotelRaw.tickets),
        };
      });

      // change the explore filter modal for price range slider
      if (data.price_min && data.price_max) {
        const isSamePrice = data.price_min === data.price_max;
        const priceMax = isSamePrice ? data.price_max + 1 : data.price_max;

        dispatch(exploreActions.setPriceRange([data.price_min, priceMax]));
        dispatch(exploreActions.setDefaultPriceRange([data.price_min, priceMax]));
      }

      dispatch(hotelActions.setTotalResultsHotelSearch(data?.total_reg ?? 0));
      dispatch(hotelActions.setHotelGeneralSearch(hotels));
    } else if (status === 400) {
      dispatch(exploreActions.setError(t('explore-service-general-search-error-invalid-data')));
    }
  } catch (error) {
    console.error('Error on get general search', error);
    dispatch(exploreActions.setError(t('explore-service-general-search-error-try-again')));
  } finally {
    dispatch(exploreActions.setIsLoading(false));
    dispatch(hotelActions.setIsLoading(false));
  }
};

export const general_searchGeneral_nextPage = (payload: IAPIExplorerSearch) => async  (dispatch: Dispatch) => {
  try {
    dispatch(exploreActions.clean());
    dispatch(hotelActions.setIsLoading(true));
    dispatch(exploreActions.setIsLoading(true));

    const url = '/search/searchGeneral';
    // change to the next page
    const payloadNextPage: IAPIExplorerSearch = {
      ...payload,
      pagenumber: payload.pagenumber + 1,
    };

    const {data, status} = await axios.post(url, payloadNextPage);

    // update the search filter data in the store with the next page data
    dispatch(searchActions.setSearchFilterData(payloadNextPage));
    // 200 = Ok
    // 400 = BadRequest
    // 500 = InternalServerError
    if (status === 200) {
      const hotels: IHotelListItem[] = data.data.map((hotelRaw: any) => {
        return {
          ...hotelRaw,
          services: parseFcknJvsServicesOrVibesAPIData(hotelRaw.services),
          vibes: parseFcknJvsServicesOrVibesAPIData(hotelRaw.vibes),
          tickets: parseFcknJvsSearchGeneralTickesAPIData(hotelRaw.tickets),
        };
      });

      dispatch(hotelActions.addHotelsGeneralSearch(hotels));
    } else if (status === 400) {
      dispatch(exploreActions.setError(t('explore-service-general-search-error-invalid-data')));
    }
  } catch (error) {
    console.error('Error on get general search', error);
    dispatch(exploreActions.setError(t('explore-service-general-search-error-try-again')));
  } finally {
    dispatch(exploreActions.setIsLoading(false));
    dispatch(hotelActions.setIsLoading(false));
  }
};

export const general_searchGeneral_refresh = (payload: IAPIExplorerSearch) => async  (dispatch: Dispatch) => {
  try {
    dispatch(exploreActions.clean());
    dispatch(hotelActions.setIsLoading(true));
    dispatch(exploreActions.setIsLoading(true));

    const url = '/search/searchGeneral';
    // change to the next page
    const payloadNextPage: IAPIExplorerSearch = {
      ...payload,
      pagenumber: 1,
    };

    const {data, status} = await axios.post(url, payloadNextPage);

    // update the search filter data in the store with the next page data
    dispatch(searchActions.setSearchFilterData(payloadNextPage));
    // 200 = Ok
    // 400 = BadRequest
    // 500 = InternalServerError
    if (status === 200) {
      const hotels: IHotelListItem[] = data.data.map((hotelRaw: any) => {
        return {
          ...hotelRaw,
          services: parseFcknJvsServicesOrVibesAPIData(hotelRaw.services),
          vibes: parseFcknJvsServicesOrVibesAPIData(hotelRaw.vibes),
          tickets: parseFcknJvsSearchGeneralTickesAPIData(hotelRaw.tickets),
        };
      });

      dispatch(hotelActions.setTotalResultsHotelSearch(data?.total_reg ?? 0));
      dispatch(hotelActions.setHotelGeneralSearch(hotels));
    } else if (status === 400) {
      dispatch(exploreActions.setError(t('explore-service-general-search-error-invalid-data')));
    }
  } catch (error) {
    console.error('Error on get general search', error);
    dispatch(exploreActions.setError(t('explore-service-general-search-error-try-again')));
  } finally {
    dispatch(exploreActions.setIsLoading(false));
    dispatch(hotelActions.setIsLoading(false));
  }
};

export const general_searchGeneralCount = (payload: IAPIExplorerSearch, getMinMax: boolean) => async  (dispatch: Dispatch) => {
  try {
    dispatch(exploreActions.clean());
    dispatch(hotelActions.setIsLoading(true));
    dispatch(exploreActions.setIsLoading(true));

    const url = '/search/searchGeneralCount';

    const {data, status} = await axios.post(url, payload);
    // 200 = Ok
    // 400 = BadRequest
    // 500 = InternalServerError
    if (status === 200) {
      dispatch(hotelActions.setHotelGeneralCount(data.total_reg));

      if (getMinMax && data.price_min && data.price_max) {
        const isSamePrice = data.price_min === data.price_max;
        const priceMax = isSamePrice ? data.price_max + 1 : data.price_max;

        dispatch(exploreActions.setPriceRange([data.price_min, priceMax]));
        dispatch(exploreActions.setDefaultPriceRange([data.price_min, priceMax]));
      }
    } else if (status === 400) {
      dispatch(exploreActions.setError(t('explore-service-general-search-error-invalid-data')));
      dispatch(hotelActions.setHotelGeneralCount(0));
    }
  } catch (error) {
    console.error('Error on get general count search', error);
    dispatch(exploreActions.setError(t('explore-service-general-search-error-try-again')));
  } finally {
    dispatch(exploreActions.setIsLoading(false));
    dispatch(hotelActions.setIsLoading(false));
  }
};

export const general_getNearbyHotels = (request: IHotelNearbyRequest) => async (dispatch: Dispatch) => {
  try {
    dispatch(exploreActions.clean());
    dispatch(exploreActions.setIsLoading(true));

    const url = '/user/venueNearBy';

    const payload = {
      lang: i18n.language,
      coord: `${request.lat} ${request.lng}`,
    };

    const { data } = await axios.post(url, payload);
    // 0 = Ok
    // -1 = Country not found
    // -99 = Error
    if (data.result === 0) {
      dispatch(hotelActions.setNearbyHotels(data.venue_nearby));
    } else if (data.result === -1) {
      dispatch(exploreActions.setError(t('explore-service-nearby-hotels-not-found')));
    } else if (data.result === -99) {
      dispatch(exploreActions.setError(t('explore-service-nearby-hotels-error')));
    }
  } catch (error) {
    console.error('Error on get nearby hotels', error);
    dispatch(exploreActions.setError(t('explore-service-nearby-hotels-error')));
  } finally {
    dispatch(exploreActions.setIsLoading(false));
  }
};
