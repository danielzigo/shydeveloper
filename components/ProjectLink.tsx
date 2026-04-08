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
	className?: string;
}

const ProjectLink = ({ href, icon, children, className }: ProjectLinkProps) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className={`group/link inline-flex items-center gap-2 w-fit border-b border-transparent font-semibold text-text-secondary transition-all hover:border-accent-dark hover:text-link-dark focus:border-accent-dark focus:text-link-dark dark:text-white/80 dark:hover:border-link dark:hover:text-link dark:focus:border-link dark:focus:text-link ${className ?? ""}`}
	>
		{icon === "github" ? (
			<BsGithub className="text-xl" />
		) : (
			<DartboardIcon className="transition-colors duration-300" />
		)}
		{children}
		<BsArrowUpRight className="transition-transform duration-300 group-hover/link:rotate-45 group-focus/link:rotate-45" />
	</a>
);

export default ProjectLink;
