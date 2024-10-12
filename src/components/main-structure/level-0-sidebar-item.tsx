import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IconType } from "react-icons";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import {
  selectSelectedSidebar,
  selectSidebar0NotificationById,
  sidebar0Selected,
} from "@/redux/sidebar-level-0/sidebar-level-0-slice";
import { Sidebar0ItemsIdsType } from "@/data/sidebar-level-0-data";

export interface SidebarItemProps {
  title: Sidebar0ItemsIdsType;
  icon: IconType;
  activeIcon: IconType;
  size?: number;
  hoverEffect?: boolean;
}

function SidebarItem({
  icon: Icon,
  activeIcon: ActiveIcon,
  size = 24,
  title,
  hoverEffect,
}: Readonly<SidebarItemProps>) {
  const isActive = useAppSelector(selectSelectedSidebar) === title;
  const badgeCount = useAppSelector((state) => {
    const notification = selectSidebar0NotificationById(state, title);
    return notification?.notificationCount ?? 0;
  });

  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(sidebar0Selected(title));
  };

  const tw_BgColor = isActive ? "bg-red-400" : "";
  const tw_hover = hoverEffect ? "hover:bg-red-400" : "";
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button
            className={`flex cursor-pointer items-center justify-center rounded-md p-2 ${tw_BgColor} ${tw_hover} relative`}
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
              <Badge className="absolute bottom-0 right-0 flex h-[1.02rem] min-w-[1.02rem] items-center justify-center px-[0.2rem] text-[0.68rem]">
                {badgeCount > 99 ? "99+" : badgeCount}
              </Badge>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="no-select">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default SidebarItem;
