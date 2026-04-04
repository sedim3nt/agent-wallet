import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Providers from "@/components/Providers";
import AIChatWidget from "@/components/AIChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Agent Wallet — Fleet Control",
  description: "Autonomous agent payment infrastructure on Base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <Nav />
          <main style={{ paddingTop: "var(--nav-height)" }}>
            {children}
          </main>
        </Providers>
        <AIChatWidget />
      </body>
    </html>
  );
}
