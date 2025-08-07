import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationsSliceState {
  isLoading: boolean;
  error: string | null;
  locations: any[],
  selected?: any,
}

const initialState: LocationsSliceState = {
  locations: [],
  selected: undefined,
  isLoading: false,
  error: null,
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState, // initialState: initialState
  reducers: {
    setAll: (state, action) => {
      state.locations = action.payload;
    },
    add: (state, action) => {
      state.locations = [...state.locations, action.payload];
    },
    setSelected: (state, action: PayloadAction<any>) => {
      state.selected = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const locationsActions = locationsSlice.actions;

export const LocationReducer = locationsSlice.reducer;
