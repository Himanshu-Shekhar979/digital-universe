import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Himanshu Shekhar | Creative Technologist & CS Engineer",
  description:
    "The official digital portfolio of Himanshu Shekhar (Rishu) — exploring software engineering, purposeful web architectures, Three.js 3D cosmos, and full-stack systems.",
  keywords: [
    "Himanshu Shekhar",
    "Rishu",
    "Creative Technologist",
    "Computer Science Engineer",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Three.js",
    "Portfolio",
  ],
  authors: [{ name: "Himanshu Shekhar", url: "https://github.com/Himanshu-Shekhar979" }],
  creator: "Himanshu Shekhar",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Himanshu Shekhar | Digital Universe",
    description:
      "Creative Technologist & Computer Science Engineer exploring full-stack systems, creative coding, and modern web architectures.",
    siteName: "Himanshu Shekhar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Shekhar | Digital Universe",
    description:
      "Creative Technologist & Computer Science Engineer exploring full-stack systems, creative coding, and modern web architectures.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
