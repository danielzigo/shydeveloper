import { motion } from "framer-motion";

const StaggeredSquares = () => {
	return (
		<div className="relative flex h-48 items-center justify-center space-x-6">
			{" "}
			{/* space-x-6 for gap between squares */}
			{/* Large Square */}
			<motion.div
				className="h-24 w-24 bg-accent"
				style={{ transform: "rotate(45deg)" }} // Side view effect
				initial={{ x: -50, y: 0 }}
				animate={{ x: 0, y: 0 }}
				transition={{ duration: 1 }}
			/>
			{/* Small Square */}
			<motion.div
				className="bg-accent-light h-16 w-16"
				style={{ transform: "rotate(45deg)" }} // Side view effect
				initial={{ x: 50, y: 0 }}
				animate={{ x: 0, y: 0 }}
				transition={{ duration: 1, delay: 0.3 }}
			/>
		</div>
	);
};

export default StaggeredSquares;
