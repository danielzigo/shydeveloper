import React from "react";
import { motion } from "framer-motion";

const stairAnimation = {
  initial: {
    top: "0%", // Start at the top
  },
  animate: {
    top: "100%", // Move to the bottom
  },
  // exit: {
  //   top: "0%", // Return to the original position
  // },
};

// Function to calculate staggered delay based on index
const reverseIndex = (index: number) => {
  const totalSteps = 6;
  return 0.1 * (totalSteps - index - 1);
};

// Individual step component
const Stairs = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => {
        return (
          <motion.div
            key={index}
            variants={stairAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              delay: reverseIndex(index),
            }}
            className="h-full w-full bg-white relative"
          >
          </motion.div>
        );
      })}
    </>
  );
};

export default Stairs;
