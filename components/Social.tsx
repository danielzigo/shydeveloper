import React from "react";

import Link from "next/link";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

// icons
import { FaGithub, FaLinkedin } from "react-icons/fa";


const socials = [
  {
    name: "Github",
    path: "https://github.com/danielzigo",
    icon: <FaGithub size={24} />,
    tooltip: "Github profile"
  },
  {
    name: "Linkedin",
    path: "https://www.linkedin.com/in/daniel-amazigo/",
    icon: <FaLinkedin size={24} />,
    tooltip: "LinkedIn profile"
  },
  // consider adding one for Drupal.org... although, it's not a "social" per se
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
      {socials.map((item, index) => (
        showTooltips ? (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger className="group">
              <Link href={item.path} className={iconStyles}>
                {item.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              {item.tooltip}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        ) : (
          <Link href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        )
      ))}
    </div>
  );
};

export default Social;
