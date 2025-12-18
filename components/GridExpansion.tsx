import React from 'react'
import { motion } from 'framer-motion'

const GridExpansion = () => {
  const shapes = ['square', 'circle', 'triangle'];

  return (
    <div className="grid grid-cols-3 gap-4">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`${
            shape === 'square' ? 'w-16 h-16' : shape === 'circle' ? 'w-16 h-16 rounded-full' : 'w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-blue-500'
          } bg-accent`}
          whileHover={{ scale: 1.2, opacity: 0.8 }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
};


export default GridExpansion