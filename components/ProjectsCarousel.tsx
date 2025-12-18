"use client";

import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";

// swiper for carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import ProjectsSliderBtns from "@/components/ProjectsSliderBtns";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "@/app/globals.css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import ShineLink from "@/components/ShineLink";
import Modal from "@/components/Modal";
// import RollingCircle from "@/components/RollingCircle";

// NEXT: REMOVE ONE PROJECT FROM THE CAROUSEL

const works = [
  {
    num: "01",
    category: "full-stack",
    title: "Blue Cross",
    description: (
      <>
        I worked on the brand refresh of the Blue Cross website during my time
        as an engineer at <strong>manifesto</strong>, a digital agency. My focus
        was on updating the site's look and feel to match their new brand
        direction.
      </>
    ),
    stack: [
      { name: "Drupal" },
      { name: "Vue.js" },
      { name: "Alpine.js" },
      { name: "Tailwind CSS" },
    ],
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
        I built a custom calculator web application for Business West while at{" "}
        <strong>manifesto</strong>. It helps businesses automatically calculate
        international shipping costs - turning what could be a complex manual
        process into something quick and simple.
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
        I rebuilt the One Young World website front-end while working there as a
        developer - transforming it into something more modern, faster, and much
        easier to use.
      </>
    ),
    stack: [
      { name: "Storybook" },
      { name: "jQuery" },
      { name: "Tailwind CSS" },
    ],
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
      className="min-h-[80vh] flex flex-col justify-center py-16 xl:px-0 bg-secondary relative"
    >
      <div className="container mx-auto">
        <div className="mb-8 xl:mb-14">
          <h2 className="mb-5 text-center text-4xl xl:text-[42px] font-bold leading-none font-heading">
            Some <span className="text-accent">Projects</span>
          </h2>
          <p className="text-center text-white/80 max-w-[600px] mx-auto text-lg">
            Some of the work I'm proud to have been part of
          </p>
        </div>

        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div
            className="w-full xl:w-[50%] xl:h-[460px] flex flex-col
          xl:justify-between order-2 xl:order-none pt-4 xl:pt-0"
          >
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline number */}
              <div className="text-5xl md:text-7xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>

              {/* project title */}
              <h3
                className="font-heading text-4xl md:text-[40px] font-bold leading-none text-white group-hover:text-accent
              transition-all duration-500 capitalize"
              >
                {project.title}
              </h3>
              {/* project description */}
              <p className="text-white/80">{project.description}</p>
              {/* stack */}
              <ul className="flex gap-2 flex-wrap items-center">
                <li className="font-bold">Technologies:</li>
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-base text-accent">
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
              <div className="border-b border-white/20 w-full"></div>
              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* live project button */}
                {project.live && (
                  <Link href={project.live} className="group">
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger
                          className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center 
                      items-center group"
                        >
                          <BsArrowUpRight className="text-white text-3xl group-hover:text-accent group-focus:text-accent" />
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
              className="xl:h-[520px] rounded-xl overflow-hidden"
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
                      className="h-[460px] relative group flex justify-center items-center bg-pink-50/20 cursor-pointer rounded-xl"
                    >
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10 rounded-xl overflow-hidden"></div>
                      {/* image */}
                      <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <Image
                          src={work.image}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1400px"
                          style={{
                            objectFit: 'cover',
                            borderRadius: '12px',
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

        <div className="flex justify-center mt-12">
          {/* <Link
            href="/projects"
            className="capitalize font-medium hover:text-link gradient-underline"
          >
            See full projects (Coming Soon)
          </Link> */}
          <ShineLink href="/projects">All projects</ShineLink>
        </div>
      </div>

      {!isMobile && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={modalImage}
          type="image"
        />
      )}

      {/* Add the rolling circle */}
      {/* <RollingCircle containerRef={sectionRef} /> */}
    </section>
  );
};

export default ProjectsCarousel;
