/**
 * About data
 *
 * This file contains the content for experience and skills displayed
 * on the About page.
 */

import { FaAws, FaDocker, FaDrupal, FaNodeJs, FaPhp, FaReact } from "react-icons/fa";
import {
	SiAlpinedotjs,
	SiBruno,
	SiChromatic,
	SiJest,
	SiKeycloak,
	SiMysql,
	SiNextdotjs,
	SiSanity,
	SiShadcnui,
	SiStorybook,
	SiTailwindcss,
	SiTypescript,
	SiVitest,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import type { Experience, Skills } from "@/types/about";

export const EXPERIENCE: Experience = {
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

export const SKILLS: Skills = {
	title: "My Skills",
	description: "Some of the technologies I've worked with professionally and tools I've picked up along the way.",
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
			description: "Strongly typed superset of JavaScript that helps prevent bugs and makes code more maintainable.",
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
			description: "Animation library for React, enabling smooth, interactive animations in user interfaces.",
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
			description: "Open-source API testing tool for building, testing, and documenting APIs.",
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
			description: "Widely-used relational database for storing and managing data efficiently.",
		},
	],
};
