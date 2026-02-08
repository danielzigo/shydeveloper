import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react";

interface AnimatedLinkProps {
	href: string;
	children: React.ReactNode;
}

const AnimatedLink = ({ href, children }: AnimatedLinkProps) => {
	return (
		<Link href={href} passHref>
			<motion.span
				className="relative inline-block cursor-pointer text-white"
				initial="rest"
				whileHover="hover"
				whileFocus="hover"
				animate="rest"
				tabIndex={0}
			>
				{children}
				<motion.span
					className="absolute bottom-0 left-0 h-[2px] w-full bg-link"
					variants={{
						rest: { width: 0, left: 0 },
						hover: { width: "100%", left: 0 },
						exit: { width: 0, right: "100%" },
					}}
					transition={{ duration: 0.5, ease: "easeInOut" }}
				/>
			</motion.span>
		</Link>
	);
};

export default AnimatedLink;
