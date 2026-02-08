/**
 * Represents a service offering on the Services section of the homepage.
 */
export interface Service {
	// Unique identifier for the service
	id: number;
	// Service title
	title: string;
	// Brief description of the service
	description: string;
	// Icon for the service (e.g., <FaLaptopCode />)
	icon: React.ReactNode;
}
