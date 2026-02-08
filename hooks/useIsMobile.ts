import { useEffect, useState } from "react";

/**
 * Tailwind's "md" breakpoint
 */
const MOBILE_BREAKPOINT = 768;

/**
 * Hook to detect if the current viewport is mobile-sized
 * @param breakpoint - Width in pixels below which is considered mobile (default: 768px)
 * @returns boolean indicating if viewport is mobile-sized
 */
export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < breakpoint);
		};

		// Check on mount
		checkMobile();

		// Re-check on window resize
		window.addEventListener("resize", checkMobile);

		// Cleanup
		return () => window.removeEventListener("resize", checkMobile);
	}, [breakpoint]);

	return isMobile;
}
