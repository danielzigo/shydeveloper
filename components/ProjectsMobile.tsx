"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";

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

interface ProjectsMobileProps {
  cards: Card[];
}

const ProjectsMobile = ({ cards }: ProjectsMobileProps) => {
  const [expandedSlide, setExpandedSlide] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef(0);
  const previousExpandedSlide = useRef<number | null>(null);

  // Add overlay-open class when overlay is open
  useEffect(() => {
    if (expandedSlide !== null) {
      document.body.classList.add("overlay-open");

      return () => {
        document.body.classList.remove("overlay-open");
      };
    }
  }, [expandedSlide]);

  // Ensure overlay opens at the top and restore page scroll when closing
  useEffect(() => {
    const wasOpen = previousExpandedSlide.current !== null;
    const isOpen = expandedSlide !== null;

    if (!wasOpen && isOpen) {
      scrollPositionRef.current = window.scrollY || window.pageYOffset || 0;
      window.scrollTo({ top: 150, behavior: "auto" });

      if (overlayRef.current) {
        overlayRef.current.scrollTop = 0;
      }
    } else if (wasOpen && !isOpen) {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "auto",
      });
    }

    previousExpandedSlide.current = expandedSlide;
  }, [expandedSlide]);

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

  return (
    <>
      {/* Mobile: Simple vertical stack */}
      <div className="space-y-8 pb-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1400px"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-2 text-white z-10">
                <div className="bg-gradient-to-b from-[#232329] to-[#2D2A44] w-full rounded-2xl p-6 shadow-[0_10px_20px_rgba(0,174,255,0.6)]">
                  <div className="flex justify-between items-start mb-2 gap-1">
                    <h3 className="font-heading text-3xl font-bold">
                      {card.title}
                    </h3>
                    <span className="text-3xl font-extrabold text-transparent text-outline">
                      {card.num}
                    </span>
                  </div>
                  <p className="font-semibold text-base text-white/60 mb-4">
                    {card.tagline}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setExpandedSlide(card.id)}
                    className="w-fit font-semibold"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expandedSlide !== null && (
          <motion.div
            key={expandedSlide}
            ref={overlayRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              mass: 0.8,
            }}
            className="fixed inset-0 bg-[#1c1c22] z-50"
            style={{
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {(() => {
              const card = cards.find((c) => c.id === expandedSlide);
              if (!card) return null;

              return (
                <div className="min-h-[150vh] p-8 pt-20 pb-12">
                  <div className="max-w-4xl mx-auto flex justify-end w-full mb-8">
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
                    <p className="text-xl text-accent mb-8">{card.tagline}</p>

                    {card.galleryImages && card.galleryImages.length > 0 && (
                      <div className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {card.galleryImages[0] && (
                            <div className="md:col-span-2 relative h-96 rounded-xl overflow-hidden bg-white/5">
                              <Image
                                src={card.galleryImages[0]}
                                alt={`${card.title} screenshot 1`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                              />
                            </div>
                          )}

                          {card.galleryImages.slice(1).map((imgSrc, idx) => (
                            <div
                              key={idx + 1}
                              className="relative h-64 rounded-xl overflow-hidden bg-white/5"
                            >
                              <Image
                                src={imgSrc}
                                alt={`${card.title} screenshot ${idx + 2}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-3">About</h3>
                      <p className="text-white/80 leading-relaxed">
                        {card.description}
                      </p>
                      {card.notes && (
                        <p className="text-white/80 leading-relaxed">
                          {card.notes}
                        </p>
                      )}
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-3">
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
                      <h3 className="text-lg font-bold mb-3">Technologies</h3>
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsMobile;
