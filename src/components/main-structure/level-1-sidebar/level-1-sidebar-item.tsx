import React, { memo } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";

import {
  ___ROOT,
  Item,
  selectChildrenOfItem,
  selectItemById,
  sidebar1ToggleExpanded,
} from "@/redux/sidebar-level-1/sidebar-level-1-slice";

import { Draggable, Droppable } from "@/components/ui/simple-dnd";

import CollapsibleButton from "./collapsible-button";

import ItemDataDisplay from "./item-data-display";

interface TreeNodeProps {
  itemId: string;

  depth: number;
}

const TreeNode: React.FC<TreeNodeProps> = memo(
  ({ itemId, depth }) => {
    const item = useAppSelector((state) => selectItemById(state, itemId));

    const childrenIds = useAppSelector((state) => selectChildrenOfItem(state, itemId));

    console.log(itemId, "is updating children: ", childrenIds, depth);

    if (item.id === ___ROOT.id) {
      return <RootItem childrenIds={childrenIds} depth={depth} item={item} />;
    } else if (item.type === "Folder") {
      return <FolderItem childrenIds={childrenIds} depth={depth} item={item} />;
    }

    return <FileItem childrenIds={childrenIds} depth={depth} item={item} />;
  },

  (prevProps, nextProps) => prevProps.itemId === nextProps.itemId,
);

export default TreeNode;

function LeftBorder({ depth }: Readonly<{ depth: number }>) {
  return (
    <div
      style={{
        left: (depth - 1 <= 0 ? 0 : depth - 1) * 20,

        width: depth - 1 <= 0 ? 0 : 1,
      }}
      className="absolute left-0 z-40 h-full bg-black"
    />
  );
}

function FileItem({ childrenIds, depth, item }: Readonly<{ depth: number; item: Item; childrenIds: string[] }>) {
  const handleClick = () => {
    console.log(`clicked ${item.id}`);
  };

  return (
    <div className="relative">
      <LeftBorder depth={depth} />

      <CollapsibleButton depth={depth} item={item} />

      <Draggable id={item.id}>
        <div
          className={`tree-node relative w-full`}
          onClick={() => handleClick()}
          style={{
            zIndex: depth,
          }}
        >
          <ItemDataDisplay depth={depth} item={item} />
        </div>
      </Draggable>

      {item.isExpanded && childrenIds?.map((childId) => <TreeNode key={childId} itemId={childId} depth={depth + 1} />)}
    </div>
  );
}

function FolderItem({ childrenIds, depth, item }: Readonly<{ depth: number; item: Item; childrenIds: string[] }>) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(sidebar1ToggleExpanded({ itemId: item.id }));
  };

  return (
    <div className="relative">
      <Droppable id={item.id}>
        <LeftBorder depth={depth} />

        <CollapsibleButton depth={depth} item={item} />

        <Draggable id={item.id}>
          <div
            className={`tree-node relative w-full`}
            onClick={() => handleClick()}
            style={{
              zIndex: depth,
            }}
          >
            <ItemDataDisplay depth={depth} item={item} />
          </div>
        </Draggable>

        {item.isExpanded &&
          childrenIds?.map((childId) => <TreeNode key={childId} itemId={childId} depth={depth + 1} />)}
      </Droppable>
    </div>
  );
}

function RootItem({ childrenIds, depth, item }: Readonly<{ depth: number; item: Item; childrenIds: string[] }>) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(sidebar1ToggleExpanded({ itemId: item.id }));
  };

  return (
    <div className="relative">
      <Droppable id={item.id}>
        <LeftBorder depth={depth} />

        <CollapsibleButton depth={depth} item={item} />

        <div
          className={`tree-node relative w-full`}
          onClick={() => handleClick()}
          style={{
            zIndex: depth,
          }}
        >
          <ItemDataDisplay depth={depth} item={item} />
        </div>

        {item.isExpanded &&
          childrenIds?.map((childId) => <TreeNode key={childId} itemId={childId} depth={depth + 1} />)}
      </Droppable>
    </div>
  );
}
