import { HoverEffect } from "@/components/ui/card-hover-effect";
import SidebarItem from "./level-0-sidebar-item";
import { botSidebar0Items, topSidebar0Items } from "@/data/sidebar-level-0-data";

interface Level0SidebarProps {}

function Level0Sidebar({}: Level0SidebarProps) {
  return (
    <div className="no-select flex h-full w-10 flex-col items-center bg-red-300">
      <HoverEffect
        items={topSidebar0Items}
        Component={SidebarItem}
        className="flex-col"
        backgroundColor="bg-red-400"
        darkBackgroundColor="dark:bg-red-600"
        hoverBorderRadius={8}
      />
      <div className="flex-1" />
      <div>
        <HoverEffect
          items={botSidebar0Items}
          Component={SidebarItem}
          className="flex-col"
          backgroundColor="bg-red-400"
          darkBackgroundColor="dark:bg-red-600"
          hoverBorderRadius={8}
        />
      </div>
    </div>
  );
}

export default Level0Sidebar;
