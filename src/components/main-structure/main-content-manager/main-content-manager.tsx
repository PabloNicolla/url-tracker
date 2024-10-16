import HomeStructure from "@/components/main-content/home/home-structure";
import NotificationStructure from "@/components/main-content/notification/notification-structure";
import QueryStructure from "@/components/main-content/query/query-structure";

enum ContentOptions {
  HOME,
  NOTIFICATION,
  QUERY,
  SETTINGS,
}

function ContentSelector(content: Readonly<ContentOptions>) {
  switch (content) {
    case ContentOptions.HOME:
      return <HomeStructure />;
    case ContentOptions.NOTIFICATION:
      return <NotificationStructure />;
    case ContentOptions.QUERY:
      return <QueryStructure />;
    case ContentOptions.SETTINGS:
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
  return ContentSelector(ContentOptions.HOME);
}

export default MainContentManager;
