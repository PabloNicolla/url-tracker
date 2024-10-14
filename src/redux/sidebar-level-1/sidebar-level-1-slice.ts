import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// State Config
//////////////////////////////////////////////////////////////

interface Item {
  id: string;
  name: string;
  type: "File" | "Folder";
  parentId?: string; // parent reference
  childrenIds: string[]; // children references
}

interface ItemsState {
  byId: { [id: string]: Item };
  allIds: string[]; // This helps with easy iteration if needed
}

export const ___ROOT: Item = {
  id: "___ROOT",
  name: "___ROOT",
  type: "Folder",
  parentId: undefined,
  childrenIds: [],
};

const initialState: ItemsState = {
  byId: { ___ROOT: ___ROOT },
  allIds: ["___ROOT"],
};

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Slice
//////////////////////////////////////////////////////////////

const sidebar1Slice = createSlice({
  name: "sidebar1",
  initialState,
  reducers: {
    sidebar1Added(state, action: PayloadAction<{ parentId: Item["id"] | null; newItem: Item }>) {
      console.log("[SIDEBAR_1_SLICE]: Action sidebar1Added...");

      // Block the operation if trying to add to the "___ROOT"
      if (action.payload.newItem.id === ___ROOT.id) {
        console.error(`[SIDEBAR_1_SLICE]: Cannot add an item with the reserved "${___ROOT.id}" id.`);
        return;
      }

      const parentId = action.payload.parentId ?? ___ROOT.id;
      const parent = state.byId[parentId];

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.newItem.id]: action.payload.newItem,
          [parentId]: {
            ...parent,
            childrenIds: [...parent.childrenIds, action.payload.newItem.id],
          },
        },
      };
    },
    sidebar1Removed(state, action: PayloadAction<{ itemId: Item["id"] }>) {
      console.log("[SIDEBAR_1_SLICE]: Action sidebar1Removed...");

      // Block the operation if trying to remove the "___ROOT"
      if (action.payload.itemId === ___ROOT.id) {
        console.error(`[SIDEBAR_1_SLICE]: Cannot remove an item with the reserved "${___ROOT.id}" id.`);
        return;
      }

      const { itemId } = action.payload;
      const updatedById = { ...state.byId };
      delete updatedById[itemId];

      // Also remove the item from its parent's childrenIds
      const { parentId } = state.byId[itemId];
      if (parentId) {
        updatedById[parentId] = {
          ...updatedById[parentId],
          childrenIds: updatedById[parentId].childrenIds.filter((id) => id !== itemId),
        };
      }

      return {
        ...state,
        byId: updatedById,
      };
    },
    sidebar1Moved(state, action: PayloadAction<{ movedItemId: Item["id"]; newParentId: Item["id"] }>) {
      console.log("[SIDEBAR_1_SLICE]: Action sidebar1Moved...");

      // Block the operation if trying to remove the "___ROOT"
      if (action.payload.movedItemId === ___ROOT.id) {
        console.error(`[SIDEBAR_1_SLICE]: Cannot move an item with the reserved "${___ROOT.id}" id.`);
        return;
      }

      const { movedItemId, newParentId } = action.payload;
      const movedItem = state.byId[movedItemId];
      const oldParentId = movedItem.parentId;
      const newParent = state.byId[newParentId];

      if (oldParentId) {
        const oldParent = state.byId[oldParentId];
        return {
          ...state,
          byId: {
            ...state.byId,
            [movedItemId]: {
              ...movedItem,
              parentId: newParentId,
            },
            [oldParentId]: {
              ...oldParent,
              childrenIds: oldParent.childrenIds.filter((id) => id !== movedItemId),
            },
            [newParentId]: {
              ...newParent,
              childrenIds: [...newParent.childrenIds, movedItemId],
            },
          },
        };
      }

      return {
        ...state,
        byId: {
          ...state.byId,
          [movedItemId]: {
            ...movedItem,
            parentId: newParentId,
          },
          [newParentId]: {
            ...newParent,
            childrenIds: [...newParent.childrenIds, movedItemId],
          },
        },
      };
    },
  },
  selectors: {
    selectItemsById: (sidebarState) => sidebarState.byId,
    selectItemById: (sidebarState, id: Item["id"]) => sidebarState.byId[id],
  },
});

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Slice Exports
//////////////////////////////////////////////////////////////

export default sidebar1Slice.reducer;

export const { selectItemById, selectItemsById } = sidebar1Slice.selectors;

export const { sidebar1Added, sidebar1Moved, sidebar1Removed } = sidebar1Slice.actions;

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Custom Selector Exports
//////////////////////////////////////////////////////////////

export const selectAuthUser = createSelector(
  [selectItemsById, (_state: RootState, itemId: Item["id"]) => itemId],
  (itemsById, itemId) => itemsById[itemId]?.childrenIds.map((childId) => itemsById[childId]),
);
