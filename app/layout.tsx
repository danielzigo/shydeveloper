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
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
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
