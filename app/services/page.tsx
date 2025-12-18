// continue from here
"use client";

import React from "react";
import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";
const services = [
  {
    num: "01",
    title: "Web Development",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quisquam.",
    path: "/",
  },
  {
    num: "02",
    title: "UX/UI Design",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quisquam.",
    path: "/",
  },
  {
    num: "03",
    title: "Logo Design",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quisquam.",
    path: "/",
    // icon: <BsArrowDownRight />,
  },
  {
    num: "04",
    title: "SEO",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quisquam.",
    path: "/",
    // icon: <BsArrowDownRight />,
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px]">
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  {/* interesting this (the classes)... */}
                  <div
                    className="text-5xl font-extrabold text-outline text-transparent 
                  group-hover:text-outline-hover transition-all duration-500"
                  >
                    {service.num}
                  </div>
                  <Link
                    href={service.path}
                    className="w-[70px] h-[70px] rounded-full bg-white 
                    group-hover:bg-accent transition-all duration-500 flex justify-center items-center
                    hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                {/* title */}
                <h2 className="text-4xl font-bold leading-none text-white
                 group-hover:text-accent transition-all duration-500">
                  {service.title}
                </h2>
                {/* description */}
                <p className="text-white/60">{service.description}</p>
                {/* border */}
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

// group: adds styles to the parent element that lead to something that affects the child elements
