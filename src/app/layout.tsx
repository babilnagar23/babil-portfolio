import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomCursor from "@/components/effects/CustomCursor";
import ParticleBackground from "@/components/effects/ParticleBackground";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Babil Nagar — Full Stack & Data Science",
  description:
    "Portfolio of Babil Nagar — Full Stack Developer and Data Science student at VIT Bhopal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <ParticleBackground />
          <CustomCursor />
          <div className="relative z-[1]">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
