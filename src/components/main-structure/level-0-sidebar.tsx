import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IconType } from "react-icons";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineSearch,
  AiOutlineBell,
  AiFillBell,
  AiOutlineSetting,
  AiFillSetting,
} from "react-icons/ai";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface SidebarItemProps {
  icon: IconType;
  activeIcon: IconType;
  size?: number;
  title: string;
  onClick: () => void;
  isActive: boolean;
  badgeCount?: number;
}

function SidebarItem({
  icon: Icon,
  activeIcon: ActiveIcon,
  size = 24,
  title,
  onClick,
  isActive,
  badgeCount,
}: SidebarItemProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button
            className={`flex cursor-pointer items-center justify-center rounded-md p-2 ${
              isActive ? "bg-red-400" : "hover:bg-red-400"
            } relative`}
            onClick={() => onClick()}
          >
            {isActive && (
              <motion.div
                className="absolute left-0 h-0 w-1 bg-blue-500"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.3 }}
                style={{ originY: 0.5 }}
              />
            )}
            {isActive ? <ActiveIcon size={size} /> : <Icon size={size} />}
            {badgeCount !== undefined && badgeCount > 0 && (
              <Badge className="absolute -right-1 bottom-0 flex h-[1.2rem] min-w-[1.2rem] items-center justify-center px-1 text-xs">
                {badgeCount > 99 ? "99+" : badgeCount}
              </Badge>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface Level0SidebarProps {}

function Level0Sidebar({}: Level0SidebarProps) {
  const [activeItem, setActiveItem] = useState("home");

  return (
    <div className="flex h-full w-10 flex-col items-center bg-red-300">
      <div className="flex flex-col items-center gap-1">
        <SidebarItem
          icon={AiOutlineHome}
          activeIcon={AiFillHome}
          title="Home"
          onClick={() => {
            console.log("Home clicked");
            setActiveItem("home");
          }}
          isActive={activeItem === "home"}
          badgeCount={3}
        />
        <SidebarItem
          icon={AiOutlineSearch}
          activeIcon={AiOutlineSearch}
          title="Query"
          onClick={() => {
            console.log("Query clicked");
            setActiveItem("query");
          }}
          isActive={activeItem === "query"}
        />
        <SidebarItem
          icon={AiOutlineBell}
          activeIcon={AiFillBell}
          title="Notifications"
          onClick={() => {
            console.log("Notifications clicked");
            setActiveItem("notifications");
          }}
          isActive={activeItem === "notifications"}
          badgeCount={12}
        />
      </div>
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
        />
      </div>
    </div>
  );
}

export default Level0Sidebar;
