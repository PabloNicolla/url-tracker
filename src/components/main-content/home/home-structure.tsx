import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MainContentView from "./home-content";

function HomeStructure() {
  return (
    <ScrollArea className="flex flex-1 bg-orange-500">
      <MainContentView />

      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default HomeStructure;
