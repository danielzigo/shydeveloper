/**
 * Side project data
 *
 * This file contains the content for side projects displayed
 * on the Projects page.
 */

import type { SideProject } from "@/types";

export const SIDE_PROJECTS: SideProject[] = [
	{
		id: 1,
		title: "Interactive Dartboard",
		description: "A fully functional dartboard scorer with interactive gameplay and score tracking.",
		builtWith: "React, TypeScript, Tailwind v4, Canvas API, and Motion",
		github: "https://github.com/danielzigo/interactive-dartboard",
		live: "https://interactive-dartboard.vercel.app/",
		isExternal: true,
	},
	{
		id: 2,
		title: "Rock Paper Scissors",
		subtitle: "(Lizard Spock)",
		description:
			"The classic game with a Big Bang Theory twist. Play against the computer in this interactive browser game - below.",
		builtWith: "React, Redux, Tailwind CSS",
		isExternal: false,
	},
];
