import React from "react";
import { motion } from "framer-motion";
import GameButtons from "@/components/GameButtons";
import Image from "next/image";
import styles from "@/app/styles/Game.module.css";

type GamePlayProps = {
  advanced: boolean;
  setselected: any; // revise
};

const GamePlay = ({
  advanced,
  setselected,
}: GamePlayProps) => {
  return (
    <motion.div
      initial={{ rotate: 360 }}
      animate={{ rotate: 0 }}
      exit={{ rotate: 360 }}
      transition={{ duration: 0.5 }} // delay: 2.4
      className={`game-area w-full h-full flex items-center justify-center ${
        advanced ? "my-12" : "mt-12 mb-8"
      }`}
    >
      {/* Container to wrap background and playbuttons together */}
      <div className={styles.gameContainer}>
        <div className={styles.backgroundImage}>
          {advanced ? (
            <Image
              src="/assets/game/bg-pentagon.svg"
              alt="Pentagon background for advanced mode"
              fill
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <Image
              src="/assets/game/bg-triangle.svg"
              alt="Triangle background for normal mode"
              fill
              style={{ objectFit: 'contain' }}
            />
          )}
        </div>
        <GameButtons
          whenClicked={(value: any) => setselected(value)} // why?? value may be a number. remember
          advanced={advanced}
        />
      </div>
    </motion.div>
  );
};

export default GamePlay;
