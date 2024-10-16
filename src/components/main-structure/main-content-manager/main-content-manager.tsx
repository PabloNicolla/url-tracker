import HomeStructure from "@/components/main-content/home/home-structure";
import NotificationStructure from "@/components/main-content/notification/notification-structure";
import QueryStructure from "@/components/main-content/query/query-structure";

import { Sidebar0ItemsIdsType } from "@/data/sidebar-level-0-data";
import { useAppSelector } from "@/redux/redux-hooks";
import { selectSelectedSidebar } from "@/redux/sidebar-level-0/sidebar-level-0-slice";

function ContentSelector(content: Readonly<Sidebar0ItemsIdsType>) {
  switch (content) {
    case "Home":
      return <HomeStructure />;
    case "Query":
      return <NotificationStructure />;
    case "Notifications":
      return <QueryStructure />;
    case "Settings":
      return <div>TODO</div>;
    default:
      console.error("[MAIN_CONTENT_MANAGER]: ERROR: Invalid content option given to fn: ContentSelector()");
      return (
        <div className="flex flex-1 items-center justify-center bg-red-500 text-2xl">
          {"[MAIN_CONTENT_MANAGER]: ERROR: Invalid content option given to fn: ContentSelector()"}
        </div>
      );
  }
}

function MainContentManager() {
  const sidebar0Id = useAppSelector(selectSelectedSidebar);
  return ContentSelector(sidebar0Id);
}

export default MainContentManager;
