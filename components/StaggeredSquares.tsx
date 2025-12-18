import React from "react";
import { motion } from "framer-motion";

const StaggeredSquares = () => {
  return (
    <div className="relative flex justify-center items-center h-48 space-x-6">
      {" "}
      {/* space-x-6 for gap between squares */}
      {/* Large Square */}
      <motion.div
        className="w-24 h-24 bg-accent"
        style={{ transform: "rotate(45deg)" }} // Side view effect
        initial={{ x: -50, y: 0 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1 }}
      />
      {/* Small Square */}
      <motion.div
        className="w-16 h-16 bg-accent-light"
        style={{ transform: "rotate(45deg)" }} // Side view effect
        initial={{ x: 50, y: 0 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </div>
  );
};

export default StaggeredSquares;
