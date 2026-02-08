"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import * as React from "react";
import AnimatedCloseButton from "@/components/AnimatedCloseButton";
import { cn } from "@/lib/utils";

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
			`fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`,
			className,
		)}
		{...props}
		ref={ref}
	/>
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
	`fixed z-50 gap-4 py-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out 
	data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:bg-slate-950`,
	{
		variants: {
			side: {
				top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
				bottom:
					"inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
				left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
				right:
					"inset-y-0 right-0 h-full w-full data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-md",
			},
		},
		defaultVariants: {
			side: "right",
		},
	},
);

interface SheetContentProps
	extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
		VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
	({ side = "right", className, children, ...props }, ref) => {
		const { theme } = useTheme();
		const [isOpen, setIsOpen] = React.useState(false);
		const [shouldClose, setShouldClose] = React.useState(false);
		const closeButtonRef = React.useRef<HTMLButtonElement>(null);
		const [isClosing, setIsClosing] = React.useState(false);

		const gradients =
			theme === "light"
				? {
						closed: "linear-gradient(to bottom, #6c6c83, #6c6c83)", // lighter version of #1c1c22
						open: "linear-gradient(to bottom, #35353e, #655e99)", // lighter shades of the dark open colours
					}
				: {
						closed: "linear-gradient(to bottom, #1C1C22, #1C1C22)",
						open: "linear-gradient(to bottom, #232329, #2D2A44)",
					};

		const startClose = () => {
			setIsClosing(true);
			setShouldClose(true);
		};

		// Handle delayed close
		React.useEffect(() => {
			if (shouldClose && closeButtonRef.current) {
				const timer = setTimeout(() => {
					closeButtonRef.current?.click();
					setShouldClose(false);
					setIsClosing(false);
				}, 200); // 200ms delay to see the animation

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
						className="fixed inset-y-0 right-0 -z-10 w-full sm:max-w-md"
						initial={{
							background: gradients.closed,
						}}
						animate={{
							background: isOpen ? gradients.open : gradients.closed,
						}}
						transition={{
							duration: 0.5,
							ease: "easeInOut",
							delay: isOpen ? 0.3 : 0, // Delay the color change slightly when opening
						}}
					/>
					{children}
					{/* biome-ignore lint/a11y/useSemanticElements: custom interactive element */}
					<div
						className="absolute right-14 top-14 cursor-pointer outline-none transition-opacity"
						onClick={startClose}
						role="button"
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								startClose();
							}
						}}
					>
						<AnimatedCloseButton active={isClosing} />
						<span className="sr-only">Close</span>
					</div>
					{/* Hidden actual close button */}
					<SheetPrimitive.Close ref={closeButtonRef} className="hidden" />
				</SheetPrimitive.Content>
			</SheetPortal>
		);
	},
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Title
		ref={ref}
		className={cn("text-lg font-semibold text-slate-950 dark:text-slate-50", className)}
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
