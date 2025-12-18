// this will be changed to another effect later
"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// Components
import Stairs from "@/components/Stairs";

const StairTransition = () => {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <div key={pathname}>
          <div className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40 flex">
            <Stairs />
          </div>

          {/* overlay */}
          <motion.div
            className="h-screen w-screen fixed bg-primary top-0 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{
              opacity: 0,
              transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
            }}
            // exit={{
            //   opacity: 1,
            //   transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
            // }}
          />
        </div>
      </AnimatePresence>
    </>
  );
};

export default StairTransition;
