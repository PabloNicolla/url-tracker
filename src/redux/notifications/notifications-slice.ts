import { createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";

import { productUploadComplete } from "../products/products-slice";

import { login } from "../header-level-0/header-level-0-slice";

import { RootState } from "../store";

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Notification Data
//////////////////////////////////////////////////////////////

export interface AppNotification {
  id: string;
  title: string;
  details: string;
  timestamp: number;
  read: boolean;
}

const AppNotificationAdapter = createEntityAdapter<AppNotification>();

const initialNotificationState = AppNotificationAdapter.getInitialState();

export interface NotificationSliceData {
  notifications: typeof initialNotificationState;
  newNotificationsCount: number;
}

const initialState: NotificationSliceData = {
  notifications: initialNotificationState,
  newNotificationsCount: 0,
};

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Notification Thunks
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Notification Slice
//////////////////////////////////////////////////////////////

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    allNotificationsRead(state) {
      console.log("[NOTIFICATION_SLICE]: action allNotificationsRead...");

      Object.values(state.notifications.entities).forEach((notification) => {
        notification.read = true;
      });
      state.newNotificationsCount = 0;
    },
  },

  selectors: {
    selectNewNotificationsCount: (notificationState) => notificationState.newNotificationsCount,
  },

  extraReducers(builder) {
    builder

      //////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////// Add Notification On Successful Product Upload
      //////////////////////////////////////////////////////////////

      .addCase(productUploadComplete.fulfilled, (state, action) => {
        console.log("[NOTIFICATION_SLICE]: addCase matched: allNotificationsRead...");

        state.newNotificationsCount += 1;

        const newNotification: AppNotification = {
          id: nanoid(),
          title: "Product Upload",
          details: `Successfully processed upload: ${action.meta.arg.uuid}`,
          timestamp: Date.now(),
          read: false,
        };

        AppNotificationAdapter.upsertOne(state.notifications, newNotification);
      });

    //////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////// Clear all notifications on logout
    //////////////////////////////////////////////////////////////

    builder.addCase(login.fulfilled, (state) => {
      console.log("[NOTIFICATION_SLICE]: addCase matched: logout...");
      return initialState;
    });
  },
});

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Notification Exports
//////////////////////////////////////////////////////////////

export default notificationSlice.reducer;

export const { selectNewNotificationsCount } = notificationSlice.selectors;

export const { selectAll: selectAllNotifications, selectEntities: selectNotificationsEntities } =
  AppNotificationAdapter.getSelectors((state: RootState) => state.notifications.notifications);

export const { allNotificationsRead } = notificationSlice.actions;
