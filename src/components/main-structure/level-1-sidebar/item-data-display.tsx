import { Item } from "@/redux/sidebar-level-1/sidebar-level-1-slice";

import { FolderClosed, FolderOpen, File } from "lucide-react";

interface ItemDataDisplayProps {
  item: Item;
  depth: number;
}

function ItemDataDisplay({ item, depth }: Readonly<ItemDataDisplayProps>) {
  let ItemSymbol: JSX.Element | null = null;

  if (item.type === "File") {
    ItemSymbol = <File size={16} className="mr-2" />;
  } else if (item.type === "Folder") {
    if (item.isExpanded) {
      ItemSymbol = <FolderOpen size={16} className="mr-2" />;
    } else {
      ItemSymbol = <FolderClosed size={16} className="mr-2" />;
    }
  }

  return (
    <span
      style={{
        marginLeft: 18 * (depth + 1),
      }}
      className="flex items-center"
    >
      {ItemSymbol}
      {item.name}
    </span>
  );
}

export default ItemDataDisplay;
