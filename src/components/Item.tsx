import React from 'react';
import { motion } from 'framer-motion';

interface ItemProps {
  text: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Item: React.FC<ItemProps> = ({ text, isHovered, onMouseEnter, onMouseLeave }) => {
  return (
    <motion.div
      className="relative p-4 cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-blue-100 dark:bg-blue-900 rounded-md"
          layoutId="highlight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10">{text}</span>
    </motion.div>
  );
};

export default Item;