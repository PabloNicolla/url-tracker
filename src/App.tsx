import "./App.css";
import { Sidebar, SidebarBody, SidebarItem } from "./components/ui/sidebar";
import { useState } from "react";
import { Home, Settings, User } from "lucide-react"; // Assuming you're using lucide-react for icons

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    {
      label: "Home",
      action: () => console.log("Home clicked"),
      icon: <Home size={24} />,
    },
    {
      label: "Profile",
      action: () => console.log("Profile clicked"),
      icon: <User size={24} />,
    },
    {
      label: "Settings",
      action: () => console.log("Settings clicked"),
      icon: <Settings size={24} />,
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody>
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} sidebarItem={item} />
          ))}
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 p-4">
        <h1>Main Content</h1>
        {/* Add your main content here */}
      </main>
    </div>
  );
}
