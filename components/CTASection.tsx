import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AnimatedCube from "./AnimatedCube";
import { Button } from "./ui/button";

const ctaButtonClasses = `
  font-semibold
  group-focus-visible:bg-white 
  group-focus-visible:text-text-primary
  hover:bg-opacity-90 
  hover:shadow-[0_0_15px_rgba(0,255,153,0.8)]
`;

const CTASection = () => {
	const controls = useAnimation();
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const sectionRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
			setPrefersReducedMotion(mediaQuery.matches);

			// Add a listener for future changes to the preference
			const handleChange = () => {
				setPrefersReducedMotion(mediaQuery.matches);
			};
			mediaQuery.addEventListener("change", handleChange);

			// Clean up the event listener on component unmount
			return () => {
				mediaQuery.removeEventListener("change", handleChange);
			};
		}
	}, []);

	useEffect(() => {
		if (!prefersReducedMotion) {
			controls.start({
				backgroundPosition: ["0% 50%", "100% 50%"],
				transition: {
					repeat: Infinity,
					repeatType: "reverse",
					duration: 10,
					ease: "easeInOut",
				},
			});
		}
	}, [controls, prefersReducedMotion]);

	return (
		<motion.section
			className="relative flex min-h-96 items-center bg-gradient-to-r from-indigo-400 to-purple-400 text-center text-white dark:from-blue-500 dark:to-purple-600"
			style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 50%" }}
			animate={controls}
			ref={sectionRef}
		>
			<div className="container mx-auto flex min-h-96 flex-col items-center gap-4 py-12 xl:flex-row xl:gap-20 xl:py-0">
				<div className="text-left">
					<h2 className="text-outline mb-4 font-heading text-7xl font-extrabold leading-none text-transparent">
						Let's Talk
					</h2>
					<p className="mb-6 max-w-2xl text-lg font-semibold text-white">
						Got a project in mind? I'd like to hear about what you need.
					</p>

					<div className="light flex justify-center xl:justify-start">
						<Link href="/contact" className="group">
							<Button variant="primary" size="lg" className={ctaButtonClasses}>
								<span>Get in Touch</span>
								{/* <FiDownload className="text-xl" /> */}
							</Button>
						</Link>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<AnimatedCube />
					<p className="max-w-fit text-sm font-semibold text-white/80">(Just a mindlessly floating interactive cube)</p>
				</div>
			</div>
		</motion.section>
	);
};

export default CTASection;
