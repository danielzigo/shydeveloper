import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const ShineLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
	return (
		<Link
			href={href}
			className="group rounded-full focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
		>
			<Button
				variant="outlineTeal"
				size="lg"
				className="shine-link bottomhalf flex items-center gap-2 text-wrap py-8 group-focus:bg-accent group-focus:text-primary lg:text-nowrap lg:py-0" // uppercase
			>
				{children}
				<BsArrowRight className="hidden text-xl sm:block" />
			</Button>
		</Link>
	);
};

export default ShineLink;
