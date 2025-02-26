'use client'
import { ReduxProvider } from "../store/provider";
import "./globals.css";
import Footer from '../app/components/Footer'
import Header from '../app/components/Header'
import { LoaderProvider } from './LoaderContext';  // Adjust path
import { ThemeProvider } from "./ThemeContext";
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n'; // Path to your i18n configuration


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`ntialiased chocolate-cream`}>
        <LoaderProvider>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider>
              <ReduxProvider>
                <Header />
                <main className="flex-1"> {/* Ensure main content has bottom padding */}
                  {children}
                </main>
                <Footer />
              </ReduxProvider>
            </ThemeProvider>
          </I18nextProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
