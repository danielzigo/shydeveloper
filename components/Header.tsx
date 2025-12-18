"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Components
import Nav from "@/components/Nav";
import MobileNav from "@/components/MobileNav";
import LogoText from "@/components/LogoText";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

// import logoImage from "@/public/assets/shydeveloper-logo-image1.svg";
// import logoImage2 from "@/public/assets/shydeveloper-logo-image2.svg";
import logoImage from "@/public/assets/shydeveloper-logo-img1.svg";
import logoImage2 from "@/public/assets/shydeveloper-logo-img2.svg";

const Header = () => {
  const isTinyScreen = useMediaQuery({ query: "(max-width: 320px)" });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const hasTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0;
      
    setIsTouchDevice(hasTouch);
  }, []);

  const handleFocus = () => {
    setIsHovered(true);
  };

  const handleBlur = () => {
    setIsHovered(false);
  };

  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className=""
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {/* <h1 className="font-bold text-4xl xl:text-6xl"> */}
          {/* <p className=""> */}
          {/* Shy<span className="text-accent">Developer</span> */}
          {/* <span className="text-4xl relative">
                Shy
                {/* Adding lines above and below 'shy' */}
          {/* {/* <span className="absolute left-0 top-[-10px] w-full h-[3px] bg-white"></span> */}
          {/* <span className="absolute left-0 bottom-[-10px] w-full h-[3px] bg-white"></span> */}
          {/* </span> */}
          {/* <span className="text-5xl text-accent">Developer</span> */}
          {/* </p> */}
          {/* </h1> */}
          {/* <Image src={logoImage} width={80} height={70} alt="ShyDeveloper Logo" /> */}

          {/* Logo */}
          {/* 
            on mobile/tablet, use the coloured logo image
            on desktop, use the white logo image because you will switch to the coloured logo image on hover
          */}
          <div className="flex items-center gap-1">
            <Image
              src={
                isTouchDevice ? logoImage2 : isHovered ? logoImage2 : logoImage
              }
              width={isTinyScreen ? 60 : 80}
              height={isTinyScreen ? 60 : 80}
              alt="ShyDeveloper Logo"
              className="transition-all duration-1000 ease-in-out"
            />
            <LogoText hovered={isHovered} />
          </div>
        </Link>

        {/* Desktop Nav & Hire me button*/}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          {/* <Link href="/contact">
            <Button>Hire Me</Button>
          </Link> */}

          {/* later, add dark mode toggle here */}
        </div>

        {/* Mobile Nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
