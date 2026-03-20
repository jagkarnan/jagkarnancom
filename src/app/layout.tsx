import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: { default: "Jag Karnan - AI Partner", template: "%s | Jag Karnan" },
  description:
    "AI-focused online resume: skills, certifications, experience, and projects.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "Jag Karnan - AI Partner",
    description:
      "AI-focused online resume: skills, certifications, experience, and projects.",
    type: "website",
  },
  alternates: { canonical: "/" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="ai-grid min-h-dvh">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
