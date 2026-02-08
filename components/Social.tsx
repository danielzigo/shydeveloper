import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const socials = [
	{
		name: "Github",
		path: "https://github.com/danielzigo",
		icon: <FaGithub size={24} />,
		tooltip: "Github profile",
	},
	{
		name: "Linkedin",
		path: "https://www.linkedin.com/in/daniel-amazigo/",
		icon: <FaLinkedin size={24} />,
		tooltip: "LinkedIn profile",
	},
];

const Social = ({
	containerStyles,
	iconStyles,
	showTooltips = true,
}: {
	containerStyles: string;
	iconStyles: string;
	showTooltips?: boolean;
}) => {
	return (
		<div className={containerStyles}>
			{socials.map((item) =>
				showTooltips ? (
					<TooltipProvider key={item.name.toLowerCase()}>
						<Tooltip>
							<TooltipTrigger className="group">
								<Link href={item.path} className={iconStyles}>
									{item.icon}
								</Link>
							</TooltipTrigger>
							<TooltipContent className="!border-black/10 !bg-white !text-[#1c1c22] shadow-md">
								<p className="text-sm">{item.tooltip}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				) : (
					<Link key={item.name.toLowerCase()} href={item.path} className={iconStyles}>
						{item.icon}
					</Link>
				),
			)}
		</div>
	);
};

export default Social;
