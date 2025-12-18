"use client";

import { useState, useEffect } from "react";
import ProjectsMobile from "@/components/ProjectsMobile";
import ProjectsDesktop from "@/components/ProjectsDesktop";

export const cards = [
  {
    id: 1,
    num: "01",
    imageUrl: "/assets/work/lexverify.webp",
    title: "Lexverify",
    tagline: "Email compliance tool for Microsoft Outlook",
    description: `I built a real-time compliance checker for Microsoft Outlook at Lexverify. 
    The add-in uses machine learning to scan outgoing emails across multiple categories before they're sent, flagging issues and giving users advice on how to fix them. 
    I also developed a standalone web application as both a testing tool and customer demo. Both applications were integrated with Keycloak for authentication and authorisation.`,
    notes: `(Screenshots not shown due to client confidentiality)`,
    galleryImages: ["/assets/work/lexverify.webp"],
    details: [
      "Built an Outlook add-in that checks emails in real-time — both while composing and before sending",
      "Developed a dynamic highlighting system that flags risks directly in email content",
      "Created modular risk cards to detail risks and provide actionable steps",
      "Integrated multiple ML APIs to run parallel compliance checks across 8+ categories",
      "Designed for accessibility with WCAG 2.2 AA compliance and keyboard navigation",
    ],
    technologies: [
      "React Router 7",
      "TypeScript",
      "Office.js API",
      "Tailwind CSS",
      "Keycloak",
    ],
  },
  {
    id: 2,
    num: "02",
    imageUrl: "/assets/work/blue-cross-shots.webp",
    title: "Blue Cross",
    tagline: "Brand refresh for an animal welfare charity",
    description: `I worked on the brand refresh of the Blue Cross website during my time as an engineer at manifesto,
       a digital experience agency. My focus was on updating the site to match their new visual identity.`,
    galleryImages: [
      "/assets/work/projects/blue-cross/menu.webp",
      "/assets/work/projects/blue-cross/donation.webp",
      "/assets/work/blue-cross-shots.webp",
    ],
    details: [
      "Implemented new brand guidelines across the entire site",
      "Built reusable components for consistency and maintainability",
      "Improved accessibility standards and site performance",
      "Collaborated with designers to ensure accurate implementation",
    ],
    technologies: [
      "Drupal",
      "Vue.js",
      "Alpine.js",
      "Tailwind CSS",
      "Storybook",
    ],
  },
  {
    id: 3,
    num: "03",
    imageUrl: "/assets/work/business-west-shot.webp",
    title: "Business West",
    tagline: "Carnet security calculator for international goods transport",
    description: `I built a custom calculator for Business West while at manifesto. 
      Before this tool, there was no simple way to calculate Carnet security costs for international goods transport
      - it required complex manual calculations using multiple reference tables and charts.`,
    galleryImages: [
      "/assets/work/projects/business-west/calculator-form.webp",
      "/assets/work/business-west-shot.webp",
      "/assets/work/projects/business-west/quote.webp",
    ],
    details: [
      "Translated complex pricing tables and regulations into an automated calculation system",
      "Created an intuitive interface that simplified a previously manual process",
      "Built logic to handle global country data, percentage calculations, and edge cases",
      "Reduced calculation time to seconds",
    ],
    technologies: ["PHP", "Sass", "Drupal"],
  },
  {
    id: 4,
    num: "04",
    imageUrl: "/assets/work/oyw-shot.webp",
    title: "One Young World",
    tagline: "Frontend transformation for a global leadership platform",
    description: `I transformed the frontend of the One Young World website while working there as a developer 
      - modernising the design and making it faster, more accessible, and more user-friendly.`,
    galleryImages: ["/assets/work/oyw-shot.webp"],
    details: [
      "Led complete frontend transformation — delivering a modern, visually appealing interface",
      "Introduced component-driven development using Storybook for better maintainability",
      "Migrated to newer Drupal version and improved CMS for easier content editing",
      "Significantly improved performance, accessibility, and mobile responsiveness",
    ],
    technologies: ["Storybook", "Drupal", "jQuery", "Tailwind CSS"],
  },
  {
    id: 5,
    num: "05",
    imageUrl: "/assets/work/calculator1.webp",
    title: "Asthma + Lung UK - PEF Calculator",
    tagline: "Peak flow monitoring tool for asthma management",
    description: `I built a medical calculator for Asthma + Lung UK while at manifesto.
      The tool helps patients and healthcare providers calculate peak expiratory flow (PEF) variability 
      - an important metric for monitoring asthma severity and treatment effectiveness.`,
    galleryImages: [
      "/assets/work/projects/asthma-lung-uk/pef-page.webp",
      "/assets/work/calculator1.webp",
      "/assets/work/projects/asthma-lung-uk/calculator2.webp",
    ],
    details: [
      "Converted medical documentation and formulas into a working digital tool",
      "Built calculation logic using vanilla JavaScript within a legacy Drupal codebase",
      "Integrated custom form with Drupal webforms system",
      "Ensured accuracy by validating against sample medical calculations",
      "Delivered a simple interface aligned with the client's specifications",
    ],
    technologies: ["Drupal", "JavaScript", "Webforms", "Sass"],
  },
];

const ProjectsMainCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(hasTouch || isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {isMobile ? (
        <ProjectsMobile cards={cards} />
      ) : (
        <ProjectsDesktop cards={cards} />
      )}
    </>
  );
};

export default ProjectsMainCarousel;
