import { useState } from "react";
import { Home, User, Settings, Mail, Bell } from "lucide-react";
import { useTheme } from "./contexts/ThemeContext";
import "./App.css"; // Make sure to import your CSS
import ThemeToggleButton from "./components/ThemeToggleButton";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";

export default function App() {
  // const { theme, toggleTheme } = useTheme();

  // const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // const sidebarItems = [
  //   {
  //     label: "Home",
  //     action: () => console.log("Home clicked"),
  //     icon: <Home size={20} />,
  //     title: "sos",
  //     description: "sos",
  //     link: "sos",
  //   },
  //   {
  //     label: "Profile",
  //     action: () => console.log("Profile clicked"),
  //     icon: <User size={20} />,
  //     title: "sos",
  //     description: "sos",
  //     link: "sos",
  //   },
  //   {
  //     label: "Messages",
  //     action: () => console.log("Messages clicked"),
  //     icon: <Mail size={20} />,
  //     title: "sos",
  //     description: "sos",
  //     link: "sos",
  //   },
  //   {
  //     label: "Notifications",
  //     action: () => console.log("Notifications clicked"),
  //     icon: <Bell size={20} />,
  //     title: "sos",
  //     description: "sos",
  //     link: "sos",
  //   },
  //   {
  //     label: "Settings",
  //     action: () => console.log("Settings clicked"),
  //     icon: <Settings size={20} />,
  //     title: "sos",
  //     description: "sos",
  //     link: "sos",
  //   },
  // ];

  // const listItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  // <ThemeToggleButton />

  return (
    <div className="h-full overflow-auto bg-yellow-200 dark:bg-gray-900 dark:text-white">
      <div className="flex h-8 w-full bg-green-200"></div>
      <div className="flex h-[calc(100%-2rem)] flex-row">
        <div className="flex w-10 bg-red-300"></div>

        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={10} className="flex flex-col bg-blue-300">
            <div className="flex-1 overflow-y-auto overflow-x-hidden hover:overflow-y-scroll">
              <div className="flex h-32 w-32 bg-black"></div>
              <div className="flex h-32 w-32 bg-white"></div>
              <div className="flex h-32 w-32 bg-black"></div>
              <div className="flex h-32 w-32 bg-white"></div>
              <div className="flex h-32 w-32 bg-black"></div>
              <div className="flex h-32 w-32 bg-white"></div>
              <div className="flex h-32 w-32 bg-black"></div>
              <div className="flex h-32 w-32 bg-white"></div>
              <div className="flex h-32 w-32 bg-black"></div>
              <div className="flex h-32 w-32 bg-white"></div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="flex flex-col bg-orange-500">
            <div className="flex-1 overflow-auto hover:overflow-scroll">
              <div className="inline-flex flex-nowrap">
                <div className="flex h-32 w-32 bg-black"></div>
                <div className="flex h-32 w-32 bg-white"></div>
                <div className="flex h-32 w-32 bg-black"></div>
                <div className="flex h-32 w-32 bg-white"></div>
                <div className="flex h-32 w-32 bg-black"></div>
                <div className="flex h-32 w-32 bg-white"></div>
                <div className="flex h-32 w-32 bg-black"></div>
                <div className="flex h-32 w-32 bg-white"></div>
                <div className="flex h-32 w-32 bg-black"></div>
                <div className="flex h-32 w-32 bg-white"></div>
                <div className="flex h-32 w-32 bg-black"></div>
                <div className="flex h-32 w-32 bg-white"></div>
                <div className="flex h-32 w-32 bg-black"></div>
                <div className="flex h-32 w-32 bg-white"></div>
                <div className="flex h-32 w-32 bg-black"></div>
                <div className="flex h-32 w-32 bg-white"></div>
              </div>
              <div className="flex h-32 w-32 bg-black"></div>
              <div className="flex h-32 w-32 bg-white"></div>
              <div className="flex h-32 w-32 bg-black"></div>
              <div className="flex h-32 w-32 bg-white"></div>
              <div className="flex h-32 w-32 bg-black"></div>
              <div className="flex h-32 w-32 bg-white"></div>
              <div className="flex h-32 w-32 bg-black"></div>
              <div className="flex h-32 w-32 bg-white"></div>
              <div className="flex h-32 w-32 bg-black"></div>
              <div className="flex h-32 w-32 bg-white"></div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        {/* 

        <div className="flex flex-1 justify-center bg-zinc-400">
          <div className="h-20 w-20 bg-black"></div>
        </div> */}
      </div>
    </div>
  );
}

/* <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded}>
        <SidebarBody>
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} sidebarItem={item} />
          ))}
        </SidebarBody>
      </Sidebar>
      <main className="ml-[60px] flex-1 p-4">
        <h1 className="mb-4 text-2xl font-bold">Main Content</h1>
        <p>Sidebar is {sidebarExpanded ? "expanded" : "collapsed"}.</p>
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
        >
          Toggle Sidebar
        </button>
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Hover Effect List</h2>
          <List items={listItems} />
        </div>
      </main> */
