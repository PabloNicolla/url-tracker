import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMenuSelection } from "@/contexts/MenuSelectionContext";
import { SelectedMenuActionType } from "@/contexts/MenuSelectedContext";
import { useAppDispatch } from "@/redux/redux-hooks";
import { MenuItemProps, MenuItemAction } from "@/data/header-level-0-data";

function MenuItem({ id, title, actions }: MenuItemProps) {
  const { selectMenuHandler } = useMenuSelection();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleModeChange = (newState: boolean, action: SelectedMenuActionType) => {
    const controlledState = selectMenuHandler(id, newState, action);
    setIsOpen(controlledState);
  };

  const handleAction = (action: MenuItemAction) => {
    if (action.type === "dispatch") {
      dispatch({ type: action.action, payload: action.payload });
    } else if (action.type === "function") {
      action.handler();
    }
  };

  return (
    <DropdownMenu
      open={isOpen}
      modal={false}
      onOpenChange={(nn) => {
        handleModeChange(nn, "AutoUpdated");
      }}
    >
      <DropdownMenuTrigger
        className={`rounded-md px-2 py-1 ${isOpen ? "bg-purple-600/50" : "hover:bg-purple-600/30"}`}
        onMouseEnter={() => {
          handleModeChange(true, "HoverEnter");
        }}
      >
        {title}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 rounded-md bg-fuchsia-500 py-1">
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.title}
            onClick={() => handleAction(action.action)}
            className="mx-1 cursor-pointer rounded-md px-3 py-1 hover:bg-purple-600/50"
          >
            {action.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MenuItem;
