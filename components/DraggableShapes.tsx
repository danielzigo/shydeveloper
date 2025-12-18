import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const DraggableShapes: React.FC<{ sectionRef: React.RefObject<HTMLDivElement> }> = ({
  sectionRef,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [constraints, setConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

  // Calculate the constraints based on screen size
  useEffect(() => {
    const updateConstraints = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768; // Example threshold for mobile

        if (isMobile) {
          // Constrain shapes to the right half of the section on mobile
          setConstraints({
            top: 0,
            left: rect.width / 2, // Starting from the middle of the section
            right: rect.width,
            bottom: rect.height,
          });
        } else {
          // Allow shapes to use the entire section on larger screens
          setConstraints({
            top: 0,
            left: 0,
            right: rect.width,
            bottom: rect.height,
          });
        }
      }
    };

    // Call once to set the constraints
    updateConstraints();

    // Update constraints on window resize
    window.addEventListener("resize", updateConstraints);

    return () => window.removeEventListener("resize", updateConstraints);
  }, [sectionRef]);

  return (
    <div className="relative w-full xl:w-[500px] h-[300px] flex justify-center items-center">
      {/* First Square - larger */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg cursor-pointer"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        drag
        dragConstraints={constraints} // Apply the updated constraints
        dragPropagation={false}
        whileTap={{ scale: 0.9 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      />

      {/* Second Square - smaller */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-r from-green-500 to-teal-600 shadow-md cursor-pointer"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        drag
        dragConstraints={constraints} // Apply the updated constraints
        dragPropagation={false}
        whileTap={{ scale: 0.9 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      />

      {/* Hexagon Shape */}
      <motion.div
        className="absolute top-1/4 left-0 w-36 h-36 bg-gradient-to-r from-green-500 to-teal-600"
        style={{
          clipPath: "polygon(25% 7%, 75% 7%, 100% 50%, 75% 93%, 25% 93%, 0% 50%)",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        drag
        dragConstraints={constraints} // Apply the updated constraints
        dragPropagation={false}
        whileTap={{ scale: 0.9 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      />
    </div>
  );
};

export default DraggableShapes;
