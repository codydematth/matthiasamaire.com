import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import ThreeBackground from "@/components/three-background";
import CursorGlow from "@/components/cursor-glow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matthias Amire | Frontend & React Native Engineer",
  description: "Matthias Amire is a Freelance Frontend and React Native Engineer with 3+ years of experience building real-world web and mobile applications.",
  metadataBase: new URL("https://matthiasamire.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Matthias Amire | Portfolio",
    description: "Frontend & React Native Engineer with 3+ years of experience. Specializing in high-performance web applications and mobile apps.",
    url: "https://matthiasamire.com",
    siteName: "Matthias Amire Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-slate-100 relative">
        <ThreeBackground />
        <CursorGlow />
        <main className="flex-1 flex flex-col pt-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

