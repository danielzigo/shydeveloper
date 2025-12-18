"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Simple shape interface for TypeScript
interface Shape {
  top: number;
  left: number;
  initialColor: string;
}

const FloatingShapes = () => {
  // Keep a simple array of shapes with consistent size and random positions
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Array of colors to cycle through
  const colors = [
    "#60a5fa", // blue-400
    "#34d399", // green-400
    "#a78bfa", // violet-400
    "#fb923c", // orange-400
    "#f472b6", // pink-400
    "#38bdf8", // sky-400
  ];

  useEffect(() => {
    // Generate initial positions and colors for shapes
    const generatedShapes: Shape[] = Array(5)
      .fill(0)
      .map(() => ({
        top: Math.random() * 90,
        left: Math.random() * 90,
        initialColor: colors[Math.floor(Math.random() * colors.length)],
      }));
    setShapes(generatedShapes);

    // Set a timeout to delay the start of the animation
    const animationDelay = setTimeout(() => {
      setShouldAnimate(true);
    }, 3000);

    return () => clearTimeout(animationDelay);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {shapes.map((shape, index) => {
        // Generate a unique color sequence for each shape
        const colorSequence = [
          shape.initialColor,
          colors[(colors.indexOf(shape.initialColor) + 1) % colors.length],
          colors[(colors.indexOf(shape.initialColor) + 2) % colors.length],
          colors[(colors.indexOf(shape.initialColor) + 3) % colors.length],
          shape.initialColor, // Return to initial color
        ];

        return (
          <motion.div
            key={index}
            className="absolute w-6 h-6 rounded-full"
            style={{
              top: `${shape.top}%`,
              left: `${shape.left}%`,
              backgroundColor: shape.initialColor,
            }}
            animate={
              shouldAnimate
                ? {
                    x: [
                      0,
                      Math.random() * 300 - 150,
                      Math.random() * 300 - 150,
                      Math.random() * 300 - 150,
                      0,
                    ],
                    y: [
                      0,
                      Math.random() * 300 - 150,
                      Math.random() * 300 - 150,
                      Math.random() * 300 - 150,
                      0,
                    ],
                    opacity: [1, 0.7, 0.9, 0.8, 1],
                    rotate: [
                      0,
                      Math.random() * 180 - 90,
                      Math.random() * 180 - 90,
                      0,
                    ],
                    scale: [1, 1.1, 0.9, 1.05, 1],
                    backgroundColor: colorSequence,
                  }
                : {}
            }
            transition={{
              duration: 18 + Math.random() * 8,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smoother motion
              times: [0, 0.25, 0.5, 0.75, 1], // Control keyframe timing
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingShapes;
