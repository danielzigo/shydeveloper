import type { ComponentType } from "react";

/**
 * Represents a floating shape on the contact page
 */
export interface ContactFloatingShape {
	id: number;
	ShapeIcon: ComponentType;
	margin: number; // rem - orbital distance from center
	fontSize: number; // rem - icon size
	rotation: number; // initial rotation in degrees
	speed: number; // animation duration in seconds
	color: string; // hex color
	delay: number; // animation delay in seconds
}

/**
 * Props for the OrbitingShape component
 */
export interface OrbitingShapeProps {
	shape: ContactFloatingShape;
	isPaused: boolean;
}

/**
 * Layout options for the availability status component
 */
export type AvailabilityLayout = "centred" | "inline" | "bar";

/**
 * Props for the AvailabilityStatus component
 */
export interface AvailabilityStatusProps {
	layout?: AvailabilityLayout;
}

/**
 * Available status types
 */
export type AvailabilityStatusType = "available" | "limited" | "busy";

/**
 * Configuration for a single availability status
 */
export interface AvailabilityStatusConfig {
	icon: string;
	text: string;
	subtext: string;
}
