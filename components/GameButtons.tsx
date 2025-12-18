import React from "react";
import { LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import styles from "@/app/styles/Game.module.css";
import GameButton from "@/components/GameButton";

type GameButtonsProps = {
  advanced: boolean;
  whenClicked: any; // revise
};

const advancedIcons = [
  { icon: "rock", lid: "rock", styles: styles.rock, clickedValue: 2 },
  { icon: "paper", lid: "paper", styles: styles.paper, clickedValue: 1 },
  { icon: "scissors", lid: "scissors", styles: styles.scissors, clickedValue: 0 },
  { icon: "lizard", lid: "lizard", styles: styles.lizard, clickedValue: 3 },
  { icon: "spock", lid: "spock", styles: styles.spock, clickedValue: 4 },
];
const normalIcons = [
  { icon: "rock", lid: "rock", styles: styles.rock2, clickedValue: 2 },
  { icon: "paper", lid: "paper", styles: styles.paper2, clickedValue: 1 },
  { icon: "scissors", lid: "scissors", styles: styles.scissors2, clickedValue: 0 },
];

const GameButtons = ({ advanced, whenClicked }: GameButtonsProps) => {
  return (
    <LayoutGroup>
      <motion.div className={styles.playbuttons}>
        {advanced ? (
          <div className={styles.threegrid}>
            {advancedIcons.map((item) => (
              <GameButton
                key={item.icon}
                lid={item.lid}
                classes={`${item.styles} ${item.icon}-button cursor-pointer`}
                buttonClick={() => whenClicked(item.clickedValue)}
              >
                <Image
                  src={`/assets/game/icon-${item.icon}.svg`}
                  alt={`${item.icon} button icon`}
                  width={50}
                  height={50}
                  style={{
                    width: 'fit-content',
                    height: 'auto',
                  }}
                />
              </GameButton>
            ))}
          </div>
        ) : (
          <div className={styles.twogrid}>
            {normalIcons.map((item) => (
              <GameButton
                key={item.icon}
                lid={item.lid}
                classes={`${item.styles} ${item.icon}-button cursor-pointer`}
                buttonClick={() => whenClicked(item.clickedValue)}
              >
                <Image
                  src={`/assets/game/icon-${item.icon}.svg`}
                  alt={`${item.icon} button icon`}
                  width={50}
                  height={50}
                  style={{
                    width: 'fit-content',
                    height: 'auto',
                  }}
                />
              </GameButton>
            ))}
          </div>
        )}
      </motion.div>
    </LayoutGroup>
  );
};

export default GameButtons;
