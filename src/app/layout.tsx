import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReduxProvider } from "../store/provider";
import "./globals.css";
import Footer from '../app/components/Footer'
import Header from '../app/components/Header'
import { ThemeProvider } from "./ThemeContext";

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
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased chocolate-cream`}>
        <ThemeProvider>
          <ReduxProvider>
            <Header />
            <main className="flex-1 pb-20"> {/* Ensure main content has bottom padding */}
              {children}
            </main>
            <Footer />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
