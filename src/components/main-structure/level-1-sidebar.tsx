import React, { memo, useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  DragStartEvent,
  DragEndEvent,
  useSensor,
  TouchSensor,
  MouseSensor,
  useSensors,
  KeyboardSensor,
} from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import {
  ___ROOT,
  selectChildrenOfItem,
  selectItemById,
  sidebar1Moved,
  sidebar1ToggleExpanded,
} from "@/redux/sidebar-level-1/sidebar-level-1-slice";
import "./level-1-sidebar.css";
import { ChevronDown, ChevronRight, File, FolderOpen, FolderClosed } from "lucide-react";

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
    touchAction: "none",
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
    const dispatch = useAppDispatch();

    console.log(itemId, "is updating children: ", children, depth);

    const LeftBorder = () => {
      return (
        <div
          style={{
            left: (depth - 1 <= 0 ? 0 : depth - 1) * 20,
            width: depth - 1 <= 0 ? 0 : 1,
          }}
          className="absolute left-0 z-40 h-full bg-black"
        />
      );
    };

    const CollapsibleButton = () => {
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
            zIndex: 2000,
          }}
        >
          {item.isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      );
    };

    const ItemDataDisplay = () => {
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
    };

    const RoT = () => {
      return (
        <div className="relative">
          <Droppable id={itemId}>
            <LeftBorder />
            <CollapsibleButton />
            <div
              className={`tree-node relative w-full`}
              style={{
                zIndex: depth,
              }}
            >
              <ItemDataDisplay />
            </div>
            {item.isExpanded && children?.map((c_id) => <TreeNode key={c_id} itemId={c_id} depth={depth + 1} />)}
          </Droppable>
        </div>
      );
    };

    const Fot = () => {
      return (
        <div className="relative">
          <Droppable id={itemId}>
            <LeftBorder />
            <CollapsibleButton />
            <Draggable id={itemId}>
              <div
                className={`tree-node relative w-full`}
                style={{
                  zIndex: depth,
                }}
              >
                <ItemDataDisplay />
              </div>
            </Draggable>
            {item.isExpanded && children?.map((c_id) => <TreeNode key={c_id} itemId={c_id} depth={depth + 1} />)}
          </Droppable>
        </div>
      );
    };

    const Fil = () => {
      return (
        <div className="relative">
          <LeftBorder />
          <CollapsibleButton />
          <Draggable id={itemId}>
            <div
              onClick={() => {
                console.log("clicked");
              }}
              className={`tree-node relative w-full`}
              style={{
                zIndex: depth,
              }}
            >
              <ItemDataDisplay />
            </div>
          </Draggable>
          {item.isExpanded && children?.map((c_id) => <TreeNode key={c_id} itemId={c_id} depth={depth + 1} />)}
        </div>
      );
    };

    if (item.id === ___ROOT.id) {
      return <RoT />;
    } else if (item.type === "Folder") {
      return <Fot />;
    }

    return <Fil />;
  },
  (prevProps, nextProps) => prevProps.itemId === nextProps.itemId,
);

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

    // Cleanup function
    return () => {
      document.body.classList.remove("dragging-file-cursor");
    };
  }, [activeId]);

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      tolerance: 5,
      delay: 300,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 300,
      tolerance: 5,
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
