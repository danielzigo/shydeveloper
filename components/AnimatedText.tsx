"use client";

import { motion, type Variants } from "framer-motion";

/**
 * Animation for individual words (fade up)
 */
const singleWordVariant: Variants = {
	initial: {
		opacity: 0,
		y: 50,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1,
		},
	},
};

/**
 * Animation for the entire text (fade in and stagger children)
 */
const textVariant: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.5,
			staggerChildren: 0.1,
		},
	},
};

/**
 * Animated homepage hero heading: "Hello, let's build something together"
 * Single-use component with hardcoded styling for specific words.
 */
const AnimatedText = ({ text }: { text: string }) => {
	return (
		<motion.div variants={textVariant} initial="initial" animate="animate">
			<h1 className="h1 mb-6 font-heading text-text-primary dark:text-white">
				{text.split(" ").map((word, index) => {
					// Accent color and larger size for "together"
					if (word === "together") {
						return (
							<motion.span
								// biome-ignore lint/suspicious/noArrayIndexKey: Static, non-reorderable hero text; index key is stable here.
								key={`${word}-${index}`}
								className="inline-block text-[52px] text-[#7f3bf2] dark:text-accent md:text-[62px] xl:text-[84px]" // Use accent color for ShyDeveloper
								variants={singleWordVariant}
							>
								{word}&nbsp;
							</motion.span>
						);
					}
					// Add comma after "Hello"
					if (word === "Hello") {
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: Static, non-reorderable hero text; index key is stable here.
							<motion.span key={`${word}-${index}`} className="inline-block" variants={singleWordVariant}>
								{word},&nbsp;
							</motion.span>
						);
					}
					// Default text style
					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: Static, non-reorderable hero text; index key is stable here.
						<motion.span key={`${word}-${index}`} className="inline-block" variants={singleWordVariant}>
							{word}&nbsp;
						</motion.span>
					);
				})}
			</h1>
		</motion.div>
	);
};

export default AnimatedText;
