import { useState, useEffect } from "react";
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from "react-icons/vsc";
import { getCurrentWindow } from "@tauri-apps/api/window";

import { MenuSelectedProvider } from "@/contexts/MenuSelectedContext";
import { MenuSelectionProvider } from "@/contexts/MenuSelectionContext";

import { menuItems } from "@/data/header-level-0-data";
import MenuItem from "./level-0-menu-item";

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

  return (
    <div className="no-select z-50 flex h-[32px] w-full items-center bg-green-200 px-2" data-tauri-drag-region>
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
          <div className="ml-2 flex flex-row text-sm">
            {menuItems.map(({ actions, id, title }, index) => (
              <MenuItem actions={actions} id={id} title={title} key={index} />
            ))}
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
