"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

interface LogoTextProps {
  otherStyles?: string;
  disabled?: boolean;
  hovered?: boolean;
  shySize?: string;
  developerSize?: string;
}

const LogoText = ({ otherStyles, disabled = false, hovered = false, shySize = "text-3xl xl:text-4xl", developerSize = "text-4xl xl:text-6xl" }: LogoTextProps) => {
  const isNotWideScreen = useMediaQuery({ query: "(max-width: 1199px)" });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const hasTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0;
      
    setIsTouchDevice(hasTouch);
  }, []);

  return (
    <motion.div
      className={`relative flex items-center overflow-hidden ${otherStyles} ${
        disabled ? "cursor-default" : "cursor-pointer"
      }`} // Disable pointer cursor when disabled
      transition={{ duration: 2, ease: "easeInOut" }} // Animation transition for text
    >
      {/* First word 'Shy' with the lines */}
      <span className="font-logo text-6xl font-normal tracking-tighter relative flex items-center">
        <motion.span 
          className={`text-white/80 ${shySize} relative`}
          initial={{ opacity: 1, x: 0 }}
          animate={
            !isTouchDevice && hovered && !disabled
              ? { opacity: 0, x: isNotWideScreen ? -30 : -50 }
              : { opacity: 1, x: 0 }
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
        > {/* pr-1 */}
          Shy
          {/* Line above 'Shy' */}
          <>
            {/* <motion.span
              className="absolute left-[-5px] w-full h-[2px] bg-white"
              variants={lineVariants}
              initial="initial" // Start in place, fully visible
              animate={isHovered && !disabled ? "hover" : "visible"} // Hover to the right, unhover reappears from left
              transition={{ duration: 0.6, ease: "easeInOut" }}
            /> */}
            {/* Line below 'Shy' */}
            {/* <motion.span
              className="absolute left-[-5px] w-full bottom-[-2px] h-[2px] bg-white"
              variants={lineVariants}
              initial="initial" // Start in place, fully visible
              animate={isHovered && !disabled ? "hover" : "visible"} // Hover to the right, unhover reappears from left
              transition={{ duration: 0.6, ease: "easeInOut" }}
            /> */}
          </>
        </motion.span>

        {/* Second word 'Developer' */}
        <motion.span
          className={`${developerSize} font-normal tracking-tighter ${
            disabled ? "text-gray-400" : "text-gradient"
          }`}
          initial={{ x: 0 }}
          animate={
            !isTouchDevice && hovered && !disabled
              ? { x: isNotWideScreen ? -30 : -40 }
              : { x: 0 }
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          Developer
        </motion.span>
      </span>
    </motion.div>
  );
};

export default LogoText;
