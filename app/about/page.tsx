"use client";

import React from "react";
import Image from "next/image";
// import profilePic from "@/public/assets/me-shiny-bg.jpg";

import SlideTransition from "@/components/SlideTransition";
import Photo from "@/components/Photo";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import AboutSection from "@/components/AboutSection";

import {
  FaReact,
  FaNodeJs,
  FaPhp,
  FaDocker,
  FaDrupal,
  FaAws,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiSanity,
  SiStorybook,
  SiChromatic,
  SiShadcnui,
  SiAlpinedotjs,
  SiTypescript,
  SiBruno,
  SiVitest,
  SiJest,
  SiKeycloak,
  SiMysql,
} from "react-icons/si";
import { FiDownload } from "react-icons/fi";
import { TbBrandFramerMotion } from "react-icons/tb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

// import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

// import { nanoid } from "nanoid";

// Delete this later: next, continue on this page (referring to video – 1:44:17)
// Use tricks from other video for profile pic

// About
const about = {
  title: "About the developer",
  image: "/assets/me-shiny-bw.png",
  description: [
    `Hi, I'm Daniel, a full-stack web developer who builds websites and web applications for individuals, small businesses, and charities. 
    My background includes working at digital agencies, charities, and startups on everything from brand refreshes to custom tools. 
    I'm social media shy and prefer to let my work speak for itself - hence the name ShyDeveloper. 
    If you need something built without all the marketing fluff, let's talk.`,
  ],
};

// Experience
const experience = {
  icon: "/assets/cv/badge.svg",
  title: "My Experience",
  description: "Here's where I've worked and what I did there.",
  items: [
    {
      company: "Lexverify",
      position: "Full Stack Developer",
      duration: "2024 - 2025",
      companyLink: "https://www.lexverify.com",
      address: "(Remote) - Birmingham, UK",
      work: `Built a Microsoft Outlook add-in that checks emails in real-time for compliance issues like GDPR violations and inappropriate content,
      to flag potential violations before emails are sent. I also developed a standalone web application using Remix and TypeScript as both an internal
      testing tool and customer demo, bringing together multiple compliance checks into one streamlined experience.`,
    },
    {
      company: "manifesto",
      position: "Engineer",
      duration: "2021 - 2024",
      companyLink: "https://manifesto.co.uk",
      address: "(Remote) - London, UK",
      work: `Worked as part of a team delivering key front-end and back-end improvements for clients like Blue Cross, Parkinson's UK, The London Clinic, Asthma + Lung UK, and The Royal Parks. 
      I helped enhance user experience, boost site performance, and create custom solutions, including calculators and API integrations. 
      I also supported ongoing maintenance and provided helpful user and technical documentation.`,
    },
    {
      company: "One Young World",
      position: "Drupal Developer",
      duration: "2019 - 2021",
      companyLink: "https://oneyoungworld.org",
      address: "London, UK",
      work: `Focused on front-end development for the One Young World website, building and refining features to improve responsiveness, accessibility, and overall user experience. 
      I worked with Drupal to create solutions that improved both aesthetics and usability.`,
    },
    {
      company: "Stroke Association",
      position: "Drupal Developer",
      duration: "2017 - 2019",
      companyLink: "https://stroke.org.uk",
      address: "London, UK",
      work: `Helped bring a fresh look and improved experience to the Stroke Association's website as part of a major brand refresh. 
      I worked on making it easier for users to find local support groups by introducing a feature that lets them search by postcode. 
      This helped make a real difference for people looking for vital services, while also aligning with the new brand direction.`,
    },
    {
      company: "Moore-Wilson New Media",
      position: "Web Developer",
      duration: "2016 - 2017",
      companyLink: "https://moorewilson.co.uk",
      address: "London, UK",
      work: `Worked on building demo sites that played a role in winning new business, while also developing visually appealing and functional Drupal and WordPress websites. 
      I created detailed documentation to support future maintenance and upgrades and provided post-launch support to keep performance and user satisfaction high.`,
    },
    {
      company: "Community Playlink Children's Charity",
      position: "Website Coordinator/Developer",
      duration: "2014 - 2016",
      companyLink: "https://communityplaylink.org",
      address: "Southampton, UK",
      work: `Created a new WordPress website for the charity, boosting user engagement and donations. 
      I also provided technical support to ensure everything ran smoothly.`,
    },
  ],
};

// Skills
const skills = {
  title: "My Skills",
  description:
    "Some of the technologies I've worked with professionally and tools I've picked up along the way.",
  skillsList: [
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
      description:
        "Full-stack React framework for building fast, scalable web applications. Used for server-side rendering and static site generation.",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind CSS",
      description:
        "Utility-first CSS framework to rapidly build modern, responsive user interfaces. Simplifies styling without writing custom CSS.",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.js",
      description:
        "JavaScript runtime for building fast, scalable network applications. Ideal for back-end services and APIs.",
    },
    {
      icon: <SiChromatic />,
      name: "Chromatic",
      description:
        "Chromatic is a tool for visual testing and reviewing UI changes. It helps ensure that changes to the UI look consistent across different browsers and devices.",
    },
    {
      icon: <SiShadcnui />,
      name: "Shadcn/UI",
      description:
        "A library for building modern, responsive, and accessible user interfaces. It provides a set of reusable components and hooks to help developers build consistent and beautiful designs.",
    },
    {
      icon: <FaDrupal />,
      name: "Drupal",
      description:
        "Open-source CMS for building complex, content-driven websites. Extensively used for enterprise-level applications.",
    },
    {
      icon: <FaReact />,
      name: "React",
      description:
        "JavaScript library for building user interfaces. Focuses on building reusable components to create interactive web apps",
    },
    {
      icon: <SiTypescript />,
      name: "TypeScript",
      description:
        "Strongly typed superset of JavaScript that helps prevent bugs and makes code more maintainable.",
    },
    {
      icon: <SiSanity />,
      name: "Sanity CMS",
      description:
        "Headless CMS designed for structured content, enabling flexible content management and API-first workflows.",
    },
    {
      icon: <TbBrandFramerMotion />,
      name: "Framer Motion",
      description:
        "Animation library for React, enabling smooth, interactive animations in user interfaces.",
    },
    {
      icon: <FaDocker />,
      name: "Docker",
      description:
        "Platform for developing, shipping, and running applications in containers, making environments consistent and deployment faster.",
    },
    {
      icon: <SiStorybook />,
      name: "Storybook",
      description:
        "Development environment for UI components. Helps build, test, and document components in isolation.",
    },
    {
      icon: <FaAws />,
      name: "AWS",
      description:
        "Cloud computing platform providing services like hosting, storage, and databases. Helps scale applications in the cloud.",
    },
    {
      icon: <SiAlpinedotjs />,
      name: "Alpine.js",
      description:
        "A lightweight JavaScript framework for adding interactivity to your web pages. It offers simplicity and flexibility for small, reactive components.",
    },
    {
      icon: <SiBruno />,
      name: "Bruno",
      description:
        "Open-source API testing tool for building, testing, and documenting APIs.",
    },
    {
      icon: <SiVitest />,
      name: "Vitest",
      description:
        "Fast, modern test runner for JavaScript and TypeScript. Makes writing and running tests quick and easy.",
    },
    {
      icon: <FaPhp />,
      name: "PHP",
      description:
        "Server-side scripting language for web development, used for creating dynamic web pages and applications.",
    },
    {
      icon: <SiJest />,
      name: "Jest",
      description:
        "Widely-used JavaScript testing framework for Node.js and browser environments. Includes everything needed for unit and integration testing.",
    },
    {
      icon: <SiKeycloak />,
      name: "Keycloak",
      description:
        "Open-source identity and access management solution for handling user authentication, single sign-on, and authorisation across applications.",
    },
    {
      icon: <SiMysql />,
      name: "MySQL",
      description:
        "Widely-used relational database for storing and managing data efficiently.",
    },
  ],
};

const About = () => {
  return (
    <SlideTransition>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
        }}
        className="min-h-[80vh] flex items-center justify-center mt-12 xl:py-0"
      >
        <div className="container mx-auto">
          <h1 className="sr-only">About</h1>

          <Tabs
            defaultValue="about"
            className="flex flex-col xl:flex-row gap-[60px]"
          >
            <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Skills/Experience</TabsTrigger>
              {/* <TabsTrigger value="education">Education</TabsTrigger> */}
              {/* <TabsTrigger value="skills">Skills</TabsTrigger> */}

              {/* You can't use <Link> for download link */}
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 mx-auto" // uppercase
                asChild
              >
                <a
                  href="/Daniel-Full-Stack-CV.pdf"
                  download
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </a>
              </Button>
            </TabsList>

            {/* content */}
            <div className="min-h-[70vh] mb-16 w-full">
              {/* about */}
              <TabsContent
                value="about"
                className="w-full text-center xl:text-left"
              >
                <AboutSection aboutDetails={about} />
              </TabsContent>

              {/* skills/experience */}
              <TabsContent value="experience" className="w-full">
                <div className="flex flex-col gap-[30px]">
                  <Skills skills={skills} />
                  <Experience experience={experience} />
                </div>
              </TabsContent>
              
            </div>
          </Tabs>
        </div>
      </motion.div>
    </SlideTransition>
  );
};

export default About;
