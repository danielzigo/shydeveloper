"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useNotFound } from "@/app/contexts/NotFoundContext";
import { Button } from "@/components/ui/button";

const SPOTLIGHT_CONFIG = {
	radius: 150,
	innerFade: 50,
	outerFade: 200,
};

const NotFound = () => {
	const [mousePosition, setMousePosition] = useState({ x: 150, y: 400 });
	const [isMobile, setIsMobile] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	// Set 404 state via context to conditionally hide theme toggle
	const { setIsNotFound } = useNotFound();

	useEffect(() => {
		setIsNotFound(true);

		return () => setIsNotFound(false); // Reset when leaving the page
	}, [setIsNotFound]);

	// Calculate spotlight mask - extracted for readability
	const spotlightMask = `radial-gradient(
    circle ${SPOTLIGHT_CONFIG.radius}px at ${mousePosition.x}px ${mousePosition.y}px, 
    transparent 0%, 
    transparent ${SPOTLIGHT_CONFIG.innerFade}px, 
    black ${SPOTLIGHT_CONFIG.outerFade}px
  )`;

	// Determine if spotlight should be active
	const shouldShowSpotlight = !isMobile && !prefersReducedMotion;

	useEffect(() => {
		// Check for reduced motion preference
		const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(motionQuery.matches);

		// Detect if device is mobile/touch
		const checkMobile = () => {
			const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
			setIsMobile(hasTouch);
		};

		checkMobile();

		// Set initial position to left-center of viewport
		setMousePosition({
			x: window.innerWidth / 4,
			y: window.innerHeight / 2,
		});

		// Throttle mouse movement updates for better performance
		let frameId: number;
		const handleMouseMove = (e: MouseEvent) => {
			if (frameId) return;

			frameId = requestAnimationFrame(() => {
				setMousePosition({
					x: e.clientX,
					y: e.clientY,
				});
				frameId = 0;
			});
		};

		if (!isMobile && !prefersReducedMotion) {
			window.addEventListener("mousemove", handleMouseMove);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			if (frameId) cancelAnimationFrame(frameId);
		};
	}, [isMobile, prefersReducedMotion]);

	return (
		<>
			{/* 
        Add dark background to header/footer via global style
        This ensures consistency with the 404 page's dark theme
      */}
			<style jsx global>{`
        header {
          background-color: #111827 !important;
          background: linear-gradient(to bottom, #111827, #111827) !important;
        }
        footer {
          background-color: #111827 !important;
        }
      `}</style>

			<div className="relative h-[80vh] w-screen overflow-hidden bg-gray-900 text-white md:h-[60vh]">
				{/* Main content - revealed by spotlight on desktop, always visible on mobile */}
				<div className="container absolute inset-0 z-10 mx-auto flex flex-col items-center justify-center text-center">
					<h1 className="mb-4 font-heading text-5xl font-bold md:text-6xl">I think we're lost</h1>
					<p className="mb-4 font-game text-lg">[ Page not found ]</p>
					<p className="mb-8 text-xl">Let's just go home, shall we?</p>
					<Link href="/">
						<Button variant="default" size="lg">
							Go Home
						</Button>
					</Link>
				</div>

				{/* 
          Spotlight overlay - follows mouse cursor on desktop
          Disabled on mobile/touch devices and for users who prefer reduced motion
        */}
				{shouldShowSpotlight && (
					<div
						className="pointer-events-none fixed inset-0 z-20"
						style={{
							maskImage: spotlightMask,
							WebkitMaskImage: spotlightMask,
							backgroundColor: "black",
						}}
					/>
				)}
			</div>
		</>
	);
};

export default NotFound;
