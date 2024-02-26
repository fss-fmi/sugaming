import '../global.css';
import '@sugaming/sugaming-ui/global.css';

import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@sugaming/sugaming-ui/lib/providers/theme-provider';
import { Navbar } from '@sugaming/sugaming-ui/lib/components/common/server';
import {
  NavbarLinks,
  NavbarUserControls,
} from '@sugaming/sugaming-ui/lib/components/site/client';
import { getUser } from '@sugaming/sugaming-api-client/next';
import { getMessages } from 'next-intl/server';
import Link from 'next/link';
import { AxiomWebVitals } from 'next-axiom';
import { Logo } from '@sugaming/sugaming-ui/lib/components/site/server';
import { locales } from '../i18n';

export { useReportWebVitals } from 'next-axiom';

export const metadata = {
  title: 'Welcome to sugaming-site',
  description: 'Generated by create-nx-workspace',
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
  const user = await getUser();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="h-screen">
        {/* Enable production logging */}
        <AxiomWebVitals />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar>
              <NavbarLinks className="block xl:hidden" variant="mobile" />

              <Link href={`/${locale}`}>
                <Logo />
              </Link>

              <NavbarLinks
                className="hidden xl:flex justify-center"
                variant="desktop"
              />

              <NavbarUserControls user={user} className="" />
            </Navbar>

            <main className="p-4">{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
