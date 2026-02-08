"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Photo = ({ source, alt }: { source: string; alt: string }) => {
	const { theme, systemTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Check if the theme is mounted
	useEffect(() => {
		setMounted(true);
	}, []);

	// Determine current theme
	const currentTheme = theme === "system" ? systemTheme : theme;
	const isDark = mounted && currentTheme === "dark";

	// Different gradient opacities for light/dark mode
	const maskGradient = isDark
		? "radial-gradient(circle, rgba(255,255,255,1) 55%, rgba(255,255,255,0) 75%)"
		: "radial-gradient(circle, rgba(255,255,255,1) 55%, rgba(255,255,255,0) 80%)";

	return (
		<div className="relative flex w-full flex-col items-center justify-center gap-4 xl:items-start">
			<Image
				src={source}
				alt={alt}
				height={200}
				width={200}
				className="mask-blend relative mx-auto h-40 w-40 overflow-hidden rounded-full xl:mx-0 xl:h-[200px] xl:w-[200px]"
				quality={100}
				priority
				style={{
					maskImage: maskGradient,
					WebkitMaskImage: maskGradient,
					boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // subtle shadow for better blending
				}}
			/>
		</div>
	);
};

export default Photo;
