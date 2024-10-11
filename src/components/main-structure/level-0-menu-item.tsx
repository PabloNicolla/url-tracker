import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export interface MenuItemActions {
  title: string;
  onClick: () => void;
}

export interface MenuItemProps {
  title: string;
  actions: MenuItemActions[];
}

function MenuItem({ title, actions }: MenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className={`rounded-md px-2 py-1 ${isOpen ? "bg-purple-600/50" : "hover:bg-purple-600/30"}`}>
        {title}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 rounded-md bg-fuchsia-500 py-1">
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.title}
            onClick={() => action.onClick()}
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
