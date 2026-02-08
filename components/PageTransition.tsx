"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type React from "react";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();

	return (
		<AnimatePresence>
			<div key={pathname}>
				<motion.div
					initial={{ opacity: 1 }}
					animate={{
						opacity: 0,
						transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
					}}
					className="pointer-events-none fixed top-0 z-50 h-screen w-screen bg-primary"
				></motion.div>
				{children}
			</div>
		</AnimatePresence>
	);
};

export default PageTransition;
