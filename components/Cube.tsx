import { motion, useScroll, useTransform } from "framer-motion";

const Cube = () => {
	const { scrollYProgress } = useScroll(); // Hook to detect scroll progress
	const y = useTransform(scrollYProgress, [0, 1], [50, -50]); // Map scroll progress to translateY movement

	return (
		<motion.div
			className="scene relative"
			style={{ y }} // Apply the animated y value for smooth scroll effect
		>
			<div className="cube relative h-24 w-24">
				<div className="face front absolute h-full w-full border border-primary bg-transparent"></div>
				<div className="face back absolute h-full w-full border border-primary bg-transparent"></div>
				<div className="face left absolute h-full w-full border border-primary bg-transparent"></div>
				<div className="face right absolute h-full w-full border border-primary bg-transparent"></div>
				<div className="face top absolute h-full w-full border border-primary bg-transparent"></div>
				<div className="face bottom absolute h-full w-full border border-primary bg-transparent"></div>
			</div>
		</motion.div>
	);
};

export default Cube;
