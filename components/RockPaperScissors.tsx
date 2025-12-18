import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import {
  toggleAdvancedMode,
  setSelected,
  updateScore,
  resetScore,
  setOpenHowCredits,
  setOpenRules,
} from "@/features/gameSlice";

import { Button } from "@/components/ui/button";
import GameHeader from "@/components/GameHeader";
import GameRules from "@/components/GameRules";
import GamePlay from "@/components/GamePlay";
import GameResult from "@/components/GameResult";
import GameHowCredits from "@/components/GameHowCredits";

const RockPaperScissors = () => {
  const dispatch = useDispatch();
  const { advancedMode, selected, score, openHowCredits, openRules } =
    useSelector((state: RootState) => state.game);

  const rulesButtonRef = useRef<HTMLButtonElement>(null);

  const changeMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(toggleAdvancedMode());
    dispatch(resetScore());
  };

  const handleOpenHowCredits = () => {
    dispatch(setOpenHowCredits(true));
  };

  const handleCloseHowCredits = () => {
    dispatch(setOpenHowCredits(false));
  };

  const handleOpenRules = () => {
    dispatch(setOpenRules(true));
  };

  const handleCloseRules = () => {
    dispatch(setOpenRules(false));
  };

  return (
    <>
      <div
        className="relative bg-cover bg-center bg-no-repeat rps-game py-16"
        style={{
          background: "url(/assets/background/starry-night-sky.svg)",
        }}
      >
        <div className="container mx-auto">
          <h3 className="mb-6 font-heading text-center text-white/70 max-w-[600px] mx-auto">
            <strong className="text-white/80 text-3xl">
              🕹️ Rock Paper Scissors (
              <span className="text-accent">Lizard Spock</span>)
            </strong>
          </h3>
        </div>

        {/* <p className="mb-4 text-center text-white/70 max-w-[600px] mx-auto text-lg">
                Click on the 'How to Play' button to see how to play.
              </p>
              <p className="mb-4 text-center text-white/70 max-w-[600px] mx-auto text-lg">
                For the geeks, this was built with <span className="text-accent">React</span> and <span className="text-accent">Redux</span>.
              </p> */}

        <div
          className="container mx-auto min-h-[85vh] flex flex-col justify-between font-game
        tracking-widest bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 border-8 border-black"
        >
          <div className="game-top flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-wider text-center">
              {advancedMode ? "Advanced Mode" : "Normal Mode"}
            </h2>
            <GameHeader advanced={advancedMode} score={score} />
          </div>

          {/* Game Result or Play Component */}
          {selected >= 0 ? (
            <GameResult />
          ) : (
            <GamePlay
              setselected={(value: number) => dispatch(setSelected(value))}
              advanced={advancedMode}
            />
          )}

          <div className="game-bottom w-full flex flex-col md:flex-row gap-4 justify-between py-1">
            <Button
              variant="default"
              size="lg"
              className="flex items-center gap-2 font-semibold text-base xl:text-xl cursor-pointer disabled:bg-gray-400 disabled:pointer-events-none"
              onClick={changeMode}
              disabled={selected >= 0}
            >
              <span>{advancedMode ? "Normal Mode" : "Advanced Mode"}</span>
            </Button>

            {/* How to play/credits button */}
            <Button
              variant="orange"
              size="lg"
              className="flex items-center gap-2 font-semibold text-base xl:text-xl cursor-pointer"
              onClick={handleOpenHowCredits}
            >
              <span>How to Play</span>
            </Button>

            {/* Rules button */}
            <Button
              ref={rulesButtonRef}
              variant="default"
              size="lg"
              className="flex items-center gap-2 font-semibold text-base xl:text-xl cursor-pointer"
              onClick={handleOpenRules}
            >
              <span>Rules</span>
            </Button>
          </div>
        </div>

        {/* How to Play/Credits Modal */}
        <GameHowCredits
          isOpen={openHowCredits}
          onClose={handleCloseHowCredits}
          positionRelative={true}
        />

        {/* Game Rules Modal */}
        <GameRules
          open={openRules}
          advanced={advancedMode}
          setopen={handleCloseRules}
          positionRelative={true}
        />
      </div>
    </>
  );
};

export default RockPaperScissors;
