import "./App.css";
import Level0Header from "./components/main-structure/level-0-header/level-0-header";
import Level0Sidebar from "./components/main-structure/level-0-sidebar/level-0-sidebar";
import Level0Footer from "./components/main-structure/level-0-footer/level-0-footer";
import MainContentManager from "./components/main-structure/main-content-manager/main-content-manager";

export default function App() {
  return (
    <div className="h-full overflow-auto bg-yellow-200 dark:bg-gray-900 dark:text-white">
      <Level0Header />
      <div className="flex h-[calc(100%-54px)] flex-row">
        <Level0Sidebar />
        <MainContentManager />
      </div>
      <Level0Footer />
    </div>
  );
}
