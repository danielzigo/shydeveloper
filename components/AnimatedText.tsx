"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * Animated homepage hero heading: "Hello, let's build something together"
 * Single-use component with hardcoded styling for specific words.
 * 
 * Animation: GSAP staggered fade-up on mount via useGSAP.
 * Words are pre-split in JSX (for per-word class control), so SplitText was not needed —
 * GSAP targets the existing h1 > span elements directly.
 */
const AnimatedText = ({ text }: { text: string }) => {
	const heroRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		// Reveal the container first (was hidden via CSS to prevent flash)
		gsap.set(heroRef.current, { opacity: 1 });

		// Target the spans already rendered in JSX
		gsap.from("h1 > span", {
			y: 100,
			autoAlpha: 0,
			stagger: 0.1,
			duration: 1,
			ease: "power2.inOut",
		});
	}, { scope: heroRef, dependencies: [text] });

	return (
		// opacity-0 hides the text before GSAP fires — prevents unstyled flash on mount
		<div ref={heroRef} className="opacity-0">
			<h1 className="h1 mb-6 font-heading text-text-primary dark:text-white">
				{text.split(" ").map((word, index) => {
					// Accent color and larger size for "together"
					if (word === "together") {
						return (
							<span
								// biome-ignore lint/suspicious/noArrayIndexKey: Static, non-reorderable hero text; index key is stable here.
								key={`${word}-${index}`}
								className="inline-block text-[52px] text-[#7f3bf2] dark:text-accent md:text-[62px] xl:text-[84px]" // Use accent color for ShyDeveloper
							>
								{word}&nbsp;
							</span>
						);
					}
					// Add comma after "Hello"
					if (word === "Hello") {
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: Static, non-reorderable hero text; index key is stable here.
							<span key={`${word}-${index}`} className="inline-block">
								{word},&nbsp;
							</span>
						);
					}
					// Default text style
					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: Static, non-reorderable hero text; index key is stable here.
						<span key={`${word}-${index}`} className="inline-block">
							{word}&nbsp;
						</span>
					);
				})}
			</h1>
		</div>
	);
};

export default AnimatedText;
