"use client";

import { motion } from "framer-motion";

// Constants
import { ACTIVE_STATUS, AVAILABILITY_STATUS } from "@/constants/contact";

// Animation variants
import {
	availabilityStatusBarVariant,
	availabilityStatusCentredVariant,
	availabilityStatusInlineVariant,
} from "@/lib/animations";

// Types
import type { AvailabilityStatusProps, AvailabilityStatusType } from "@/types";

const getBorderClass = (status: AvailabilityStatusType) => {
	switch (status) {
		case "available":
			return "border-green-500 dark:border-green-500/30";
		case "limited":
			return "border-yellow-500 dark:border-yellow-500/30";
		case "busy":
			return "border-orange-500 dark:border-orange-500/30";
		default:
			return "border-green-500 dark:border-green-500/30";
	}
};

const getBgClass = (status: AvailabilityStatusType) => {
	switch (status) {
		case "available":
			return "bg-green-50";
		case "limited":
			return "bg-yellow-50";
		case "busy":
			return "bg-orange-50";
		default:
			return "bg-green-50";
	}
};

const getGradientClass = (status: AvailabilityStatusType) => {
	switch (status) {
		case "available":
			return "from-green-50/50 to-green-100/50";
		case "limited":
			return "from-yellow-50/50 to-yellow-100/50";
		case "busy":
			return "from-orange-50/50 to-orange-100/50";
		default:
			return "from-green-50/50 to-green-100/50";
	}
};

// Container classes
const centredContainerClasses = `inline-flex items-center gap-3 rounded-full px-6 py-3 ${getBgClass(ACTIVE_STATUS)}
 border dark:bg-gray-800/50 ${getBorderClass(ACTIVE_STATUS)} backdrop-blur-sm`;

const inlineContainerClasses = `flex items-center gap-3`;

const barContainerClasses = `flex items-center justify-center gap-4 rounded-lg border border-opacity-50 bg-gradient-to-r 
dark:border-opacity-100 ${getGradientClass(ACTIVE_STATUS)} px-6 py-4 dark:from-gray-800/50 dark:to-gray-900/50 ${getBorderClass(ACTIVE_STATUS)} 
transition-all duration-300 hover:border-opacity-30 dark:hover:border-opacity-50`;

// Availability status component
const AvailabilityStatus = ({ layout = "centred" }: AvailabilityStatusProps) => {
	const currentStatus = AVAILABILITY_STATUS[ACTIVE_STATUS];

	if (layout === "centred") {
		return (
			<motion.div
				variants={availabilityStatusCentredVariant}
				initial="initial"
				animate="animate"
				className="mx-auto mt-12 max-w-2xl"
			>
				<div className="text-center">
					<div className={centredContainerClasses}>
						<span className="text-2xl">{currentStatus.icon}</span>
						<div className="text-left">
							<p className="text-sm font-semibold text-text-primary dark:text-white/80 md:text-base">
								{currentStatus.text}
							</p>
							<p className="text-sm text-text-secondary dark:text-white/60">{currentStatus.subtext}</p>
						</div>
					</div>
				</div>
			</motion.div>
		);
	}

	if (layout === "inline") {
		return (
			<motion.div
				variants={availabilityStatusInlineVariant}
				initial="initial"
				animate="animate"
				className="mt-6 border-t border-black/20 pt-6 dark:border-gray-700"
			>
				<div className={inlineContainerClasses}>
					<span className="text-xl">{currentStatus.icon}</span>
					<div>
						<p className="text-sm font-semibold text-text-primary dark:text-white/80">{currentStatus.text}</p>
						<p className="text-xs tracking-wide text-text-secondary dark:text-white/60">{currentStatus.subtext}</p>
					</div>
				</div>
			</motion.div>
		);
	}

	if (layout === "bar") {
		return (
			<motion.div
				variants={availabilityStatusBarVariant}
				initial="initial"
				animate="animate"
				className="mx-auto mt-12 max-w-2xl"
			>
				<div className={barContainerClasses}>
					<span className="text-2xl">{currentStatus.icon}</span>
					<div className="text-center">
						<p className="font-semibold text-text-primary dark:text-white">{currentStatus.text}</p>
						<p className="text-sm text-text-secondary dark:text-white/60">{currentStatus.subtext}</p>
					</div>
				</div>
			</motion.div>
		);
	}

	return null;
};

export default AvailabilityStatus;
