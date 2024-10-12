import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Sidebar0ItemsIdsType } from "@/data/sidebar-level-0-data";

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// State Config
//////////////////////////////////////////////////////////////

export interface Sidebar0State {
  selectedSidebar: Sidebar0ItemsIdsType;
  initialLoadStatus: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: Sidebar0State = {
  selectedSidebar: "Home",
  initialLoadStatus: "idle",
};

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Slice
//////////////////////////////////////////////////////////////

const sidebar0Slice = createSlice({
  name: "sidebar0",
  initialState,
  reducers: {
    sidebarSelected(state, action: PayloadAction<Sidebar0ItemsIdsType>) {
      console.log("[SIDEBAR_0_SLICE]: Action selectedSidebar...");
      state.selectedSidebar = action.payload;
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
export const { sidebarSelected } = sidebar0Slice.actions;
