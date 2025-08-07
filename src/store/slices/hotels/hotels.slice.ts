import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IHotel } from "@app/screens/app/explore/welcome/HotelListItem";
import { IVenueNear } from "@app/types/explore/venue.type";
import {
	IExecutePurchaseAnonymousRequest,
	IExecutePurchaseResponse,
	IFavoriteVenue,
	IGetVenueReviewsRequest,
	IHotelListItem,
	IHotelNearby,
	IHotelVanueDetail,
	IHotelVanueTicket,
	IHotelVenueReview,
	IPurchaseTicketDetail,
	IPurchaseVenueCheckResponse,
	IShoppingCartPurchaseResponse,
	VenueImage,
	VenueNearby,
	VenueServDetail,
} from "@app/types";

type HotelsSliceState = {
	hotels: IHotel[];
	venueNearby: IVenueNear[];
	favoriteHotels: IHotel[];
	selected?: IHotel;
	daypassDetail: any | undefined;
	hotelsList: IHotelListItem[];
	hotelsListFiltered: IHotelListItem[];
	hotelSelected: IHotelListItem | null;
	hotelGeneralCount: number;
	totalResults: number;
	// hotel venues details data
	hotelVenueDetail: IHotelVanueDetail | null;
	hotelVenueServicesDetails: VenueServDetail[];
	hotelVenueImages: VenueImage[];
	hotelVenueNearby: VenueNearby[];
	hotelVenueTickets: IHotelVanueTicket[];
	hotelVenueSelectedTicket: IHotelVanueTicket | null;
	purchaseTickets: IPurchaseTicketDetail[];
	hotelVenieReviews: IHotelVenueReview[];
	hotelVenieReviewsCount: number;
	hotelVieweReviewsRequest: IGetVenueReviewsRequest | null;
	// purchase
	hotelVenuePurchaseResponse: IPurchaseVenueCheckResponse | null;
	purchaseSuccess: boolean;
	shoppingCartPurchase: IShoppingCartPurchaseResponse | null;
	shoppingCartPurchaseAnonymous: IShoppingCartPurchaseResponse | null;
	executePurchaseAnonymousRequest: IExecutePurchaseAnonymousRequest | null;
	executePurchaseResponse: IExecutePurchaseResponse | null;
	purchaseExpired: boolean;
	// nearby hotels
	nearbyHotels: IHotelNearby[];
	// favorite venues
	favoriteVenues: IFavoriteVenue[];
	favoriteDetailVenues: IHotelVanueDetail[];
	favotiteDetailVenueSelected: IHotelVanueDetail | null;
	// map search results
	hotelInMapSelected: IHotelListItem | null;
	// common
	success: string | null;
	isLoading: boolean;
	error: string | null;
};

const initialState: HotelsSliceState = {
	hotels: [],
	venueNearby: [],
	selected: undefined,
	favoriteHotels: [],
	daypassDetail: undefined,
	hotelsList: [],
	hotelsListFiltered: [],
	hotelSelected: null,
	hotelGeneralCount: 0,
	totalResults: 0,
	// hotel venues details data
	hotelVenueDetail: null,
	hotelVenueServicesDetails: [],
	hotelVenueImages: [],
	hotelVenueNearby: [],
	hotelVenueTickets: [],
	hotelVenueSelectedTicket: null,
	purchaseTickets: [],
	hotelVenieReviews: [],
	hotelVenieReviewsCount: 0,
	hotelVieweReviewsRequest: null,
	// purchase
	hotelVenuePurchaseResponse: null,
	shoppingCartPurchase: null,
	shoppingCartPurchaseAnonymous: null,
	purchaseSuccess: false,
	purchaseExpired: false,
	executePurchaseAnonymousRequest: null,
	executePurchaseResponse: null,
	// nearby hotels
	nearbyHotels: [],
	// favorities
	favoriteVenues: [],
	favoriteDetailVenues: [],
	favotiteDetailVenueSelected: null,
	// map search results
	hotelInMapSelected: null,
	// common
	success: null,
	isLoading: false,
	error: null,
};

type TootleHotelFavorite = {
	// hotel: IHotel,
	hotelId: number;
	favorite: boolean;
};

export const hotelSlice = createSlice({
	name: "hotels",
	initialState,
	reducers: {
		setVenueNearby: (state, action: PayloadAction<IVenueNear[]>) => {
			state.venueNearby = action.payload;
		},
		// TODO: delete this
		setAll: (state, action: PayloadAction<IHotel[]>) => {
			state.hotels = action.payload;
		},
		add: (state, action) => {
			state.hotels = [...state.hotels, action.payload];
		},
		setSelected: (state, action) => {
			state.selected = action.payload;
		},
		setHotelSelected: (state, action: PayloadAction<IHotelListItem>) => {
			state.hotelSelected = action.payload;
		},
		setHotelGeneralSearch: (state, action: PayloadAction<IHotelListItem[]>) => {
			state.hotelsList = action.payload;
			state.hotelsListFiltered = action.payload;
		},
		setTotalResultsHotelSearch: (state, action: PayloadAction<number>) => {
			if (action.payload < 0) {
				state.totalResults = 0;
			} else {
				state.totalResults = action.payload;
			}
		},
		addHotelsGeneralSearch: (state, action: PayloadAction<IHotelListItem[]>) => {
			state.hotelsList = [...state.hotelsList, ...action.payload];
			state.hotelsListFiltered = [...state.hotelsListFiltered, ...action.payload];
		},
		searchHotels: (state, action: PayloadAction<string>) => {
			if (action.payload.length === 0) {
				state.hotelsListFiltered = state.hotelsList;
			} else {
				const filteredHotels = state.hotelsList.filter(hotel =>
					hotel.name.toLowerCase().includes(action.payload.toLowerCase()),
				);
				state.hotelsListFiltered = filteredHotels;
			}
		},
		setHotelGeneralCount: (state, action: PayloadAction<number>) => {
			if (action.payload < 0) {
				state.hotelGeneralCount = 0;
			} else {
				state.hotelGeneralCount = action.payload;
			}
		},
		// hotel venues details data
		clearHotelDetails: state => {
			state.hotelVenueDetail = null;
			state.hotelVenueServicesDetails = [];
			state.hotelVenueImages = [];
			state.hotelVenueNearby = [];
			state.hotelVenueTickets = [];
			state.hotelVenueSelectedTicket = null;
			state.hotelVenieReviews = [];
			state.hotelVenieReviewsCount = 0;
			state.hotelVieweReviewsRequest = null;
			state.purchaseTickets = [];
			// state.hotelVenuePurchaseResponse = null;
			state.hotelVieweReviewsRequest = null;
			state.hotelVenieReviewsCount = 0;
		},
		setHotelVenueDetail: (state, action: PayloadAction<IHotelVanueDetail>) => {
			state.hotelVenueDetail = action.payload;
		},
		setHotelVenueServicesDetails: (state, action: PayloadAction<VenueServDetail[]>) => {
			state.hotelVenueServicesDetails = action.payload;
		},
		setHotelVenueImages: (state, action: PayloadAction<VenueImage[]>) => {
			state.hotelVenueImages = action.payload;
		},
		setHotelVenueNearby: (state, action: PayloadAction<VenueNearby[]>) => {
			state.hotelVenueNearby = action.payload;
		},
		setHotelVenueTickets: (state, action: PayloadAction<IHotelVanueTicket[]>) => {
			state.hotelVenueTickets = action.payload;
		},
		sethotelVenueTicketSelected: (state, action: PayloadAction<IHotelVanueTicket>) => {
			state.hotelVenueSelectedTicket = action.payload;
		},
		setHotelVenueReviews: (state, action: PayloadAction<IHotelVenueReview[]>) => {
			state.hotelVenieReviews = action.payload;
		},
		addHotelVenueReviews: (state, action: PayloadAction<IHotelVenueReview[]>) => {
			state.hotelVenieReviews = [...state.hotelVenieReviews, ...action.payload];
		},
		setHotelVenueReviewsCount: (state, action: PayloadAction<number>) => {
			if (action.payload < 0) {
				state.hotelVenieReviewsCount = 0;
			} else {
				state.hotelVenieReviewsCount = action.payload;
			}
		},
		setHotelVieweReviewsRequest: (
			state,
			action: PayloadAction<IGetVenueReviewsRequest | null>,
		) => {
			state.hotelVieweReviewsRequest = action.payload;
		},
		// purchase
		setShoppingCartPurchase: (
			state,
			action: PayloadAction<IShoppingCartPurchaseResponse | null>,
		) => {
			state.shoppingCartPurchase = action.payload;
		},
		setShoppingCartPurchaseAnonymous: (
			state,
			action: PayloadAction<IShoppingCartPurchaseResponse | null>,
		) => {
			state.shoppingCartPurchaseAnonymous = action.payload;
		},
		setExecutePurchaseAnonymousRequest: (
			state,
			action: PayloadAction<IExecutePurchaseAnonymousRequest>,
		) => {
			state.executePurchaseAnonymousRequest = action.payload;
		},
		setExecutePurchaseResponse: (state, action: PayloadAction<IExecutePurchaseResponse>) => {
			state.executePurchaseResponse = action.payload;
		},
		clearPurchaseData: state => {
			state.hotelVenuePurchaseResponse = null;
			state.shoppingCartPurchase = null;
			state.shoppingCartPurchaseAnonymous = null;
			state.purchaseSuccess = false;
			state.purchaseExpired = false;
			state.purchaseTickets = [];
			state.executePurchaseResponse = null;
			state.executePurchaseAnonymousRequest = null;
		},
		// nearby hotels
		setNearbyHotels: (state, action: PayloadAction<IHotelNearby[]>) => {
			state.nearbyHotels = action.payload;
		},
		// purchase venue and tickets
		addPurchaseTickets: (state, action: PayloadAction<IPurchaseTicketDetail>) => {
			const isAllreadyAdded = state.purchaseTickets.find(
				t => t.id_venue_ticket === action.payload.id_venue_ticket,
			);
			if (isAllreadyAdded) {
				state.purchaseTickets = state.purchaseTickets.map(t => {
					if (t.id_venue_ticket === action.payload.id_venue_ticket) {
						return action.payload;
					}
					return t;
				});
			} else {
				state.purchaseTickets = [...state.purchaseTickets, action.payload];
			}
		},
		removePurchaseTickets: (state, action: PayloadAction<IPurchaseTicketDetail>) => {
			state.purchaseTickets = state.purchaseTickets.filter(
				t => t.id_venue_ticket !== action.payload.id_venue_ticket,
			);
		},
		setHotelVenuePurchaseResponse: (
			state,
			action: PayloadAction<IPurchaseVenueCheckResponse>,
		) => {
			state.hotelVenuePurchaseResponse = action.payload;
		},
		setPurchaseSuccess: (state, action: PayloadAction<boolean>) => {
			state.purchaseSuccess = action.payload;
		},
		// favoritevenues
		setFavoriteVenues: (state, action: PayloadAction<IFavoriteVenue[]>) => {
			state.favoriteVenues = action.payload;
		},
		setFavoriteDetailVenues: (state, action: PayloadAction<IHotelVanueDetail[]>) => {
			state.favoriteDetailVenues = action.payload;
		},
		setFavoriteDetailVenue: (state, action: PayloadAction<IHotelVanueDetail>) => {
			state.favotiteDetailVenueSelected = action.payload;
		},
		setPurchasesExpired: (state, action: PayloadAction<boolean>) => {
			state.purchaseExpired = action.payload;
		},
		setHotelInMapSelected: (state, action: PayloadAction<IHotelListItem>) => {
			const hotelsFiltered = state.hotelsListFiltered.filter(
				hotel => hotel.id_venue !== action.payload.id_venue,
			);
			state.hotelsListFiltered = [...hotelsFiltered, action.payload];
			state.hotelInMapSelected = action.payload;
		},
		removeHotelInMapSelected: state => {
			// const hotelsFiltered = state.hotelsInMap.filter(hotel => hotel.id_venue!== action.payload.id_venue);
			// state.hotelsInMap = hotelsFiltered;
			state.hotelInMapSelected = null;
		},
		// common
		clean: state => {
			state.error = null;
			state.success = null;
			state.isLoading = false;
			state.purchaseSuccess = false;
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setSuccess: (state, action: PayloadAction<string | null>) => {
			state.success = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		clearAll: state => {
			state.hotels = [];
		},
		toggleFavorite: (state, action: PayloadAction<TootleHotelFavorite>) => {
			const { favorite, hotelId } = action.payload;
			const hotelData = state.hotels.find(hotel => hotel.id === hotelId);

			if (!hotelData) {
				return;
			}

			if (favorite) {
				state.favoriteHotels = [...new Set([...state.favoriteHotels, hotelData])];

				state.hotels = state.hotels.map(hotel => {
					if (hotel.id === hotelId) {
						return {
							...hotel,
							favorite: true,
						};
					}
					return hotel;
				});
			} else {
				state.favoriteHotels = state.hotels.filter(hotel => hotel.id !== hotelId);

				state.hotels = state.hotels.map(hotel => {
					if (hotel.id === hotelId) {
						return {
							...hotel,
							favorite: false,
						};
					}
					return hotel;
				});
			}
		},
	},
});

export const hotelActions = hotelSlice.actions;

export const HotelReduer = hotelSlice.reducer;
