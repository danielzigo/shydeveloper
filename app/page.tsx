"use client";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

import AnimatedText from "@/components/AnimatedText";
import FloatingShapes from "@/components/FloatingShapes";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import Services from "@/components/Services";
import { BsArrowDownCircle } from "react-icons/bs";

const AnimatedSphere = dynamic(() => import("@/components/AnimatedSphere"), {
  ssr: false,
});

const CTASection = dynamic(() => import("@/components/CTASection"), {
  ssr: false,
});

const Home = () => {
  const handleScrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-full">
      <div className="container mx-auto h-full mb-6 mt-12 xl:mt-0">
        <div className="flex flex-col xl:flex-row items-center xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left z-10">
            <AnimatedText text="Hello, let's build something together" />

            <p className="info xl:max-w-[500px] mb-9 text-white text-lg">
              I build websites and web tools - the kind of straightforward,
              functional, aesthetic solutions you actually need.
            </p>

            <div className="flex justify-center xl:justify-start">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 font-semibold"
                onClick={handleScrollToServices}
              >
                <span>See how I can help</span>
                <BsArrowDownCircle className="text-xl" />
              </Button>
            </div>
          </div>

          {/* animated sphere and floating shapes */}
          <div className="relative w-full h-[300px] xl:h-[500px]">
            <AnimatedSphere />
            <FloatingShapes />
          </div>
        </div>
      </div>

      {/* <Stats /> */}
      <ProjectsCarousel />
      <Services />
      <CTASection />
    </section>
  );
};

export default Home;
