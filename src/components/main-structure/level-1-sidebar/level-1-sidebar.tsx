import { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  useSensor,
  TouchSensor,
  MouseSensor,
  useSensors,
  KeyboardSensor,
} from "@dnd-kit/core";

import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { ___ROOT, selectItemById, sidebar1Moved } from "@/redux/sidebar-level-1/sidebar-level-1-slice";

import "./level-1-sidebar.css";
import TreeNode from "./level-1-sidebar-item";

function Level1Sidebar() {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const _root = useAppSelector((state) => selectItemById(state, ___ROOT.id));
  const selectedItem = useAppSelector((state) => selectItemById(state, String(activeId)));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeId !== null) {
      document.body.classList.add("dragging-file-cursor");
    } else {
      document.body.classList.remove("dragging-file-cursor");
    }

    return () => {
      document.body.classList.remove("dragging-file-cursor");
    };
  }, [activeId]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 500,
      tolerance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 500,
      tolerance: 10,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor, useSensor(KeyboardSensor));

  return (
    <div className="no-select flex flex-1 overflow-y-auto overflow-x-hidden hover:overflow-y-scroll">
      <div className="flex w-full min-w-max flex-1 flex-col">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
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
