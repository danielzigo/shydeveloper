/**
 * Represents a side project in the portfolio.
 * Side projects are personal experiments.
 */
export interface SideProject {
	// Unique identifier for the project
	id: number;
	// Main project title
	title: string;
	// Optional subtitle (e.g., "(Lizard Spock)")
	subtitle?: string;
	// Brief description of the project and its purpose
	description: string;
	// Technologies and tools used in the project
	builtWith?: string;
	// Whether the project links to an external site (vs on-page)
	isExternal?: boolean;
	// GitHub repository URL
	github?: string;
	// Live deployment URL
	live?: string;
}

/**
 * Represents a learning project in the portfolio.
 * Learning projects are projects built to learn new technologies or concepts.
 */
export interface LearningProject {
	number: string; // Identifier
	title: string;
	description: string;
	tech: string[];
	link: string;
}
