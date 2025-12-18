"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BsArrowUpCircle } from "react-icons/bs";

// The component for the Back-to-Top button
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Toggle visibility of the button based on scroll position
  const toggleVisibility = () => {
    const scrolledFromTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    // Show when scrolled more than 300px from the top
    if (scrolledFromTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Check if near the footer (adjust the offset as needed)
    if (scrolledFromTop + windowHeight >= fullHeight - 100) {
      setIsAtFooter(true); // Hide button near the footer
    } else {
      setIsAtFooter(false); // Show button if not near the footer
    }
  };

  // Smooth scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // NEW: Watch for changes to body classList
  useEffect(() => {
    const checkOverlay = () => {
      setIsOverlayOpen(document.body.classList.contains("overlay-open"));
    };

    // Check initially
    checkOverlay();

    // Create a MutationObserver to watch for class changes on body
    const observer = new MutationObserver(checkOverlay);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="fixed bottom-16 md:bottom-12 xl:bottom-8 right-4 xl:right-2 z-30"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible && !isAtFooter && !isOverlayOpen ? 1 : 0,
        scale: isVisible && !isAtFooter && !isOverlayOpen ? 1 : 0.5,
      }}
      transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.4 } }} // Fade out and scale smoothly
      style={{ pointerEvents: isOverlayOpen ? "none" : "auto" }} // NEW: prevent clicks when hidden
    >
      <motion.button
        className="p-2 text-link bg-primary rounded-full shadow-lg hover:bg-link hover:text-primary transition-all"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <BsArrowUpCircle size={36} />
      </motion.button>
    </motion.div>
  );
};

export default BackToTop;
