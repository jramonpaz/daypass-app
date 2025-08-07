import { INavigationState } from '@app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface INavigationSliceState {
  prevNavigation: INavigationState | null;
}

const initialState: INavigationSliceState = {
  prevNavigation: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setPreviousNavigation: (state, action: PayloadAction<INavigationState>) => {
      state.prevNavigation = action.payload;
    },
  },
});

export const navigationActions = navigationSlice.actions;
export const NavigationReducer = navigationSlice.reducer;
