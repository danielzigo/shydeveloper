"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 150, y: 400 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if device is mobile/touch
    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(hasTouch);
    };

    checkMobile();

    // Set initial position to left of viewport
    setMousePosition({
      x: window.innerWidth / 4,
      y: window.innerHeight / 2,
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* 
        Add dark background to header/footer via global style

        [add reference to above note here]
      */}
      <style jsx global>{`
        header {
          background-color: #111827 !important;
        }
        footer {
          background-color: #111827 !important;
        }
      `}</style>

      <div className="relative w-screen h-[80vh] md:h-[60vh] bg-gray-900 text-white overflow-hidden">
        {/* Main content - hidden by default, revealed by spotlight */}
        <div className="absolute inset-0 container mx-auto flex flex-col items-center justify-center z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-4">
            I think we're lost
          </h1>
          <p className="text-lg font-game mb-4">[ Page not found ]</p>
          <p className="text-xl mb-8">Let's just go home, shall we?</p>
          <Link href="/">
            <Button
              variant="default"
              size="lg"
            >
              Go Home
            </Button>
          </Link>
        </div>

        {/* Overlay with spotlight effect - only on desktop */}
        {!isMobile && (
          <div
            className="fixed inset-0 z-20 pointer-events-none"
            style={{
              maskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, transparent 50px, black 200px)`,
              WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, transparent 50px, black 200px)`,
              backgroundColor: "black",
            }}
          />
        )}
      </div>
    </>
  );
};

export default NotFound;