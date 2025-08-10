import { IGeneralServiceFilter, IMoodFilter, IVibesFilter } from "@app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IExploreSliceState {
	listFilter: any | undefined;
	isLoading: boolean;
	success: string | null;
	error: string | null;

	ticketsMoodList: IMoodFilter[];
	vibesList: IVibesFilter[];

	generalServicesList: IGeneralServiceFilter[];

	priceRange: number[]; // [min, max]
	defaultPriceRange: number[];
	hotelStarTypes: string[];
	explorerListDara: any[];
	hasChangedFilters: boolean;
	filtersCount: number;
}

const initialState: IExploreSliceState = {
	listFilter: undefined,
	isLoading: false,
	success: null,
	error: null,

	ticketsMoodList: [],
	vibesList: [],
	generalServicesList: [],

	priceRange: [0, 1000],
	defaultPriceRange: [0, 1000],
	hotelStarTypes: [],
	explorerListDara: [],
	hasChangedFilters: false,
	filtersCount: 0,
};

export const exploreSlice = createSlice({
	name: "exploreSlice",
	initialState,
	reducers: {
		// hotel types
		setSelectedHotelStarTypes: (state, action: PayloadAction<string[]>) => {
			state.hotelStarTypes = action.payload;
		},
		removeSelectedHotelStarType: (state, action: PayloadAction<string>) => {
			state.hotelStarTypes = state.hotelStarTypes.filter(type => type !== action.payload);
		},
		cleanSelectedHotelStars: state => {
			state.hotelStarTypes = [];
		},
		// values range
		setPriceRange: (state, action: PayloadAction<number[]>) => {
			state.priceRange = action.payload;
		},
		setDefaultPriceRange: (state, action: PayloadAction<number[]>) => {
			state.defaultPriceRange = action.payload;
		},
		cleanSelectedPriceRange: state => {
			state.priceRange = state.defaultPriceRange;
		},
		// vibes list
		setVibesList: (state, action: PayloadAction<IVibesFilter[]>) => {
			const sortedList = action.payload.sort((a, b) => a.name.localeCompare(b.name));
			state.vibesList = sortedList;
		},
		selectOneVibe: (
			state,
			action: PayloadAction<{ vibe: IVibesFilter; active: boolean }>,
		) => {
			state.vibesList = state.vibesList.map(vibe => {
				if (vibe.id_vibe === action.payload.vibe.id_vibe) {
					return { ...vibe, isSelected: action.payload.active };
				}
				return vibe;
			});
		},
		cleanAllSelectedVibes: state => {
			state.vibesList = state.vibesList.map(vibe => ({ ...vibe, isSelected: false }));
		},

		// general services list
		setGeneralServicesList: (state, action: PayloadAction<any[]>) => {
			state.generalServicesList = action.payload;
		},
		selectOneGeneralService: (
			state,
			action: PayloadAction<{ service: IGeneralServiceFilter; active: boolean }>,
		) => {
			state.generalServicesList = state.generalServicesList.map(service => {
				if (service.id_genserv === action.payload.service.id_genserv) {
					return { ...service, isSelected: action.payload.active };
				}
				return service;
			});
		},
		cleanAllSelectedGeneralServices: state => {
			state.generalServicesList = state.generalServicesList.map(service => ({
				...service,
				isSelected: false,
			}));
		},

		// ticket mood list
		setTicketsMoodList: (state, action: PayloadAction<IMoodFilter[]>) => {
			const sortedList = action.payload.sort((a, b) => a.name.localeCompare(b.name));
			state.ticketsMoodList = sortedList;
		},
		selectOneTicketMood: (
			state,
			action: PayloadAction<{ mood: IMoodFilter; active: boolean }>,
		) => {
			state.ticketsMoodList = state.ticketsMoodList.map(mood => {
				if (mood.id_ticket_type === action.payload.mood.id_ticket_type) {
					return { ...mood, isSelected: action.payload.active };
				}
				return mood;
			});
		},
		cleanAllSelectedTicketMoods: state => {
			state.ticketsMoodList = state.ticketsMoodList.map(mood => ({
				...mood,
				isSelected: false,
			}));
		},
		// filters count
		setFiltersCount: (state, action: PayloadAction<number>) => {
			state.filtersCount = action.payload;
		},
		// has changed filters
		setHasChangedFilters: (state, action: PayloadAction<boolean>) => {
			state.hasChangedFilters = action.payload;
		},
		// common actions
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setSuccess: (state, action: PayloadAction<string | null>) => {
			state.success = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		clean: state => {
			state.error = null;
			state.success = null;
			state.isLoading = false;
		},
	},
});

export const exploreActions = exploreSlice.actions;

export const ExploreReducer = exploreSlice.reducer;
