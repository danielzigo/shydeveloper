import React from "react";
import Photo from "@/components/Photo";

interface AboutProps {
  aboutDetails: {
    title: string;
    description: string[];
    image: string;
  };
}

const AboutSection = ({ aboutDetails }: AboutProps) => {
  return (
    <>
      <div className="about-developer flex flex-col gap-[30px]">
        <h2 className="text-4xl xl:text-[42px] font-bold leading-none font-heading">
          {/* {about.title} */}
          {aboutDetails.title.split(" ").map((word, index) => {
            if (word === "developer") {
              return (
                <span key={`word-${index}`} className="text-accent">
                  {word}&nbsp;
                </span>
              );
            }
            return <span key={`word-${index}`}>{word}&nbsp;</span>;
          })}
        </h2>

        {/* profile photo */}
        <Photo source={aboutDetails.image} alt="Daniel's profile pic" />

        {aboutDetails.description.map((paragraph, index) => {
          return (
            <p
              key={`paragraph-${index}`} // Use the index or another stable identifier
              className="max-w-[600px] text-white/80 mx-auto xl:mx-0"
            >
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* about the site - review and add any necessary missing technologies */}
      <div className="about-site mt-16 flex flex-col gap-[30px] text-center xl:text-left">
        <h2 className="text-3xl xl:text-4xl font-bold leading-none font-heading">
          About the <span className="text-accent">site</span>{" "}
        </h2>
        <p className="max-w-[600px] text-white/80 mx-auto xl:mx-0">
          This site was built with <span className="text-accent">Next.js</span>{" "}
          and <span className="text-accent">TypeScript</span>, styled with{" "}
          <span className="text-accent">Tailwind CSS</span> and{" "}
          <span className="text-accent">shadcn/ui</span>, with animations
          powered by <span className="text-accent">Motion</span> and 3D
          elements using <span className="text-accent">React Three Fiber</span>.
        </p>
      </div>
    </>
  );
};

export default AboutSection;
