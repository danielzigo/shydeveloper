import type { ComponentType } from "react";
import { BsCircleFill, BsEnvelope, BsLaptop } from "react-icons/bs";
import { FaKeyboard, FaPaperPlane } from "react-icons/fa";
import type { AvailabilityLayout, AvailabilityStatusConfig, AvailabilityStatusType } from "@/types";

/**
 * Contact email address
 */
export const CONTACT_EMAIL = "daniel@shydeveloper.com";

/**
 * Default availability status layout
 */
export const DEFAULT_STATUS_LAYOUT: AvailabilityLayout = "centred";

/**
 * Current active availability status
 */
export const ACTIVE_STATUS: AvailabilityStatusType = "available";

/**
 * Availability status configurations
 */
export const AVAILABILITY_STATUS: Record<AvailabilityStatusType, AvailabilityStatusConfig> = {
	available: {
		icon: "🟢",
		text: "Available for new projects",
		subtext: "Let's build something together",
	},
	limited: {
		icon: "🟡",
		text: "Limited availability",
		subtext: "Reach out anyway - I'd love to hear about your project",
	},
	busy: {
		icon: "🟠",
		text: "Currently working with clients",
		subtext: "Enquiries welcome - I'll get back to you soon",
	},
};

/**
 * Icons used for floating shapes animation
 */
export const SHAPE_ICONS: ComponentType[] = [BsCircleFill, FaPaperPlane, BsEnvelope, FaKeyboard, BsLaptop];

/**
 * Colours for floating shapes in dark mode (inspired by CodePen design)
 */
export const DARK_MODE_SHAPE_COLORS = [
	"#FFD700", // Gold
	"#FFF8DC", // Cornsilk
	"#DB7093", // Pale Violet Red
	"#C2B7FE", // Lavender
	"#95A9FF", // Light Blue
] as const;

/**
 * Colours for floating shapes in light mode
 * Using more saturated/darker colours for better visibility on the lighter background
 */
export const LIGHT_MODE_SHAPE_COLORS = [
	"#7C3AED", // Purple (matches accent colour)
	"#3B82F6", // Blue
	"#10B981", // Green
	"#F59E0B", // Amber
	"#EF4444", // Red
] as const;

/**
 * Configuration for shape generation
 */
export const SHAPE_CONFIG = {
	/** Number of shapes on mobile devices */
	MOBILE_COUNT: 10,
	/** Number of shapes on desktop devices */
	DESKTOP_COUNT: 20,
	/** Minimum shape size multiplier */
	SIZE_MIN: 2,
	/** Random size variation range */
	SIZE_RANGE: 10,
	/** Minimum orbital distance (rem) */
	ORBITAL_MIN: 5,
	/** Random orbital distance variation (rem) */
	ORBITAL_RANGE: 12,
	/** Base animation speed (seconds) */
	SPEED_BASE: 70,
	/** Random speed variation (seconds) */
	SPEED_RANGE: 10,
	/** Maximum animation delay (seconds) */
	MAX_DELAY: 2,
	/** Shape size to font size conversion factor */
	SIZE_TO_FONT_RATIO: 0.2,
} as const;

/**
 * Timeout duration for "copied" state (milliseconds)
 */
export const COPY_TIMEOUT = 2000;
