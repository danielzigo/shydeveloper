"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoText from "@/components/LogoText";
import Social from "@/components/Social";
import logoImage2 from "@/public/assets/shydeveloper-logo-img2.svg";

const FOOTER_NAV_LINKS = [
	{
		id: 1,
		name: "Home",
		path: "/",
	},
	{
		id: 2,
		name: "Projects",
		path: "/projects",
	},
	{
		id: 3,
		name: "About",
		path: "/about",
	},
	{
		id: 4,
		name: "Contact",
		path: "/contact",
	},
] as const;

const currentYear = new Date().getFullYear();

const Footer = () => {
	const pathname = usePathname();

	return (
		<footer className="footer dark border-t border-white/10 bg-[#1c1c22] py-12">
			<div className="footer-content-wrapper container mx-auto">
				<div className="footer-content">
					<div className="footer-logo-socials mb-8 flex flex-col items-center justify-between gap-8 md:flex-row">
						<LogoText otherStyles="footer-logo" disabled={true} />

						<Social
							containerStyles="footer-socials flex gap-4"
							iconStyles={`w-14 h-14 text-3xl rounded-full border border-transparent flex items-center justify-center text-base bg-white/5 
								hover:border-[#1c1c22] focus:border-[#1c1c22] hover:dark:text-[#28bda2] hover:text-link focus:dark:text-[#28bda2] focus:text-link transition-colors duration-400`}
						/>
					</div>

					<div className="flex flex-col items-center justify-between gap-4 text-sm xl:flex-row xl:gap-0">
						<p className="flex items-center gap-1 text-center text-white/60 xl:order-1">
							&copy; {currentYear} ShyDeveloper
							<Image src={logoImage2} width={24} height={24} alt="ShyDeveloper Logo" className="inline-block" />
						</p>
						<nav className="mt-4 xl:order-2 xl:mt-0" aria-label="Footer links">
							<ul className="flex gap-4">
								{FOOTER_NAV_LINKS.map((link) => (
									<li key={link.id}>
										<Link
											href={link.path}
											className={`${
												link.path === pathname ? "text-link dark:text-[#28bda2]" : "text-white/80"
											} gradient-underline pb-2 font-medium hover:text-link focus:text-link hover:dark:text-[#28bda2] focus:dark:text-[#28bda2]`}
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
