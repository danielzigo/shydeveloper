"use client";

import React from "react";
import { motion } from "framer-motion";

// Status configuration - change the active status here
const ACTIVE_STATUS = "available" as const; // Change this to: 'available', 'limited', or 'busy'

const AVAILABILITY_STATUS: Record<
  string,
  { icon: string; text: string; subtext: string; colorClass: string }
> = {
  available: {
    icon: "🟢",
    text: "Available for new projects",
    subtext: "Let's build something together",
    colorClass: "border-green-500/30",
  },
  limited: {
    icon: "🟡",
    text: "Limited availability",
    subtext: "Reach out anyway - I'd love to hear about your project",
    colorClass: "border-yellow-500/30",
  },
  busy: {
    icon: "🟠",
    text: "Currently working with clients",
    subtext: "Enquiries welcome - I'll get back to you soon",
    colorClass: "border-orange-500/30",
  },
};

interface AvailabilityStatusProps {
  layout?: "centred" | "inline" | "bar";
}

const AvailabilityStatus: React.FC<AvailabilityStatusProps> = ({
  layout = "centred",
}) => {
  const currentStatus = AVAILABILITY_STATUS[ACTIVE_STATUS];

  if (layout === "centred") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }} // to show after the email card appears
        className="max-w-2xl mx-auto mt-12"
      >
        <div className="text-center">
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full 
            bg-gray-800/50 border ${currentStatus.colorClass} backdrop-blur-sm`}
          >
            <span className="text-2xl">{currentStatus.icon}</span>
            <div className="text-left">
              <p className="font-semibold text-white/80 text-sm md:text-base">{currentStatus.text}</p>
              <p className="text-sm text-white/60">{currentStatus.subtext}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (layout === "inline") {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ duration: 0.4 }}
        className="pt-6 mt-6 border-t border-gray-700"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{currentStatus.icon}</span>
          <div>
            <p className="font-semibold text-white/80 text-sm">
              {currentStatus.text}
            </p>
            <p className="text-xs text-white/60 tracking-wide">{currentStatus.subtext}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (layout === "bar") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-2xl mx-auto mt-12"
      >
        <div
          className={`flex items-center justify-center gap-4 py-4 px-6 rounded-lg 
          bg-gradient-to-r from-gray-800/50 to-gray-900/50 border ${currentStatus.colorClass}
          hover:border-opacity-50 transition-all duration-300`}
        >
          <span className="text-2xl">{currentStatus.icon}</span>
          <div className="text-center">
            <p className="font-semibold text-white">{currentStatus.text}</p>
            <p className="text-sm text-gray-400">{currentStatus.subtext}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
};

export default AvailabilityStatus;
