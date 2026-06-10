import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rezolvus — Find the Right Specialist Without The Stress",
  description:
    "Discover verified psychologists, physiotherapists, wellness specialists, and more — all in one modern platform designed around trust and simplicity.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
