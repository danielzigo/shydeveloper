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
    className="inline-flex items-center gap-2 text-white/80 font-semibold hover:text-link focus:text-link border-b border-transparent hover:border-link focus:border-link transition-all group"
  >
    {icon === "github" ? (
      <BsGithub className="text-xl" />
    ) : (
      <DartboardIcon className="transition-colors duration-300" />
    )}
    {children}
    <BsArrowUpRight className="group-hover:rotate-45 group-focus:rotate-45 transition-all duration-300" />
  </a>
);

export default ProjectLink;
