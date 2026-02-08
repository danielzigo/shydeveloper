/**
 * Contact page animation variants
 */

import type { Variants } from "framer-motion";

/**
 * Contact page heading
 */
export const headingVariant: Variants = {
	initial: { opacity: 0, y: -20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { delay: 1.2, duration: 0.6 },
	},
};

/**
 * Subtitle text
 */
export const subtitleVariant: Variants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: { delay: 1.4, duration: 0.6 },
	},
};

/**
 * Description
 */
export const descriptionVariant: Variants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: { delay: 1.6, duration: 0.6 },
	},
};

/**
 * Email contact card
 */
export const emailCardVariant: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { delay: 1.8, duration: 0.6 },
	},
};

/**
 * Freeze/Unfreeze shapes button
 */
export const freezeUnfreezeButtonVariant: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { delay: 2.0, duration: 0.6 },
	},
};

/**
 * Availability status - centred layout
 */
export const availabilityStatusCentredVariant: Variants = {
	initial: { opacity: 0, y: 10 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, delay: 2 },
	},
};

/**
 * Availability status - inline layout
 */
export const availabilityStatusInlineVariant: Variants = {
	initial: { opacity: 0, height: 0 },
	animate: {
		opacity: 1,
		height: "auto",
		transition: { duration: 0.4 },
	},
};

/**
 * Availability status - bar layout
 */
export const availabilityStatusBarVariant: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, delay: 0.3 },
	},
};

/**
 * Orbiting shape
 */
export const orbitingShapeAnimation = {
	animate: {
		opacity: [0, 0.9, 0.9, 0],
		transition: {
			repeat: Infinity,
			ease: "linear" as const,
		},
	},
} satisfies Variants;
