import React from "react";
import { motion, LayoutGroup } from "framer-motion";

type HeaderProps = {
  advanced: boolean;
  score?: number;
};

const GameHeader = ({ advanced, score }: HeaderProps) => {
  return (
    <LayoutGroup>
      <div className="game-header w-full xl:w-[45%] flex flex-row md:flex-col justify-between 
      uppercase p-4 mx-auto my-1 border-2 border-dashed border-white/40 rounded-lg text-xl">
        <motion.div
          layout="position"
          className="w-full flex flex-col md:flex-row gap-2 md:gap-4 mb-0 md:mb-4 md:justify-center"
        >
          <span className={`${styles.title}`}>Rock</span>
          <span className={`${styles.title}`}>Paper</span>
          <span className={`${styles.title}`}>Scissors</span>
          {advanced && (
            <>
              <span
                className={`${styles.title} ${
                  advanced ? styles.advancedTitle : ""
                }`}
              >
                Lizard
              </span>
              <span
                className={`${styles.title} ${
                  advanced ? styles.advancedTitle : ""
                }`}
              >
                Spock
              </span>
            </>
          )}
        </motion.div>

        <div className="score self-center bg-slate-100 p-3 xl:w-1/4 text-center grid place-items-center rounded-lg h-[30%]">
          {" "}
          {/* w-2/5 */}
          <h3 className="text-primary font-semibold self-start text-base">
            Score
          </h3>
          <h4 className="text-green-900 text-4xl">{score}</h4>
          {/* <p className="text-white text-4xl">{score}</p> */}
        </div>
      </div>
    </LayoutGroup>
  );
};

export default GameHeader;

const styles = {
  title: "text-base xl:text-xl", // flex flex-col justify-center
  advancedTitle: "text-rose-900",
};
