import { configureStore } from '@reduxjs/toolkit';

import { LocationReducer } from './slices/locations/locations.slice';
import { HotelReduer } from './slices/hotels/hotels.slice';
import { SearchReducer } from './slices/search/search.slice';
import { AuthReducer } from './slices/auth/auth.reducer';
import { ExploreReducer } from './slices/explore/explore.slice';
import { FAQsReducer } from './slices/faqs/faqs.slice';
import { NotificationReducer } from './slices/notifications/notification.slice';
import { PurchasesReducer } from './slices/bookings/bokkings.slice';
import { NavigationReducer } from './slices/navigation/navigation.slice';
import { GeneralReducer } from './slices/general/general.slice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    locations: LocationReducer,
    hotels: HotelReduer,
    search: SearchReducer,
    explore: ExploreReducer,
    faqs: FAQsReducer,
    notifications: NotificationReducer,
    purchases: PurchasesReducer,
    navigation: NavigationReducer,
    general: GeneralReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
