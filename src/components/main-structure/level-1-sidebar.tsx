interface Level1SidebarProps {}

function Level1Sidebar({}: Level1SidebarProps) {
  return (
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
  );
}

export default Level1Sidebar;
