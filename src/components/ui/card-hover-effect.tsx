import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, ComponentType } from "react";

type TailwindColor = `bg-${string}` | `dark:bg-${string}`;

export interface HoverEffectProps<T> {
  items: T[];
  Component: ComponentType<T>;
  className?: string;
  backgroundColor?: TailwindColor;
  darkBackgroundColor?: TailwindColor;
  hoverPadding?: React.CSSProperties["padding"];
  hoverBorderRadius?: number;
}

export const HoverEffect = <T extends {}>({
  items,
  Component,
  className,
  backgroundColor = "bg-neutral-200",
  darkBackgroundColor = "dark:bg-slate-800/[0.8]",
  hoverPadding,
  hoverBorderRadius = 24,
}: HoverEffectProps<T>) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("flex flex-row", className)}>
      {items.map((item, idx) => (
        <button
          key={idx}
          tabIndex={0}
          style={{ padding: hoverPadding }}
          className="group relative flex"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                style={{ borderRadius: hoverBorderRadius }}
                className={cn("absolute inset-0 flex", backgroundColor, darkBackgroundColor)}
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <span className="z-20">
            {/* Pass each item to the Component */}
            <Component {...item} />
          </span>
        </button>
      ))}
    </div>
  );
};
