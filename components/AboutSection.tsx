import Photo from "@/components/Photo";

interface AboutProps {
	aboutDetails: {
		title: string;
		description: string[];
		image: string;
	};
}

const AboutSection = ({ aboutDetails }: AboutProps) => {
	const title = aboutDetails.title;

	return (
		<>
			<div className="about-developer flex flex-col gap-[30px]">
				<h2 className="font-heading text-4xl font-bold leading-none xl:text-[42px]">
					{title === "About the developer" ? (
						<>
							<span className="text-text-primary dark:text-inherit">About the</span>{" "}
							<span className="text-[#7f3bf2] dark:text-accent">developer</span>
						</>
					) : (
						title
					)}
				</h2>

				{/* profile photo */}
				<Photo source={aboutDetails.image} alt="Daniel's profile pic" />

				{aboutDetails.description[0] ? (
					<p className="mx-auto max-w-[600px] text-text-primary dark:text-white/80 xl:mx-0">
						{aboutDetails.description[0]}
					</p>
				) : null}
			</div>

			<div className="about-site mt-16 flex flex-col gap-[30px] text-center xl:text-left">
				{/* about the site */}
				<h2 className="font-heading text-3xl font-bold leading-none xl:text-4xl">
					<span className="text-text-secondary dark:text-inherit">About the</span>{" "}
					<span className="text-[#7f3bf2] dark:text-accent">site</span>
				</h2>
				<p className="mx-auto max-w-[600px] text-text-primary dark:text-white/80 xl:mx-0">
					This site was built with <span className="text-[#7f3bf2] dark:text-accent">Next.js</span> and{" "}
					<span className="text-[#7f3bf2] dark:text-accent">TypeScript</span>, styled with{" "}
					<span className="text-[#7f3bf2] dark:text-accent">Tailwind CSS</span> and{" "}
					<span className="text-[#7f3bf2] dark:text-accent">shadcn/ui</span>, with animations powered by{" "}
					<span className="text-[#7f3bf2] dark:text-accent">Motion</span> and 3D elements using{" "}
					<span className="text-[#7f3bf2] dark:text-accent">React Three Fiber</span>.
				</p>
			</div>
		</>
	);
};

export default AboutSection;
