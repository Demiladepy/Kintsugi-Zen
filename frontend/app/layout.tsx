import type { Metadata } from "next";
import localFont from "next/font/local";
import { Lora } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import { AxeDevtools } from "@/components/dev/axe-devtools";
import "./globals.css";

const lora = Lora({
  variable: "--font-reading",
  subsets: ["latin"],
});

const openDyslexic = localFont({
  src: [
    { path: "../public/fonts/OpenDyslexic-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/OpenDyslexic-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-dyslexic",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Sensory Passport",
  description: "Solana accessibility protocol frontend for adaptive educational content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${lora.variable} ${openDyslexic.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div id="main-content" className="min-h-full">
          {children}
        </div>
        <AxeDevtools />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
