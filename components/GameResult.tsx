import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { updateScore, setSelected, resetScore } from "@/features/gameSlice";
import { motion } from "framer-motion";
import { randomInt } from "@/app/shared/randomInt";
import { PlayRules } from "@/app/shared/playRules";
import Image from "next/image";
import GameButton from "@/components/GameButton";
import styles2 from "@/app/styles/Game.module.css";
import styles from "@/app/styles/Results.module.css";

const GameResult = () => {
  const dispatch = useDispatch();
  const { selected, advancedMode, score } = useSelector(
    (state: RootState) => state.game
  );

  const [result, setResult] = useState<string>("");
  const [computer, setComputer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [countdownIndex, setCountdownIndex] = useState<number>(-1);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    let startCountdownTimeout: NodeJS.Timeout;

    if (selected >= 0) {
      // Add delay before starting the countdown
      startCountdownTimeout = setTimeout(() => {
        // Initialize countdown sequence
        const countdownSequence = advancedMode
          ? ["Rock", "Paper", "Scissors", "Lizard", "Spock"]
          : ["Rock", "Paper", "Scissors", "Shoot!"];

        setCountdownIndex(0);
        let currentIndex = 0;

        countdownInterval = setInterval(() => {
          if (currentIndex < countdownSequence.length - 1) {
            currentIndex += 1;
            setCountdownIndex(currentIndex);
          } else {
            clearInterval(countdownInterval);
            setCountdownIndex(-1);

            // Start calculating the result after countdown completes
            const computerChoice = randomInt(advancedMode ? 5 : 3);
            setComputer(computerChoice);
            const userChoice = PlayRules[selected]?.value;

            // Show the result after a brief delay
            setTimeout(() => {
              if (PlayRules[computerChoice]?.beats.includes(userChoice)) {
                setResult("Lose");
                dispatch(updateScore(-1));
              } else if (PlayRules[computerChoice]?.value === userChoice) {
                setResult("Tie");
                // No score update for a tie
              } else {
                setResult("Win");
                dispatch(updateScore(1));
              }
              setShowResult(true);
            }, 600);
          }
        }, 400); // Time for each word in the countdown
      }, 500); // Delay before starting countdown (800 ms)
    }

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(startCountdownTimeout);
    };
  }, [selected, advancedMode, dispatch]);

  // Function to reset the entire game
  const resetGame = () => {
    dispatch(setSelected(-1)); // Reset user selection
    dispatch(resetScore()); // Reset the score to 0
    setResult(""); // Reset the result
    setShowResult(false); // Hide the result display
    setComputer(null); // Clear the computer's choice
  };

  return (
    <div className="results-wrapper relative">
      {/* Countdown Display */}
      {countdownIndex >= 0 && (
        <div
          className={`${styles.countdownWrapper} flex justify-center items-center h-full`}
        >
          <h2 className={styles.countdown}>
            {advancedMode
              ? ["Rock", "Paper", "Scissors", "Lizard", "Spock"][countdownIndex]
              : ["Rock", "Paper", "Scissors", "Shoot!"][countdownIndex]}
          </h2>
        </div>
      )}

      <div className={showResult ? styles.results : styles.pending}>
        {/* User's Selection and Computer's Selection */}
        {countdownIndex === -1 && showResult && (
          <div className={styles.resultsSelectionWrapper}>
            <div className={styles.selection}>
              <h3>You Chose</h3>
              <motion.div
                className={result === "Win" ? styles.win : styles.computer}
              >
                <GameButton
                  key={`player-${selected}`}
                  classes={`${styles2[PlayRules[selected]?.value] || ""} ${
                    styles.btn
                  }`}
                  lid={selected.toString()}
                  buttonClick={() => {}}
                >
                  <Image
                    src={`/assets/game/icon-${PlayRules[selected]?.value}.svg`}
                    alt={PlayRules[selected]?.value}
                    width={50}
                    height={50}
                    style={{
                      width: 'fit-content',
                      height: 'auto',
                    }}
                  />
                </GameButton>
              </motion.div>
            </div>

            <div className={styles.selection}>
              <h3>Computer Chose</h3>
              <motion.div
                className={result === "Lose" ? styles.win : styles.computer}
              >
                {computer !== null && (
                  <GameButton
                    key={`computer-${computer}`}
                    classes={`${styles2[PlayRules[computer]?.value] || ""} ${
                      styles.btn
                    }`}
                    lid={computer.toString()}
                    buttonClick={() => {}}
                  >
                    <Image
                      src={`/assets/game/icon-${PlayRules[computer]?.value}.svg`}
                      alt={PlayRules[computer]?.value}
                      width={50}
                      height={50}
                      style={{
                        width: 'fit-content',
                        height: 'auto',
                      }}
                    />
                  </GameButton>
                )}
              </motion.div>
            </div>
          </div>
        )}

        {/* Result Display */}
        {showResult && (
          <div className={styles.result}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1 }}
            >
              <h2>{`You ${result}${result === "Win" ? "!" : ""}`}</h2>
              <motion.button
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                whileFocus={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={styles.playBtn}
                onClick={() => {
                  dispatch(setSelected(-1));
                  setResult("");
                  setShowResult(false);
                  setComputer(null);
                }}
              >
                Play Again
              </motion.button>

              {/* Reset Game Button */}
              <motion.button
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                whileFocus={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`${styles.playBtn} ${styles.resetBtn} mt-2`} // Added a new class for reset button styling
                // style={{ backgroundColor: "#FF4500" }} // Make it orange
                onClick={resetGame}
              >
                Reset Game
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameResult;
