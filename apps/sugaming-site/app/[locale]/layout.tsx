import '../global.css';
import '@sugaming/sugaming-ui/global.css';

import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@sugaming/sugaming-ui/lib/providers/theme-provider';
import { getMessages } from 'next-intl/server';
import { AxiomWebVitals } from 'next-axiom';
import { Background } from '@sugaming/sugaming-ui/lib/components/site/background/background';
import { locales } from '../i18n';

export { useReportWebVitals } from 'next-axiom';

export const metadata = {
  title: 'SUGAMING - Official gaming club of the Sofia University',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="h-screen">
        {/* Enable production logging */}
        <AxiomWebVitals />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Background />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
