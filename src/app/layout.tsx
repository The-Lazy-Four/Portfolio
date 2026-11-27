import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CinemaEngineProvider } from "@/components/motion/CinemaEngineProvider";
import { MotionProvider } from "@/components/motion/Reveal";
import { StudioCursor } from "@/components/motion/StudioCursor";
import { SITE_CONFIG } from "@/config/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: "Web Guru — Digital Growth & Technology Partner",
    template: "%s | Web Guru",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Web Guru",
    "digital agency",
    "Google Business Profile optimization",
    "local SEO",
    "custom website development",
    "web application development",
    "social media management",
    "NFC Google review cards",
    "QR review solutions",
    "website maintenance and technical support",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.brandName,
    title: "Web Guru — One Partner For Your Entire Digital Presence",
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Guru — Digital Agency & Technology Partner",
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Provides the root HTML shell, typography variables, motion configuration, header, and footer across all routes. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrumentSerif.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-paper text-ink selection:bg-accent selection:text-paper">
        <CinemaEngineProvider>
          <MotionProvider>
            <StudioCursor />
            <Navbar />
            <main id="main-content" className="flex-1 overflow-x-clip pt-18">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </CinemaEngineProvider>
      </body>
    </html>
  );
}
