import { useState } from "react";
import { useAppDispatch } from "@/redux/redux-hooks";
import { sidebar1Added, ___ROOT, Item } from "@/redux/sidebar-level-1/sidebar-level-1-slice";

interface MainContentViewProps {}

function MainContentView({}: MainContentViewProps) {
  const dispatch = useAppDispatch();
  const [nextId, setNextId] = useState(11);

  const handleAddFile = () => {
    const newFile: Item = {
      id: nextId.toString(),
      name: `File ${nextId}`,
      type: "File",
      parentId: ___ROOT.id,
      childrenIds: [],
    };

    dispatch(sidebar1Added({ newItem: newFile }));
    setNextId((prevId) => prevId + 1);
  };

  return (
    <div className="flex-1 overflow-auto hover:overflow-scroll">
      <button onClick={handleAddFile} className="m-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Add File to Sidebar
      </button>
      <div className="flex">
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
  );
}

export default MainContentView;
