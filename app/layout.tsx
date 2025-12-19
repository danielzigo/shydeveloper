import type { Metadata } from "next";
import "./globals.css";

import { Montserrat } from "next/font/google";
import { Fjalla_One } from "next/font/google";
import { Squada_One } from "next/font/google";
import { Luckiest_Guy } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

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

export const metadata: Metadata = {
  title: "ShyDeveloper - Web Developer",
  description:
    "Building websites and web applications for small businesses, charities, and individuals. Straightforward development without the marketing fluff.",

  // Open Graph (for LinkedIn, Facebook, etc.)
  openGraph: {
    title: "ShyDeveloper - Web Developer",
    description:
      "Building websites and web applications for small businesses, charities, and individuals.",
    url: "https://shydeveloper.com",
    siteName: "ShyDeveloper",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://shydeveloper.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ShyDeveloper - Web Developer",
      },
    ],
  },

  // Twitter Card (for Twitter/X)
  twitter: {
    card: "summary_large_image",
    title: "ShyDeveloper - Web Developer",
    description:
      "Building websites and web applications for small businesses, charities, and individuals.",
    images: ["https://shydeveloper.com/og-image.png"],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://shydeveloper.com/#person",
      name: "Daniel Amazigo",
      alternateName: "ShyDeveloper",
      url: "https://shydeveloper.com/",
      jobTitle: "Full Stack Web Developer",
      description:
        "Building websites and web applications for small businesses, charities, and individuals. Straightforward development without the marketing fluff.",
      image: "https://shydeveloper.com/logo.png",
      sameAs: [
        "https://github.com/danielzigo",
        "https://www.linkedin.com/in/daniel-amazigo",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://shydeveloper.com/#service-web-development",
      name: "Web development",
      provider: { "@id": "https://shydeveloper.com/#person" },
      description:
        "Websites and web applications for small businesses, charities, and individuals.",
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
      url: "https://shydeveloper.com/",
    },
  ];

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`relative ${montserrat.variable} ${squadaOne.variable} ${fjallaOne.variable} ${luckiestGuy.variable} antialiased`}
      >
        <Header />
        {children}
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
