import '../global.css';
import '@sugaming/sugaming-ui/global.css';

import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@sugaming/sugaming-ui/lib/providers/theme-provider';
import { getMessages, getTranslations } from 'next-intl/server';
import { AxiomWebVitals } from 'next-axiom';
import { Background } from '@sugaming/sugaming-ui/lib/components/site/background/background';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { locales } from '../i18n';

export { useReportWebVitals } from 'next-axiom';

export async function generateMetadata() {
  const t = await getTranslations('root-layout');
  return {
    title: {
      template: `%s | ${t('title')}`,
      default: t('title'),
    },
    icons: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: '/favicon-dark.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: '/favicon.ico',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  };
}

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
        {/* Enable production logging and insights */}
        <AxiomWebVitals />
        <SpeedInsights />
        <Analytics />

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
