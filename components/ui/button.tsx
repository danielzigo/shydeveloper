import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold ring-offset-white transition-all duration-300",
	{
		variants: {
			variant: {
				default: "bg-accent text-primary hover:bg-accent-hover focus:bg-accent-hover",
				primary:
					"bg-[#1c1c22] text-white border border-transparent hover:bg-white focus:bg-white focus:text-[#1c1c22] hover:text-[#1c1c22] ",
				orange:
					"bg-orange-400 text-primary border border-transparent hover:bg-accent-hover hover:text-primary focus:bg-accent-hover focus:text-primary",
				outline:
					"border border-[#7f3bf2] dark:border-accent bg-transparent text-[#7f3bf2] hover:text-primary hover:bg-[#7f3bf2] focus:bg-[#7f3bf2] focus:text-primary focus:bg-[#7f3bf2] dark:text-accent dark:hover:bg-accent dark:hover:text-primary dark:focus:bg-accent dark:focus:text-primary focus:text-primary",
				outlineTeal:
					"border border-accent bg-transparent text-accent hover:bg-accent hover:text-primary focus:bg-accent focus:text-primary",
			},
			size: {
				default: "h-[44px] px-6",
				md: "h-[48px] px-6",
				lg: "h-[52px] px-6 text-sm uppercase tracking-[2px]",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
