import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaChevronDown } from "react-icons/fa";

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
  const [expandedSkillIndex, setExpandedSkillIndex] = useState<number | null>(
    null
  );

  // Function to handle expanding/collapsing a skill's description
  const toggleDescription = (index: number) => {
    setExpandedSkillIndex(expandedSkillIndex === index ? null : index);
  };

  return (
    <div className="skills-section flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[30px] text-center xl:text-left">
        <h2 className="text-4xl xl:text-[42px] font-bold leading-none font-heading text-center xl:text-left">
          {skills.title.split(" ").map((word, index) => {
            if (word === "Skills") {
              return (
                <span key={`word-${index}`} className="text-accent">
                  {word}&nbsp;
                </span>
              );
            }
            return <span key={`word-${index}`}>{word}&nbsp;</span>;
          })}
        </h2>
        <p className="max-w-[600px] text-white/80 mx-auto xl:mx-0">
          {skills.description}
        </p>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
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
                      className={`w-full h-[100px] bg-[#232329] rounded-xl flex flex-col justify-center items-center group
                      ${
                        isExpanded ? "text-link" : ""
                      } transition-all duration-300 relative`}
                    >
                      <div
                        className="text-5xl group-hover:text-link 
                    transition-all duration-300"
                      >
                        {skill.icon}
                      </div>
                      <div className="mt-2 text-white/60 text-xs xl:hidden">
                        <p>{skill.name}</p>
                      </div>
                      {/* Add a down arrow to indicate it's clickable */}
                      <div
                        className={`absolute bottom-4 right-4 text-sm text-white/60 xl:hidden transition-all duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      >
                        {" "}
                        {/* Show arrow on mobile, hide on large screens */}
                        <FaChevronDown />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {/* className="capitalize" */}
                      <p>{skill.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Conditionally render the description */}
                {/* {isExpanded && (
                <div className="mt-2 text-center text-white text-sm">
                  <p>{skill.description}</p>
                </div>
              )} */}

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden mt-2 text-left text-white text-sm 
  ${isExpanded ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}
                  style={{ transitionProperty: "max-height, opacity" }}
                >
                  <p>{skill.description}</p>
                </div>
              </li>
            );
          })}
      </ul>

      {/* 
        skills grouping goes here

        something like:

        "I would group my skills into (and then list the groups)""
      */}
    </div>
  );
};

export default Skills;
