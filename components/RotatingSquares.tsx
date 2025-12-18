import React from 'react'
import { motion } from 'framer-motion'

const RotatingSquares = () => {
  return (
    <div className="relative flex space-x-4">
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={index}
          className="w-16 h-16 bg-accent"
          style={{ transform: 'rotate(0deg)' }}
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: index * 0.5, // staggered rotation
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default RotatingSquares