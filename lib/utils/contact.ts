import { DARK_MODE_SHAPE_COLORS, LIGHT_MODE_SHAPE_COLORS, SHAPE_CONFIG, SHAPE_ICONS } from "@/constants/contact";

import type { ContactFloatingShape } from "@/types/contact";

/**
 * Generates an array of floating shapes with random properties
 * @param count - Number of shapes to generate
 * @param theme - Current theme ('dark' | 'light')
 * @returns Array of shape configurations
 */
export function generateShapes(count: number, theme: "dark" | "light" = "dark"): ContactFloatingShape[] {
	const colors = theme === "dark" ? DARK_MODE_SHAPE_COLORS : LIGHT_MODE_SHAPE_COLORS;

	return Array.from({ length: count }, (_, i) => {
		const shapeSize = Math.floor(Math.random() * SHAPE_CONFIG.SIZE_RANGE) + SHAPE_CONFIG.SIZE_MIN;
		const orbitalDistance = Math.floor(Math.random() * SHAPE_CONFIG.ORBITAL_RANGE) + SHAPE_CONFIG.ORBITAL_MIN;
		const rotation = Math.floor(Math.random() * 360);
		const speed = SHAPE_CONFIG.SPEED_BASE + Math.floor(Math.random() * SHAPE_CONFIG.SPEED_RANGE);
		const colorIndex = Math.floor(Math.random() * colors.length);
		const shapeIndex = Math.floor(Math.random() * SHAPE_ICONS.length);

		return {
			id: i,
			ShapeIcon: SHAPE_ICONS[shapeIndex],
			margin: orbitalDistance,
			fontSize: shapeSize * SHAPE_CONFIG.SIZE_TO_FONT_RATIO,
			rotation,
			speed,
			color: colors[colorIndex],
			delay: Math.random() * SHAPE_CONFIG.MAX_DELAY,
		};
	});
}

/**
 * Copies text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is complete
 * @throws Error if clipboard API is not available or copy fails
 */
export async function copyToClipboard(text: string): Promise<void> {
	if (!navigator.clipboard) {
		throw new Error("Clipboard API not available");
	}

	await navigator.clipboard.writeText(text);
}
