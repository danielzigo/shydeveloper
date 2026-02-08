"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

const Nav = () => {
	const pathname = usePathname();

	return (
		<nav>
			<ul className="flex gap-8">
				{navLinks.map((link) => (
					<li key={link.name.toLowerCase()}>
						{/* move this to AnimatedLink.tsx */}
						<Link
							href={link.path}
							className={`${
								link.path === pathname && "text-link"
							} gradient-underline font-medium capitalize hover:text-link focus:text-link`}
						>
							{link.name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Nav;
