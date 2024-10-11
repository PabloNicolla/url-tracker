import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IconType } from "react-icons";
import { Badge } from "@/components/ui/badge";

export interface SidebarItemProps {
  title: string;
  icon: IconType;
  activeIcon: IconType;
  isActive: boolean;
  onClick: () => void;
  size?: number;
  badgeCount?: number;
  hoverEffect?: boolean;
}

function SidebarItem({
  icon: Icon,
  activeIcon: ActiveIcon,
  size = 24,
  title,
  onClick,
  isActive,
  badgeCount,
  hoverEffect,
}: Readonly<SidebarItemProps>) {
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
