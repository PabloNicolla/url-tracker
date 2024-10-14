import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  DragStartEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useAppSelector } from "@/redux/redux-hooks";
import { selectItemById, selectItemsById } from "@/redux/sidebar-level-1/sidebar-level-1-slice";

interface ItemType {
  id: number;
  title: string;
  type: "file" | "folder";
  depth: number;
  childrenItems?: ItemType[];
}

function Draggable({ id, children }: { id: number | string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

function Droppable({ id, children }: { id: number | string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return <div ref={setNodeRef}>{children}</div>;
}

function DragAndDroppable({ id, children }: { id: number | string; children: React.ReactNode }) {
  return (
    <Draggable id={id}>
      <Droppable id={id}>{children}</Droppable>
    </Draggable>
  );
}

function Item({ id, title, type, depth, childrenItems }: ItemType) {
  return (
    <div>
      {`${type}: ${title}`}
      {childrenItems?.map((item) => {
        return (
          <DragAndDroppable key={item.id} id={item.id}>
            <Item
              id={item.id}
              depth={depth + 1}
              title={item.title}
              type={item.type}
              childrenItems={item.childrenItems}
            />
          </DragAndDroppable>
        );
      })}
    </div>
  );
}

function TreeNode({ itemId }: { itemId: string }) {
  const item = useAppSelector((state) => selectItemById(state, itemId));
  const children = useAppSelector((state) => selectChildrenOfItem(state, itemId));

  return (
    <div>
      {`${item.type}: ${item.name}`}
      {item.childrenIds?.map((c_id) => {
        return (
          <DragAndDroppable key={item.id} id={c_id}>
            <TreeNode itemId={c_id} />
          </DragAndDroppable>
        );
      })}
    </div>
  );
}

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

  const items = useAppSelector((state) => selectItemsById(state));

  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {items.map((item) => (
        <DragAndDroppable key={item.id} id={item.id}>
          <Item id={item.id} depth={1} title={item.title} type={item.type} childrenItems={item.childrenItems} />
        </DragAndDroppable>
      ))}

      <DragOverlay>{activeId ? <div>Item selected id: {activeId}</div> : null}</DragOverlay>
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    console.log("is this working?");
    setActiveId(event.active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
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
function selectChildrenOfItem(
  state: {
    sidebar0: import("../../redux/sidebar-level-0/sidebar-level-0-slice").Sidebar0State;
    notifications: import("../../redux/notifications/notifications-slice").NotificationSliceData;
  },
  itemId: string,
): any {
  throw new Error("Function not implemented.");
}
