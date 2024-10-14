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

      const { itemId } = action.payload;

      // Block deletion if the itemId does not exist
      if (!state.byId[itemId]) {
        console.error(`Item with id "${itemId}" does not exist. Cannot remove inexistent item.`);
        return;
      }

      // Block the operation if trying to remove the "___ROOT"
      if (itemId === ___ROOT.id) {
        console.error(`[SIDEBAR_1_SLICE]: Cannot remove an item with the reserved "${___ROOT.id}" id.`);
        return;
      }

      const updatedById = { ...state.byId };

      // Helper function to recursively remove an item and its children
      const removeItemAndChildren = (id: string) => {
        const item = updatedById[id];
        if (!item) return;

        // Remove all children recursively
        item.childrenIds.forEach(removeItemAndChildren);

        // Remove the item from its parent's childrenIds
        if (item.parentId) {
          updatedById[item.parentId] = {
            ...updatedById[item.parentId],
            childrenIds: updatedById[item.parentId].childrenIds.filter((childId) => childId !== id),
          };
        }

        // Delete the item
        delete updatedById[id];
      };

      // Start the recursive removal from the target item
      removeItemAndChildren(itemId);

      return {
        // TODO duplicated Redux and Immer copy?
        ...state,
        byId: updatedById,
      };
    },
    sidebar1Moved(state, action: PayloadAction<{ movedItemId: Item["id"]; newParentId: Item["id"] }>) {
      console.log("[SIDEBAR_1_SLICE]: Action sidebar1Moved...");

      const { movedItemId, newParentId } = action.payload;

      // Block move if the movedItemId does not exist
      if (!state.byId[movedItemId]) {
        console.error(`Item with id "${movedItemId}" does not exist. Cannot move inexistent item.`);
        return;
      }

      // Block move if the newParentId does not exist
      if (!state.byId[newParentId]) {
        console.error(`Item with id "${newParentId}" does not exist. Cannot move to inexistent item.`);
        return;
      }

      // Block the operation if trying to move the "___ROOT"
      if (movedItemId === ___ROOT.id) {
        console.error(`[SIDEBAR_1_SLICE]: Cannot move an item with the reserved "${___ROOT.id}" id.`);
        return;
      }

      const movedItem = state.byId[movedItemId];

      // Early return if newParent is already the current parent
      if (movedItem.parentId === newParentId) {
        console.log(`[SIDEBAR_1_SLICE]: Item "${movedItemId}" is already a child of "${newParentId}". No action needed.`);
        return;
      }

      // Check if newParentId is a descendant of movedItemId
      const isDescendant = (parentId: string, childId: string): boolean => {
        const parent = state.byId[parentId];
        if (!parent) return false;
        if (parent.childrenIds.includes(childId)) return true;
        return parent.childrenIds.some(id => isDescendant(id, childId));
      };

      if (isDescendant(movedItemId, newParentId)) {
        console.error(`[SIDEBAR_1_SLICE]: Cannot move an item into its own descendant.`);
        return;
      }

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

export const selectChildrenOfItem = createSelector(
  [(state: RootState, itemId: Item["id"]) => state.sidebar1.byId[itemId]],
  (parent) => parent?.childrenIds.map((childId) => childId),
);
