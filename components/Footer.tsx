"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Social from "@/components/Social";
import LogoText from "@/components/LogoText";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Nav from "./Nav";
import logoImage2 from "@/public/assets/shydeveloper-logo-img2.svg";

const currentYear = new Date().getFullYear();

const footerNavLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="footer bg-primary py-12 border-t border-white/10">
      <div className="footer-content-wrapper container mx-auto">
        <div className="footer-content">
          <div className="footer-logo-socials flex flex-col md:flex-row gap-8 justify-between items-center mb-8">
            <LogoText otherStyles="footer-logo" disabled={true} />

            <Social
              containerStyles="footer-socials flex gap-4"
              iconStyles="w-14 h-14 text-3xl rounded-full flex items-center justify-center text-base bg-white/5 hover:border-primary focus:border-primary hover:text-link focus:text-link hover:transition-all duration-500"
            />
          </div>

          <div className="flex flex-col xl:flex-row gap-4 xl:gap-0 justify-between items-center text-sm">
            <p className="flex items-center gap-1 text-center text-white/60 xl:order-1">
              &copy; {currentYear} ShyDeveloper
              <Image
                src={logoImage2}
                width={24}
                height={24}
                alt="ShyDeveloper Logo"
                className="inline-block"
              />
            </p>
            <div className="xl:order-2 mt-4 xl:mt-0">
              <ul className="flex gap-4">
                {footerNavLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.path}
                      className={`${
                        link.path === pathname ? "text-link" : "text-white/80"
                      } font-medium hover:text-link focus:text-link gradient-underline pb-2`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
