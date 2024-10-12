import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import sidebar0Reducer from "@/redux/sidebar-level-0/sidebar-level-0-slice";
import notificationsReducer from "@/redux/notifications/notifications-slice";

import { listenerMiddleware } from "./listener-middleware";

export const store = configureStore({
  reducer: {
    sidebar0: sidebar0Reducer,
    notifications: notificationsReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
