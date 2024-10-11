import { getCurrentWindow } from "@tauri-apps/api/window";
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from "react-icons/vsc";
import { useState, useEffect } from "react";

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
    <div className="flex w-full items-center bg-green-200 p-1 px-2" data-tauri-drag-region>
      {/* App Logo */}
      <img
        src="/src-tauri/icons/icon.png"
        alt="App Logo"
        className="pointer-events-none"
        style={{ width: "20px", height: "20px" }}
      />

      {/* Menu */}
      <div className="ml-2 text-sm">
        <button className="px-2 py-1">View</button>
        <button className="px-2 py-1">Help</button>
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
