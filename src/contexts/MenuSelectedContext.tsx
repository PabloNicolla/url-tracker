import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export type SelectedMenuActionType = "HoverEnter" | "AutoUpdated";

type SelectedContextType = {
  selectedMenu: Map<number, boolean>;
  action: (id: number, newState: boolean, actionType: SelectedMenuActionType) => boolean;
};

const SelectedContext = createContext<SelectedContextType | undefined>(undefined);

export const useMenuSelected = () => {
  const context = useContext(SelectedContext);
  if (!context) {
    throw new Error("useMenuSelected must be used within a MenuSelectedProvider");
  }
  return context;
};

export const MenuSelectedProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedMenu, setSelectedMenu] = useState<Map<number, boolean>>(new Map());

  const action = useCallback((id: number, newState: boolean, actionType: SelectedMenuActionType) => {
    let returnState = false;
    setSelectedMenu((prevState) => {
      console.log(prevState);
      console.log(id, newState, actionType);

      if (actionType === "AutoUpdated") {
        if (!newState) {
          returnState = false;
          prevState.set(id, false);
          return prevState;
        }
        returnState = true;
        prevState.set(id, true);
        return prevState;
      }

      let isAnyMenuActive = false;

      prevState.forEach((value, key) => {
        console.log("loop", key, value);
        if (value) {
          isAnyMenuActive = true;
        }
        prevState.set(key, false);
      });

      if (isAnyMenuActive) {
        returnState = true;
        prevState.set(id, true);
        console.log("aaa");
        return prevState;
      }

      console.log("bbb");
      returnState = false;
      prevState.set(id, false);
      return prevState;
    });
    return returnState;
  }, []);

  const contextMemo = useMemo(
    () => ({
      selectedMenu,
      action,
    }),
    [action, selectedMenu],
  );

  return <SelectedContext.Provider value={contextMemo}>{children}</SelectedContext.Provider>;
};
