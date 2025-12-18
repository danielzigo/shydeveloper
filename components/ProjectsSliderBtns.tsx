"use client";

import React from "react";
import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

interface ProjectsSliderBtnsProps {
  containerStyles: string;
  btnStyles: string;
  iconStyles: string;
}

const ProjectsSliderBtns = ({
  containerStyles,
  btnStyles,
  iconStyles,
}: ProjectsSliderBtnsProps) => {
  const swiper = useSwiper();

  return (
    <div className={containerStyles}>
      <button onClick={() => swiper.slidePrev()} className={btnStyles}>
        <PiCaretLeftBold className={iconStyles} />
      </button>
      <button onClick={() => swiper.slideNext()} className={btnStyles}>
        <PiCaretRightBold className={iconStyles} />
      </button>
    </div>
  );
};

export default ProjectsSliderBtns