import type React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import GameHeader from "@/components/GameHeader";
import GameHowCredits from "@/components/GameHowCredits";
import GamePlay from "@/components/GamePlay";
import GameResult from "@/components/GameResult";
import GameRules from "@/components/GameRules";
import { Button } from "@/components/ui/button";
import { resetScore, setOpenHowCredits, setOpenRules, setSelected, toggleAdvancedMode } from "@/features/gameSlice";

const RockPaperScissors = () => {
	const dispatch = useDispatch();
	const { advancedMode, selected, score, openHowCredits, openRules } = useSelector((state: RootState) => state.game);

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
		<div
			className="rps-game relative bg-cover bg-center bg-no-repeat py-16"
			style={{
				background: "url(/assets/background/starry-night-sky.svg)",
			}}
		>
			<div className="container mx-auto">
				<h3 className="mx-auto mb-6 max-w-[600px] text-center font-heading text-white/70">
					<strong className="text-3xl text-white/80">
						🕹️ Rock Paper Scissors (<span className="text-accent">Lizard Spock</span>)
					</strong>
				</h3>
			</div>

			{/* <p className="mb-4 text-center text-white/70 max-w-[600px] mx-auto text-lg">
                Click on the 'How to Play' button to see how to play.
              </p>
              <p className="mb-4 text-center text-white/70 max-w-[600px] mx-auto text-lg">
                For the geeks, this was built with <span className="text-accent">React</span> and <span className="text-accent">Redux</span>.
              </p> */}

			<div className="container mx-auto flex min-h-[85vh] flex-col justify-between rounded-xl border-8 border-black bg-gradient-to-r from-blue-500 to-purple-600 p-8 font-game tracking-widest">
				<div className="game-top flex flex-col gap-4">
					<h2 className="text-center text-xl font-semibold tracking-wider">
						{advancedMode ? "Advanced Mode" : "Normal Mode"}
					</h2>
					<GameHeader advanced={advancedMode} score={score} />
				</div>

				{/* Game Result or Play Component */}
				{selected >= 0 ? (
					<GameResult />
				) : (
					<GamePlay setselected={(value: number) => dispatch(setSelected(value))} advanced={advancedMode} />
				)}

				<div className="game-bottom flex w-full flex-col justify-between gap-4 py-1 md:flex-row">
					<Button
						variant="default"
						size="lg"
						className="flex cursor-pointer items-center gap-2 text-base font-semibold text-text-primary disabled:pointer-events-none disabled:bg-gray-400 dark:text-primary xl:text-xl"
						onClick={changeMode}
						disabled={selected >= 0}
					>
						<span>{advancedMode ? "Normal Mode" : "Advanced Mode"}</span>
					</Button>

					{/* How to play/credits button */}
					<Button
						variant="orange"
						size="lg"
						className="flex cursor-pointer items-center gap-2 text-base font-semibold text-text-primary hover:text-text-primary focus:text-text-primary dark:text-primary dark:hover:text-primary dark:focus:text-primary xl:text-xl"
						onClick={handleOpenHowCredits}
					>
						<span>How to Play</span>
					</Button>

					{/* Rules button */}
					<Button
						ref={rulesButtonRef}
						variant="default"
						size="lg"
						className="flex cursor-pointer items-center gap-2 text-base font-semibold text-text-primary dark:text-primary xl:text-xl"
						onClick={handleOpenRules}
					>
						<span>Rules</span>
					</Button>
				</div>
			</div>

			{/* How to Play/Credits Modal */}
			<GameHowCredits isOpen={openHowCredits} onClose={handleCloseHowCredits} positionRelative={true} />

			{/* Game Rules Modal */}
			<GameRules open={openRules} advanced={advancedMode} setopen={handleCloseRules} positionRelative={true} />
		</div>
	);
};

export default RockPaperScissors;
