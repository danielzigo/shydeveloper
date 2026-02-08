"use client";

import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import ProjectsSliderBtns from "@/components/ProjectsSliderBtns";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "@/app/globals.css";

import Image from "next/image";

import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import Modal from "@/components/Modal";
import ShineLink from "@/components/ShineLink";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const works = [
	{
		num: "01",
		category: "full-stack",
		title: "Blue Cross",
		description: (
			<>
				I worked on the brand refresh of the Blue Cross website during my time as an engineer at{" "}
				<strong>manifesto</strong>, a digital agency. My focus was on updating the site's look and feel to match their
				new brand direction.
			</>
		),
		stack: [{ name: "Drupal" }, { name: "Vue.js" }, { name: "Alpine.js" }, { name: "Tailwind CSS" }],
		image: "/assets/work/blue-cross-shots.webp",
		live: "https://www.bluecross.org.uk/",
		github: "",
	},
	{
		num: "02",
		category: "full-stack",
		title: "Business West",
		description: (
			<>
				I built a custom calculator web application for Business West while at <strong>manifesto</strong>. It helps
				businesses automatically calculate international shipping costs - turning what could be a complex manual process
				into something quick and simple.
			</>
		),
		stack: [{ name: "PHP" }, { name: "Sass" }, { name: "Drupal" }],
		image: "/assets/work/business-west-shot.webp",
		live: "https://www.businesswest.co.uk/export/export-your-business/quote",
		github: "",
	},
	{
		num: "03",
		category: "front-end",
		title: "One Young World",
		description: (
			<>
				I rebuilt the One Young World website front-end while working there as a developer - transforming it into
				something more modern, faster, and much easier to use.
			</>
		),
		stack: [{ name: "Storybook" }, { name: "jQuery" }, { name: "Tailwind CSS" }],
		image: "/assets/work/oyw-shot.webp",
		// live: "https://www.oneyoungworld.com/",
		github: "",
	},
];

const ProjectsCarousel = () => {
	const [project, setProject] = useState(works[0]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalImage, setModalImage] = useState<string>("");
	const [isMobile, setIsMobile] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);

	const openModal = (imageSrc: string) => {
		setModalImage(imageSrc);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const handleSlideChange = (swiper: SwiperType) => {
		// get current active slide index
		const currentIndex = swiper.activeIndex;
		// update project state based on the current slide index
		setProject(works[currentIndex]);
	};

	return (
		<section
			ref={sectionRef}
			className="relative flex min-h-[80vh] flex-col justify-center bg-gradient-to-b from-teal-600 to-[#0b0f1c] py-16 dark:from-secondary dark:to-secondary xl:px-0"
		>
			<div className="container mx-auto">
				<div className="mb-8 xl:mb-14">
					<h2 className="mb-5 text-center font-heading text-4xl font-bold leading-none xl:text-[42px]">
						<span className="text-[#dbe6ff] dark:text-inherit">Some</span>{" "}
						<span className="text-[#ffd9d9] dark:text-accent">Projects</span>
					</h2>
					<p className="mx-auto max-w-[600px] text-center text-lg text-[#f2f6ff] dark:text-white/80">
						Some of the work I'm proud to have been part of
					</p>
				</div>

				<div className="flex flex-col xl:flex-row xl:gap-[30px]">
					<div className="order-2 flex w-full flex-col pt-4 xl:order-none xl:h-[460px] xl:w-[50%] xl:justify-between xl:pt-0">
						<div className="flex h-[50%] flex-col gap-[30px]">
							{/* outline number */}
							<div className="text-outline-1 text-5xl font-extrabold leading-none text-transparent md:text-7xl">
								{project.num}
							</div>

							{/* project title */}
							<h3 className="font-heading text-4xl font-bold capitalize leading-none text-[#dbe6ff] transition-all duration-500 group-hover:text-accent dark:text-white md:text-[40px]">
								{project.title}
							</h3>
							{/* project description */}
							<p className="text-[#f2f6ff] dark:text-white/80">{project.description}</p>
							{/* stack */}
							<ul className="flex flex-wrap items-center gap-2">
								<li className="font-bold text-[#dbe6ff] dark:text-white/80">Technologies:</li>
								{project.stack.map((item, index) => {
									return (
										<li
											key={index}
											className="text-base font-semibold text-[#ffd9d9] dark:font-normal dark:text-accent"
										>
											{" "}
											{/** text-accent */}
											{item.name}
											{/* add comma except for the last item */}
											{index !== project.stack.length - 1 && ","}
										</li>
									);
								})}
							</ul>
							{/* border */}
							<div className="w-full border-b border-white/40 dark:border-white/20"></div>
							{/* buttons */}
							<div className="flex items-center gap-4">
								{/* live project button */}
								{project.live && (
									<Link href={project.live} className="group">
										<TooltipProvider delayDuration={100}>
											<Tooltip>
												<TooltipTrigger className="group flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white/5">
													<BsArrowUpRight className="text-3xl text-white group-hover:text-accent group-focus:text-accent" />
												</TooltipTrigger>
												<TooltipContent>
													<p>View live</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</Link>
								)}

								{/* Github project button */}
								{/* <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger
                        className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center 
                      items-center group"
                      >
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link> */}
							</div>
						</div>
					</div>

					{/* slider */}
					<div className="relative w-full xl:w-[50%]">
						<Swiper
							spaceBetween={30}
							slidesPerView={1}
							className="overflow-hidden rounded-xl xl:h-[520px]"
							onSlideChange={handleSlideChange}
							pagination={{
								clickable: true,
								el: ".projects-pagination",
							}}
							modules={[Pagination]}
						>
							{works.map((work, index) => {
								return (
									<SwiperSlide key={index} className="w-full">
										<div
											onClick={() => openModal(work.image)}
											className="group relative flex h-[460px] cursor-pointer items-center justify-center rounded-xl bg-pink-50/20"
										>
											{/* overlay */}
											<div className="absolute bottom-0 top-0 z-10 h-full w-full overflow-hidden rounded-xl bg-black/10"></div>
											{/* image */}
											<div className="relative h-full w-full overflow-hidden rounded-xl">
												<Image
													src={work.image}
													alt=""
													fill
													sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1400px"
													style={{
														objectFit: "cover",
														borderRadius: "12px",
													}}
												/>
											</div>
										</div>
									</SwiperSlide>
								);
							})}

							{/* navigation or slider buttons */}
							<ProjectsSliderBtns
								containerStyles="flex gap-2 relative mt-4 xl:absolute right-0 xl:bottom-0 xl:mt-0 z-20 w-full justify-end
                xl:w-max xl:justify-none"
								btnStyles="bg-accent hover:bg-accent-hover focus:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center
                items-center transition-all rounded-lg"
								iconStyles=""
							/>
						</Swiper>

						{/* Custom Pagination Container - has to be outside of the swiper component */}
						<div className="projects-pagination"></div>
					</div>
				</div>

				<div className="mt-12 flex justify-center">
					{/* <Link
            href="/projects"
            className="capitalize font-medium hover:text-link gradient-underline"
          >
            See full projects (Coming Soon)
          </Link> */}
					<ShineLink href="/projects">All projects</ShineLink>
				</div>
			</div>

			{!isMobile && <Modal isOpen={isModalOpen} onClose={closeModal} imageSrc={modalImage} type="image" />}

			{/* Add the rolling circle */}
			{/* <RollingCircle containerRef={sectionRef} /> */}
		</section>
	);
};

export default ProjectsCarousel;
