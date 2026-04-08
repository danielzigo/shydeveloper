/**
 * Learning project data
 *
 * This file contains the content for learning projects displayed
 * on the Projects page (Built to learn section).
 */

import type { LearningProject } from "@/types";

export const LEARNING_PROJECTS: LearningProject[] = [
	{
		number: "1",
		title: "Bookbot",
		description: "A script that analyses a book (text format) and reports word count and character frequency.",
		tech: ["Python"],
		link: "https://github.com/danielzigo/bookbot",
	},
];
