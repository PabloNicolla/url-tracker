import { useAppDispatch } from "@/redux/redux-hooks";
import { Item, sidebar1ToggleExpanded } from "@/redux/sidebar-level-1/sidebar-level-1-slice";

import { ChevronDown, ChevronRight } from "lucide-react";

interface CollapsibleButtonProps {
  item: Item;
  depth: number;
}

function CollapsibleButton({ item, depth }: Readonly<CollapsibleButtonProps>) {
  const dispatch = useAppDispatch();

  if (item.type === "File") return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        dispatch(sidebar1ToggleExpanded({ itemId: item.id }));
      }}
      className="absolute top-1 bg-purple-500"
      style={{
        left: (depth - 1 <= 0 ? 0 : depth - 1) * 20 + (depth <= 0 ? 0 : 13),
        zIndex: depth + 1,
      }}
    >
      {item.isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </button>
  );
}

export default CollapsibleButton;
