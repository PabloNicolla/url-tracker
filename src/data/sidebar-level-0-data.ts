import { SidebarItemProps } from "@/components/main-structure/level-0-sidebar/level-0-sidebar-item";
import {
  AiFillBell,
  AiFillHome,
  AiFillSetting,
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineSetting,
} from "react-icons/ai";

export type Sidebar0ItemsIdsType = "Home" | "Query" | "Notifications" | "Settings";
export const Sidebar0ItemsIds = ["Home", "Query", "Notifications", "Settings"];

export const topSidebar0Items: SidebarItemProps[] = [
  {
    title: "Home",
    icon: AiOutlineHome,
    activeIcon: AiFillHome,
  },
  {
    title: "Query",
    icon: AiOutlineSearch,
    activeIcon: AiOutlineSearch,
  },
  {
    title: "Notifications",
    icon: AiOutlineBell,
    activeIcon: AiFillBell,
  },
];

export const botSidebar0Items: SidebarItemProps[] = [
  {
    title: "Settings",
    icon: AiOutlineSetting,
    activeIcon: AiFillSetting,
  },
];
