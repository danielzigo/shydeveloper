import React from "react";
import { motion, useScroll } from "framer-motion";

const LiIcon = ({ reference }: { reference: React.RefObject<HTMLElement> }) => {
  // const ref = useRef(null);
  const { scrollYProgress } = useScroll(
    {
      target: reference,
      offset: ["0.1 1", "0 0.5"],
    }
  );

  return (
    <figure className="absolute -left-6 sm:left-0 stroke-[#A1A1A1]">
      <svg className="-rotate-90" width={75} height={75} viewBox="0 0 100 100">
        {/*
          cx, cy determines the position of the circle (in the SVG)
          r determines the radius of the circle
        */}
        {/* static circle */}
        <circle
          cx={75}
          cy={50}
          r={20}
          className="stroke-[#A1A1A1] stroke-1 fill-none"
        />
        {/* animated circle */}
        <motion.circle
          cx={75}
          cy={50}
          r={20}
          className="stroke-[5px] fill-primary"
          style={{ pathLength: scrollYProgress }}
        />
        {/* filled circle */}
        <circle cx={75} cy={50} r={10} className="stroke-1 fill-accent-hover" />
      </svg>
    </figure>
  );
};

export default LiIcon;
