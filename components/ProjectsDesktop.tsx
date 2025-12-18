"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { BsChevronDoubleDown, BsDot } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import FocusLock from "react-focus-lock";

interface Card {
  id: number;
  num: string;
  imageUrl: string;
  title: string;
  tagline: string;
  description: string;
  notes?: string;
  galleryImages: string[];
  details: string[];
  technologies: string[];
}

interface ProjectsDesktopProps {
  cards: Card[];
}

const ProjectsDesktop = ({ cards }: ProjectsDesktopProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const numCards = cards.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSlide, setExpandedSlide] = useState<number | null>(null);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (expandedSlide !== null) {
      document.body.classList.add("overlay-open");
      document.body.style.overflow = "hidden";

      return () => {
        document.body.classList.remove("overlay-open");
        document.body.style.overflow = "unset";
      };
    }
  }, [expandedSlide]);

  // Track scroll position and update current index
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newIndex = Math.min(Math.floor(latest * numCards), numCards - 1);
      setCurrentIndex(newIndex);
    });
    return unsubscribe;
  }, [scrollYProgress, numCards]);

  // Close overlay on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && expandedSlide !== null) {
        setExpandedSlide(null);
      }
    };

    if (expandedSlide !== null) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [expandedSlide]);

  const scrollToSlide = (index: number) => {
    if (targetRef.current) {
      const element = targetRef.current as HTMLElement;
      const offset = 80;
      const scrollPosition =
        (index / (numCards - 1)) * (element.scrollHeight - window.innerHeight) +
        offset;
      window.scrollTo({
        top: element.offsetTop + scrollPosition + offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={targetRef}
      className="relative carousel"
      style={{ height: `${numCards * 100}vh` }}
    >
      <div className="content-container h-[100vh] sticky top-0 flex items-center justify-center overflow-hidden">
        <div className="absolute top-8 flex justify-between items-center w-full">
          <div className="text-5xl leading-none font-extrabold text-transparent text-outline">
            {cards[currentIndex].num}
          </div>

          <div className="scroll-progress flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-white/80 text-xs uppercase tracking-wider">
                Scroll to explore
              </span>
              <motion.div
                className="text-accent text-sm"
                aria-hidden="true"
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                <BsChevronDoubleDown />
              </motion.div>
            </div>
            <div className="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              />
            </div>
          </div>
        </div>

        {/* Carousel Cards */}
        {cards.map((card, index) => {
          const isActive = index === currentIndex;

          return (
            <motion.div
              key={card.id}
              className="absolute inset-0 flex items-center justify-center"
              initial={false}
              animate={{
                x: isActive ? "0%" : index < currentIndex ? "-100%" : "100%",
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.8,
              }}
              transition={{
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              <div className="relative w-full max-w-[1400px] h-[70vh] max-h-[650px] rounded-xl overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1400px"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="bg-gradient-to-b from-[#232329] to-[#2D2A44] w-fit rounded-2xl p-6 md:p-8 mx-4 shadow-[0_10px_20px_rgba(0,174,255,0.6)]">
                    <h3 className="font-heading text-4xl font-bold mb-2">
                      {card.title}
                    </h3>
                    <p className="font-semibold text-lg text-white/60 mb-4">
                      {card.tagline}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setExpandedSlide(card.id)}
                      className="flex items-center gap-2 font-semibold"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => scrollToSlide(index)}
              className="group"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#00ff99] scale-110"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Expanded Overlay */}
        <AnimatePresence>
          {expandedSlide !== null && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                mass: 0.8,
              }}
              className="absolute inset-0 bg-[#1c1c22] z-50 overflow-y-auto"
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              <FocusLock autoFocus returnFocus>
                {(() => {
                  const card = cards.find((c) => c.id === expandedSlide);
                  if (!card) return null;

                  return (
                    <div className="min-h-full p-8 md:p-12 py-24 flex flex-col justify-center items-center">
                      <div className="flex justify-end w-full mb-8">
                        <button
                          onClick={() => setExpandedSlide(null)}
                          className="flex items-center gap-1 text-accent transition-all duration-300 
                            ease-in-out hover:text-accent-hover focus:outline-none 
                            focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-black p-2 rounded-lg z-10"
                          aria-label="Close details"
                        >
                          <span className="text-base">Close</span>
                          <AiOutlineClose className="text-2xl" />
                        </button>
                      </div>

                      <div className="max-w-4xl mx-auto text-white">
                        <h2 className="font-heading text-4xl font-bold mb-4">
                          {card.title}
                        </h2>
                        <div className="mb-8 flex flex-col gap-4">
                          <p className="text-xl text-accent">{card.tagline}</p>
                          <motion.div
                            className="flex items-center gap-2 text-accent text-xl self-center"
                            aria-hidden="true"
                            animate={{ y: [0, 5, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "loop",
                              ease: "easeInOut",
                            }}
                          >
                            <BsChevronDoubleDown />
                          </motion.div>
                        </div>

                        {card.galleryImages &&
                          card.galleryImages.length > 0 && (
                            <div className="mb-8">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {card.galleryImages[0] && (
                                  <div className="md:col-span-2 relative h-96 rounded-xl overflow-hidden bg-white/5">
                                    <Image
                                      src={card.galleryImages[0]}
                                      alt={`${card.title} screenshot 1`}
                                      fill
                                      className="object-cover rounded-xl"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                    />
                                  </div>
                                )}

                                {card.galleryImages
                                  .slice(1)
                                  .map((imgSrc, idx) => (
                                    <div
                                      key={idx + 1}
                                      className="relative h-64 rounded-xl overflow-hidden bg-white/5"
                                    >
                                      <Image
                                        src={imgSrc}
                                        alt={`${card.title} screenshot ${
                                          idx + 2
                                        }`}
                                        fill
                                        className="object-cover rounded-xl"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                      />
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}

                        <div className="mb-8">
                          <h3 className="text-xl font-semibold mb-3">About</h3>
                          <p className="text-white/80 leading-relaxed">
                            {card.description}
                          </p>
                          {card.notes && (
                            <p className="text-white/80 leading-relaxed mt-4">
                              {card.notes}
                            </p>
                          )}
                        </div>

                        <div className="mb-8">
                          <h3 className="text-xl font-semibold mb-3">
                            Key Contributions
                          </h3>
                          <ul className="space-y-2">
                            {card.details.map((detail, idx) => (
                              <li
                                key={idx}
                                className="text-white/80 flex items-start gap-1"
                              >
                                <BsDot className="text-accent text-3xl flex-shrink-0" />
                                <span className="flex-1">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-3">
                            Technologies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {card.technologies.map((tech, idx) => (
                              <span key={idx} className="text-base text-accent">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </FocusLock>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsDesktop;
