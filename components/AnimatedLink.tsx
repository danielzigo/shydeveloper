import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
}

const AnimatedLink = ({ href, children }: AnimatedLinkProps) => {
  return (
    <Link href={href} passHref>
      <motion.span
        className="relative inline-block text-white cursor-pointer"
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        animate="rest"
        tabIndex={0}
      >
        {children}
        <motion.span
          className="absolute left-0 bottom-0 h-[2px] bg-link w-full"
          variants={{
            rest: { width: 0, left: 0 },
            hover: { width: "100%", left: 0 },
            exit: { width: 0, right: "100%" },
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </motion.span>
    </Link>
  )
}

export default AnimatedLink