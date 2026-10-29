import type { Metadata } from "next";
import { Inter, Oswald, Allura } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import SiteGrid from "@/components/SiteGrid";
import { WorldProvider } from "@/components/WorldProvider";
import { DEFAULT_WORLD } from "@/lib/gridWorlds";
import { getWorldBootScript } from "@/lib/worldStorage";
import { getWorldThemeCss } from "@/lib/worldTheme";
import { siteUrl, siteName, siteDescription, siteKeywords } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const allura = Allura({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Portfolio`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} — Portfolio`,
    description: siteDescription,
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: `${siteName} — portfolio cover`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Portfolio`,
    description: siteDescription,
    images: ["/og-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-world={DEFAULT_WORLD}
      suppressHydrationWarning
    >
      <head>
        <style
          id="world-theme"
          dangerouslySetInnerHTML={{ __html: getWorldThemeCss() }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: getWorldBootScript() }}
        />
      </head>
      <body
        className={`${inter.variable} ${oswald.variable} ${allura.variable} bg-[color:var(--world-bg)] font-sans text-[color:var(--world-fg)] antialiased`}
      >
        <WorldProvider>
          <SiteGrid />
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SmoothScroll />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </WorldProvider>
      </body>
    </html>
  );
}
