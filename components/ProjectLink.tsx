/**
 * Reusable component for project links.
 *
 * Created with side projects in mind.
 */

import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import DartboardIcon from "@/components/DartboardIcon";

interface ProjectLinkProps {
	href: string;
	icon: "github" | "dartboard";
	children: React.ReactNode;
}

const ProjectLink = ({ href, icon, children }: ProjectLinkProps) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className="group inline-flex items-center gap-2 border-b border-transparent font-semibold text-text-secondary transition-all hover:border-accent-dark hover:text-link-dark focus:border-accent-dark focus:text-link-dark dark:text-white/80 dark:hover:border-link dark:hover:text-link dark:focus:border-link dark:focus:text-link"
	>
		{icon === "github" ? (
			<BsGithub className="text-xl" />
		) : (
			<DartboardIcon className="transition-colors duration-300" />
		)}
		{children}
		<BsArrowUpRight className="transition-all duration-300 group-hover:rotate-45 group-focus:rotate-45" />
	</a>
);

export default ProjectLink;
