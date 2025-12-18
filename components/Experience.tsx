import React, { useRef } from "react";
import Link from "next/link";
import { useScroll, motion } from "framer-motion";
import LiIcon from "@/components/LiIcon";

interface ExperienceDetails {
  experience: {
    title: string;
    description: string;
    items: {
      position: string;
      company: string;
      companyLink: string;
      duration: string;
      address: string;
      work: string;
    }[];
  };
}

interface ExperienceItem {
  position: string;
  company: string;
  companyLink: string;
  duration: string;
  address: string;
  work: string;
}

const Details = ({ position, company, companyLink, duration, address, work }: ExperienceItem) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[80%] mx-auto flex flex-col items-center justify-between"
    >
      {/* list icon item that would be animated */}
      <LiIcon reference={ref} />

      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="font-bold text-xl">
          <span>{position} | </span>
          <span>
            {/* i may not link this one */}
            <Link
              className="font-bold hover:text-accent focus:text-accent border-b-2 border-white hover:border-accent focus:border-accent transition-all"
              href={companyLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {company}
            </Link>
          </span>
        </h3>
        <span className="font-medium">
          {duration} | {address}
        </span>
        <p className="text-md text-white/80">{work}</p>
      </motion.div>
    </li>
  );
};

const Experience = ({ experience }: ExperienceDetails) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.1 1"], // research this. how?? it works, though
  });

  return (
    <div className="experience-section mt-16">
      <div className="flex flex-col gap-[30px] text-center xl:text-left">
        <h2 className="text-4xl xl:text-[42px] font-bold leading-none font-heading text-center xl:text-left">
          {experience.title.split(" ").map((word, index) => {
            if (word === "Experience") {
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
          {experience.description}
        </p>
      </div>

      <div className="my-12">
        <div ref={ref} className="relative w-full mx-auto">
          {/* line */}
          <motion.div
            className="absolute left-3 sm:left-9 -top-1 w-[4px] h-full bg-[#A1A1A1] origin-top" // left-9
            style={{ scaleY: scrollYProgress }}
          />

          <ul className="w-full flex flex-col items-start justify-between ml-4">
            {experience.items.map((item, index) => (
              <Details
                key={index}
                position={item.position}
                company={item.company}
                companyLink={item.companyLink}
                duration={item.duration}
                address={item.address}
                work={item.work}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
