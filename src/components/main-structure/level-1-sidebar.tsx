import React, { memo, useEffect, useRef, useState } from "react";
import { DndContext, DragOverlay, useDraggable, useDroppable, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import {
  ___ROOT,
  selectChildrenOfItem,
  selectItemById,
  sidebar1Moved,
} from "@/redux/sidebar-level-1/sidebar-level-1-slice";
import { color } from "framer-motion";

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
          className={`tree-node depth-${depth}`}
          style={{
            paddingLeft: 20,
            zIndex: depth,
            borderLeftWidth: 1,
            borderColor: "black",
          }}
        >
          {`${item.type}: ${item.name}`}
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
  const dispatch = useAppDispatch();

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <TreeNode itemId={_root.id} depth={0} />
      <DragOverlay>{activeId ? <div>Item selected id: {activeId}</div> : null}</DragOverlay>
    </DndContext>
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

  // return (
  //   <div className="flex-1 overflow-y-auto overflow-x-hidden hover:overflow-y-scroll">
  //     <div className="w-full min-w-max">
  //       <DndContext
  //         sensors={sensors}
  //         collisionDetection={closestCenter}
  //         onDragEnd={handleDragEnd}
  //         modifiers={[restrictToVerticalAxis]}
  //       >
  //         <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
  //           {items.map((item) => (
  //             <SortableExplorerItem key={item.id} item={item} depth={0} onItemClick={handleItemClick} />
  //           ))}
  //         </SortableContext>
  //       </DndContext>
  //     </div>
  //   </div>
  // );
}

export default Level1Sidebar;
