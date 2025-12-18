import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ContentLinkProps {
  link: {
    name: string
    path: string
  }
}

const linkVariants = {
  default: { x: 0, opacity: 1 }, // Underline is visible and in its default position
  hover: { x: "50%", opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }, // When hovered, it moves and fades out
};

const ContentLink = ({ link }: ContentLinkProps) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <Link href={link.path}>
      <motion.span
        className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
        initial="default"
        animate={hoveredLink === link.name ? "hover" : "default"} // Only animate the hovered link
        variants={linkVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </Link>
  );
};

export default ContentLink