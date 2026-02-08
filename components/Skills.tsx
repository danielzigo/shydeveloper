import type React from "react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Skill {
	icon: React.ReactNode;
	name: string;
	description: string;
}

interface SkillsProps {
	skills: {
		title: string;
		description: string;
		skillsList: Skill[];
	};
}

const Skills = ({ skills }: SkillsProps) => {
	// State to track the expanded skill index (or null if none is expanded)
	const [expandedSkillIndex, setExpandedSkillIndex] = useState<number | null>(null);

	// Function to handle expanding/collapsing a skill's description
	const toggleDescription = (index: number) => {
		setExpandedSkillIndex(expandedSkillIndex === index ? null : index);
	};

	return (
		<div className="skills-section flex flex-col gap-[30px]">
			<div className="flex flex-col gap-[30px] text-center xl:text-left">
				<h2 className="text-center font-heading text-4xl font-bold leading-none xl:text-left xl:text-[42px]">
					{skills.title.split(" ").map((word, index) => {
						if (word === "Skills") {
							return (
								<span key={`word-${index}`} className="text-[#7f3bf2] dark:text-accent">
									{word}&nbsp;
								</span>
							);
						}
						return (
							<span key={`word-${index}`} className="text-text-primary dark:text-inherit">
								{word}&nbsp;
							</span>
						);
					})}
				</h2>
				<p className="mx-auto max-w-[600px] text-text-primary dark:text-white/80 xl:mx-0">{skills.description}</p>
			</div>

			<ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px]">
				{skills.skillsList
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((skill, index) => {
						const isExpanded = expandedSkillIndex === index;

						return (
							<li key={`skill-${index}`} className="">
								<TooltipProvider delayDuration={100}>
									<Tooltip>
										<TooltipTrigger
											data-state={isExpanded ? "open" : "closed"}
											onClick={() => toggleDescription(index)}
											className={`group flex h-[100px] w-full flex-col items-center justify-center rounded-xl bg-slate-600 dark:bg-[#232329] ${isExpanded ? "text-[#ba91ff] dark:text-link" : ""} relative transition-all duration-300`}
										>
											<div className="text-5xl transition-all duration-300 group-hover:text-[#ba91ff] group-focus:text-[#ba91ff] dark:group-hover:text-link dark:group-focus:text-link">
												{" "}
												{/* this uses a different shade of purple/violet for light mode */}
												{skill.icon}
											</div>
											<div className="mt-2 text-xs text-white dark:text-white/60 xl:hidden">
												<p>{skill.name}</p>
											</div>
											{/* Add a down arrow to indicate it's clickable */}
											<div
												className={`absolute bottom-4 right-4 text-sm text-white/60 transition-all duration-300 xl:hidden ${
													isExpanded ? "rotate-180" : ""
												}`}
											>
												{" "}
												{/* Show arrow on mobile, hide on large screens */}
												<FaChevronDown />
											</div>
										</TooltipTrigger>
										<TooltipContent>
											<p>{skill.name}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<div
									className={`mt-2 overflow-hidden text-left text-sm text-white transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}
									style={{ transitionProperty: "max-height, opacity" }}
								>
									<p className="text-text-primary dark:text-inherit">{skill.description}</p>
								</div>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default Skills;
