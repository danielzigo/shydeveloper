"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useNotFound } from "@/app/contexts/NotFoundContext";
import AnimatedMenuButton from "@/components/AnimatedMenuButton";
import Social from "@/components/Social";
import ThemeToggle from "@/components/ThemeToggle";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import logoImage2 from "@/public/assets/shydeveloper-logo-img2.svg";

const navLinks = [
	{
		name: "Home",
		path: "/",
	},
	{
		name: "Projects",
		path: "/projects",
	},
	{
		name: "About",
		path: "/about",
	},
	{
		name: "Contact",
		path: "/contact",
	},
];

const MobileNav = () => {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const [isMenuButtonFocused, setIsMenuButtonFocused] = useState(false);

	const [shouldOpen, setShouldOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);

	// Track 404 state via context to conditionally hide theme toggle
	const { isNotFound } = useNotFound();
	const shouldHideToggle = isNotFound;

	// Container animation for staggering children
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3, // Start after sheet slides in
				staggerChildren: 0.1, // Delay between each item
			},
		},
	};

	// Individual menu item animation
	const itemVariants = {
		hidden: {
			opacity: 0,
			x: 40, // Start 40px to the right
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.4,
				ease: "easeOut",
			},
		},
	};

	// Logo animation (slightly different timing)
	const logoVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
		},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delay: 0.2,
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	// Handle delayed open
	useEffect(() => {
		if (shouldOpen && triggerRef.current) {
			const timer = setTimeout(() => {
				setIsOpen(true);
				setShouldOpen(false);
			}, 250); // 250ms delay to see the animation

			return () => clearTimeout(timer);
		}
	}, [shouldOpen]);

	return (
		<Sheet onOpenChange={setIsOpen} open={isOpen}>
			<SheetTrigger
				ref={triggerRef}
				className="flex items-center justify-center"
				onFocus={() => setIsMenuButtonFocused(true)}
				onBlur={() => setIsMenuButtonFocused(false)}
				onClick={(e) => {
					e.preventDefault();
					setShouldOpen(true);
				}}
			>
				<AnimatedMenuButton isActive={isMenuButtonFocused} />
			</SheetTrigger>
			<SheetContent className="flex min-h-full flex-col overflow-y-auto">
				<SheetTitle>
					<VisuallyHidden>Mobile navigation menu</VisuallyHidden>
				</SheetTitle>
				<SheetDescription>
					<VisuallyHidden>This is the mobile navigation menu.</VisuallyHidden>
				</SheetDescription>

				<motion.div
					className="mb-16 mt-20 text-center text-2xl"
					variants={logoVariants}
					initial="hidden"
					animate={isOpen ? "visible" : "hidden"}
				>
					<SheetClose asChild>
						<Link href="/" className="inline-block">
							<div className="flex items-center justify-center gap-1">
								<Image src={logoImage2} width={85} height={85} alt="ShyDeveloper Logo" />
							</div>
						</Link>
					</SheetClose>
				</motion.div>

				{/* nav links */}
				<motion.nav
					className="mb-16 flex flex-col items-center justify-center gap-6"
					variants={containerVariants}
					initial="hidden"
					animate={isOpen ? "visible" : "hidden"}
				>
					{navLinks.map((link) => (
						<motion.div key={link.name.toLowerCase()} variants={itemVariants}>
							<SheetClose asChild key={link.name.toLowerCase()}>
								<Link
									href={link.path}
									className={`${
										link.path === pathname &&
										"border-b-2 border-[#09deff] text-[#09deff] dark:border-accent dark:text-accent"
									} text-lg font-medium capitalize transition-all hover:text-[#09deff] dark:hover:text-accent`}
								>
									{link.name}
								</Link>
							</SheetClose>
						</motion.div>
					))}
				</motion.nav>

				<div className="mb-6 flex flex-grow items-end justify-center sm:mb-0 sm:flex-none">
					<div className="flex flex-col items-center justify-center gap-6">
						{!shouldHideToggle && <ThemeToggle />}

						<Social
							containerStyles="footer-socials flex gap-4"
							iconStyles="w-14 h-14 text-3xl rounded-full flex items-center justify-center text-base bg-white/5 hover:border-primary focus:border-primary hover:text-[#09deff] focus:text-[#09deff] dark:hover:text-link dark:focus:text-link hover:transition-all duration-500"
							showTooltips={false}
						/>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
