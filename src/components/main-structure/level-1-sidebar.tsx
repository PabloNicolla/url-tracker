import React, { memo, useEffect, useState } from "react";
import { DndContext, DragOverlay, useDraggable, useDroppable, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import {
  ___ROOT,
  Item,
  selectChildrenOfItem,
  selectItemById,
  sidebar1Moved,
} from "@/redux/sidebar-level-1/sidebar-level-1-slice";
import "./level-1-sidebar.css";

function Draggable({ id, children }: Readonly<{ id: number | string; children: React.ReactNode }>) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

function Droppable({ id, children }: Readonly<{ id: number | string; children: React.ReactNode }>) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const style = {
    backgroundColor: isOver ? "green" : undefined, // Default background
    color: "black",
    transition: "background-color 0.2s ease",
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
      }}
      style={style}
    >
      {children}
    </div>
  );
}

function DragAndDroppable({ id, children }: Readonly<{ id: number | string; children: React.ReactNode }>) {
  return (
    <Draggable id={id}>
      <Droppable id={id}>{children}</Droppable>
    </Draggable>
  );
}

interface TreeNodeProps {
  itemId: string;
  depth: number;
}

const TreeNode: React.FC<TreeNodeProps> = memo(
  ({ itemId, depth }) => {
    const item = useAppSelector((state) => selectItemById(state, itemId));
    const children = useAppSelector((state) => selectChildrenOfItem(state, itemId));

    console.log(itemId, "is updating children: ", children, depth);

    let WrapperDnd = DragAndDroppable;

    if (item.type === "File") {
      WrapperDnd = Draggable;
    }

    if (itemId === ___ROOT.id) {
      WrapperDnd = Droppable;
    }

    return (
      <WrapperDnd id={itemId}>
        <div
          className={`tree-node relative w-full`}
          style={{
            zIndex: depth,
          }}
        >
          <div
            style={{
              left: (depth - 1 <= 0 ? 0 : depth - 1) * 20,
              width: depth - 1 <= 0 ? 0 : 1,
            }}
            className="absolute left-0 -z-40 h-full bg-black"
          />
          <span
            style={{
              marginLeft: 20 * depth,
            }}
          >
            {`${item.type}: ${item.name}`}
          </span>
          {children?.map((c_id) => {
            return <TreeNode key={c_id} itemId={c_id} depth={depth + 1} />;
          })}
        </div>
      </WrapperDnd>
    );
  },
  (prevProps, nextProps) => prevProps.itemId === nextProps.itemId,
);

function Level1Sidebar() {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const _root = useAppSelector((state) => selectItemById(state, ___ROOT.id));
  const selectedItem = useAppSelector((state) => selectItemById(state, String(activeId)));
  const dispatch = useAppDispatch();

  return (
    <div className="no-select flex flex-1 overflow-y-auto overflow-x-hidden hover:overflow-y-scroll">
      <div className="flex w-full min-w-max flex-1 flex-col">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <TreeNode itemId={_root.id} depth={0} />
          <DragOverlay>{selectedItem ? <div>{`${selectedItem.name}`}</div> : null}</DragOverlay>
        </DndContext>
      </div>
    </div>
  );

  function handleDragStart(event: DragStartEvent) {
    console.log("is this working?");
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (over && active.id !== over.id) {
      dispatch(sidebar1Moved({ movedItemId: String(active.id), newParentId: String(over.id) }));
    }
  }
}

export default Level1Sidebar;
