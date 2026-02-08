"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Icons
import { BsCheck2, BsEnvelope } from "react-icons/bs";
import { GiPauseButton, GiPlayButton } from "react-icons/gi";

// Components
import AvailabilityStatus from "@/components/AvailabilityStatus";
import { OrbitingShape } from "@/components/OrbitingShape";
import SlideTransition from "@/components/SlideTransition";

// Constants
import {
	CONTACT_EMAIL,
	COPY_TIMEOUT,
	DARK_MODE_SHAPE_COLORS,
	DEFAULT_STATUS_LAYOUT,
	LIGHT_MODE_SHAPE_COLORS,
	SHAPE_CONFIG,
} from "@/constants/contact";

// Hooks
import { useIsMobile } from "@/hooks/useIsMobile";

// Animations
import {
	descriptionVariant,
	emailCardVariant,
	freezeUnfreezeButtonVariant,
	headingVariant,
	subtitleVariant,
} from "@/lib/animations";

// Utils
import { copyToClipboard, generateShapes } from "@/lib/utils";

// Types
import type { AvailabilityLayout, ContactFloatingShape } from "@/types";

const ContactPage = () => {
	const [copied, setCopied] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [shapes, setShapes] = useState<ContactFloatingShape[]>([]);

	// Hooks
	const isMobile = useIsMobile();
	const { resolvedTheme } = useTheme();
	const statusLayout: AvailabilityLayout = DEFAULT_STATUS_LAYOUT;

	// Generate shapes based on device type
	useEffect(() => {
		const count = isMobile ? SHAPE_CONFIG.MOBILE_COUNT : SHAPE_CONFIG.DESKTOP_COUNT;

		setShapes(generateShapes(count));
	}, [isMobile]);

	// Update colours when theme changes (without regenerating shapes)
	useEffect(() => {
		const theme = resolvedTheme === "light" ? "light" : "dark";
		const colors = theme === "light" ? LIGHT_MODE_SHAPE_COLORS : DARK_MODE_SHAPE_COLORS;

		setShapes((prevShapes) => {
			if (prevShapes.length === 0) return prevShapes; // Shapes not generated yet

			return prevShapes.map((shape) => ({
				...shape,
				color: colors[Math.floor(Math.random() * colors.length)],
			}));
		});
	}, [resolvedTheme]);

	// Handlers
	const handleCopyEmail = async () => {
		try {
			await copyToClipboard(CONTACT_EMAIL);
			setCopied(true);
			setTimeout(() => setCopied(false), COPY_TIMEOUT);
		} catch (err) {
			console.error("Failed to copy email:", err);
		}
	};

	return (
		<SlideTransition>
			<section className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden py-16">
				{/* Orbiting shapes background */}
				<div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
					<div className="relative flex h-full w-full items-center justify-center">
						{shapes.map((shape) => (
							<OrbitingShape key={shape.id} shape={shape} isPaused={isPaused} />
						))}
					</div>
				</div>

				<div className="container relative z-10 mx-auto">
					{/* Page header */}
					<div className="mb-16 text-center">
						<motion.h1
							variants={headingVariant}
							initial="initial"
							animate="animate"
							className="mb-4 font-heading text-4xl font-bold text-text-primary dark:text-inherit xl:text-[42px]"
						>
							Don't be <span className="text-[#7f3bf2] dark:text-accent">shy</span>
						</motion.h1>
						<motion.p
							variants={subtitleVariant}
							initial="initial"
							animate="animate"
							className="mb-6 text-lg text-text-secondary dark:text-white/70"
						>
							...like me
						</motion.p>
						<motion.p
							variants={descriptionVariant}
							initial="initial"
							animate="animate"
							className="mx-auto max-w-[600px] text-lg text-text-primary dark:text-white/80"
						>
							Get in touch to discuss your project or just say hello.
						</motion.p>
					</div>

					{/* Email contact card */}
					<motion.div variants={emailCardVariant} initial="initial" animate="animate" className="mx-auto max-w-2xl">
						<div className="group rounded-xl border border-black/20 bg-slate-50 p-8 transition-all duration-300 hover:border-[#7c3aed] hover:shadow-[0_20px_40px_rgba(139,92,246,0.5),0_8px_16px_rgba(139,92,246,0.4)] dark:border-white/10 dark:bg-[#232329] dark:hover:border-accent dark:hover:shadow-[0_10px_20px_rgba(0,174,255,0.4)]">
							<div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-0 md:mb-4">
								<div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
									<div className="flex h-12 w-12 items-center justify-center self-center rounded-full border border-[#7f3bf2] transition-all duration-300 group-hover:border-transparent group-hover:bg-[#7f3bf2]/10 dark:border-accent/30 dark:group-hover:bg-accent/10 sm:self-start">
										<BsEnvelope className="text-2xl text-[#7f3bf2] dark:text-accent" />
									</div>
									<div className="md:flex-1">
										<h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-white/70 md:text-sm">
											Email
										</h3>
										<a
											href={`mailto:${CONTACT_EMAIL}`}
											className="border-b border-transparent pb-1 text-base font-semibold text-text-primary transition-all duration-300 hover:border-link hover:text-link focus:border-link focus:text-link dark:text-inherit dark:hover:border-link dark:hover:text-link dark:focus:border-link dark:focus:text-link md:text-xl"
										>
											{CONTACT_EMAIL}
										</a>
									</div>
								</div>

								<button
									type="button"
									onClick={handleCopyEmail}
									className="flex items-center gap-2 rounded-lg border border-[#7f3bf2]/30 px-4 py-2 font-semibold text-[#7c3aed] transition-all duration-300 hover:border-transparent hover:bg-[#7f3bf2]/10 focus:border-transparent focus:bg-[#7f3bf2]/10 dark:border-accent/30 dark:text-accent dark:hover:bg-accent/10 dark:focus:bg-accent/10"
								>
									{copied ? (
										<>
											<BsCheck2 className="text-xl" />
											Copied!
										</>
									) : (
										"Copy"
									)}
								</button>
							</div>
							<p className="text-sm text-text-secondary dark:text-white/60">I typically respond within 24 hours</p>
							{statusLayout === "inline" && <AvailabilityStatus layout="inline" />}
						</div>
					</motion.div>

					{/* Availability status (centred/bar layout) */}
					{statusLayout !== "inline" && <AvailabilityStatus layout={statusLayout} />}

					{/* Animation control button */}
					<motion.div
						variants={freezeUnfreezeButtonVariant}
						initial="initial"
						animate="animate"
						className="mt-12 flex justify-center"
					>
						<button
							type="button"
							onClick={() => setIsPaused(!isPaused)}
							aria-pressed={isPaused}
							className="flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-sm font-semibold text-text-secondary transition-colors duration-300 hover:text-[#7c3aed] focus:text-[#7c3aed] dark:text-white/60 dark:hover:text-accent dark:focus:text-accent"
						>
							{isPaused ? (
								<>
									Unfreeze shapes
									<GiPlayButton className="text-lg" />
								</>
							) : (
								<>
									Freeze shapes
									<GiPauseButton className="text-lg" />
								</>
							)}
						</button>
					</motion.div>
				</div>
			</section>
		</SlideTransition>
	);
};

export default ContactPage;
