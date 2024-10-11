import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineSearch,
  AiOutlineBell,
  AiFillBell,
  AiOutlineSetting,
  AiFillSetting,
} from "react-icons/ai";
import { useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import SidebarItem, { SidebarItemProps } from "./level-0-sidebar-item";

interface Level0SidebarProps {}

function Level0Sidebar({}: Level0SidebarProps) {
  const [activeItem, setActiveItem] = useState("home");

  const topItems: SidebarItemProps[] = [
    {
      title: "Home",
      icon: AiOutlineHome,
      activeIcon: AiFillHome,
      isActive: activeItem === "home",
      onClick: () => {
        console.log("Home clicked");
        setActiveItem("home");
      },
      badgeCount: 3,
    },
    {
      icon: AiOutlineSearch,
      activeIcon: AiOutlineSearch,
      title: "Query",
      onClick: () => {
        console.log("Query clicked");
        setActiveItem("query");
      },
      isActive: activeItem === "query",
    },
    {
      icon: AiOutlineBell,
      activeIcon: AiFillBell,
      title: "Notifications",
      onClick: () => {
        console.log("Notifications clicked");
        setActiveItem("notifications");
      },
      isActive: activeItem === "notifications",
      badgeCount: 12,
    },
  ];

  return (
    <div className="flex h-full w-10 flex-col items-center bg-red-300">
      <HoverEffect
        items={topItems}
        Component={SidebarItem}
        className="flex-col"
        backgroundColor="bg-red-400"
        darkBackgroundColor="dark:bg-red-600"
        hoverBorderRadius={8}
      />
      <div className="flex-1" />
      <div>
        <SidebarItem
          icon={AiOutlineSetting}
          activeIcon={AiFillSetting}
          title="Settings"
          onClick={() => {
            console.log("Settings clicked");
            setActiveItem("settings");
          }}
          isActive={activeItem === "settings"}
          hoverEffect
        />
      </div>
    </div>
  );
}

export default Level0Sidebar;
