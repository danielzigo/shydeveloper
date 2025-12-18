import React from 'react'
import { motion } from 'framer-motion'

const FloatingSquare = ({ size = 100, color = '#00ff99', delay = 0 }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
      }}
      animate={{
        y: [0, -10, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay,
      }}
    />
  );
};

const FloatingSquares = () => {
  return (
    <div className="relative w-full h-[300px] flex justify-center items-center">
      {/* First floating square */}
      <FloatingSquare size={120} color="#00C4FF" delay={0} />

      {/* Second floating square, smaller, stacked next to it */}
      <FloatingSquare size={90} color="#FF7A00" delay={0.5} />
    </div>
  );
};

export default FloatingSquares;