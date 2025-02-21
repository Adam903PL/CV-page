import type { Metadata } from "next";
import NavBar from "./ui/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import clsx from "clsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
setInterval(function() {
  // body
}, 1000);
  return (
    <html lang="en">
      <body
        className={clsx(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
        )}
      >
        <NavBar/>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
