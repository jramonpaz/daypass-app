import { INotificationItem } from '@app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationSliceState = {
  notifications: INotificationItem[];
  // common
  success: string | null,
  error: string | null,
  isLoading: boolean;
}

const initialState: NotificationSliceState = {
  notifications: [],
  // common
  success: null,
  error: null,
  isLoading: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setAllNotifications: (state, action: PayloadAction<INotificationItem[]>) => {
      state.notifications = action.payload;
    },
    addNotification(state, action: PayloadAction<INotificationItem>) {
      state.notifications = [...state.notifications, action.payload];
    },
    clearNotifications(state) {
      state.notifications = [];
    },
    // common
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setSuccess(state, action: PayloadAction<string | null>) {
      state.success = action.payload;
    },
    clean(state) {
      state.error = null;
      state.success = null;
      state.isLoading = false;
      state.notifications = [];
    },
  },
});

export const NotificationReducer = notificationSlice.reducer;

export const notificationActions = notificationSlice.actions;
