import { useDraggable, useDroppable } from "@dnd-kit/core";

export function Draggable({ id, children }: Readonly<{ id: number | string; children: React.ReactNode }>) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

export function Droppable({ id, children }: Readonly<{ id: number | string; children: React.ReactNode }>) {
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

export function DragAndDroppable({ id, children }: Readonly<{ id: number | string; children: React.ReactNode }>) {
  return (
    <Draggable id={id}>
      <Droppable id={id}>{children}</Droppable>
    </Draggable>
  );
}
