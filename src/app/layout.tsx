import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import LiquidEther from "@/components/visuals/LiquidEther";
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
      <body className="flex min-h-screen flex-col bg-[#100B18] text-[#F5F1FA] selection:bg-[#5227FF] selection:text-[#F5F1FA]">
        {/* Persistent global LiquidEther fluid simulation across all routes */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full"
        >
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B497CF"]}
            intensity={1}
            mouseForce={20}
            cursorSize={100}
            persistence={0.75}
            viscosity={0.08}
            resolution={0.5}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={1.8}
            autoResumeDelay={1000}
            clickBurst={true}
            bounceEdges={false}
            intro={true}
            lightMode={false}
            backgroundColor="#100B18"
            maxDevicePixelRatio={1.5}
          />
        </div>

        <CinemaEngineProvider>
          <MotionProvider>
            <StudioCursor />
            <Navbar />
            <main id="main-content" className="relative z-10 flex-1 overflow-x-clip">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </CinemaEngineProvider>
      </body>
    </html>
  );
}
