import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../components/AuthProvider";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SYNAPSE v2.4 PRO — AICTE Institution Intelligence & Regulatory Coordination",
  description: "AICTE Centralized 360° Institution Intelligence, Cross-Bureau Case Registry & Explainable Overlap Detection Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#F7F8FA] text-[#171923] flex flex-col font-sans selection:bg-[#F3F0FF] selection:text-[#6246EA]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
