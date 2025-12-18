// continue from here
"use client";

import React from "react";
import { BsChevronDoubleDown, BsArrowDownRight } from "react-icons/bs";
import { BsGrid1X2, BsSpeedometer, BsChatSquareDots } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

interface Service {
  num: string;
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
}

const services = [
  {
    num: "01",
    title: "Website Development",
    description:
      "I build websites for individuals, small businesses, and charities - whether you're starting fresh or replacing an old site. Built so you can update them yourself, or have me handle it for you.",
    path: "/",
    icon: <FaLaptopCode />,
  },
  {
    num: "02",
    title: "Custom Web Applications",
    description:
      "I build custom web tools and applications tailored to specific problems. If you need something built to solve a unique challenge, let's talk about it.",
    path: "/",
    icon: <BsGrid1X2 />,
  },
  {
    num: "03",
    title: "Ongoing Support & Maintenance",
    description:
      "I offer ongoing support and maintenance for the sites and apps I build - if you need help with updates, fixes, or improvements down the line, I'm here to keep things running smoothly.",
    path: "/",
    icon: <BsSpeedometer />,
  },
  // {
  //   num: "04",
  //   title: "Consultancy & Ongoing Support",
  //   description:
  //     "I provide guidance and support for keeping your digital projects running smoothly. Whether it's solving technical challenges or offering advice, Iâ€™m here to help with ongoing maintenance and improvements.",
  //   path: "/",
  //   icon: <BsChatSquareDots />,
  // },
];

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* icon */}
      <div className="text-accent text-5xl">{service.icon}</div>
      {/* title */}
      <h3 className="font-heading text-4xl font-bold leading-none text-white">
        {" "}
        {/** group-hover:text-accent transition-all duration-500 */}
        {service.title}
      </h3>
      {/* description */}
      <p className="text-white/80">{service.description}</p>
    </div>
  );
};

const Services = () => {
  // Card animation - triggers individually as each card enters viewport
  const cardVariant = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <section
      className="min-h-[80vh] flex flex-col justify-center py-16 xl:pt-4 bg-gradient-to-b from-[#232329] to-[#2D2A44]"
      id="services"
    >
      <div className="container mx-auto">
        <div className="pt-12">
          <div className="mb-8 xl:mb-14">
            <h2 className="mb-5 text-center text-4xl xl:text-[42px] font-bold leading-none font-heading">
              My <span className="text-accent">Services</span>{" "}
              {/** text-gradient */}
            </h2>
            <p className="text-center text-white/80 max-w-[600px] mx-auto text-lg">
              The essentials
            </p>
          </div>

          <div className="services-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[45px]">
            {services.map((service, index) => {
              return (
                <motion.article
                  key={index}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    margin: "-50px", // Trigger when card is 50px from viewport
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15, // Slight stagger for cards visible at same time
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="flex-1 flex flex-col gap-6 group rounded-xl shadow-2xl hover:shadow-[0_10px_20px_rgba(0,174,255,0.4)] 
                  hover:-translate-y-2 transition-all duration-300 p-8 bg-[#232329]"
                >
                  <ServiceCard service={service} />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-12">
        <motion.div
          className="text-accent text-3xl"
          animate={{ y: [0, 10, 0] }} // Animating Y-axis for bounce
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <BsChevronDoubleDown />
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

// group: adds styles to the parent element that lead to something that affects the child elements
