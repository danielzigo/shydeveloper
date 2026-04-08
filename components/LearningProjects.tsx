"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import ProjectLink from "@/components/ProjectLink";
import { LEARNING_PROJECTS } from "@/constants/learningProjects";

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

export function LearningProjects() {
	return (
		<div className="">
			<h2 className="mb-12 font-heading text-4xl font-bold text-center">
				<span className="text-text-primary dark:text-inherit">Built to</span>{" "}
				<span className="text-[#7f3bf2] dark:text-accent">learn</span>
			</h2>

			<div className="">
				<div className="max-w-5xl mx-auto">
					<div className="divide-y divide-black/5 dark:divide-white/5">
						{LEARNING_PROJECTS.map((project) => (
							<motion.div
								key={project.number}
								variants={itemVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.4 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
								className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-0 py-8 first:pt-0 last:pb-0"
							>
								{/* Title + Description */}
								<div className="flex-grow">
									<h3 className="mb-3 font-heading text-2xl font-bold text-text-secondary dark:text-inherit">
										{project.title}
									</h3>
									<p className="text-text-primary dark:text-white/80 text-sm mt-1 leading-relaxed">
										{project.description}
									</p>
								</div>

								{/* Tech */}
								{project.tech.length > 0 && (
									<div className="md:w-64 md:text-right shrink-0">
										<h4 className="text-sm font-semibold text-[#7f3bf2] dark:text-accent">Tech stack:</h4>
										<span className="text-sm font-semibold text-text-primary dark:text-white/60">
											{project.tech.map((item, i) => (
												<Fragment key={item}>
													{item}
													{i !== project.tech.length - 1 && (
														<span className="text-[#7f3bf2] dark:text-accent text-2xl align-bottom mx-1">·</span>
													)}
												</Fragment>
											))}
										</span>
									</div>
								)}

								{/* Link to GitHub */}
								<div className="md:pl-8 text-sm shrink-0">
									<ProjectLink href={project.link} icon="github" className="pb-1">
										View on GitHub
									</ProjectLink>
								</div>
							</motion.div>
						))}
					</div>

					{/* More coming hint */}
					<div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5 text-center">
						<p className="text-text-primary dark:text-white/80 text-sm italic">More coming soon…</p>
					</div>
				</div>
			</div>
		</div>
	);
}
