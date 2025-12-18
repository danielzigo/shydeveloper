"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface AnimatedMenuButtonProps {
  isActive?: boolean; // Controlled by parent wrapper's focus state
}

const AnimatedMenuButton = ({ isActive = false }: AnimatedMenuButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Show animation if hovered OR active (parent is focused)
  const showAnimation = isHovered || isActive;

  // Animation for the middle line (fades out)
  const middleLineVariant = {
    initial: { opacity: 1, width: "100%" },
    hidden: {
      opacity: 0,
      width: "0%",
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  // Animation for the Menu text (fades in)
  const labelVariant = {
    initial: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <div
      className="relative w-8 h-8 cursor-pointer flex flex-col items-center justify-center gap-[9.5px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top line */}
      <div className="w-full h-0.5 bg-accent" />

      {/* Middle section - contains middle line and Menu text */}
      <div className="relative w-1/2 h-0.5 flex items-center justify-center">
        {/* Middle line */}
        <motion.div
          className="absolute h-0.5 bg-accent"
          style={{
            transformOrigin: "center",
          }}
          variants={middleLineVariant}
          initial="initial"
          animate={showAnimation ? "hidden" : "initial"}
        />

        {/* Menu label */}
        <motion.span
          className="text-accent text-[12.5px] font-semibold absolute whitespace-nowrap"
          variants={labelVariant}
          initial="initial"
          animate={showAnimation ? "visible" : "initial"}
        >
          Menu
        </motion.span>
      </div>

      {/* Bottom line */}
      <div className="w-full h-0.5 bg-accent" />
    </div>
  );
};

export default AnimatedMenuButton;
