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

  const [overHalf, setOverHalf] = useState<"top" | "bottom" | null>(null);
  const droppableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      if (droppableRef.current && isOver) {
        const rect = droppableRef.current.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;

        // Compare pointer Y position with midpoint
        if (event.clientY < midpoint) {
          setOverHalf("top");
        } else {
          setOverHalf("bottom");
        }
      } else {
        setOverHalf(null); // Reset when not hovering
      }
    }

    if (isOver) {
      window.addEventListener("pointermove", handlePointerMove);
    } else {
      setOverHalf(null); // Reset when drag ends
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isOver]);

  const style = {
    backgroundColor: isOver
      ? overHalf === "top"
        ? "lightblue" // Change color if over the top half
        : "lightgreen" // Change color if over the bottom half
      : "white", // Default background
    color: "black",
    transition: "background-color 0.2s ease",
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        droppableRef.current = node;
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

    const getBackgroundColor = (depth: number) => {
      const colors = ["#f0f0f0", "#e0e0e0", "#d0d0d0", "#c0c0c0", "#b0b0b0"];
      return colors[depth % colors.length];
    };

    return (
      <div
        className={`tree-node depth-${depth}`}
        style={{
          paddingLeft: 20,
          // backgroundColor: getBackgroundColor(depth),
          zIndex: depth,
        }}
      >
        {`${item.type}: ${item.name}`}
        {children?.map((c_id) => {
          return (
            <DragAndDroppable key={c_id} id={c_id}>
              <TreeNode itemId={c_id} depth={depth + 1} />
            </DragAndDroppable>
          );
        })}
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.itemId === nextProps.itemId,
);

function Level1Sidebar() {
  // const items: ItemType[] = [
  //   {
  //     id: 1,
  //     title: "Root Folder 1",
  //     type: "folder",
  //     depth: 0,
  //     childrenItems: [
  //       {
  //         id: 2,
  //         title: "Subfolder 1-1",
  //         type: "folder",
  //         depth: 1,
  //         childrenItems: [
  //           {
  //             id: 3,
  //             title: "File 1-1-1",
  //             type: "file",
  //             depth: 2,
  //           },
  //           {
  //             id: 4,
  //             title: "Subfolder 1-1-2",
  //             type: "folder",
  //             depth: 2,
  //             childrenItems: [
  //               {
  //                 id: 5,
  //                 title: "File 1-1-2-1",
  //                 type: "file",
  //                 depth: 3,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 6,
  //     title: "File 1",
  //     type: "file",
  //     depth: 0,
  //   },
  //   {
  //     id: 7,
  //     title: "Root Folder 2",
  //     type: "folder",
  //     depth: 0,
  //     childrenItems: [
  //       {
  //         id: 8,
  //         title: "Subfolder 2-1",
  //         type: "folder",
  //         depth: 1,
  //         childrenItems: [
  //           {
  //             id: 9,
  //             title: "File 2-1-1",
  //             type: "file",
  //             depth: 2,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 10,
  //     title: "File 2",
  //     type: "file",
  //     depth: 0,
  //   },
  // ];
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const _root = useAppSelector((state) => selectItemById(state, ___ROOT.id));
  const dispatch = useAppDispatch();

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Droppable id={_root.id}>
        <TreeNode itemId={_root.id} depth={0} />
      </Droppable>
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
