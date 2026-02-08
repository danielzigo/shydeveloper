/**
 * Experience and Skills types for the About page
 */
export interface Experience {
	icon: string;
	title: string;
	description: string;
	items: {
		company: string;
		position: string;
		duration: string;
		companyLink: string;
		address: string;
		work: string;
	}[];
}

export interface Skills {
	title: string;
	description: string;
	skillsList: {
		icon: React.ReactNode;
		name: string;
		description: string;
	}[];
}
