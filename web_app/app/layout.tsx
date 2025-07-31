import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import { Providers } from "./providers";
import Navigation from "../lib/components/Navigation";
import Footer from "../lib/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Glamlink - The Link to the Future of Beauty",
  description: "Where beauty meets innovation, and possibilities are endless. Your go-to application for the beauty industry.",
  keywords: ["glamlink", "beauty app", "beauty professionals", "beauty industry", "beauty platform", "beauty services"],
  authors: [{ name: "Glamlink" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className={`${roboto.variable} ${geistSans.variable} ${geistMono.variable} font-roboto antialiased bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
        <Providers>
          <Navigation />
          <main className="min-h-screen pt-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
