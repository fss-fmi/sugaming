import '../../global.css';
import '@sugaming/sugaming-ui/global.css';

import React from 'react';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { AxiomWebVitals } from 'next-axiom';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@sugaming/sugaming-ui/lib/providers/theme-provider';
import { locales } from '../../i18n';

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
      <body>
        {/* Enable production logging */}
        <AxiomWebVitals />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="flex h-screen items-center justify-center">
              {children}
            </main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
