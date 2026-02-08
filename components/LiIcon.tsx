import { motion, useScroll } from "framer-motion";
import type React from "react";
import { useId } from "react";

const LiIcon = ({ reference }: { reference: React.RefObject<HTMLElement> }) => {
	const titleId = useId();
	const { scrollYProgress } = useScroll({
		target: reference,
		offset: ["0.1 1", "0 0.5"],
	});

	return (
		<figure className="absolute -left-6 stroke-[#A1A1A1] sm:left-0">
			<svg
				className="-rotate-90"
				width={75}
				height={75}
				viewBox="0 0 100 100"
				role="img"
				aria-labelledby={titleId}
				focusable="false"
			>
				<title id={titleId}>Timeline marker</title>
				{/*
          cx, cy determines the position of the circle (in the SVG)
          r determines the radius of the circle
        */}
				{/* static circle */}
				<circle cx={75} cy={50} r={20} className="fill-none stroke-[#A1A1A1] stroke-1" />
				{/* animated circle */}
				<motion.circle
					cx={75}
					cy={50}
					r={20}
					className="fill-primary stroke-[5px]"
					style={{ pathLength: scrollYProgress }}
				/>
				{/* filled circle */}
				<circle cx={75} cy={50} r={10} className="fill-accent-dark stroke-1 dark:fill-accent-hover" />
			</svg>
		</figure>
	);
};

export default LiIcon;
