"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface LogoTextProps {
	otherStyles?: string;
	disabled?: boolean;
	hovered?: boolean;
	shySize?: string;
	developerSize?: string;
}

const LogoText = ({
	otherStyles,
	disabled = false,
	hovered = false,
	shySize = "text-3xl xl:text-4xl",
	developerSize = "text-4xl xl:text-6xl",
}: LogoTextProps) => {
	const isNotWideScreen = useMediaQuery({ query: "(max-width: 1199px)" });
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	useEffect(() => {
		const nav = navigator as Navigator & { msMaxTouchPoints?: number };
		const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || (nav.msMaxTouchPoints ?? 0) > 0;

		setIsTouchDevice(hasTouch);
	}, []);

	return (
		<motion.div
			className={`relative flex items-center overflow-hidden ${otherStyles} ${
				disabled ? "cursor-default" : "cursor-pointer"
			}`} // Disable pointer cursor when disabled
			transition={{ duration: 2, ease: "easeInOut" }} // Animation transition for text
		>
			{/* First word 'Shy' with the lines */}
			<span className="relative flex items-center font-logo text-6xl font-normal tracking-tighter">
				<motion.span
					className={`text-gray-500/90 dark:text-white/80 ${shySize} relative`}
					initial={{ opacity: 1, x: 0 }}
					animate={
						!isTouchDevice && hovered && !disabled
							? { opacity: 0, x: isNotWideScreen ? -30 : -50 }
							: { opacity: 1, x: 0 }
					}
					transition={{ duration: 0.5, ease: "easeInOut" }}
				>
					{" "}
					Shy
				</motion.span>

				{/* Second word 'Developer' */}
				<motion.span
					className={`${developerSize} font-normal tracking-tighter ${
						disabled ? "text-slate-700/90 dark:text-gray-400" : "text-gradient"
					}`}
					initial={{ x: 0 }}
					animate={!isTouchDevice && hovered && !disabled ? { x: isNotWideScreen ? -30 : -40 } : { x: 0 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
				>
					Developer
				</motion.span>
			</span>
		</motion.div>
	);
};

export default LogoText;
