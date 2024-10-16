import Level1Sidebar from "@/components/main-structure/level-1-sidebar/level-1-sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";
import MainContentView from "./query-content";

function QueryStructure() {
  const [leftPanelSize, setLeftPanelSize] = useState(10);
  const [rightPanelSize, setRightPanelSize] = useState(90);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={10}
        className="flex flex-col bg-blue-300"
        onResize={(size) => setLeftPanelSize(size)}
      >
        <Level1Sidebar />
        {/* <div>Left Panel Size: {leftPanelSize.toFixed(2)}%</div> */}
      </ResizablePanel>
      <ResizableHandle
        withHandle
        className="relative before:absolute before:-inset-x-[2px] before:inset-y-0 before:hover:bg-red-600"
      />
      <ResizablePanel className="flex flex-col bg-orange-500" minSize={25} onResize={(size) => setRightPanelSize(size)}>
        <MainContentView />
        {/* <div>Right Panel Size: {rightPanelSize.toFixed(2)}%</div> */}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default QueryStructure;
