"use client";

import { motion, type Variants } from "framer-motion";
import { useState } from "react";

interface AnimatedMenuButtonProps {
	isActive?: boolean; // Controlled by parent wrapper's focus state
}

// Animation for the middle line (fades out)
const middleLineVariant: Variants = {
	initial: { opacity: 1, width: "100%" },
	hidden: {
		opacity: 0,
		width: "0%",
		transition: { duration: 0.2, ease: "easeOut" },
	},
};

// Animation for the Menu text (fades in)
const labelVariant: Variants = {
	initial: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.2, ease: "easeOut" },
	},
};

/**
 * Animated hamburger menu icon that transforms to show "Menu" text.
 * Handles hover state internally for hybrid devices (small screens with cursors).
 */
const AnimatedMenuButton = ({ isActive = false }: AnimatedMenuButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);

	// Show animation if hovered OR active (parent is focused)
	const showAnimation = isHovered || isActive;

	return (
		<div
			className="relative flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-[9.5px]"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			// For keyboard accessibility
			role="presentation"
			aria-hidden="true"
		>
			{/* Top line */}
			<div className="h-0.5 w-full bg-accent" />

			{/* Middle section - contains middle line and Menu text */}
			<div className="relative flex h-0.5 w-1/2 items-center justify-center">
				{/* Middle line */}
				<motion.div
					className="absolute h-0.5 bg-accent"
					style={{
						transformOrigin: "center",
					}}
					variants={middleLineVariant}
					initial="initial"
					animate={showAnimation ? "hidden" : "initial"}
				/>

				{/* Menu label */}
				<motion.span
					className="absolute whitespace-nowrap text-[12.5px] font-semibold text-accent"
					variants={labelVariant}
					initial="initial"
					animate={showAnimation ? "visible" : "initial"}
				>
					Menu
				</motion.span>
			</div>

			{/* Bottom line */}
			<div className="h-0.5 w-full bg-accent" />
		</div>
	);
};

export default AnimatedMenuButton;
