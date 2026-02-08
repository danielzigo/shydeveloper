import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "15px",
				sm: "20px",
				md: "24px", // More breathing room at 768px
				lg: "32px",
			},
		},
		screens: {
			xxs: "320px",
			xs: "480px",
			sm: "640px",
			md: "780px",
			lg: "960px",
			xl: "1200px",
		},
		fontFamily: {
			primary: ["var(--font-montserrat)"],
			heading: ["var(--font-fjalla-one)"],
			logo: ["var(--font-squada-one)"],
			game: ["var(--font-luckiest-guy)"],
		},
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: "hsl(var(--primary))",
				secondary: "hsl(var(--secondary))",
				accent: {
					DEFAULT: "hsl(var(--accent))",
					hover: "hsl(var(--accent-hover))",
					dark: "hsl(var(--accent-dark))",
				},
				link: {
					DEFAULT: "hsl(var(--link))",
					dark: "hsl(var(--link-dark))",
				},
				"text-primary": "hsl(var(--text-primary))",
				"text-secondary": "hsl(var(--text-secondary))",
				"card-bg": "hsl(var(--card-bg))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
