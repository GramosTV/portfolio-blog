'use client';
import { NextIntlClientProvider } from 'next-intl';
// import Footer from '../components/Footer';
import '@/styles/globals.sass';
import Header from '../components/Header';
import { Roboto_Condensed } from 'next/font/google';
import { useEffect } from 'react';
const roboto = Roboto_Condensed({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});
export default function LocaleClientLayout({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}) {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(`${savedTheme}-theme`);
  }, []);
  return (
    <html lang={locale}>
      <body className={roboto.className}>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone={'Europe/Vienna'}>
          <Header />
          {children}
          {/* <Footer /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
