import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Item from './Item';

interface ListProps {
  items: string[];
}

const List: React.FC<ListProps> = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <AnimatePresence>
        {items.map((item, index) => (
          <Item
            key={index}
            text={item}
            isHovered={hoveredIndex === index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default List;