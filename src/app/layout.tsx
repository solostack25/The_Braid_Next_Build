import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EscapeShortcut } from "@/components/QuickExit";
import { PreviewBridge } from "@/components/PreviewBridge";
import "./globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-cormorant" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-cinzel" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://thebraidinc.org"),
  title: { default: "The Braid Inc. — Rest, Recover, Rise", template: "%s · The Braid Inc." },
  description:
    "Case management and wrap-around care for people facing hardship in Fort Myers and Lee County, Florida, with recovery housing coming soon.",
  // Preview build: keep it out of search until it replaces the WordPress site.
  robots: { index: false, follow: false },
  openGraph: {
    title: "The Braid Inc. — Rest, Recover, Rise",
    description: "Weaving hope into every life in Lee County, Florida.",
    images: ["/brand/braid-logo-full.png"],
  },
};

export const viewport: Viewport = { themeColor: "#2F3A1F" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cinzel.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="sr-only">
          Skip to content
        </a>
        <EscapeShortcut />
        <PreviewBridge />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
