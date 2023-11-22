import '../global.css';
import React from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '../i18n';

export const metadata = {
  title: 'Welcome to sugaming-site',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang={locale}>
        <body>{children}</body>
      </html>
    </NextIntlClientProvider>
  );
}