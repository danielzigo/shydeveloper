import { motion } from "framer-motion";

const GridExpansion = () => {
	const shapes = ["square", "circle", "triangle"];

	return (
		<div className="grid grid-cols-3 gap-4">
			{shapes.map((shape) => (
				<motion.div
					key={shape}
					className={`${
						shape === "square"
							? "h-16 w-16"
							: shape === "circle"
								? "h-16 w-16 rounded-full"
								: "border-b-16 h-0 w-0 border-l-8 border-r-8 border-transparent border-b-blue-500"
					} bg-accent`}
					whileHover={{ scale: 1.2, opacity: 0.8 }}
					transition={{ duration: 0.3 }}
				/>
			))}
		</div>
	);
};

export default GridExpansion;
