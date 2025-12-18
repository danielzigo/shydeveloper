import React from "react";
import { motion, AnimatePresence } from "framer-motion"; // use AnimatePresence
import styles from "@/app/styles/Game.module.css";

type GameButtonProps = {
  classes?: string;
  lid?: string;
  children: React.ReactNode;
  buttonClick: () => void; // revise
};

const GameButton = ({
  classes,
  children,
  lid,
  buttonClick,
}: GameButtonProps) => {
  return (
    <motion.div
      className={`${classes} relative`}
      layoutId={lid}
      onClick={() => buttonClick()}
      // initial={{ scale: 0.9, zIndex: 1 }}
      // animate={{ scale: 1, zIndex: 1 }}
      // exit={{ scale: 0.9, zIndex: 1 }}
    >
      {/* <div className={`bg-black absolute top-0 left-0 w-full h-full -z-10`} /> */}
      <div className={styles.inside}>{children}</div>
    </motion.div>
  );
};

export default GameButton;
