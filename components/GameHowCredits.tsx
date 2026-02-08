import Modal from "@/components/Modal";

type GameHowCreditsProps = {
	isOpen: boolean;
	onClose: () => void;
	positionRelative?: boolean;
};

const GameHowCredits = ({ isOpen, onClose, positionRelative }: GameHowCreditsProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} positionRelative={positionRelative}>
			<div className="relative flex h-auto max-h-[80vh] w-full max-w-[80vw] flex-col items-center overflow-y-auto rounded-lg bg-[#2E0854] p-4 md:p-8 xl:max-w-[70vw]">
				{" "}
				{/** bg-black/50 */}
				<h2 id="modal-title" className="my-4 font-game text-2xl font-semibold tracking-wider">
					How to Play
				</h2>
				<p className="mb-4 bg-black/40 p-2 text-center text-sm xl:hidden">Scroll to see more</p>
				<p className="mb-4 text-center text-base leading-relaxed md:text-left">
					A classic game of Rock, Paper, Scissors with a twist! The addition of{" "}
					<span className="font-bold">Lizard</span> and <span className="font-bold">Spock</span> makes it more
					challenging and fun!
				</p>
				<h3 className="my-2 font-game text-xl font-semibold tracking-wider">Game Modes</h3>
				<p className="mb-4 text-base">Click on the mode button to switch between modes.</p>
				<ul className="mb-4 ml-6 list-disc text-base">
					<li>
						<strong>Normal Mode:</strong> Play the traditional game — Rock, Paper, Scissors.
					</li>
					<li className="mt-4">
						<strong>Advanced Mode:</strong> This mode adds Lizard and Spock into the mix, creating new strategies and
						more outcomes.
					</li>
				</ul>
				<p className="mb-4 bg-black/40 p-2 text-sm">
					<strong>Note:</strong> Switching between modes will reset the game and your score will return to zero.
				</p>
				<p className="mb-4 text-base">
					To start the game, simply click on one of the options, and see if you can beat the computer!
				</p>
				<p className="mb-4 text-base">
					You'll earn a point each time you win, and lose a point if the computer wins. A tie doesn't affect the score.
					There's no end score — it's just for fun.
				</p>
				<p className="mb-6 text-base">
					Want to know exactly what beats what? Click the Rules button to see the rules diagram. Toggle modes to see the
					rules for each mode.
				</p>
				<h2 className="my-4 font-game text-2xl font-semibold tracking-wider">Credits</h2>
				<p className="mb-4 text-base">
					This game is inspired by a Frontend Mentor challenge, but not built in the same way.
				</p>
				<p className="mb-4 text-base">
					Special thanks to <span className="font-bold">Sam Kass</span> and{" "}
					<span className="font-bold">Karen Bryla</span>, the creators of the original Rock, Paper, Scissors, Lizard,
					Spock concept, for their clever expansion of the classic game. This version also pays homage to the
					popularisation of this variant by <span className="font-bold">"The Big Bang Theory"</span> (Season 2, Episode
					8).
				</p>
			</div>
		</Modal>
	);
};

export default GameHowCredits;
