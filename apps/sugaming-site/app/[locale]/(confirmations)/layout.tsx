import '../../global.css';
import '@sugaming/sugaming-ui/global.css';

import React from 'react';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { AxiomWebVitals } from 'next-axiom';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@sugaming/sugaming-ui/lib/providers/theme-provider';
import { Background } from '@sugaming/sugaming-ui/lib/components/site/background/background';
import { locales } from '../../i18n';

export default async function ConfirmationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen items-center justify-center">
      {children}
    </main>
  );
}
