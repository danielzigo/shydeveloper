"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { BsEnvelope, BsCheck2, BsCircleFill, BsLaptop } from "react-icons/bs";
import { FaPaperPlane, FaKeyboard } from "react-icons/fa";
import { GiPauseButton, GiPlayButton } from "react-icons/gi";
import AvailabilityStatus from "@/components/AvailabilityStatus";
import SlideTransition from "@/components/SlideTransition";
import { Button } from "@/components/ui/button";

// Shape icons (replacing FontAwesome)
const shapeIcons = [
  BsCircleFill,
  FaPaperPlane,
  BsEnvelope,
  FaKeyboard,
  BsLaptop,
];

// Colors from CodePen
const colors = ["#FFD700", "#FFF8DC", "#DB7093", "#C2B7FE", "#95A9FF"];

// Generate shapes (mimicking the SASS @for loop)
const generateShapes = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const shapeSize = Math.floor(Math.random() * 10) + 2; // random(10) in SASS
    const orbitalDistance = Math.floor(Math.random() * 12) + 5; // INCREASE this for closer orbits (5-20rem range)
    const rotation = Math.floor(Math.random() * 360); // random(360)
    const speed = 70 + Math.floor(Math.random() * 10); // 40 + random(10)
    const colorIndex = Math.floor(Math.random() * colors.length);
    const shapeIndex = Math.floor(Math.random() * shapeIcons.length);

    return {
      id: i,
      ShapeIcon: shapeIcons[shapeIndex],
      margin: orbitalDistance, // rem - this creates orbital distance
      fontSize: shapeSize * 0.2, // rem - icon size
      rotation, // initial rotation in degrees
      speed, // animation duration in seconds
      color: colors[colorIndex],
      delay: Math.random() * 2,
    };
  });
};

const FloatingShape = ({
  shape,
  isPaused,
}: {
  shape: any;
  isPaused: boolean;
}) => {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: shape.speed,
        repeat: Infinity,
        ease: "linear",
        delay: shape.delay,
      }}
      style={{
        animation: `rotate-${shape.id} ${shape.speed}s linear infinite`,
        animationDelay: `${shape.delay}s`,
        animationPlayState: isPaused ? "paused" : "running",
      }}
    >
      <style jsx>{`
        @keyframes rotate-${shape.id} {
          from {
            transform: rotate(${shape.rotation}deg);
          }
          to {
            transform: rotate(${shape.rotation + 360}deg);
          }
        }
      `}</style>
      <div
        style={{
          margin: `${shape.margin}rem`,
          fontSize: `${shape.fontSize}rem`,
          color: shape.color,
          display: "inline-block",
        }}
      >
        <shape.ShapeIcon />
      </div>
    </motion.div>
  );
};

const ContactPage = () => {
  const [copied, setCopied] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [shapes, setShapes] = useState<any[]>([]); // Add state for shapes

  const [isMobile, setIsMobile] = useState(false);

  // CREATE REPO FOR INTERACTIVE DARTBOARD NEXT (GITHUB)

  const email = "daniel@shydeveloper.com";
  const statusLayout = "centred" as "centred" | "inline" | "bar";

  useEffect(() => {
    const checkMobile = () => {
      // 768px is Tailwind's "md" breakpoint
      // Below this = mobile, above = desktop
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Check on component mount
    window.addEventListener("resize", checkMobile); // Re-check on window resize

    return () => window.removeEventListener("resize", checkMobile); // Cleanup
  }, []);

  // Generate shapes only on client side
  useEffect(() => {
    setShapes(generateShapes(isMobile ? 10 : 20));
  }, [isMobile]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <SlideTransition>
      <section className="relative min-h-[80vh] flex flex-col justify-center py-16 overflow-hidden">
        {/* .shape equivalent - container for all shape animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="relative w-full h-full flex items-center justify-center">
            {shapes.map((shape) => (
              <FloatingShape key={shape.id} shape={shape} isPaused={isPaused} />
            ))}
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-4xl xl:text-[42px] font-bold mb-4 font-heading"
            >
              Don't be <span className="text-accent">shy</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-white/70 text-lg mb-6"
            >
              ...like me
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="text-white/80 text-lg max-w-[600px] mx-auto"
            >
              Get in touch to discuss your project or just say hello.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-[#232329] rounded-xl p-8 border border-white/10 hover:border-accent hover:shadow-[0_10px_20px_rgba(0,174,255,0.4)] transition-all duration-300 group">
              <div className="flex items-center flex-col sm:flex-row mb-6 md:mb-4 gap-4 sm:gap-0 sm:justify-between">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="w-12 h-12 rounded-full border border-accent/30 group-hover:bg-accent/10 group-hover:border-transparent transition-all duration-300 flex items-center justify-center self-center sm:self-start">
                    <BsEnvelope className="text-accent text-2xl" />
                  </div>
                  <div className="md:flex-1">
                    <h3 className="text-white/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-1">
                      Email
                    </h3>
                    <a
                      href={`mailto:${email}`}
                      className="text-white text-base md:text-xl font-semibold hover:text-link focus:text-link pb-1 border-b border-transparent hover:border-link focus:border-link transition-all duration-300"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 rounded-lg hover:bg-accent/10 focus:bg-accent/10 text-accent border border-accent/30 hover:border-transparent focus:border-transparent transition-all duration-300 flex items-center gap-2 font-semibold"
                >
                  {copied ? (
                    <>
                      <BsCheck2 className="text-xl" />
                      Copied!
                    </>
                  ) : (
                    "Copy"
                  )}
                </button>
              </div>
              <p className="text-white/60 text-sm">
                I typically respond within 24 hours
              </p>
              {statusLayout === "inline" && (
                <AvailabilityStatus layout="inline" />
              )}
            </div>
          </motion.div>

          {statusLayout !== "inline" && (
            <AvailabilityStatus layout={statusLayout} />
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setIsPaused(!isPaused)}
              aria-pressed={isPaused}
              className="flex items-center gap-2 text-white/60 hover:text-accent focus:text-accent text-sm transition-colors duration-300 font-semibold cursor-pointer bg-transparent border-0 p-0"
            >
              {isPaused ? (
                <>
                  Unfreeze shapes
                  <GiPlayButton className="text-lg" />
                </>
              ) : (
                <>
                  Freeze shapes
                  <GiPauseButton className="text-lg" />
                </>
              )}
            </button>
          </motion.div>
        </div>
      </section>
    </SlideTransition>
  );
};

export default ContactPage;
