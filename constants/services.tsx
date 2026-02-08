/**
 * Services data
 *
 * This file contains the content for the services cards displayed
 * on the Services section of the homepage.
 */

import { BsGrid1X2, BsSpeedometer } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa";
import type { Service } from "@/types/services";

export const SERVICES_DATA: Service[] = [
	{
		id: 1,
		title: "Website Development",
		description:
			"I build websites for individuals, small businesses, and charities - whether you're starting fresh or replacing an old site. Built so you can update them yourself, or have me handle it for you.",
		icon: <FaLaptopCode />,
	},
	{
		id: 2,
		title: "Custom Web Applications",
		description:
			"I build custom web tools and applications tailored to specific problems. If you need something built to solve a unique challenge, let's talk about it.",
		icon: <BsGrid1X2 />,
	},
	{
		id: 3,
		title: "Ongoing Support & Maintenance",
		description:
			"I offer ongoing support and maintenance for the sites and apps I build - if you need help with updates, fixes, or improvements down the line, I'm here to keep things running smoothly.",
		icon: <BsSpeedometer />,
	},
];
