"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FocusLock from "react-focus-lock";
import { AiOutlineClose } from "react-icons/ai";
import { BsChevronDoubleDown, BsDot } from "react-icons/bs";
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

interface ProjectsDesktopProps {
	cards: Card[];
}

const ProjectsDesktop = ({ cards }: ProjectsDesktopProps) => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
	});

	const numCards = cards.length;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [expandedSlide, setExpandedSlide] = useState<number | null>(null);

	// Lock body scroll when overlay is open
	useEffect(() => {
		if (expandedSlide !== null) {
			document.body.classList.add("overlay-open");
			document.body.style.overflow = "hidden";

			return () => {
				document.body.classList.remove("overlay-open");
				document.body.style.overflow = "unset";
			};
		}
	}, [expandedSlide]);

	// Track scroll position and update current index
	useEffect(() => {
		const unsubscribe = scrollYProgress.on("change", (latest) => {
			const newIndex = Math.min(Math.floor(latest * numCards), numCards - 1);
			setCurrentIndex(newIndex);
		});
		return unsubscribe;
	}, [scrollYProgress, numCards]);

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

	const scrollToSlide = (index: number) => {
		if (targetRef.current) {
			const element = targetRef.current as HTMLElement;
			const offset = 80;
			const scrollPosition = (index / (numCards - 1)) * (element.scrollHeight - window.innerHeight) + offset;
			window.scrollTo({
				top: element.offsetTop + scrollPosition + offset,
				behavior: "smooth",
			});
		}
	};

	return (
		<section ref={targetRef} className="carousel relative" style={{ height: `${numCards * 100}vh` }}>
			<div className="content-container sticky top-0 flex h-[100vh] items-center justify-center overflow-hidden">
				<div className="absolute top-8 flex w-full items-center justify-between">
					<div
						className="text-outline text-5xl font-extrabold leading-none text-transparent"
						style={{ WebkitTextStroke: "1px hsl(var(--text-primary))" }}
					>
						{cards[currentIndex].num}
					</div>

					<div className="scroll-progress flex items-center gap-4">
						<div className="flex items-center gap-1">
							<span className="text-xs font-semibold uppercase tracking-wider text-text-primary dark:font-normal dark:text-white/80">
								Scroll to explore
							</span>
							<motion.div
								className="text-sm text-[#7f3bf2] dark:text-accent"
								aria-hidden="true"
								animate={{ y: [0, 5, 0] }}
								transition={{
									duration: 2,
									repeat: Infinity,
									repeatType: "loop",
									ease: "easeInOut",
								}}
							>
								<BsChevronDoubleDown />
							</motion.div>
						</div>
						<div className="h-1.5 w-32 overflow-hidden rounded-full bg-secondary dark:bg-white/20">
							<motion.div
								className="h-full rounded-full bg-[#7f3bf2] dark:bg-accent"
								style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
							/>
						</div>
					</div>
				</div>

				{/* Carousel Cards */}
				{cards.map((card, index) => {
					const isActive = index === currentIndex;

					return (
						<motion.div
							key={card.id}
							className="absolute inset-0 flex items-center justify-center"
							initial={false}
							animate={{
								x: isActive ? "0%" : index < currentIndex ? "-100%" : "100%",
								opacity: isActive ? 1 : 0,
								scale: isActive ? 1 : 0.8,
							}}
							transition={{
								duration: 0.6,
								ease: [0.32, 0.72, 0, 1],
							}}
						>
							<div className="relative h-[70vh] max-h-[650px] w-full max-w-[1400px] overflow-hidden rounded-xl">
								<div className="relative h-full w-full">
									<Image
										src={card.imageUrl}
										alt={card.title}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1400px"
									/>
								</div>

								<div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-white">
									<div className="mx-4 w-fit rounded-2xl bg-gradient-to-b from-secondary from-5% to-white p-6 shadow-[0_20px_40px_rgba(139,92,246,0.5),0_8px_16px_rgba(139,92,246,0.4)] dark:from-[#232329] dark:from-0% dark:via-[#232329] dark:to-[#2D2A44] dark:shadow-[0_10px_20px_rgba(0,174,255,0.6)] md:p-8">
										<h3 className="mb-2 font-heading text-4xl font-bold text-text-primary dark:text-inherit">
											{card.title}
										</h3>
										<p className="mb-4 text-lg font-semibold text-slate-700 dark:text-white/60">{card.tagline}</p>
										<Button
											variant="outline"
											onClick={() => setExpandedSlide(card.id)}
											className="flex items-center gap-2 font-semibold"
										>
											View Details
										</Button>
									</div>
								</div>
							</div>
						</motion.div>
					);
				})}

				{/* Navigation Dots */}
				<div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
					{cards.map((card, index) => (
						<button
							type="button"
							key={card.id}
							onClick={() => scrollToSlide(index)}
							className="group"
							aria-label={`Go to slide ${index + 1}`}
						>
							<div
								className={`h-5 w-5 rounded-full transition-all duration-300 ${
									index === currentIndex
										? "scale-110 bg-[#0D9AAF] dark:bg-[#00ff99]"
										: "bg-gray-300 hover:bg-gray-400 dark:bg-white/30 dark:hover:bg-white/50"
								}`}
							/>
						</button>
					))}
				</div>

				{/* Expanded Overlay */}
				<AnimatePresence>
					{expandedSlide !== null && (
						<motion.div
							initial={{ x: "-100%" }}
							animate={{ x: 0 }}
							exit={{ x: "-100%" }}
							transition={{
								type: "spring",
								damping: 25,
								stiffness: 200,
								mass: 0.8,
							}}
							className="absolute inset-0 z-50 overflow-y-auto bg-[#edebed] dark:bg-[#1c1c22]"
							style={{
								willChange: "transform",
								backfaceVisibility: "hidden",
								WebkitFontSmoothing: "antialiased",
							}}
						>
							<FocusLock autoFocus returnFocus>
								{(() => {
									const card = cards.find((c) => c.id === expandedSlide);
									if (!card) return null;

									return (
										<div className="flex min-h-full flex-col items-center justify-center p-8 py-24 md:p-12">
											<div className="mb-8 flex w-full justify-end">
												{/* note: purple/violet for close button text is different to the new one */}
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
												<div className="mb-8 flex flex-col gap-4">
													<p className="text-xl text-[#7f3bf2] dark:text-accent">{card.tagline}</p>
													<motion.div
														className="flex items-center gap-2 self-center text-xl text-[#7f3bf2] dark:text-accent"
														aria-hidden="true"
														animate={{ y: [0, 5, 0] }}
														transition={{
															duration: 2,
															repeat: Infinity,
															repeatType: "loop",
															ease: "easeInOut",
														}}
													>
														<BsChevronDoubleDown />
													</motion.div>
												</div>

												{card.galleryImages && card.galleryImages.length > 0 && (
													<div className="mb-8">
														<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
															{card.galleryImages[0] && (
																<div className="relative h-96 overflow-hidden rounded-xl bg-white/5 md:col-span-2">
																	<Image
																		src={card.galleryImages[0]}
																		alt={`${card.title} screenshot 1`}
																		fill
																		className="rounded-xl object-cover"
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
																		className="rounded-xl object-cover"
																		sizes="(max-width: 768px) 100vw, 50vw"
																	/>
																</div>
															))}
														</div>
													</div>
												)}

												<div className="mb-8">
													<h3 className="mb-3 text-xl font-semibold text-text-secondary dark:text-inherit">About</h3>
													<p className="leading-relaxed text-text-primary dark:text-white/80">{card.description}</p>
													{card.notes && (
														<p className="mt-4 leading-relaxed text-text-primary dark:text-white/80">{card.notes}</p>
													)}
												</div>

												<div className="mb-8">
													<h3 className="mb-3 text-xl font-semibold text-text-secondary dark:text-inherit">
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
													<h3 className="mb-3 text-xl font-semibold text-text-secondary dark:text-inherit">
														Technologies
													</h3>
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
							</FocusLock>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
};

export default ProjectsDesktop;
