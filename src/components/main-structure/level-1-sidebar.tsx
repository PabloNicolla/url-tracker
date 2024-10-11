import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react'; // Assuming you're using lucide-react for icons

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

const ExplorerItem: React.FC<ExplorerItemProps> = ({ item, depth, onItemClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    if (item.type === 'folder') {
      setIsExpanded(!isExpanded);
    }
  };

  const handleItemClick = () => {
    onItemClick(item);
  };

  return (
    <div>
      <div
        className={`flex items-center py-1 px-2 cursor-pointer hover:bg-gray-200`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={item.type === 'folder' ? toggleExpand : handleItemClick}
      >
        {item.type === 'folder' && (
          <span className="mr-1">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        {item.type === 'item' && <span className="w-5" />}
        <span className="ml-1">{item.name}</span>
      </div>
      {item.type === 'folder' && isExpanded && item.children && (
        <div>
          {item.children.map((child) => (
            <ExplorerItem key={child.id} item={child} depth={depth + 1} onItemClick={onItemClick} />
          ))}
        </div>
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

  const handleItemClick = (item: Item) => {
    console.log('Clicked item:', item);
    // Implement your action here
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden hover:overflow-y-scroll">
      {items.map((item) => (
        <ExplorerItem key={item.id} item={item} depth={0} onItemClick={handleItemClick} />
      ))}
    </div>
  );
}

export default Level1Sidebar;
