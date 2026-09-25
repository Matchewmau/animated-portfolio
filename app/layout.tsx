import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "JOHN MATHEW B. MAURICIO — Full-Stack + AI Systems",
  description:
    "Portfolio of John Mauricio, Full-Stack Software Engineer building web and AI systems including HairMixer (ECAI 2026), PConnect, and TJ Fitness.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
