"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SlideConfig {
	key: string;
	className: string;
	zIndexClass: string;
	bgClass: string;
	delay?: number;
	duration: number;
}

const makeSlideVariants = (duration: number, delay = 0): Variants => ({
	initial: { x: "100%", width: "100%" },
	animate: {
		x: 0,
		width: "0%",
		transition: { delay, duration, ease: "easeInOut" },
	},
	exit: { opacity: 0 },
});

const SLIDES: SlideConfig[] = [
	{
		key: "first-slide",
		zIndexClass: "z-40",
		bgClass: "bg-[#007b59]",
		className: "h-screen w-screen fixed top-0 bottom-0 right-full pointer-events-none flex justify-center items-center",
		duration: 0.8,
		delay: 0,
	},
	{
		key: "second-slide",
		zIndexClass: "z-30",
		bgClass: "bg-[#1a2f4b]",
		className: "h-screen w-screen fixed top-0 bottom-0 right-full pointer-events-none flex",
		duration: 0.7,
		delay: 0.3,
	},
];

const SlideTransition = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		if (pathname !== "/") {
			setIsTransitioning(true);
		} else {
			setIsTransitioning(false);
		}
	}, [pathname]);

	return (
		<>
			<AnimatePresence>
				{isTransitioning &&
					SLIDES.map(({ key, className, zIndexClass, bgClass, duration, delay }) => (
						<motion.div
							key={key}
							className={`${className} ${zIndexClass} ${bgClass}`}
							variants={makeSlideVariants(duration, delay)}
							initial="initial"
							animate="animate"
						/>
					))}
			</AnimatePresence>

			{/* Render the children after the transition */}
			{children}
		</>
	);
};

export default SlideTransition;
