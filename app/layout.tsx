import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterCtontext from "./context/ToasterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Massenger Clone",
  description: "Massenger Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterCtontext />
        {children}
      </body>
    </html>
  );
}
