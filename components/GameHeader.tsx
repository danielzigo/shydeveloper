import { LayoutGroup, motion } from "framer-motion";

type HeaderProps = {
	advanced: boolean;
	score?: number;
};

const GameHeader = ({ advanced, score }: HeaderProps) => {
	return (
		<LayoutGroup>
			<div className="game-header mx-auto my-1 flex w-full flex-row justify-between rounded-lg border-2 border-dashed border-white/40 p-4 text-xl uppercase md:flex-col xl:w-[45%]">
				<motion.div
					layout="position"
					className="mb-0 flex w-full flex-col gap-2 md:mb-4 md:flex-row md:justify-center md:gap-4"
				>
					<span className={`${styles.title}`}>Rock</span>
					<span className={`${styles.title}`}>Paper</span>
					<span className={`${styles.title}`}>Scissors</span>
					{advanced && (
						<>
							<span className={`${styles.title} ${advanced ? styles.advancedTitle : ""}`}>Lizard</span>
							<span className={`${styles.title} ${advanced ? styles.advancedTitle : ""}`}>Spock</span>
						</>
					)}
				</motion.div>

				<div className="score grid h-[30%] place-items-center self-center rounded-lg bg-slate-100 p-3 text-center xl:w-1/4">
					{" "}
					{/* w-2/5 */}
					<h3 className="self-start text-base font-semibold text-text-primary dark:text-primary">Score</h3>
					<h4 className="text-4xl text-green-900">{score}</h4>
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
