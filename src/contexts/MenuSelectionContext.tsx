import React, { createContext, useCallback, useContext, useMemo } from "react";
import { SelectedMenuActionType, useMenuSelected } from "./MenuSelectedContext";

type SelectionContextType = {
  selectMenuHandler: (id: number, newState: boolean, actionType: SelectedMenuActionType) => boolean;
};

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const useMenuSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useMenuSelection must be used within a MenuSelectionProvider");
  }
  return context;
};

export const MenuSelectionProvider = ({ children }: { children: React.ReactNode }) => {
  const { action } = useMenuSelected();

  const selectMenuHandler = useCallback((id: number, newState: boolean, actionType: SelectedMenuActionType) => {
    return action(id, newState, actionType);
  }, []);

  const contextMemo = useMemo(
    () => ({
      selectMenuHandler,
    }),
    [selectMenuHandler],
  );

  return <SelectionContext.Provider value={contextMemo}>{children}</SelectionContext.Provider>;
};
