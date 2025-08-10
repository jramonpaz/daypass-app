import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { t } from "i18next";

import { hotelActions } from "./hotels.slice";

import { getDataInLocalStorage } from "@app/store/local";

import { nearbyHotels } from "@app/assets/data/nearbyHotels";
import {
	IExecutePurchaseAnonymousRequest,
	IExecutePurchaseRequest,
	IExecutePurchaseResponse,
	IFavoriteVenue,
	IGetVenueDetailsRequest,
	IGetVenueDetailsResponse,
	IGetVenueReviewsRequest,
	IGetVenueReviewsResponse,
	IPurchaseVenueCheckPayload,
	IPurchaseVenueCheckResponse,
	IShoppingCartPurchaseAnonymousRequest,
	IShoppingCartPurchaseRequest,
	IShoppingCartPurchaseResponse,
	IVenueTicketsRequest,
} from "@app/types";
import i18n from "../../../../i18n";

export const getHotelsService = () => async (dispatch: Dispatch) => {
	try {
		dispatch(hotelActions.setIsLoading(true));
		await setTimeout(() => {
			dispatch(hotelActions.setAll(nearbyHotels));
			dispatch(hotelActions.setIsLoading(false));
		}, 1400);
	} catch (error) {
		dispatch(hotelActions.setError("error"));
		dispatch(hotelActions.setIsLoading(false));
	}
};

export const getDaypassDetailById = (id: number) => {
	try {
		// handle get Data from API
	} catch (error) {
		console.error("Error getting daypass detail with id " + id);
	}
};

export const viewer_venueGetDetailService =
	(payload: IGetVenueDetailsRequest) => async (dispatch: Dispatch) => {
		try {
			dispatch(hotelActions.clean());
			dispatch(hotelActions.setIsLoading(true));

			const url = "/viewer/venueGetDetail";

			const { data, status } = await axios.post(url, payload);
			// 0 = Ok
			// -1 = Venue not found
			// -99 = Error
			if (status === 200 && data.result === 0) {
				const response = data as IGetVenueDetailsResponse;
				dispatch(hotelActions.setSuccess(t("hotels-service-venue-details-loaded")));
				dispatch(hotelActions.setHotelVenueDetail(response.data[0]));
				dispatch(hotelActions.setHotelVenueNearby(response.venue_nearby));
				dispatch(hotelActions.setHotelVenueImages(response.venue_images));
				dispatch(hotelActions.setHotelVenueServicesDetails(response.serv_detail));
			} else if (data.result === -1) {
				dispatch(hotelActions.setError(t("hotels-service-venue-not-found")));
			}
		} catch (error) {
			console.error("Error while getting Venue Details", error);
			dispatch(hotelActions.setError(t("hotels-service-venue-details-error")));
		} finally {
			dispatch(hotelActions.setIsLoading(false));
		}
	};

export const viewer_venueGetTicketsService =
	(payload: IVenueTicketsRequest) => async (dispatch: Dispatch) => {
		try {
			dispatch(hotelActions.clean());
			dispatch(hotelActions.setIsLoading(true));

			const url = "viewer/venueGetDetail_Tickets";

			const { data, status } = await axios.post(url, payload);
			// 200 = Ok
			// 400 = BadRequest
			// 500 = InternalServerError
			if (status === 200) {
				dispatch(hotelActions.setHotelVenueTickets(data.data));
			} else {
				dispatch(hotelActions.setError(t("hotels-service-venue-tickets-not-found")));
			}
		} catch (error) {
			console.error("Error while getting Venue Tickets", error);
			dispatch(hotelActions.setError(t("hotels-service-venue-tickets-error")));
		} finally {
			dispatch(hotelActions.setIsLoading(false));
		}
	};

export const viewer_venueGetReviewsService =
	(payload: IGetVenueReviewsRequest) => async (dispatch: Dispatch) => {
		try {
			dispatch(hotelActions.clean());
			dispatch(hotelActions.setIsLoading(true));

			console.log("Fetching venue reviews...", payload);

			const url = "/viewer/venueGetDetail_Reviews";
			const { data, status } = await axios.post(url, payload);
			// 200 = Ok
			// 400 = BadRequest
			// 500 = InternalServerError
			if (status === 200) {
				const dataParsed = data as IGetVenueReviewsResponse;
				dispatch(hotelActions.addHotelVenueReviews(dataParsed.data));
				dispatch(hotelActions.setHotelVenueReviewsCount(dataParsed.total_reg));
			} else {
				dispatch(hotelActions.setError(t("hotels-service-venue-reviews-not-found")));
			}
		} catch (error) {
			console.error("Error while getting Venue Reviews", error);
			dispatch(hotelActions.setError(t("hotels-service-venue-reviews-error")));
		} finally {
			dispatch(hotelActions.setIsLoading(false));
		}
	};

export const userPurchaseCheckService =
	(payload: IPurchaseVenueCheckPayload) => async (dispatch: Dispatch) => {
		try {
			dispatch(hotelActions.clean());
			dispatch(hotelActions.setIsLoading(true));

			const url = "/user/purchaseCheck";
			const { data } = await axios.post(url, payload);
			// 0 = Ok there are enough tickets
			// -1 = Ticket not found
			// -2 = Something went wrong
			// -3 = There are not enough tickets
			// -4 = Fare has changed
			// -5 = Invalid total purchase amount
			// -99 = Error
			if (data.result === 0) {
				const response = data as IPurchaseVenueCheckResponse;
				dispatch(hotelActions.setPurchaseSuccess(true));
				dispatch(hotelActions.setHotelVenuePurchaseResponse(response));
			} else if (data.result === -1) {
				dispatch(hotelActions.setError(t("hotels-service-ticket-not-found")));
			} else if (data.result === -2) {
				dispatch(hotelActions.setError(t("hotels-service-something-went-wrong")));
			} else if (data.result === -3) {
				dispatch(hotelActions.setError(t("hotels-service-not-enough-tickets")));
			} else if (data.result === -4) {
				dispatch(hotelActions.setError(t("hotels-service-fare-changed")));
			} else if (data.result === -5) {
				dispatch(hotelActions.setError(t("hotels-service-invalid-amount")));
			} else {
				dispatch(hotelActions.setError(t("hotels-service-purchase-error")));
			}
		} catch (error) {
			dispatch(hotelActions.setPurchaseSuccess(false));
			console.error("Error while checking purchase status", error);
			dispatch(hotelActions.setError(t("hotels-service-purchase-check-error")));
		} finally {
			dispatch(hotelActions.setIsLoading(false));
		}
	};

export const getFavoriteVenues = (lang: string) => async (dispatch: Dispatch) => {
	try {
		dispatch(hotelActions.clean());
		dispatch(hotelActions.setIsLoading(true));

		const url = "/user/getFavorites";

		const token = await getDataInLocalStorage("USER_TOKEN");

		if (!token) {
			// dispatch(authActions.setError('No hay sesión iniciada'));
			return;
		}

		const payload = {
			lang: lang ?? i18n.language, // Use current language or provided language
		};

		const { data, status } = await axios.post(url, payload, {
			headers: { Authorization: `Bearer ${token}` },
		});
		// 200 = Ok
		// 400 = BadRequest
		// 401 = Unauthorized
		// 500 = InternalServerError
		if (status === 200) {
			dispatch(hotelActions.setFavoriteVenues(data.data));

			// load details
			const response = data.data as IFavoriteVenue[];

			dispatch(hotelActions.setFavoriteVenues(response));
			// const detailsVenue = await Promise.all(response.map(async (resp) => {
			//   const detailPayload: IGetVenueDetailsRequest = {
			//     lang: 'es',
			//     iso_country: resp.iso_country,
			//     id_venue: resp.id_venue,
			//   };

			//   const urlDetail = '/viewer/venueGetDetail';

			//   const {data: dataDetail, status: statusDetail} = await axios.post(urlDetail, detailPayload);
			//   if (statusDetail !== 200) {
			//     return null;
			//   }
			//   return dataDetail.data[0];
			// }));
			// dispatch(hotelActions.setFavoriteDetailVenues(detailsVenue));
		} else if (status === 401) {
			dispatch(hotelActions.setError(t("hotels-service-unauthorized")));
		} else if (status === 400) {
			dispatch(hotelActions.setError(t("hotels-service-bad-request")));
		} else {
			dispatch(hotelActions.setError(t("hotels-service-favorite-venues-error")));
		}
	} catch (error) {
		console.error("Error getting favorite venues", error);
		dispatch(hotelActions.setError(t("hotels-service-get-favorite-venues-error")));
	} finally {
		dispatch(hotelActions.setIsLoading(false));
	}
};

export const getShoppingCartPurchaseService =
	(payload: IShoppingCartPurchaseRequest) => async (dispatch: Dispatch) => {
		try {
			dispatch(hotelActions.clean());
			dispatch(hotelActions.setIsLoading(true));

			const url = "/user/getShoppingCartPurchase";
			const { data, status } = await axios.post(url, payload);
			// result values
			// 0 = Ok
			// -1 = Shopping cart not found
			// -2 = Error while processing payment
			// -99 = Error
			// status
			// 200 = Ok
			// 400 = BadRequest
			// 401 = Unauthorized
			// 500 = InternalServerError
			if (status === 200 && data.result === 0) {
				const response: IShoppingCartPurchaseResponse = data;
				dispatch(hotelActions.setShoppingCartPurchase(response));
				return response;
			} else if (status === 401) {
				dispatch(hotelActions.setError(t("hotels-service-unauthorized")));
			} else if (status === 400) {
				dispatch(hotelActions.setError(t("hotels-service-bad-request")));
			} else if (data.result === -1) {
				dispatch(hotelActions.setError(t("hotels-service-shopping-cart-not-found")));
			} else if (data.result === -2) {
				dispatch(hotelActions.setError(t("hotels-service-payment-processing-error")));
			} else {
				dispatch(
					hotelActions.setError(t("hotels-service-shopping-cart-purchase-error")),
				);
			}
		} catch (error) {
			console.error("Error getting shopping cart purchase", error);
			dispatch(
				hotelActions.setError(t("hotels-service-get-shopping-cart-purchase-error")),
			);
		} finally {
			dispatch(hotelActions.setIsLoading(false));
		}
	};

export const getShoppingCartPurchaseAnonymousService =
	(payload: IShoppingCartPurchaseAnonymousRequest) => async (dispatch: Dispatch) => {
		try {
			dispatch(hotelActions.clean());
			dispatch(hotelActions.setIsLoading(true));

			const url = "/user/getShoppingCartPurchaseAnonymous";
			const { data, status } = await axios.post(url, payload);
			// result values
			// 0 = Ok
			// -1 = Shopping cart not found
			// -2 = Error while processing payment
			// -99 = Error
			// status
			// 200 = Ok
			// 400 = BadRequest
			// 401 = Unauthorized
			// 500 = InternalServerError
			if (status === 200 && data.result === 0) {
				const response: IShoppingCartPurchaseResponse = data;
				dispatch(hotelActions.setShoppingCartPurchase(response));
				return response;
			} else if (status === 401) {
				dispatch(hotelActions.setError(t("hotels-service-unauthorized")));
			} else if (status === 400) {
				dispatch(hotelActions.setError(t("hotels-service-bad-request")));
			} else if (data.result === -1) {
				dispatch(hotelActions.setError(t("hotels-service-shopping-cart-not-found")));
			} else if (data.result === -2) {
				dispatch(hotelActions.setError(t("hotels-service-payment-processing-error")));
			} else {
				dispatch(
					hotelActions.setError(t("hotels-service-shopping-cart-purchase-error")),
				);
			}
		} catch (error) {
			console.error("Error getting shopping cart purchase", error);
			dispatch(
				hotelActions.setError(t("hotels-service-get-shopping-cart-purchase-error")),
			);
		} finally {
			dispatch(hotelActions.setIsLoading(false));
		}
	};

export const executePurchaseUserService =
	(payload: IExecutePurchaseRequest) => async (dispatch: Dispatch) => {
		try {
			dispatch(hotelActions.clean());
			dispatch(hotelActions.setIsLoading(true));

			const url = "/user/executePurchase";
			const { data, status } = await axios.post(url, payload);
			// html Response
			// 200 = Ok
			// 400 = BadRequest
			// 401 = Unauthorized
			// 500 = InternalServerError
			// result
			// 0 = Ok
			// -1 = Purchase not made
			// -2 = Purchase made but purchase code does not exist
			// -99 = Error
			if (status === 200 && data && data.result === 0) {
				const response: IExecutePurchaseResponse = data;
				dispatch(hotelActions.setExecutePurchaseResponse(response));
				dispatch(hotelActions.setIsLoading(false));
				return response;
			} else if (status === 400) {
				dispatch(hotelActions.setError(t("hotels-service-purchase-bad-request")));
			} else if (status === 401) {
				dispatch(hotelActions.setError(t("hotels-service-purchase-unauthorized")));
			} else if (data && data.result === -1) {
				dispatch(hotelActions.setError(t("hotels-service-purchase-not-made")));
			} else if (data && data.result === -2) {
				dispatch(hotelActions.setError(t("hotels-service-purchase-code-not-exist")));
			} else {
				dispatch(
					hotelActions.setError(
						t("hotels-service-purchase-error-with-code", { code: data?.result }),
					),
				);
			}

			dispatch(hotelActions.setIsLoading(false));
			return null;
		} catch (error) {
			console.error("Error executing purchase request", error);
			dispatch(hotelActions.setError(t("hotels-service-purchase-request-error")));
			return null;
		} finally {
			dispatch(hotelActions.setIsLoading(false));
		}
	};

export const executePurchaseAsAnonymousService =
	(payload: IExecutePurchaseAnonymousRequest) => async (dispatch: Dispatch) => {
		try {
			dispatch(hotelActions.clean());
			dispatch(hotelActions.setIsLoading(true));

			const url = "/user/executePurchaseAnonymous";
			const { data, status } = await axios.post(url, payload, {
				headers: { Authorization: undefined },
			});
			// html Response
			// 200 = Ok
			// 400 = BadRequest
			// 401 = Unauthorized
			// 500 = InternalServerError
			// result
			// 0 = Ok
			// -1 = Purchase not made
			// -2 = Purchase made but purchase code does not exist
			// -99 = Error
			if (status === 200 && data && data.result === 0) {
				const response: IExecutePurchaseResponse = data;
				dispatch(hotelActions.setExecutePurchaseResponse(response));
				dispatch(hotelActions.setIsLoading(false));
				return response;
			} else if (status === 400) {
				dispatch(hotelActions.setError(t("hotels-service-purchase-bad-request")));
			} else if (status === 401) {
				dispatch(hotelActions.setError(t("hotels-service-purchase-unauthorized")));
			} else if (data && data.result === -1) {
				dispatch(hotelActions.setError(t("hotels-service-purchase-not-made")));
			} else if (data && data.result === -2) {
				dispatch(hotelActions.setError(t("hotels-service-purchase-code-not-exist")));
			} else {
				dispatch(
					hotelActions.setError(
						t("hotels-service-purchase-error-with-code", { code: data?.result }),
					),
				);
			}

			dispatch(hotelActions.setIsLoading(false));
			return null;
		} catch (error) {
			console.error("Error executing purchase request", error);
			dispatch(hotelActions.setError(t("hotels-service-purchase-request-error")));
			return null;
		} finally {
			dispatch(hotelActions.setIsLoading(false));
		}
	};
