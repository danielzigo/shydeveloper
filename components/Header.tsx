"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

// Context
import { useNotFound } from "@/app/contexts/NotFoundContext";

// Components
import LogoText from "@/components/LogoText";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import ThemeToggle from "@/components/ThemeToggle";

// Logo images
import logoImage from "@/public/assets/shydeveloper-logo-img1.svg";
import logoImage2 from "@/public/assets/shydeveloper-logo-img2.svg";

const Header = () => {
	const isTinyScreen = useMediaQuery({ query: "(max-width: 320px)" });
	const [isHovered, setIsHovered] = useState(false);
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	// Track 404 state via context to conditionally hide theme toggle
	const { isNotFound } = useNotFound();
	const shouldHideToggle = isNotFound;

	useEffect(() => {
		type NavigatorWithMsMaxTouchPoints = Navigator & {
			msMaxTouchPoints?: number;
		};

		const hasTouch =
			"ontouchstart" in window ||
			navigator.maxTouchPoints > 0 ||
			((navigator as NavigatorWithMsMaxTouchPoints).msMaxTouchPoints ?? 0) > 0;

		setIsTouchDevice(hasTouch);
	}, []);

	const handleFocus = () => {
		setIsHovered(true);
	};

	const handleBlur = () => {
		setIsHovered(false);
	};

	return (
		<header className="bg-gradient-to-b from-[rgb(227,227,227)] from-5% to-[#f6f5f6] py-8 text-foreground dark:from-inherit dark:to-inherit dark:text-white xl:py-12">
			<div className="container mx-auto flex items-center justify-between">
				{/* Logo */}
				<Link
					href="/"
					className=""
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onFocus={handleFocus}
					onBlur={handleBlur}
				>
					{/* 
            on mobile/tablet, use the coloured logo image
            on desktop, use the greyscale logo image because you will switch to the coloured logo image on hover
          */}
					<div className="flex items-center gap-1">
						<Image
							src={isTouchDevice ? logoImage2 : isHovered ? logoImage2 : logoImage}
							width={isTinyScreen ? 60 : 80}
							height={isTinyScreen ? 60 : 80}
							alt="ShyDeveloper Logo"
							className="transition-all duration-1000 ease-in-out"
						/>
						<LogoText hovered={isHovered} />
					</div>
				</Link>

				<div className="hidden items-center gap-8 xl:flex">
					<Nav />
					{/* Theme toggle - hidden on 404 page */}
					{!shouldHideToggle && <ThemeToggle />}
				</div>

				{/* Mobile Nav */}
				<div className="xl:hidden">
					<MobileNav />
				</div>
			</div>
		</header>
	);
};

export default Header;
