import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`rounded-full p-2 ${theme === "dark" ? "bg-yellow-400" : "bg-gray-800"}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div initial={false} animate={{ rotate: theme === "dark" ? 0 : 180 }} transition={{ duration: 0.3 }}>
        {theme === "dark" ? (
          <FaSun className="text-xl text-gray-800" />
        ) : (
          <FaMoon className="text-xl text-yellow-400" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggleButton;
