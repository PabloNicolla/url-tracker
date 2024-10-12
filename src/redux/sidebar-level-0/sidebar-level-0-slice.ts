import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Sidebar0ItemsIdsType } from "@/data/sidebar-level-0-data";

import { RootState } from "../store";

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// State Config
//////////////////////////////////////////////////////////////

export interface Sidebar0Notification {
  id: Sidebar0ItemsIdsType;
  notificationCount: number;
}

const Sidebar0NotificationAdapter = createEntityAdapter<Sidebar0Notification>();

const initialSidebar0NotificationState = Sidebar0NotificationAdapter.getInitialState();

export interface Sidebar0State {
  selectedSidebar: Sidebar0ItemsIdsType;
  sidebar0Notification: typeof initialSidebar0NotificationState;
  initialLoadStatus: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: Sidebar0State = {
  selectedSidebar: "Home",
  sidebar0Notification: initialSidebar0NotificationState,
  initialLoadStatus: "idle",
};

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Slice
//////////////////////////////////////////////////////////////

const sidebar0Slice = createSlice({
  name: "sidebar0",
  initialState,
  reducers: {
    sidebar0Selected(state, action: PayloadAction<Sidebar0ItemsIdsType>) {
      console.log("[SIDEBAR_0_SLICE]: Action selectedSidebar...");
      state.selectedSidebar = action.payload;
    },
    sidebar0NotificationAdded(state, action: PayloadAction<{ id: Sidebar0ItemsIdsType; count: number }>) {
      console.log("[SIDEBAR_0_SLICE]: Action sidebar0NotificationAdded...");
      const { id, count } = action.payload;

      // Check if the notification with the given id already exists
      const existingNotification = Sidebar0NotificationAdapter.getSelectors().selectById(
        state.sidebar0Notification,
        id,
      );

      if (existingNotification) {
        // If it exists, increment the count
        Sidebar0NotificationAdapter.updateOne(state.sidebar0Notification, {
          id,
          changes: { notificationCount: existingNotification.notificationCount + count },
        });
      } else {
        // If it doesn't exist, add it
        Sidebar0NotificationAdapter.addOne(state.sidebar0Notification, { id, notificationCount: count });
      }
    },
  },
  selectors: {
    selectSelectedSidebar: (sidebarState) => sidebarState.selectedSidebar,
    selectInitialLoadStatus: (sidebarState) => sidebarState.initialLoadStatus,
  },
});

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Slice Exports
//////////////////////////////////////////////////////////////

export default sidebar0Slice.reducer;

export const { selectInitialLoadStatus, selectSelectedSidebar } = sidebar0Slice.selectors;

export const {
  selectAll: selectAllSidebar0Notifications,
  selectEntities: selectSidebar0NotificationsEntities,
  selectById: selectSidebar0NotificationById,
} = Sidebar0NotificationAdapter.getSelectors((state: RootState) => state.sidebar0.sidebar0Notification);

export const { sidebar0Selected, sidebar0NotificationAdded } = sidebar0Slice.actions;
