"use client";

import { motion } from "framer-motion";
import { Provider } from "react-redux";
import store from "@/app/store";
import ProjectLink from "@/components/ProjectLink";
import ProjectsMainCarousel from "@/components/ProjectsMainCarousel";
import RockPaperScissors from "@/components/RockPaperScissors";
import SlideTransition from "@/components/SlideTransition";

import { SIDE_PROJECTS } from "@/constants/sideProjects";
import { cardEntrance, staggerContainer } from "@/lib/animations";
import type { SideProject } from "@/types/projects";

const Projects = () => {
	return (
		<SlideTransition>
			<motion.section
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
				}}
				className="relative flex min-h-[80vh] flex-col justify-end xl:px-0"
			>
				<div className="relative pt-12">
					<div className="container mx-auto">
						{/* Page Header */}
						<div className="mb-16">
							<h1 className="mb-12 text-center font-heading text-4xl font-bold leading-none text-text-primary dark:text-white xl:text-[42px]">
								Projects
							</h1>
							<p className="mx-auto max-w-[600px] text-center text-lg text-text-primary dark:text-white">Client work</p>
						</div>

						{/* Client work carousel */}
						<ProjectsMainCarousel />
					</div>
				</div>

				<section className="relative">
					<div className="bg-gradient-to-b from-teal-600 via-teal-950 via-80% to-[#0a0e27] pb-20 pt-16 dark:from-[#33333e] dark:via-[#33333e] dark:via-80% dark:to-[#0a0e27]">
						<div className="container mx-auto">
							{/* Side Projects Header */}
							<div className="mb-12 text-center">
								<h2 className="mb-4 font-heading text-4xl font-bold">
									<span className="text-[#dbe6ff] dark:text-inherit">Side</span>{" "}
									<span className="text-[#ffd9d9] dark:text-accent">Projects</span>
								</h2>
								<p className="mx-auto max-w-2xl text-lg text-[#f2f6ff] dark:text-white/70">
									Here are a couple of interactive experiments I created in my free time.
								</p>
							</div>

							{/* Side Projects Cards */}
							<motion.div
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.25 }}
								variants={staggerContainer}
								className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2"
							>
								{SIDE_PROJECTS.map((project: SideProject) => (
									<motion.div
										key={project.id}
										variants={cardEntrance}
										className="rounded-xl border border-white/10 bg-white/90 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,92,246,0.5),0_8px_16px_rgba(139,92,246,0.35)] dark:bg-[#232329] dark:hover:shadow-[0_10px_20px_rgba(0,174,255,0.4)]"
									>
										{/* Title / optional subtitle */}
										<h3 className="mb-3 font-heading text-2xl font-bold text-text-secondary dark:text-inherit">
											{project.title}{" "}
											{project.subtitle && <span className="text-violet-600 dark:text-accent">{project.subtitle}</span>}
										</h3>

										{/* Description */}
										<p className="mb-6 leading-relaxed text-text-primary dark:text-white/70">{project.description}</p>

										{/* Tech stack */}
										{project.builtWith && (
											<p className="mb-6 text-sm font-semibold leading-relaxed text-text-primary dark:text-white/60">
												Built with {project.builtWith}
											</p>
										)}

										{/* Optional links to GitHub/live project */}
										{(project.github || project.live) && (
											<div className="flex flex-col justify-between gap-2 lg:flex-row lg:gap-0">
												{project.github && (
													<ProjectLink href={project.github} icon="github">
														View on GitHub
													</ProjectLink>
												)}
												{project.live && (
													<ProjectLink href={project.live} icon="dartboard">
														View live
													</ProjectLink>
												)}
											</div>
										)}
									</motion.div>
								))}
							</motion.div>
						</div>
					</div>

					{/* Redux store for state management */}
					<Provider store={store}>
						{/* Rock Paper Scissors (Lizard Spock) */}
						<RockPaperScissors />
					</Provider>
				</section>
			</motion.section>
		</SlideTransition>
	);
};

export default Projects;
