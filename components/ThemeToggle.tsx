/**
 * Light/Dark mode toggle with sliding knob animation
 */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { cn } from "@/lib/utils";

// Toggle dimensions
const TOGGLE_WIDTH = 66;
const KNOB_SIZE = 28;
const PADDING = 3;
const SLIDE_DISTANCE = TOGGLE_WIDTH - KNOB_SIZE - PADDING * 2;

const buttonClasses = cn(`
	relative inline-flex h-[34px] w-[66px] items-center rounded-full bg-foreground p-[3px] transition-transform 
	hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7f3bf2]/60 
	focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-secondary dark:focus-visible:ring-accent/60
`);

const ThemeToggle = () => {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return <div className="h-[34px] w-[66px] rounded-full bg-[#111]" />;
	}

	const isDark = resolvedTheme === "dark";

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
			aria-pressed={isDark}
			className={buttonClasses}
		>
			{/* Track icons */}
			<FaSun size={14} className="pointer-events-none absolute left-[10px] text-[#f39c12] opacity-60" />
			<FaMoon size={12} className="pointer-events-none absolute right-[10px] text-[#f1c40f] opacity-60" />

			{/* Sliding knob with icon */}
			<motion.div
				className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md"
				animate={{ x: isDark ? SLIDE_DISTANCE : 0 }}
				transition={{ type: "spring", stiffness: 500, damping: 35 }}
			>
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={isDark ? "moon" : "sun"}
						initial={{ opacity: 0, rotate: isDark ? -60 : 60, scale: 0.8 }}
						animate={{ opacity: 1, rotate: 0, scale: 1 }}
						exit={{ opacity: 0, rotate: isDark ? 60 : -60, scale: 0.8 }}
						transition={{ duration: 0.15 }}
					>
						{isDark ? <FaMoon size={14} className="text-[#111]" /> : <FaSun size={16} className="text-[#111]" />}
					</motion.div>
				</AnimatePresence>
			</motion.div>
		</button>
	);
};

export default ThemeToggle;
