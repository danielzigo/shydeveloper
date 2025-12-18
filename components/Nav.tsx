"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  // {
  //   name: "Services",
  //   path: "/services",
  // },
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
  console.log(pathname);
  
  return (
    <nav>
      <ul className="flex gap-8">
        {navLinks.map((link, index) => (
          <li key={index}>
            {/* move this to AnimatedLink.tsx */}
            <Link
              href={link.path}
              className={`${
                link.path === pathname && "text-link"
              } capitalize font-medium hover:text-link focus:text-link gradient-underline`}
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
