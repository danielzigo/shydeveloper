import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const ShineLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    // <Link href={href} className="shine-link bottomhalf flex items-center group transition-colors duration-300">
    //   {children}
    //   <div className="ml-2 pr-1 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:opacity-100 opacity-80">
    //     <BsArrowRight className="text-2xl " />
    //   </div>
    // </Link>
    <Link href={href} className="group rounded-full focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
      <Button
        variant="outline"
        size="lg"
        className="shine-link bottomhalf flex items-center gap-2 group-focus:bg-accent group-focus:text-primary text-wrap lg:text-nowrap py-8 lg:py-0" // uppercase
      >
        {children}
        <BsArrowRight className="hidden sm:block text-xl" />
      </Button>
    </Link>
  );
};

export default ShineLink;
