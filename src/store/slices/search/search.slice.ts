import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAPIExplorerSearch, ISearchExplorerState, SearchPrediction } from '@app/types';

interface SearchState {
  date: Date;
  location?: string;
  peopleCount?: number;
  listItems: any[];
  filterListItems: any[];
  // searchExplorer: ISearchExplorerForm | undefined;
  searchExplorerData: ISearchExplorerState | undefined;
  searchPredictionList: SearchPrediction[],
  searchSelectedPrediction: SearchPrediction | null,
  searchFilterData: IAPIExplorerSearch | null,
  searchFilterDataBackup: IAPIExplorerSearch | null,
  // common
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: SearchState = {
  date: new Date(),
  location: undefined,
  peopleCount: undefined,
  listItems: [],
  filterListItems: [],
  // explorerSearchForm: null
  searchExplorerData: undefined,
  searchPredictionList: [],
  searchSelectedPrediction: null,
  searchFilterData: null,
  searchFilterDataBackup: null,
  // common
  isLoading: false,
  error: null,
  success: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setDate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload;
    },
    setPeopleCount: (state, action: PayloadAction<number>) => {
      state.peopleCount = action.payload;
    },
    resetSearch: (state) => {
      state.date = initialState.date;
      state.location = initialState.location;
      state.peopleCount = initialState.peopleCount;
    },
    setListItems: (state, action: PayloadAction<any[]>) => {
      state.listItems = action.payload;
    },
    onSearch: (state, action: PayloadAction<any>) => {
      const filtered = state.listItems.filter(item => item.name === action.payload.name);
      state.filterListItems = filtered;
    },
    setSearchPredictionList: (state, action: PayloadAction<SearchPrediction[]>) => {
      state.searchPredictionList = action.payload;
    },
    setSearchSelectedPrediction: (state, action: PayloadAction<SearchPrediction | null>) => {
      state.searchSelectedPrediction = action.payload;
    },
    setSearchFilterData: (state, action: PayloadAction<IAPIExplorerSearch>) => {
      state.searchFilterData = action.payload;
    },
    setSearchFilterDataBackup: (state, action: PayloadAction<IAPIExplorerSearch | null>) => {
      state.searchFilterDataBackup = action.payload;
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
      state.filterListItems = [];
    },
  },
});

export const searchActions = searchSlice.actions;

export const SearchReducer = searchSlice.reducer;
