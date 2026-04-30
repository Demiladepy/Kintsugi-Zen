import type { Metadata } from "next";
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${lora.variable} h-full antialiased`}
      style={{ ["--font-dyslexic" as string]: "Arial, sans-serif" }}
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
