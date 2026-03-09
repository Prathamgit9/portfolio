import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Pratham Narang — Backend Developer (Python) • ML • UI/UX",
  description:
    "Backend Developer based in Delhi. Python/JS, ML/AI, and UI/UX — building clean products with a cinematic edge.",
  openGraph: {
    title: "Pratham Narang — Backend Developer (Python) • ML • UI/UX",
    description:
      "Python, ML/AI, and UI/UX — building clean products with a cinematic edge.",
    url: "https://prathamnarang.dev",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#07070a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
