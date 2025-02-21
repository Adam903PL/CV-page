// RootLayout.tsx
"use client"; // Komponent kliencki

import { useEffect } from "react";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Metadata } from "next";// Zaimportuj metadata z serwera
import dynamic from 'next/dynamic';

const NavBar = dynamic(() => import('./ui/Navbar'), {
  ssr: false, // Wyłącz SSR dla tego komponentu
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  useEffect(() => {
    const interval = setInterval(() => {
      // Twój kod
      console.log("Interval running...");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="en">
      <body className={clsx(`${geistSans.variable} ${geistMono.variable} antialiased`)}>
        <NavBar />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
