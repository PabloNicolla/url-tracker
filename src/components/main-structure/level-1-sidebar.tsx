import React, { useState } from 'react';
import { ChevronRight, ChevronDown, GripVertical } from 'lucide-react';
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface Item {
  id: string;
  name: string;
  type: 'item' | 'folder';
  children?: Item[];
}

interface ExplorerItemProps {
  item: Item;
  depth: number;
  onItemClick: (item: Item) => void;
}

const SortableExplorerItem: React.FC<ExplorerItemProps> = ({ item, depth, onItemClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const toggleExpand = () => {
    if (item.type === 'folder') {
      setIsExpanded(!isExpanded);
    }
  };

  const handleItemClick = () => {
    onItemClick(item);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div
        className={`flex items-center py-1 px-2 cursor-pointer hover:bg-gray-200 whitespace-nowrap`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <span {...listeners} className="mr-2 cursor-move flex-shrink-0">
          <GripVertical size={16} />
        </span>
        {item.type === 'folder' && (
          <span className="mr-1 flex-shrink-0" onClick={toggleExpand}>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        {item.type === 'item' && <span className="w-5 flex-shrink-0" />}
        <span className="ml-1 truncate" onClick={item.type === 'folder' ? toggleExpand : handleItemClick}>
          {item.name}
        </span>
      </div>
      {item.type === 'folder' && isExpanded && item.children && (
        <SortableContext items={item.children.map(child => child.id)} strategy={verticalListSortingStrategy}>
          {item.children.map((child) => (
            <SortableExplorerItem key={child.id} item={child} depth={depth + 1} onItemClick={onItemClick} />
          ))}
        </SortableContext>
      )}
    </div>
  );
};

interface Level1SidebarProps { }

function Level1Sidebar({ }: Level1SidebarProps) {
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      name: 'Root Folder',
      type: 'folder',
      children: [
        { id: '2', name: 'Item 1', type: 'item' },
        {
          id: '3',
          name: 'Subfolder',
          type: 'folder',
          children: [
            { id: '4', name: 'Subitem 1', type: 'item' },
            { id: '5', name: 'Subitem 2', type: 'item' },
            {
              id: '6',
              name: 'Subfolder 2',
              type: 'folder',
              children: [
                { id: '7', name: 'Subitem 3', type: 'item' },
                { id: '8', name: 'Subitem 4', type: 'item' },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleItemClick = (item: Item) => {
    console.log('Clicked item:', item);
    // Implement your action here
  };

  const findItemById = (items: Item[], id: string): { item: Item | null, parent: Item | null, index: number } => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        return { item: items[i], parent: null, index: i };
      }
      if (items[i].children) {
        const result = findItemById(items[i].children!, id);
        if (result.item) {
          return result.parent ? result : { item: result.item, parent: items[i], index: result.index };
        }
      }
    }
    return { item: null, parent: null, index: -1 };
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((prevItems) => {
        const { item: activeItem, parent: activeParent, index: activeIndex } = findItemById(prevItems, active.id);
        const { item: overItem, parent: overParent, index: overIndex } = findItemById(prevItems, over.id);

        if (activeParent === overParent) {
          // Same level drag and drop
          const newItems = activeParent ? activeParent.children! : prevItems;
          const newChildren = arrayMove(newItems, activeIndex, overIndex);

          if (activeParent) {
            activeParent.children = newChildren;
            return [...prevItems];
          } else {
            return newChildren;
          }
        } else {
          // Different level drag and drop
          if (activeParent) {
            activeParent.children!.splice(activeIndex, 1);
          } else {
            prevItems.splice(activeIndex, 1);
          }

          if (overItem!.type === 'folder') {
            overItem!.children = overItem!.children || [];
            overItem!.children.push(activeItem!);
          } else {
            if (overParent) {
              overParent.children!.splice(overIndex + 1, 0, activeItem!);
            } else {
              prevItems.splice(overIndex + 1, 0, activeItem!);
            }
          }

          return [...prevItems];
        }
      });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden hover:overflow-y-scroll">
      <div className="w-full min-w-max">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <SortableExplorerItem key={item.id} item={item} depth={0} onItemClick={handleItemClick} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default Level1Sidebar;
