"use client";

import { motion } from "framer-motion";
import { orbitingShapeAnimation } from "@/lib/animations";
import type { OrbitingShapeProps } from "@/types";

/**
 * On Contact page, represents a single orbiting shape that rotates around
 * the center of the screen.
 */
export function OrbitingShape({ shape, isPaused }: OrbitingShapeProps) {
	return (
		<motion.div
			className="absolute inset-0"
			initial={{ opacity: 0 }}
			animate={{ opacity: orbitingShapeAnimation.animate.opacity }}
			transition={{
				...(orbitingShapeAnimation.animate.transition ?? {}),
				duration: shape.speed,
				delay: shape.delay,
			}}
			style={{
				animation: `rotate-${shape.id} ${shape.speed}s linear infinite`,
				animationDelay: `${shape.delay}s`,
				animationPlayState: isPaused ? "paused" : "running",
			}}
		>
			<style jsx>{`
        @keyframes rotate-${shape.id} {
          from {
            transform: rotate(${shape.rotation}deg);
          }
          to {
            transform: rotate(${shape.rotation + 360}deg);
          }
        }
      `}</style>
			<div
				style={{
					margin: `${shape.margin}rem`,
					fontSize: `${shape.fontSize}rem`,
					color: shape.color,
					display: "inline-block",
				}}
			>
				<shape.ShapeIcon />
			</div>
		</motion.div>
	);
}
