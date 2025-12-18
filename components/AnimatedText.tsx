"use client";

import React from "react";
import { motion } from "framer-motion";

const singleWordVariant = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const textVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <motion.div variants={textVariant} initial="initial" animate="animate">
      <h1 className="h1 mb-6 font-heading">
        {text.split(" ").map((word, index) => {
          // Add a condition for specific words like "ShyDeveloper"
          if (word === "together") {
            return (
              <motion.span
                key={word + "-" + index}
                className="inline-block text-accent text-[52px] md:text-[62px] xl:text-[84px]" // Use accent color for ShyDeveloper
                variants={singleWordVariant}
              >
                {word}&nbsp;
              </motion.span>
            );
          }
          // Add comma after "Hello"
          if (word === "Hello") {
            return (
              <motion.span
                key={word + "-" + index}
                className="inline-block"
                variants={singleWordVariant}
              >
                {word},&nbsp;
              </motion.span>
            );
          }
          return (
            <motion.span
              key={word + "-" + index}
              className="inline-block"
              variants={singleWordVariant}
            >
              {word}&nbsp;
            </motion.span>
          );
        })}
      </h1>
    </motion.div>
  );
};

export default AnimatedText;
