import '../../global.css';
import '@sugaming/sugaming-ui/global.css';

import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@sugaming/sugaming-ui/lib/providers/theme-provider';
import { Navbar } from '@sugaming/sugaming-ui/lib/components/common/server';
import {
  NavbarLinks,
  NavbarUserControls,
  NotificationsPopover,
  OnboardingDialog,
} from '@sugaming/sugaming-ui/lib/components/site/client';
import { getUser } from '@sugaming/sugaming-api-client/next';
import { getMessages } from 'next-intl/server';
import Link from 'next/link';
import { AxiomWebVitals } from 'next-axiom';
import { Logo } from '@sugaming/sugaming-ui/lib/components/site/server';
import { Background } from '@sugaming/sugaming-ui/lib/components/site/background/background';
import { locales } from '../../i18n';

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
  const user = await getUser();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="h-screen">
        {/* Enable production logging */}
        <AxiomWebVitals />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Background />
            <Navbar>
              <NavbarLinks className="block xl:hidden" variant="mobile" />

              <Link href={`/${locale}`}>
                <Logo />
              </Link>

              <NavbarLinks
                className="hidden xl:flex justify-center"
                variant="desktop"
              />

              <div className="flex flex-row gap-2">
                {user && <NotificationsPopover user={user} />}
                <NavbarUserControls user={user} className="" />
              </div>
            </Navbar>

            <OnboardingDialog isOpen={user && !user.isOnboardingCompleted} />

            <main className="max-w-[88rem] m-auto px-4">{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
