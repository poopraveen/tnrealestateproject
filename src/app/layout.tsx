'use client';
import { ReduxProvider } from "../store/provider";
import "./globals.css";
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import Footer from '../app/components/Footer';
import Header from '../app/components/Header';
import { LoaderProvider } from './LoaderContext';
import { ThemeProvider } from "./ThemeContext";
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> {/* ✅ Ensure <html> is at the top level */}
      <body className={`ntialiased chocolate-cream`}>
        <ReduxProvider>
          <AuthWrapper>
            <LoaderProvider>
              <I18nextProvider i18n={i18n}>
                <ThemeProvider>
                  <LayoutContent>{children}</LayoutContent>
                </ThemeProvider>
              </I18nextProvider>
            </LoaderProvider>
          </AuthWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}

// ✅ Ensure hydration-safe authentication logic
function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  // Fix hydration by preventing SSR differences
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    if (!isAuthenticated && !isAuthPage) {
      router.push('/login');
    }
  }, [isAuthenticated, isAuthPage, router]);

  if (!isClient) return null; // ✅ Prevent SSR mismatches

  return <>{children}</>;
}

// ✅ Ensure consistent layout structure
function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <>
      {!isAuthPage && <Header />}
      <main className="flex-1">{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
}
