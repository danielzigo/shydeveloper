"use client";

import dynamic from "next/dynamic";
import { BsArrowDownCircle } from "react-icons/bs";

import AnimatedText from "@/components/AnimatedText";
import FloatingShapes from "@/components/FloatingShapes";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import Services from "@/components/Services";
import { Button } from "@/components/ui/button";

const AnimatedSphere = dynamic(() => import("@/components/AnimatedSphere"), {
	ssr: false,
});

const CTASection = dynamic(() => import("@/components/CTASection"), {
	ssr: false,
});

const Home = () => {
	const handleScrollToServices = () => {
		const servicesSection = document.getElementById("services");
		if (servicesSection) {
			servicesSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section className="relative h-full">
			{/* Hero */}
			<div className="container mx-auto mt-12 h-full pb-6 xl:mt-0">
				<div className="flex flex-col items-center xl:flex-row xl:pb-24 xl:pt-8">
					<div className="z-10 text-center xl:text-left">
						<AnimatedText text="Hello, let's build something together" />

						<p className="info mb-9 text-lg text-text-primary dark:text-white xl:max-w-[500px]">
							I build websites and web tools - the kind of straightforward, functional, aesthetic solutions you actually
							need.
						</p>

						<div className="flex justify-center xl:justify-start">
							<Button
								variant="outline"
								size="lg"
								className="flex items-center gap-2 font-semibold"
								onClick={handleScrollToServices}
							>
								<span>See how I can help</span>
								<BsArrowDownCircle className="text-xl" />
							</Button>
						</div>
					</div>

					<div className="relative h-[300px] w-full xl:h-[500px]">
						<AnimatedSphere />
						<FloatingShapes />
					</div>
				</div>
			</div>

			<ProjectsCarousel />
			<Services />
			<CTASection />
		</section>
	);
};

export default Home;
