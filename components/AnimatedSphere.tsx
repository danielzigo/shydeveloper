"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const AnimatedSphere: React.FC = () => {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={sectionRef} className="relative w-full h-full flex justify-center items-center">
      <motion.div
        className={`absolute w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg cursor-pointer`}
        style={{
          // top: "50%",
          // left: "50%",
          // transform: "translate(-50%, -50%)",
          // transformOrigin: "center",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
        drag
        dragConstraints={sectionRef}
        // dragConstraints={{
        //   top: -200,    // Can move 200px up from center
        //   left: -200,
        //   right: 200,
        //   bottom: 200   // Can move 200px down from center
        // }}
        dragElastic={0}
        dragPropagation={false}
        onDragStart={() => {
          setIsDragging(true);
          setShowTooltip(false);
        }}
        onDragEnd={() => {
          setIsDragging(false);
          setIsHovered(false);
          setShowTooltip(false);
        }}
        onHoverStart={() => {
          if (!isDragging) {
            setIsHovered(true);
            setShowTooltip(true);
          }
        }}
        onHoverEnd={() => {
          if (!isDragging) {
            setIsHovered(false);
            setShowTooltip(false);
          }
        }}
      >
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded">
            Drag me
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AnimatedSphere;
