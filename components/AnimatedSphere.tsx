"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Configuration for animated sphere appearance and behaviour
 */
const SPHERE_CONFIG = {
	/** Sphere diameter in rem */
	SIZE: 10, // w-40 = 10rem = 160px
	/** Scale multiplier on hover */
	HOVER_SCALE: 1.1,
	/** Scale multiplier on click/drag */
	TAP_SCALE: 0.85,
	/** Tooltip vertical offset */
	TOOLTIP_OFFSET: -8,
} as const;

/**
 * Interactive draggable sphere with hover tooltip.
 * Used on the homepage hero.
 */
const AnimatedSphere = () => {
	const [isDragging, setIsDragging] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const sectionRef = useRef<HTMLDivElement | null>(null);

	return (
		<div ref={sectionRef} className="relative flex h-full w-full items-center justify-center">
			<motion.div
				className="absolute h-40 w-40 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
				style={{
					cursor: isDragging ? "grabbing" : "grab",
				}}
				whileHover={{ scale: SPHERE_CONFIG.HOVER_SCALE }}
				whileTap={{ scale: SPHERE_CONFIG.TAP_SCALE }}
				drag
				dragConstraints={sectionRef}
				dragElastic={0}
				dragPropagation={false}
				onDragStart={() => {
					setIsDragging(true);
					setShowTooltip(false);
				}}
				onDragEnd={() => {
					setIsDragging(false);
					setShowTooltip(false);
				}}
				onHoverStart={() => {
					if (!isDragging) {
						setShowTooltip(true);
					}
				}}
				onHoverEnd={() => {
					if (!isDragging) {
						setShowTooltip(false);
					}
				}}
			>
				{/* Tooltip */}
				{showTooltip && (
					<div className="absolute -top-8 left-1/2 -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-sm text-white">
						Drag me
					</div>
				)}
			</motion.div>
		</div>
	);
};

export default AnimatedSphere;
