import React from "react";
import Modal from "@/components/Modal";

type GameHowCreditsProps = {
  isOpen: boolean;
  onClose: () => void;
  positionRelative?: boolean;
};

const GameHowCredits = ({ isOpen, onClose, positionRelative }: GameHowCreditsProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} positionRelative={positionRelative}>
      <div className="relative w-full max-w-[80vw] xl:max-w-[70vw] h-auto max-h-[80vh] overflow-y-auto flex flex-col items-center bg-[#2E0854] p-4 md:p-8 rounded-lg">
        {" "}
        {/** bg-black/50 */}
        <h2
          id="modal-title"
          className="text-2xl font-semibold font-game my-4 tracking-wider"
        >
          How to Play
        </h2>
        <p className="xl:hidden text-sm text-center mb-4 bg-black/40 p-2">
          Scroll to see more
        </p>
        <p className="text-base leading-relaxed text-center md:text-left mb-4">
          A classic game of Rock, Paper, Scissors with a twist! The addition of{" "}
          <span className="font-bold">Lizard</span> and{" "}
          <span className="font-bold">Spock</span> makes it more challenging and
          fun!
        </p>
        <h3 className="text-xl font-semibold font-game my-2 tracking-wider">
          Game Modes
        </h3>
        <p className="text-base mb-4">
          Click on the mode button to switch between modes.
        </p>
        <ul className="list-disc ml-6 mb-4 text-base">
          <li>
            <strong>Normal Mode:</strong> Play the traditional game — Rock,
            Paper, Scissors.
          </li>
          <li className="mt-4">
            <strong>Advanced Mode:</strong> This mode adds Lizard and Spock into
            the mix, creating new strategies and more outcomes.
          </li>
        </ul>
        <p className="text-sm mb-4 bg-black/40 p-2">
          <strong>Note:</strong> Switching between modes will reset the game and
          your score will return to zero.
        </p>
        <p className="text-base mb-4">
          To start the game, simply click on one of the options, and see if you
          can beat the computer!
        </p>
        <p className="text-base mb-4">
          You'll earn a point each time you win, and lose a point if the
          computer wins. A tie doesn't affect the score. There's no end score —
          it's just for fun.
        </p>
        <p className="text-base mb-6">
          Want to know exactly what beats what? Click the Rules button to see
          the rules diagram. Toggle modes to see the rules for each mode.
        </p>
        <h2 className="text-2xl font-semibold font-game my-4 tracking-wider">
          Credits
        </h2>
        <p className="text-base mb-4">
          This game is inspired by a Frontend Mentor challenge, but not built in
          the same way.
        </p>
        <p className="text-base mb-4">
          Special thanks to <span className="font-bold">Sam Kass</span> and{" "}
          <span className="font-bold">Karen Bryla</span>, the creators of the
          original Rock, Paper, Scissors, Lizard, Spock concept, for their
          clever expansion of the classic game. This version also pays homage to
          the popularisation of this variant by{" "}
          <span className="font-bold">"The Big Bang Theory"</span> (Season 2,
          Episode 8).
        </p>
      </div>
    </Modal>
  );
};

export default GameHowCredits;
