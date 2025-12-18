import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Cube = () => {
  const { scrollYProgress } = useScroll();  // Hook to detect scroll progress
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]); // Map scroll progress to translateY movement

  return (
    <motion.div
      className="scene relative"
      style={{ y }} // Apply the animated y value for smooth scroll effect
    >
      <div className="cube relative w-24 h-24">
        <div className="face front absolute w-full h-full bg-transparent border border-primary"></div>
        <div className="face back absolute w-full h-full bg-transparent border border-primary"></div>
        <div className="face left absolute w-full h-full bg-transparent border border-primary"></div>
        <div className="face right absolute w-full h-full bg-transparent border border-primary"></div>
        <div className="face top absolute w-full h-full bg-transparent border border-primary"></div>
        <div className="face bottom absolute w-full h-full bg-transparent border border-primary"></div>
      </div>
    </motion.div>
  );
};

export default Cube;
                                                                                                                                                                                                  