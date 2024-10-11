import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMenuSelection } from "@/contexts/MenuSelectionContext";
import { SelectedMenuActionType } from "@/contexts/MenuSelectedContext";

export interface MenuItemActions {
  title: string;
  onClick: () => void;
}

export interface MenuItemProps {
  id: number;
  title: string;
  actions: MenuItemActions[];
}

function MenuItem({ id, title, actions }: MenuItemProps) {
  const { selectMenuHandler } = useMenuSelection();
  const [isOpen, setIsOpen] = useState(false);

  const handleModeChange = (newState: boolean, action: SelectedMenuActionType) => {
    const controlledState = selectMenuHandler(id, newState, action);
    setIsOpen(controlledState);
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
            onClick={() => {
              action.onClick();
            }}
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
