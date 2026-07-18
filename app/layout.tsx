import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import ThreeBackground from "@/components/three-background";
import CursorGlow from "@/components/cursor-glow";
import FloatingNav from "@/components/floating-nav";

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
  keywords: [
    "Matthias Amire",
    "Matthias",
    "Amire",
    "Frontend Engineer",
    "React Native Engineer",
    "React Native Developer",
    "Software Engineer",
    "Portfolio",
    "FastAPI Developer"
  ],
  alternates: {
    canonical: "./",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Matthias Amire",
    "url": "https://matthiasamire.com",
    "jobTitle": "Frontend & React Native Engineer",
    "sameAs": [
      "https://github.com/codydematth",
      "https://www.linkedin.com/in/codydematth/"
    ],
    "knowsAbout": [
      "Frontend Engineering",
      "React Native",
      "React",
      "FastAPI",
      "TypeScript",
      "JavaScript",
      "Web Development",
      "Mobile Development"
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-slate-100 relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[99] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <FloatingNav />
        <ThreeBackground />
        <CursorGlow />
        <main id="main-content" className="flex-1 flex flex-col pt-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

