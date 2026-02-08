"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { Button } from "@/components/ui/button";

interface Card {
	id: number;
	num: string;
	imageUrl: string;
	title: string;
	tagline: string;
	description: string;
	notes?: string;
	galleryImages: string[];
	details: string[];
	technologies: string[];
}

interface ProjectsMobileProps {
	cards: Card[];
}

const ProjectsMobile = ({ cards }: ProjectsMobileProps) => {
	const [expandedSlide, setExpandedSlide] = useState<number | null>(null);
	const overlayRef = useRef<HTMLDivElement | null>(null);
	const scrollPositionRef = useRef(0);
	const previousExpandedSlide = useRef<number | null>(null);

	// Add overlay-open class when overlay is open
	useEffect(() => {
		if (expandedSlide !== null) {
			document.body.classList.add("overlay-open");

			return () => {
				document.body.classList.remove("overlay-open");
			};
		}
	}, [expandedSlide]);

	// Ensure overlay opens at the top and restore page scroll when closing
	useEffect(() => {
		const wasOpen = previousExpandedSlide.current !== null;
		const isOpen = expandedSlide !== null;

		if (!wasOpen && isOpen) {
			scrollPositionRef.current = window.scrollY || window.pageYOffset || 0;
			window.scrollTo({ top: 150, behavior: "auto" });

			if (overlayRef.current) {
				overlayRef.current.scrollTop = 0;
			}
		} else if (wasOpen && !isOpen) {
			window.scrollTo({
				top: scrollPositionRef.current,
				behavior: "auto",
			});
		}

		previousExpandedSlide.current = expandedSlide;
	}, [expandedSlide]);

	// Close overlay on Escape key press
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && expandedSlide !== null) {
				setExpandedSlide(null);
			}
		};

		if (expandedSlide !== null) {
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [expandedSlide]);

	return (
		<>
			{/* Mobile: Simple vertical stack */}
			<div className="space-y-8 pb-8">
				{cards.map((card, index) => (
					<motion.div
						key={card.id}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						className="mx-auto w-full max-w-2xl"
					>
						<div className="relative h-[500px] w-full overflow-hidden rounded-xl">
							<div className="relative h-full w-full">
								<Image
									src={card.imageUrl}
									alt={card.title}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1400px"
								/>
							</div>

							<div className="absolute bottom-0 left-0 right-0 z-10 p-2 text-white">
								<div className="w-full rounded-2xl bg-gradient-to-b from-secondary from-5% to-white p-6 shadow-[0_20px_40px_rgba(139,92,246,0.5),0_8px_16px_rgba(139,92,246,0.4)] dark:from-[#232329] dark:from-0% dark:via-[#232329] dark:to-[#2D2A44] dark:shadow-[0_10px_20px_rgba(0,174,255,0.6)]">
									<div className="mb-2 flex items-start justify-between gap-1">
										<h3 className="font-heading text-3xl font-bold text-text-primary dark:text-inherit">
											{card.title}
										</h3>
										<span
											className="text-outline text-3xl font-extrabold text-transparent"
											style={{
												WebkitTextStroke: "1px hsl(var(--text-primary))",
											}}
										>
											{card.num}
										</span>
									</div>
									<p className="mb-4 text-base font-semibold text-slate-700 dark:text-white/60">{card.tagline}</p>
									<Button variant="outline" onClick={() => setExpandedSlide(card.id)} className="w-fit font-semibold">
										View Details
									</Button>
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* Expanded overlay */}
			<AnimatePresence>
				{expandedSlide !== null && (
					<motion.div
						key={expandedSlide}
						ref={overlayRef}
						initial={{ x: "-100%" }}
						animate={{ x: 0 }}
						exit={{ x: "-100%", opacity: 0 }}
						transition={{
							type: "spring",
							damping: 25,
							stiffness: 200,
							mass: 0.8,
						}}
						className="fixed inset-0 z-50 bg-[#edebed] dark:bg-[#1c1c22]"
						style={{
							overflow: "auto",
							WebkitOverflowScrolling: "touch",
						}}
					>
						{(() => {
							const card = cards.find((c) => c.id === expandedSlide);
							if (!card) return null;

							return (
								<div className="min-h-[150vh] p-8 pb-12 pt-20">
									<div className="mx-auto mb-8 flex w-full max-w-4xl justify-end">
										<button
											type="button"
											onClick={() => setExpandedSlide(null)}
											className="z-10 flex items-center gap-1 rounded-lg bg-gray-200 p-2 text-[#7c3aed] transition-all duration-300 ease-in-out hover:bg-violet-100 focus:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-[#7f3bf2] focus:ring-opacity-50 dark:bg-black dark:text-accent dark:hover:text-accent-hover dark:focus:bg-black dark:focus:ring-accent"
											aria-label="Close details"
										>
											<span className="text-base">Close</span>
											<AiOutlineClose className="text-2xl" />
										</button>
									</div>
									<div className="mx-auto max-w-4xl text-white">
										<h2 className="mb-4 font-heading text-4xl font-bold text-text-primary dark:text-inherit">
											{card.title}
										</h2>
										<p className="mb-8 text-xl text-[#7f3bf2] dark:text-accent">{card.tagline}</p>

										{card.galleryImages && card.galleryImages.length > 0 && (
											<div className="mb-8">
												<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
													{card.galleryImages[0] && (
														<div className="relative h-96 overflow-hidden rounded-xl bg-white/5 md:col-span-2">
															<Image
																src={card.galleryImages[0]}
																alt={`${card.title} screenshot 1`}
																fill
																className="object-cover"
																sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
															/>
														</div>
													)}

													{card.galleryImages.slice(1).map((imgSrc) => (
														<div key={card.id + 1} className="relative h-64 overflow-hidden rounded-xl bg-white/5">
															<Image
																src={imgSrc}
																alt={`${card.title} screenshot ${card.id + 2}`}
																fill
																className="object-cover"
																sizes="(max-width: 768px) 100vw, 50vw"
															/>
														</div>
													))}
												</div>
											</div>
										)}

										<div className="mb-8">
											<h3 className="mb-3 text-lg font-bold text-text-secondary dark:text-inherit">About</h3>
											<p className="leading-relaxed text-text-primary dark:text-white/80">{card.description}</p>
											{card.notes && (
												<p className="leading-relaxed text-text-primary dark:text-white/80">{card.notes}</p>
											)}
										</div>

										<div className="mb-8">
											<h3 className="mb-3 text-lg font-bold text-text-secondary dark:text-inherit">
												Key Contributions
											</h3>
											<ul className="space-y-2">
												{card.details.map((detail) => (
													<li key={card.id} className="flex items-start gap-1 text-text-primary dark:text-white/80">
														<BsDot className="flex-shrink-0 text-3xl text-[#7f3bf2] dark:text-accent" />
														<span className="flex-1">{detail}</span>
													</li>
												))}
											</ul>
										</div>

										<div>
											<h3 className="mb-3 text-lg font-bold text-text-secondary dark:text-inherit">Technologies</h3>
											<div className="flex flex-wrap gap-2">
												{card.technologies.map((tech) => (
													<span key={card.id} className="text-base text-[#7f3bf2] dark:text-accent">
														{tech}
													</span>
												))}
											</div>
										</div>
									</div>
								</div>
							);
						})()}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default ProjectsMobile;
