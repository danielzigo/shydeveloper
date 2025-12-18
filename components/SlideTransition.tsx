"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const firstSlideVariant = {
  initial: {
    x: "100%",
    width: "100%",
  },
  animate: {
    x: 0,
    width: "0%",
    transition: { duration: 0.8, ease: "easeInOut" }, // Slightly longer duration
  },
};

const SlideTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setIsTransitioning(true);
    } else {
      setIsTransitioning(false);
    }
  }, [pathname]);

  return (
    <>
      {isTransitioning && (
        <AnimatePresence>
          {/* First slide */}
          <motion.div
            className="h-screen w-screen fixed top-0 bottom-0 right-full pointer-events-none z-40 flex justify-center items-center bg-[#007b59]"
            variants={firstSlideVariant}
            initial="initial"
            animate="animate"
            key="first-slide"
          >
            {/* <motion.p
              className="text-white text-2xl font-bold"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              Loading...
            </motion.p> */}
          </motion.div>

          {/* Second slide */}
          <motion.div
            className="h-screen w-screen fixed top-0 bottom-0 right-full pointer-events-none z-30 flex bg-[#1a2f4b]"
            initial={{ x: "100%", width: "100%" }}
            animate={{
              x: 0,
              width: "0%",
              transition: { delay: 0.3, duration: 0.7, ease: "easeInOut" }, // Adjusted timing for smooth transition
            }}
            key="second-slide"
          />

          {/* Third slide */}
          {/* <motion.div
            className="h-screen w-screen fixed top-0 bottom-0 right-full pointer-events-none z-20 flex bg-[#004f99]"
            initial={{ x: "100%", width: "100%" }}
            animate={{
              x: 0,
              width: "0%",
              transition: { delay: 0.3, duration: 0.7, ease: "easeInOut" },
            }}
          /> */}
        </AnimatePresence>
      )}
      {/* Render the children after the transition */}
      {children}
    </>
  );
};

export default SlideTransition;
