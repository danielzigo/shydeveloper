"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface RollingCircleProps {
  containerRef: React.RefObject<HTMLElement>;
}

const RollingCircle = ({ containerRef }: RollingCircleProps) => {
  // Track scroll progress through the container section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.1"], // Start when section is near viewport, end when leaving
  });

  // Circle size
  const circleSize = 48; // 48px (w-12 h-12 in Tailwind)
  const radius = circleSize / 2;
  const circumference = 2 * Math.PI * radius;

  // Map scroll progress to horizontal position
  // Start just off-screen left, end just off-screen right
  const x = useTransform(scrollYProgress, [0, 1], ["-80px", "100vw"]);

  // Calculate rotation based on distance traveled
  // For realistic rolling: rotation = distance / circumference * 360
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360 * 8]); // Multiple rotations across the viewport

  return (
    <motion.div
      className="absolute bottom-0 left-0 pointer-events-none z-50"
      style={{ x }}
    >
      <motion.div
        className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
        style={{
          rotate: rotation,
          boxShadow:
            "0 0 20px rgba(99, 102, 241, 0.6), 0 0 40px rgba(147, 51, 234, 0.3)",
        }}
      >
        {/* Inner detail to make rotation visible */}
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500 opacity-50" />
        {/* <div className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 bg-cyan-600 rounded-full" /> */}
      </motion.div>
    </motion.div>
  );
};

export default RollingCircle;
