"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CiMenuFries } from "react-icons/ci";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

import logoImage2 from "@/public/assets/shydeveloper-logo-img2.svg";
import LogoText from "./LogoText";
import Social from "@/components/Social";
import AnimatedMenuButton from "@/components/AnimatedMenuButton";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  // {
  //   name: "Services",
  //   path: "/services",
  // },
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

// Components
import { Button } from "@/components/ui/button";

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuButtonFocused, setIsMenuButtonFocused] = useState(false);

  const [shouldOpen, setShouldOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Container animation for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3, // Start after sheet slides in
        staggerChildren: 0.1, // Delay between each item
      },
    },
  };

  // Individual menu item animation
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: 40, // Start 40px to the right
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Logo animation (slightly different timing)
  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Handle delayed open - ADD THIS WHOLE BLOCK
  useEffect(() => {
    if (shouldOpen && triggerRef.current) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setShouldOpen(false);
      }, 250); // 250ms delay to see the animation
      
      return () => clearTimeout(timer);
    }
  }, [shouldOpen]);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger
        ref={triggerRef}
        className="flex justify-center items-center"
        onFocus={() => setIsMenuButtonFocused(true)}
        onBlur={() => setIsMenuButtonFocused(false)}
        onClick={(e) => {
          e.preventDefault();
          setShouldOpen(true);
        }}
      >
        <AnimatedMenuButton isActive={isMenuButtonFocused} />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetTitle>
          <VisuallyHidden>Mobile navigation menu</VisuallyHidden>
        </SheetTitle>
        <SheetDescription>
          <VisuallyHidden>This is the mobile navigation menu.</VisuallyHidden>
        </SheetDescription>

        {/* logo... this may not be there in the end, or this could be replaced with the image */}
        <motion.div
          className="mt-20 mb-16 text-center text-2xl"
          variants={logoVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
        >
          <SheetClose asChild>
            <Link href="/" className="inline-block">
              {/* <h1 className="text-4xl font-semibold">
                Shy<span className="text-accent">Developer</span>
              </h1> */}

              {/* NEXT: reduce margin around the logo image */}
              <div className="flex items-center justify-center gap-1">
                <Image
                  src={logoImage2}
                  width={85}
                  height={85}
                  alt="ShyDeveloper Logo"
                />
              </div>
            </Link>
          </SheetClose>
        </motion.div>

        {/* nav links */}
        <motion.nav
          className="flex flex-col justify-center items-center gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
        >
          {navLinks.map((link, index) => (
            <motion.div key={index} variants={itemVariants}>
              <SheetClose asChild key={index}>
                <Link
                  href={link.path}
                  className={`${
                    link.path === pathname &&
                    "text-accent border-b-2 border-accent"
                  } capitalize font-medium text-lg hover:text-accent transition-all`}
                >
                  {link.name}
                </Link>
              </SheetClose>
            </motion.div>
          ))}
        </motion.nav>

        {/* logo text */}
        <div className="flex justify-center flex-grow items-end mb-6">
          {/* <LogoText
            disabled={true}
            shySize="text-[35px]"
            developerSize="text-[40px]"
          /> */}
          <Social
            containerStyles="footer-socials flex gap-4"
            iconStyles="w-14 h-14 text-3xl rounded-full flex items-center justify-center text-base bg-white/5 hover:border-primary focus:border-primary hover:text-link focus:text-link hover:transition-all duration-500"
            showTooltips={false}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
