import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import CustomCursor from "@/components/effects/CustomCursor";
import ParticleBackground from "@/components/effects/ParticleBackground";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SplashProvider from "@/components/providers/SplashProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://babil-portfolio.vercel.app/"),
  title: "Babil Nagar | AI/ML Developer Portfolio",

  description:
    "Official portfolio of Babil Nagar — AI/ML Developer, Full Stack Developer, and Data Science student at VIT Bhopal.",

  keywords: [
    "Babil Nagar",
    "Babil Nagar portfolio",
    "Babil Nagar developer",
    "AI ML Developer",
    "VIT Bhopal",
    "Full Stack Developer",
  ],

  authors: [{ name: "Babil Nagar" }],

  creator: "Babil Nagar",

  verification: {
    google: "2I54RBBoN_rHUs4SVYuoGjti5gfLnSQNdzGxfc6aRfA",
  },


  openGraph: {
    title: "Babil Nagar Portfolio",
    description: "Official portfolio website of Babil Nagar.",
    url: "https://babil-portfolio.vercel.app/",
    siteName: "Babil Nagar Portfolio",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Babil Nagar Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Babil Nagar Portfolio",
    description: "Official portfolio website of Babil Nagar.",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <SplashProvider>
            <ParticleBackground />
            <CustomCursor />
            <div className="relative z-[1]">{children}</div>
          </SplashProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
