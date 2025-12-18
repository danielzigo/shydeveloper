"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";

import { IoMdClose } from "react-icons/io";

// Animated Close Button Component (item-6 style)
const AnimatedCloseButton = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Animate width only - segments shrink towards corners
  const segmentVariants = {
    initial: { width: "53%" },
    retracted: {
      width: "5px",
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const labelVariants = {
    initial: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <div
      className="relative w-[38px] h-[38px] cursor-pointer flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label="Close"
    >
      {/* Top-left segment (button:before equivalent) */}
      <motion.div
        className="absolute h-0.5 bg-accent"
        style={{
          left: "5px",
          top: "4px",
          transformOrigin: "left",
          rotate: "45deg",
        }}
        variants={segmentVariants}
        initial="initial"
        animate={isHovered ? "retracted" : "initial"}
      />

      {/* Top-right segment (button:after equivalent) */}
      <motion.div
        className="absolute h-0.5 bg-accent"
        style={{
          right: "5px",
          top: "4px",
          transformOrigin: "right",
          rotate: "-45deg",
        }}
        variants={segmentVariants}
        initial="initial"
        animate={isHovered ? "retracted" : "initial"}
      />

      {/* Inner wrapper for bottom segments and label */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Bottom-right segment (inner:before equivalent) */}
        <motion.div
          className="absolute h-0.5 bg-accent"
          style={{
            right: "5px",
            bottom: "4px",
            transformOrigin: "right",
            rotate: "45deg",
          }}
          variants={segmentVariants}
          initial="initial"
          animate={isHovered ? "retracted" : "initial"}
        />

        {/* Bottom-left segment (inner:after equivalent) */}
        <motion.div
          className="absolute h-0.5 bg-accent"
          style={{
            left: "5px",
            bottom: "4px",
            transformOrigin: "left",
            rotate: "-45deg",
          }}
          variants={segmentVariants}
          initial="initial"
          animate={isHovered ? "retracted" : "initial"}
        />

        {/* Close label */}
        <motion.span
          className="text-accent text-[12.5px] font-semibold z-10"
          variants={labelVariants}
          initial="initial"
          animate={isHovered ? "visible" : "initial"}
        >
          Close
        </motion.span>
      </div>
    </div>
  );
};

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

// it would be nice to transition or animate the background color of the sheet
// from bg-primary to bg-gradient-to-b from-[#232329] to-[#2D2A44] when the sheet is fully open
const sheetVariants = cva(
  "fixed z-50 gap-4 py-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:bg-slate-950",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        // right previously was: w-3/4 sm:max-w-sm
        right:
          "inset-y-0 right-0 h-full w-full data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-md",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [shouldClose, setShouldClose] = React.useState(false);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  // Handle delayed close
  React.useEffect(() => {
    if (shouldClose && closeButtonRef.current) {
      const timer = setTimeout(() => {
        closeButtonRef.current?.click();
        setShouldClose(false);
      }, 250); // 250ms delay to see the animation

      return () => clearTimeout(timer);
    }
  }, [shouldClose]);

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        onAnimationStart={(e) => {
          // Detect when the sheet starts opening
          if (e.currentTarget.getAttribute("data-state") === "open") {
            setIsOpen(true);
          }
        }}
        onAnimationEnd={(e) => {
          // Detect when the sheet finishes closing
          if (e.currentTarget.getAttribute("data-state") === "closed") {
            setIsOpen(false);
          }
        }}
        {...props}
      >
        {/* Animated background layer */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-inherit"
          initial={{
            background: "linear-gradient(to bottom, #1C1C22, #1C1C22)",
          }}
          animate={{
            background: isOpen
              ? "linear-gradient(to bottom, #232329, #2D2A44)"
              : "linear-gradient(to bottom, #1C1C22, #1C1C22)",
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            delay: isOpen ? 0.3 : 0, // Delay the color change slightly when opening
          }}
        />
        {children}
        <div
          className="absolute right-14 top-14 transition-opacity outline-none cursor-pointer"
          onClick={() => setShouldClose(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setShouldClose(true);
            }
          }}
        >
          <AnimatedCloseButton />
          <span className="sr-only">Close</span>
        </div>
        {/* Hidden actual close button */}
        <SheetPrimitive.Close ref={closeButtonRef} className="hidden" />
      </SheetPrimitive.Content>
    </SheetPortal>
  );
});
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold text-slate-950 dark:text-slate-50",
      className
    )}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
