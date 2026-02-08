"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type AnimatedCloseButtonProps = {
	active?: boolean; // force the hover animation (e.g. while closing)
};

// Animate width only - segments shrink towards corners
const segmentVariants = {
	initial: { width: "53%" },
	retracted: {
		width: "5px",
		transition: { duration: 0.2, ease: "easeOut" },
	},
} as const;

const labelVariants = {
	initial: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.2, ease: "easeOut" },
	},
} as const;

const AnimatedCloseButton = ({ active = false }: AnimatedCloseButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const showActive = active || isHovered;

	return (
		// biome-ignore lint/a11y/useSemanticElements: this is a non-button wrapper for the animated “X” glyph; semantics/interaction are provided by role, tabIndex, and aria-label
		<div
			className="relative flex h-[38px] w-[38px] cursor-pointer items-center justify-center"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onFocus={() => setIsHovered(true)}
			onBlur={() => setIsHovered(false)}
			tabIndex={0}
			role="button"
			aria-label="Close"
		>
			{/* Top-left segment (button:before equivalent) */}
			<motion.div
				className="absolute h-0.5 bg-[#11b5ce] dark:bg-accent"
				style={{
					left: "5px",
					top: "4px",
					transformOrigin: "left",
					rotate: "45deg",
				}}
				variants={segmentVariants}
				initial="initial"
				animate={showActive ? "retracted" : "initial"}
			/>

			{/* Top-right segment (button:after equivalent) */}
			<motion.div
				className="absolute h-0.5 bg-[#11b5ce] dark:bg-accent"
				style={{
					right: "5px",
					top: "4px",
					transformOrigin: "right",
					rotate: "-45deg",
				}}
				variants={segmentVariants}
				initial="initial"
				animate={showActive ? "retracted" : "initial"}
			/>

			{/* Inner wrapper for bottom segments and label */}
			<div className="relative flex h-full w-full items-center justify-center">
				{/* Bottom-right segment (inner:before equivalent) */}
				<motion.div
					className="absolute h-0.5 bg-[#11b5ce] dark:bg-accent"
					style={{
						right: "5px",
						bottom: "4px",
						transformOrigin: "right",
						rotate: "45deg",
					}}
					variants={segmentVariants}
					initial="initial"
					animate={showActive ? "retracted" : "initial"}
				/>

				{/* Bottom-left segment (inner:after equivalent) */}
				<motion.div
					className="absolute h-0.5 bg-[#11b5ce] dark:bg-accent"
					style={{
						left: "5px",
						bottom: "4px",
						transformOrigin: "left",
						rotate: "-45deg",
					}}
					variants={segmentVariants}
					initial="initial"
					animate={showActive ? "retracted" : "initial"}
				/>

				{/* Close label */}
				<motion.span
					className="z-10 text-[12.5px] font-semibold text-[#11b5ce] dark:text-accent"
					variants={labelVariants}
					initial="initial"
					animate={showActive ? "visible" : "initial"}
				>
					Close
				</motion.span>
			</div>
		</div>
	);
};

export default AnimatedCloseButton;
