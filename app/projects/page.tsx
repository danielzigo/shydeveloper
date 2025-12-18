"use client";

import { Provider } from "react-redux";
import store from "@/app/store";
import { motion } from "framer-motion";
import SlideTransition from "@/components/SlideTransition";
import ProjectsMainCarousel from "@/components/ProjectsMainCarousel";
import ProjectLink from "@/components/ProjectLink";
// import Image from "next/image";

import RockPaperScissors from "@/components/RockPaperScissors";

// Animation variants
const sideProjectsContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.18,
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const sideProjectCardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 26,
      mass: 0.8,
    },
  },
};

const sideProjects = [
  {
    id: 1,
    title: "Interactive Dartboard",
    description:
      "A fully functional dartboard scorer with interactive gameplay and score tracking.",
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
    // url: "#rps-game",
    isExternal: false,
  },
];

const Projects = () => {
  return (
    <SlideTransition>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
        }}
        className="relative min-h-[80vh] flex flex-col justify-end xl:px-0"
      >
        <div className="relativept-12">
          <div className="container mx-auto">
            {/* Page Header */}
            <div className="mb-16">
              <h1 className="mb-12 text-center text-4xl xl:text-[42px] font-bold leading-none font-heading">
                Projects
              </h1>
              <p className="text-center text-white max-w-[600px] mx-auto text-lg">
                Client work
              </p>
            </div>

            <ProjectsMainCarousel />
          </div>
        </div>

        <section className="relative">
          <div className="pt-16 pb-20 bg-gradient-to-b from-[#33333e] via-[#33333e] via-80% to-[#0a0e27]">
            <div className="container mx-auto">
              {/* Side Projects Header */}
              <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold font-heading mb-4">
                  Side <span className="text-accent">Projects</span>
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto text-lg">
                  Here are a couple of interactive experiments I created in my
                  free time.
                </p>
              </div>

              {/* Project Cards */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={sideProjectsContainerVariants}
                className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              >
                {sideProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={sideProjectCardVariants}
                    className="bg-[#232329] rounded-xl p-8 border border-white/10 hover:shadow-[0_10px_20px_rgba(0,174,255,0.4)] 
                  hover:-translate-y-2 transition-all duration-300"
                  >
                    <h3 className="text-2xl font-bold mb-3 font-heading">
                      {project.title}{" "}
                      {project.subtitle && (
                        <span className="text-accent">{project.subtitle}</span>
                      )}
                    </h3>
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    {project.builtWith && (
                      <p className="font-semibold text-white/60 text-sm mb-6 leading-relaxed">
                        Built with {project.builtWith}
                      </p>
                    )}

                    {(project.github || project.live) && (
                      <div className="flex justify-between flex-col gap-2 lg:flex-row lg:gap-0">
                        {project.github && (
                          <ProjectLink href={project.github} icon="github">
                            View on GitHub
                          </ProjectLink>
                        )}
                        {project.live && (
                          <ProjectLink href={project.live} icon="dartboard">
                            View live
                          </ProjectLink>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <Provider store={store}>
            <RockPaperScissors />
          </Provider>
        </section>
      </motion.section>
    </SlideTransition>
  );
};

export default Projects;
