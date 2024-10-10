import "./App.css"; // Make sure to import your CSS
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";
import Level1Sidebar from "./components/main-structure/level-1-sidebar";
import Level0Sidebar from "./components/main-structure/level-0-sidebar";
import MainContentView from "./components/main-structure/main-content-view";
import Level0Header from "./components/main-structure/level-0-header";

export default function App() {
  return (
    <div className="h-full overflow-auto bg-yellow-200 dark:bg-gray-900 dark:text-white">
      <Level0Header />
      <div className="flex h-[calc(100%-2rem)] flex-row">
        <Level0Sidebar />
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={10} className="flex flex-col bg-blue-300">
            <Level1Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="flex flex-col bg-orange-500">
            <MainContentView />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
