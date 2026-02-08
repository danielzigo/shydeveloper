"use client";

import { motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import { cn } from "@/lib/utils";

// Value for when to show the button
const SHOW_AFTER_PX = 300;
// Value for the buffer from the footer
const FOOTER_BUFFER_PX = 100;

/**
 * Animation variants for the button and the container
 */
const containerVariants: Variants = {
	hidden: { opacity: 0, scale: 0.5 },
	visible: { opacity: 1, scale: 1 },
};

const buttonVariants: Variants = {
	idle: { scale: 1 },
	hover: { scale: 1.1 },
	tap: { scale: 0.9 },
};

const buttonClasses = cn(`
	rounded-full bg-primary p-2 text-[#7f3bf2] shadow-lg transition-all hover:bg-[#7f3bf2] hover:text-primary 
	dark:text-link dark:hover:bg-link dark:hover:text-primary
`);

const BackToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isAtFooter, setIsAtFooter] = useState(false);
	const [isOverlayOpen, setIsOverlayOpen] = useState(false);

	// Toggle visibility of the button based on scroll position
	const toggleVisibility = useCallback(() => {
		const scrolledFromTop = window.scrollY;
		const windowHeight = window.innerHeight;
		const fullHeight = document.documentElement.scrollHeight;

		setIsVisible(scrolledFromTop > SHOW_AFTER_PX);
		setIsAtFooter(scrolledFromTop + windowHeight >= fullHeight - FOOTER_BUFFER_PX);
	}, []);

	// Smooth scroll to the top of the page
	const scrollToTop = useCallback(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	useEffect(() => {
		// Set initial visibility
		toggleVisibility();

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, [toggleVisibility]);

	// Watch for changes to body classList – to hide the button
	// when there's a modal/overlay open e.g. when viewing project details
	useEffect(() => {
		const checkOverlay = () => {
			setIsOverlayOpen(document.body.classList.contains("overlay-open"));
		};

		// Check initially
		checkOverlay();

		// Create a MutationObserver to watch for class changes on body
		const observer = new MutationObserver(checkOverlay);
		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	const shouldShow = isVisible && !isAtFooter && !isOverlayOpen;

	return (
		<motion.div
			className="fixed bottom-16 right-4 z-30 md:bottom-12 xl:bottom-8 xl:right-2"
			variants={containerVariants}
			initial="hidden"
			animate={shouldShow ? "visible" : "hidden"}
			transition={{ duration: 0.4 }} // Fade out and scale smoothly
			style={{ pointerEvents: shouldShow ? "auto" : "none" }} // Prevent clicks when hidden
		>
			<motion.button
				className={buttonClasses}
				onClick={scrollToTop}
				variants={buttonVariants}
				initial="idle"
				whileHover="hover"
				whileTap="tap"
				aria-label="Back to top"
			>
				<BsArrowUpCircle size={36} />
			</motion.button>
		</motion.div>
	);
};

export default BackToTop;
