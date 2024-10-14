import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// State Config
//////////////////////////////////////////////////////////////

export interface Item {
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
    sidebar1Added(state, action: PayloadAction<{ newItem: Item }>) {
      console.log("[SIDEBAR_1_SLICE]: Action sidebar1Added...");

      const newItem = action.payload.newItem;

      // Block adding if the newItem.id already exists
      if (state.byId[newItem.id]) {
        console.error(`Item with id "${newItem.id}" already exists. Cannot add duplicate.`);
        return; // Prevent further processing
      }

      // Block the operation if trying to add to the "___ROOT"
      if (newItem.id === ___ROOT.id) {
        console.error(`[SIDEBAR_1_SLICE]: Cannot add an item with the reserved "${___ROOT.id}" id.`);
        return;
      }

      const parentId = newItem.parentId ?? ___ROOT.id;
      const parent = state.byId[parentId];

      console.log("qqqqqqqq11111", newItem.parentId);
      console.log("qqqqqqqq22222", parentId);

      return {
        ...state,
        byId: {
          ...state.byId,
          [newItem.id]: newItem,
          [parentId]: {
            ...parent,
            childrenIds: [...parent.childrenIds, newItem.id],
          },
        },
      };
    },
    sidebar1Removed(state, action: PayloadAction<{ itemId: Item["id"] }>) {
      console.log("[SIDEBAR_1_SLICE]: Action sidebar1Removed...");

      // Block deletion if the itemId does not exist
      if (!state.byId[action.payload.itemId]) {
        console.error(`Item with id "${action.payload.itemId}" does not exist. Cannot remove inexistent item.`);
        return; // Prevent further processing
      }

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

      // Block move if the movedItemId does not exist
      if (!state.byId[action.payload.movedItemId]) {
        console.error(`Item with id "${action.payload.movedItemId}" does not exist. Cannot move inexistent item.`);
        return; // Prevent further processing
      }

      // Block move if the newParentId does not exist
      if (!state.byId[action.payload.newParentId]) {
        console.error(`Item with id "${action.payload.newParentId}" does not exist. Cannot move to inexistent item.`);
        return; // Prevent further processing
      }

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
        console.log("old pa", oldParentId);
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

      console.log("not found old pa", oldParentId);
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

export const selectChildrenOfItem = createSelector(
  [(state: RootState, itemId: Item["id"]) => state.sidebar1.byId[itemId]],
  (parent) => parent?.childrenIds.map((childId) => childId),
);
