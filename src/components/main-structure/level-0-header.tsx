import { getCurrentWindow } from "@tauri-apps/api/window";
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from "react-icons/vsc";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const appWindow = getCurrentWindow();

interface MenuItemActions {
  title: string;
  onClick: () => void;
}

interface MenuItemProps {
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

interface Level0HeaderProps {}

function Level0Header({}: Level0HeaderProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const checkMaximized = async () => {
      setIsMaximized(await appWindow.isMaximized());
    };
    checkMaximized();
    const unlistenMaximize = appWindow.onResized(checkMaximized);
    return () => {
      unlistenMaximize.then((unlisten) => unlisten());
    };
  }, []);

  const handleMaximizeToggle = async () => {
    await appWindow.toggleMaximize();
  };

  const testData: MenuItemProps = {
    title: "Title",
    actions: [
      { title: "action1", onClick: () => {} },
      { title: "action2", onClick: () => {} },
      { title: "action3", onClick: () => {} },
    ],
  };

  return (
    <div className="z-50 flex h-[32px] w-full items-center bg-green-200 px-2" data-tauri-drag-region>
      {/* App Logo */}
      <img
        src="/src-tauri/icons/icon.png"
        alt="App Logo"
        className="pointer-events-none"
        style={{ width: "20px", height: "20px" }}
      />

      {/* Menu */}
      <div className="ml-2 flex flex-row gap-2 text-sm">
        <MenuItem title={testData.title} actions={testData.actions} />
        <MenuItem title={testData.title} actions={testData.actions} />
        <MenuItem title={testData.title} actions={testData.actions} />
      </div>

      {/* Window Controls */}
      <div className="ml-auto flex">
        <button
          className="rounded-sm p-1 transition-colors hover:bg-gray-200"
          onClick={() => appWindow.minimize()}
          aria-label="Minimize"
        >
          <VscChromeMinimize className="h-4 w-4" />
        </button>
        <button
          className="rounded-sm p-1 transition-colors hover:bg-gray-200"
          onClick={handleMaximizeToggle}
          aria-label={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? <VscChromeRestore className="h-4 w-4" /> : <VscChromeMaximize className="h-4 w-4" />}
        </button>
        <button
          className="rounded-sm p-1 transition-colors hover:bg-red-500 hover:text-white"
          onClick={() => appWindow.close()}
          aria-label="Close"
        >
          <VscChromeClose className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default Level0Header;
