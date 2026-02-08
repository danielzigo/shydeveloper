"use client";

import { motion } from "framer-motion";

// Icons
import { FiDownload } from "react-icons/fi";

// Components
import AboutSection from "@/components/AboutSection";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import SlideTransition from "@/components/SlideTransition";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Constants
import { EXPERIENCE, SKILLS } from "@/constants/about";

// About data
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

const About = () => {
	return (
		<SlideTransition>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
				}}
				className="mt-12 flex min-h-[80vh] items-center justify-center xl:py-0"
			>
				<div className="container mx-auto">
					<h1 className="sr-only">About</h1>

					<Tabs defaultValue="about" className="flex flex-col gap-[60px] xl:flex-row">
						<TabsList className="mx-auto flex w-full max-w-[380px] flex-col gap-6 xl:mx-0">
							{/* tabs - About, Skills/Experience */}
							<TabsTrigger value="about">About</TabsTrigger>
							<TabsTrigger value="experience">Skills/Experience</TabsTrigger>

							{/* download CV */}
							<Button variant="outline" size="lg" className="mx-auto flex items-center gap-2" asChild>
								<a href="/Daniel-Full-Stack-CV.pdf" download>
									<span>Download CV</span>
									<FiDownload className="text-xl" />
								</a>
							</Button>
						</TabsList>

						<div className="mb-16 min-h-[70vh] w-full">
							{/* about */}
							<TabsContent value="about" className="w-full text-center xl:text-left">
								<AboutSection aboutDetails={about} />
							</TabsContent>

							{/* skills/experience */}
							<TabsContent value="experience" className="w-full">
								<div className="flex flex-col gap-[30px]">
									<Skills skills={SKILLS} />
									<Experience experience={EXPERIENCE} />
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
