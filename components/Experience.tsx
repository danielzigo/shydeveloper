import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
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
		<li ref={ref} className="mx-auto my-8 flex w-[80%] flex-col items-center justify-between first:mt-0 last:mb-0">
			{/* list icon item that would be animated */}
			<LiIcon reference={ref} />

			<motion.div initial={{ y: 50 }} whileInView={{ y: 0 }} transition={{ duration: 0.5, type: "spring" }}>
				<h3 className="text-xl font-bold">
					<span className="text-text-secondary dark:text-inherit">{position} | </span>
					<span>
						{/* i may not link this one */}
						<Link
							className={`border-b-2 border-text-secondary font-bold text-text-secondary transition-all hover:border-[#7f3bf2] hover:text-[#7f3bf2] focus:border-[#7f3bf2] focus:text-[#7f3bf2] dark:border-white dark:text-inherit dark:hover:border-accent dark:hover:text-accent dark:focus:border-accent dark:focus:text-accent`}
							href={companyLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							{company}
						</Link>
					</span>
				</h3>
				<span className="font-medium text-text-secondary dark:text-inherit">
					{duration} | {address}
				</span>
				<p className="text-md text-text-primary dark:text-white/80">{work}</p>
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
				<h2 className="text-center font-heading text-4xl font-bold leading-none xl:text-left xl:text-[42px]">
					{experience.title.split(" ").map((word, index) => {
						if (word === "Experience") {
							return (
								<span key={`word-${index}`} className="text-[#7f3bf2] dark:text-accent">
									{word}&nbsp;
								</span>
							);
						}
						return (
							<span key={`word-${index}`} className="text-text-primary dark:text-inherit">
								{word}&nbsp;
							</span>
						);
					})}
				</h2>
				<p className="mx-auto max-w-[600px] text-text-primary dark:text-white/80 xl:mx-0">{experience.description}</p>
			</div>

			<div className="my-12">
				<div ref={ref} className="relative mx-auto w-full">
					{/* line */}
					<motion.div
						className="absolute -top-1 left-3 h-full w-[4px] origin-top bg-[#A1A1A1] sm:left-9" // left-9
						style={{ scaleY: scrollYProgress }}
					/>

					<ul className="ml-4 flex w-full flex-col items-start justify-between">
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
