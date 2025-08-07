import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { purchasesActions } from './bokkings.slice';

import { IBookingsPurchase, IBookingsPurchasesDetail, ICancelTicketRequet, IGetAllBookingsPurchasesRequest, IGetPurchaseDetailPayload } from '@app/types';
import { t } from 'i18next';
import i18n from '../../../../i18n';

export const getDetailPurchaseservice = (payload: IGetAllBookingsPurchasesRequest) => async (dispatch: Dispatch) => {
  try {
    dispatch(purchasesActions.clean());
    dispatch(purchasesActions.setIsLoading(true));
    // get list of all user purchases
    const url = '/user/getAllPurchases';
    const {status, data} = await axios.post(url, payload);
    // 200 = Ok
    // 400 = BadRequest
    // 401 = Unauthorized
    if (status === 200) {
      dispatch(purchasesActions.setSuccess(t('bookings-service-get-purchases-success')));
      dispatch(purchasesActions.setBookingsPurchases(data.data));
      const response = data.data as IBookingsPurchase[];
      // TODO get all details data
      // get all details data for each purchase
      const purcharsesDetails = await Promise.all( response.map(async (purchase) => {
        const detailPayload: IGetPurchaseDetailPayload = {
          lang: payload.lang,
          id_purch: purchase.id_purch,
        };
        const detailURl = '/user/getDetailPurchase';
        const {data: dataDetail} = await axios.post(detailURl, detailPayload);
        // dataDetail.result status code:
        // 0 = Ok
        // -1 = Register not found
        // -99 = Error
        if (dataDetail.result === 0) {
          return dataDetail as IBookingsPurchasesDetail;
        } else if (dataDetail.result === -1) {
          dispatch(purchasesActions.setError(t('bookings-service-get-purchase-detail-error-with-id', { id: purchase.id_purch })));
        }
      }));

      if (purcharsesDetails) {
        dispatch(purchasesActions.setBookingsPurchasesDetail(purcharsesDetails as IBookingsPurchasesDetail[]));
        dispatch(purchasesActions.setSuccess(t('bookings-service-get-all-details-success')));
      } else {
        dispatch(purchasesActions.setError(t('bookings-service-get-all-details-error')));
        dispatch(purchasesActions.setBookingsPurchasesDetail([]));
      }
    } else if (status ===  401) {
      dispatch(purchasesActions.setError(t('bookings-service-unauthorized-purchases')));
      dispatch(purchasesActions.setBookingsPurchases([]));
    } else if (status === 400) {
      dispatch(purchasesActions.setError(t('bookings-service-invalid-request')));
      dispatch(purchasesActions.setBookingsPurchases([]));
    } else {
      dispatch(purchasesActions.setError(t('bookings-service-get-all-purchases-error')));
      dispatch(purchasesActions.setBookingsPurchases([]));
    }
  } catch (error) {
    console.error('Error getting all bookings purchase', error);
    dispatch(purchasesActions.setError(t('bookings-service-get-all-purchases-error-try-again')));
  } finally {
    dispatch(purchasesActions.setIsLoading(false));
  }
};

export const getPurchaseDetailByIdService = (payload: IGetPurchaseDetailPayload) => async (dispatch: Dispatch) => {
  try {
    dispatch(purchasesActions.clean());
    dispatch(purchasesActions.setIsLoading(true));
    // get purchase detail by id
    const url = '/user/getDetailPurchase';
    const {status, data} = await axios.post(url, payload);
    // 200 = Ok
    // 400 = BadRequest
    // 401 = Unauthorized
    // data.result status code:
    // 0 = Ok
    // -1 = Register not found
    // -99 = Error
    if (status === 200 && data.result === 0) {
      dispatch(purchasesActions.setBookingPurchaseSelected(data as IBookingsPurchasesDetail));
      dispatch(purchasesActions.setSuccess(t('bookings-service-get-purchase-detail-success')));
    } else if (status === 401) {
      dispatch(purchasesActions.setError(t('bookings-service-unauthorized-purchase-detail')));
    } else if (status === 400) {
      dispatch(purchasesActions.setError(t('bookings-service-invalid-request')));
    }
    else if (status === -1) {
      dispatch(purchasesActions.setError(t('bookings-service-get-purchase-detail-id-error', { id: payload.id_purch })));
    } else {
      dispatch(purchasesActions.setError(t('bookings-service-get-purchase-detail-error')));
    }
  } catch (error) {
    console.error('Error getting purchase detail', error);
    dispatch(purchasesActions.setError(t('bookings-service-get-purchase-detail-error-try-again')));
  } finally {
    dispatch(purchasesActions.setIsLoading(false));
  }
};

export const getOldDetailPurchaseservice = () => async (dispatch: Dispatch) => {
  try {
    dispatch(purchasesActions.clean());
    dispatch(purchasesActions.setIsLoading(true));
    // get list of all user purchases
    const url = '/user/getAllPurchasesFinished';

    const payload: IGetAllBookingsPurchasesRequest = {
      date_to: '',
      date_from: '',
      id_purch_code_user: '',
      lang: i18n.language,
    };

    const {status, data} = await axios.post(url, payload);
    // 200 = Ok
    // 400 = BadRequest
    // 401 = Unauthorized
    if (status === 200) {
      dispatch(purchasesActions.setSuccess(t('bookings-service-get-purchases-success')));
      dispatch(purchasesActions.setOldBookingsPurchases(data.data));
      const response = data.data as IBookingsPurchase[];
      // TODO get all details data
      // get all details data for each purchase
      const purcharsesDetails = await Promise.all( response.map(async (purchase) => {
        const detailPayload = {
          lang: i18n.language, // Use current language
          id_purch: purchase.id_purch,
        };
        const detailURl = '/user/getDetailPurchase';
        const {data: dataDetail} = await axios.post(detailURl, detailPayload);
        // dataDetail.result status code:
        // 0 = Ok
        // -1 = Register not found
        // -99 = Error
        if (dataDetail.result === 0) {
          return dataDetail as IBookingsPurchasesDetail;
        } else if (dataDetail.result === -1) {
          dispatch(purchasesActions.setError(t('bookings-service-get-purchase-detail-error-with-id', { id: purchase.id_purch })));
        }
      }));

      if (purcharsesDetails) {
        dispatch(purchasesActions.setOldBookingsPurchasesDetail(purcharsesDetails as IBookingsPurchasesDetail[]));
        dispatch(purchasesActions.setSuccess(t('bookings-service-get-all-details-success')));
      } else {
        dispatch(purchasesActions.setError(t('bookings-service-get-all-details-error')));
        dispatch(purchasesActions.setOldBookingsPurchasesDetail([]));
      }
    } else if (status ===  401) {
      dispatch(purchasesActions.setError(t('bookings-service-unauthorized-purchases')));
      dispatch(purchasesActions.setOldBookingsPurchases([]));
    } else if (status === 400) {
      dispatch(purchasesActions.setError(t('bookings-service-invalid-request')));
      dispatch(purchasesActions.setOldBookingsPurchases([]));
    } else {
      dispatch(purchasesActions.setError(t('bookings-service-get-all-purchases-error')));
      dispatch(purchasesActions.setOldBookingsPurchases([]));
    }
  } catch (error) {
    console.error('Error getting all bookings purchase', error);
    dispatch(purchasesActions.setError(t('bookings-service-get-all-purchases-error-try-again')));
  } finally {
    dispatch(purchasesActions.setIsLoading(false));
  }
};

export const cancelTicketsOfPurchase = (payload: ICancelTicketRequet) => async (dispatch: Dispatch) => {
  try {
    dispatch(purchasesActions.clean());
    dispatch(purchasesActions.setIsLoading(true));
    // cancel tickets of purchase
    const url = '/user/cancelTicket';
    const { data } = await axios.post(url, payload);
    // 0 = Ok
    // -1 = Purchase doesnt exist
    // -2 = Some of the tickets allready ticketed
    // -3 = Some of the tickest allready cancelled
    // -4 = Time to be canceled of some of the tickets expired
    // -5 = Error while processing payment
    // -99 = Error
    if (data.result === 0) {
      dispatch(purchasesActions.setSuccess(t('bookings-service-ticket-cancelled')));
    } else if (data.result === -1) {
      dispatch(purchasesActions.setError(t('bookings-service-purchase-not-found')));
    } else if (data.result === -2) {
      dispatch(purchasesActions.setError(t('bookings-service-tickets-already-ticketed')));
    } else if (data.result === -3) {
      dispatch(purchasesActions.setError(t('bookings-service-tickets-already-cancelled')));
    } else if (data.result === -4) {
      dispatch(purchasesActions.setError(t('bookings-service-cancellation-time-expired')));
    } else if (data.result === -5) {
      dispatch(purchasesActions.setError(t('bookings-service-payment-processing-error')));
    } else {
      dispatch(purchasesActions.setError(t('bookings-service-cancel-ticket-error')));
    }
  } catch (error) {
    console.error('Error cancelling all tickets of purchase', error);
    dispatch(purchasesActions.setError(t('bookings-service-cancel-tickets-error-try-again')));
  } finally {
    dispatch(purchasesActions.setIsLoading(false));
  }
};
