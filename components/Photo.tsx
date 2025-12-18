"use client";

import React from "react";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = ({ source, alt }: { source: string, alt: string }) => {
  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center xl:items-start relative">
    <Image
      src={source}
      alt={alt}
      height={200}
      width={200}
      className="w-40 h-40 xl:w-[200px] xl:h-[200px] rounded-full mx-auto xl:mx-0 relative overflow-hidden mask-blend"
      quality={100}
      priority
      style={{
        maskImage:
          "radial-gradient(circle, rgba(255,255,255,1) 55%, rgba(255,255,255,0) 75%)",
        WebkitMaskImage:
          "radial-gradient(circle, rgba(255,255,255,1) 55%, rgba(255,255,255,0) 75%)",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // subtle shadow for better blending
      }}
    />
  </div>
  );
};

export default Photo;
