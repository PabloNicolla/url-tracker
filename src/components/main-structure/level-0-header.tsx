import { getCurrentWindow } from "@tauri-apps/api/window";
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { HoverEffect } from "../ui/card-hover-effect";
import MenuItem, { MenuItemProps } from "./level-0-menu-item";
import { MenuSelectedProvider } from "@/contexts/MenuSelectedContext";
import { MenuSelectionProvider } from "@/contexts/MenuSelectionContext";

const appWindow = getCurrentWindow();

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

  const items: MenuItemProps[] = [
    {
      id: 1,
      title: "Menu Item 1",
      actions: [
        { title: "Action 1", onClick: () => console.log("Action 1 clicked") },
        { title: "Action 2", onClick: () => console.log("Action 2 clicked") },
      ],
    },
    {
      id: 2,
      title: "Menu Item 2",
      actions: [
        { title: "Action 3", onClick: () => console.log("Action 3 clicked") },
        { title: "Action 4", onClick: () => console.log("Action 4 clicked") },
      ],
    },
    {
      id: 3,
      title: "Menu Item 3",
      actions: [
        { title: "Action 5", onClick: () => console.log("Action 5 clicked") },
        { title: "Action 6", onClick: () => console.log("Action 6 clicked") },
      ],
    },
  ];

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
      <MenuSelectedProvider>
        <MenuSelectionProvider>
          <div className="ml-2 flex flex-row gap-2 text-sm">
            <HoverEffect Component={MenuItem} items={items} />
          </div>
        </MenuSelectionProvider>
      </MenuSelectedProvider>

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
