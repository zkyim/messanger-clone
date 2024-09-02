import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterCtontext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import ActiveStauts from "./_components/ActiveStauts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: ['/images/logo.png?v=4'],
    apple: ['/images/logo.png?v=4']
  },
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
        <AuthContext>
          <ToasterCtontext />
          <ActiveStauts />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
