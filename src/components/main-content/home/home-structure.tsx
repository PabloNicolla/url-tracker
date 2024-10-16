import Level1Sidebar from "@/components/main-structure/level-1-sidebar/level-1-sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";
import MainContentView from "./home-content";

function HomeStructure() {
  const [leftPanelSize, setLeftPanelSize] = useState(10);
  const [rightPanelSize, setRightPanelSize] = useState(90);

  return (
    <div className="flex bg-orange-500">
      <MainContentView />
    </div>
  );
}

export default HomeStructure;
