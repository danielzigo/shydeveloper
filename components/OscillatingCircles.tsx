import React from 'react'
import { motion } from 'framer-motion'

const OscillatingCircles = () => {
  return (
    <div className="relative flex space-x-8">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="w-16 h-16 rounded-full bg-blue-500"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5,
          }}
        />
      ))}
    </div>
  );
};


export default OscillatingCircles