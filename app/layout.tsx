import type { Metadata } from "next";
import "./globals.css";

import { Fjalla_One, Luckiest_Guy, Montserrat, Squada_One } from "next/font/google";
import { NotFoundProvider } from "@/app/contexts/NotFoundContext";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";

// Google fonts exposed as CSS variables for Tailwind
const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const fjallaOne = Fjalla_One({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-fjalla-one",
});

const squadaOne = Squada_One({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-squada-one",
});

const luckiestGuy = Luckiest_Guy({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-luckiest-guy",
});

const SITE_URL = "https://shydeveloper.com";
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const TITLE = "ShyDeveloper - Web Developer";
const DESC_LONG =
	"Building websites and web applications for small businesses, charities, and individuals. Straightforward development without the marketing fluff.";
const DESC_SHORT = "Building websites and web applications for small businesses, charities, and individuals.";

// Metadata for SEO + social previews (OpenGraph/Twitter Card)
export const metadata: Metadata = {
	title: TITLE,
	description: DESC_LONG,

	// Open Graph (for LinkedIn, Facebook, etc.)
	openGraph: {
		title: TITLE,
		description: DESC_SHORT,
		url: SITE_URL,
		siteName: "ShyDeveloper",
		locale: "en_GB",
		type: "website",
		images: [
			{
				url: OG_IMAGE,
				width: 1200,
				height: 630,
				alt: TITLE,
			},
		],
	},

	// Twitter Card (for Twitter/X)
	twitter: {
		card: "summary_large_image",
		title: TITLE,
		description: DESC_SHORT,
		images: [OG_IMAGE],
	},
};

// JSON-LD structured data for SEO (Person & Service)
const jsonLd = [
	{
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": `${SITE_URL}/#person`,
		name: "Daniel Amazigo",
		alternateName: "ShyDeveloper",
		url: SITE_URL,
		jobTitle: "Full Stack Web Developer",
		description: DESC_LONG,
		image: `${SITE_URL}/logo.png`,
		sameAs: ["https://github.com/danielzigo", "https://www.linkedin.com/in/daniel-amazigo"],
	},
	{
		"@context": "https://schema.org",
		"@type": "Service",
		"@id": `${SITE_URL}/#service-web-development`,
		name: "Web development",
		provider: { "@id": `${SITE_URL}/#person` },
		description: "Websites and web applications for small businesses, charities, and individuals.",
		areaServed: [
			{ "@type": "Country", name: "United Kingdom" },
			{ "@type": "AdministrativeArea", name: "Essex" },
		],
		serviceType: ["Website development", "Web application development"],
		availableChannel: {
			"@type": "ServiceChannel",
			name: "Remote service",
			availableLanguage: "en",
		},
		url: SITE_URL,
	},
] as const;

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	const bodyClasses = `relative antialiased ${montserrat.variable} ${squadaOne.variable} ${fjallaOne.variable} ${luckiestGuy.variable}`;

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className={bodyClasses}>
				<NotFoundProvider>
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
						<Header />
						{/* Main content */}
						{children}
						{/* Back to top button */}
						<BackToTop />

						<Footer />
					</ThemeProvider>
				</NotFoundProvider>
			</body>
		</html>
	);
}
