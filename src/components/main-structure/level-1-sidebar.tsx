import React, { memo, useState } from "react";
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
  DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import {
  ___ROOT,
  selectChildrenOfItem,
  selectItemById,
  selectItemsById,
  sidebar1Moved,
} from "@/redux/sidebar-level-1/sidebar-level-1-slice";

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

// function Item({ id, title, type, depth, childrenItems }: ItemType) {
//   return (
//     <div>
//       {`${type}: ${title}`}
//       {childrenItems?.map((item) => {
//         return (
//           <DragAndDroppable key={item.id} id={item.id}>
//             <Item
//               id={item.id}
//               depth={depth + 1}
//               title={item.title}
//               type={item.type}
//               childrenItems={item.childrenItems}
//             />
//           </DragAndDroppable>
//         );
//       })}
//     </div>
//   );
// }

const TreeNode = memo(
  ({ itemId }: { itemId: string }) => {
    const item = useAppSelector((state) => selectItemById(state, itemId));
    const children = useAppSelector((state) => selectChildrenOfItem(state, itemId));

    console.log(itemId, "is updating children: ", children);

    return (
      <div>
        {`${item.type}: ${item.name}`}
        {children?.map((c_id) => {
          return (
            <DragAndDroppable key={c_id} id={c_id}>
              <TreeNode itemId={c_id} />
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
        <TreeNode itemId={_root.id} />
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
