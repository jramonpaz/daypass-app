import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBookingsPurchase, IBookingsPurchasesDetail } from '@app/types';

interface BookingsSliceState {
  bookingsPurchases: IBookingsPurchase[];
  bookingsPurchasesDetail: IBookingsPurchasesDetail[];
  bookingPurchaseSelected: IBookingsPurchasesDetail | null;
  oldBookingsPurchases: IBookingsPurchase[];
  oldBookingsPurchasesDetail: IBookingsPurchasesDetail[];
  // common
  success: string | null,
  error: string | null,
  isLoading: boolean;
}

const initialState: BookingsSliceState = {
  bookingsPurchases: [],
  bookingsPurchasesDetail: [],
  bookingPurchaseSelected: null,
  // old
  oldBookingsPurchases: [],
  oldBookingsPurchasesDetail: [],
  // common
  success: null,
  error: null,
  isLoading: false,
};

export const bookingsSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    setBookingsPurchases(state, action: PayloadAction<IBookingsPurchase[]>) {
      state.bookingsPurchases = action.payload;
    },
    setBookingsPurchasesDetail(state, action: PayloadAction<IBookingsPurchasesDetail[]>) {
      state.bookingsPurchasesDetail = action.payload;
    },
    setBookingPurchaseSelected(state, action: PayloadAction<IBookingsPurchasesDetail | null>) {
      state.bookingPurchaseSelected = action.payload;
    },
    updateBookingsPurchases(state, action: PayloadAction<{id: string, booking: IBookingsPurchasesDetail}>) {
      const index = state.bookingsPurchasesDetail.findIndex(p => p.id_purch === action.payload.id);
      if (index > -1) {
        state.bookingsPurchasesDetail[index] = action.payload.booking;
      }
      state.bookingPurchaseSelected = action.payload.booking;
    },
    // old purchases
    setOldBookingsPurchases(state, action: PayloadAction<IBookingsPurchase[]>) {
      state.oldBookingsPurchases = action.payload;
    },
    setOldBookingsPurchasesDetail(state, action: PayloadAction<IBookingsPurchasesDetail[]>) {
      state.oldBookingsPurchasesDetail = action.payload;
    },
    // common
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSuccess(state, action: PayloadAction<string>) {
      state.success = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clean: (state) => {
      state.error = null;
      state.success = null;
      state.isLoading = false;
    },
  },
});


export const purchasesActions = bookingsSlice.actions;
export const PurchasesReducer = bookingsSlice.reducer;
