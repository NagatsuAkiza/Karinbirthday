import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AddBootstrap from "@/hooks/AddBootstrap";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  icons: {
    icon: ["favicon.ico"]
  },
  title: "Karin Birthday🪐",
  description: "Happy Birthday🪐"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
        <AddBootstrap />
        {children}
      </body>
    </html>
  );
}
