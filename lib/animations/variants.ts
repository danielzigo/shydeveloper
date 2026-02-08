/**
 * Generic animation variants
 */

import type { Variants } from "framer-motion";

// ===== CONTAINER ANIMATIONS =====

/**
 * Staggered container for lists and grids.
 * Children will animate sequentially with automatic delay.
 */
export const staggerContainer: Variants = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.1,
		},
	},
};

// ===== CARD ANIMATIONS =====

/**
 * Standard card entrance animation.
 * Used for all card-style elements across the site for visual consistency.
 *
 * Design decision: Subtle movement (24px) with smooth spring physics
 * creates a premium feel without being distracting.
 */
export const cardEntrance: Variants = {
	hidden: {
		opacity: 0,
		y: 40, // 24px down
		scale: 0.95, // 0.98
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
	},
};

/**
 * Card entrance with spring physics (for non-staggered use).
 */
export const cardEntranceSpring: Variants = {
	hidden: {
		opacity: 0,
		y: 24,
		scale: 0.98,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 220,
			damping: 26,
			mass: 0.8,
		},
	},
};
