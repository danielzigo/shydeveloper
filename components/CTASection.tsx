import React, { useEffect, useState, useRef } from "react";
import { useAnimation, motion } from "framer-motion";
import Link from "next/link";
import Cube from "@/components/Cube";
import { Button } from "./ui/button";
import { FiDownload } from "react-icons/fi";
// import StaggeredSquares from "./StaggeredSquares";
// import RotatingSquares from "./RotatingSquares";
// import OscillatingCircles from "./OscillatingCircles";
// import GridExpansion from "./GridExpansion";
// import FloatingSquares from "./FloatingSquares";
import DraggableShapes from "./DraggableShapes";
import AnimatedCube from "./AnimatedCube";

const CTASection = () => {
  const controls = useAnimation();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      // Add a listener for future changes to the preference
      const handleChange = () => {
        setPrefersReducedMotion(mediaQuery.matches);
      };
      mediaQuery.addEventListener("change", handleChange);

      // Clean up the event listener on component unmount
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion) {
      controls.start({
        backgroundPosition: ["0% 50%", "100% 50%"],
        transition: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 10,
          ease: "easeInOut",
        },
      });
    }
  }, [controls, prefersReducedMotion]);

  return (
    <motion.section
      className="relative flex items-center min-h-96 bg-gradient-to-r from-blue-500 to-purple-600 text-center text-white"
      style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 50%" }}
      animate={controls}
      ref={sectionRef}
    >
      <div className="container mx-auto min-h-96 py-12 xl:py-0 flex flex-col xl:flex-row items-center gap-4 xl:gap-20">
        {" "}
        {/** py-16 */}
        <div className="text-left">
          <h2 className="text-7xl leading-none font-extrabold text-transparent mb-4 text-outline font-heading">
            Let's Talk
          </h2>
          <p className="text-lg max-w-2xl mb-6 text-white font-semibold">
            Got a project in mind? I'd like to hear about what you need.
          </p>

          <div className="flex justify-center xl:justify-start">
            <Link href="/contact" className="group">
              <Button
                variant="primary"
                size="lg"
                className="font-semibold group-focus:bg-white group-focus:text-primary hover:bg-opacity-90 hover:shadow-[0_0_15px_rgba(0,255,153,0.8)]" // uppercase
              >
                <span>Get in Touch</span>
                {/* <FiDownload className="text-xl" /> */}
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <AnimatedCube />
          <p className="text-sm text-white/80 font-semibold max-w-fit">
            (Just a mindlessly floating interactive cube)
          </p>
        </div>
        {/* <div className="flex justify-center relative w-full h-[300px]">
          <DraggableShapes sectionRef={sectionRef} />
        </div> */}
      </div>
    </motion.section>
  );
};

export default CTASection;
