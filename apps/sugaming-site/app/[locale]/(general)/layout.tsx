import '../../global.css';
import '@sugaming/sugaming-ui/global.css';

import React from 'react';
import { Navbar } from '@sugaming/sugaming-ui/lib/components/common/server';
import {
  NavbarLinks,
  NavbarUserControls,
  NotificationsPopover,
  OnboardingDialog,
} from '@sugaming/sugaming-ui/lib/components/site/client';
import Link from 'next/link';
import { Logo, Footer } from '@sugaming/sugaming-ui/lib/components/site/server';
import { getUser } from '@sugaming/sugaming-api-client/next';

export { useReportWebVitals } from 'next-axiom';

export default async function GeneralLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const user = await getUser();

  return (
    <>
      <Navbar>
        <NavbarLinks
          className="block xl:hidden place-self-start"
          variant="mobile"
        />

        <Link
          href={`/${locale}`}
          className="place-self-center xl:place-self-start"
        >
          <Logo />
        </Link>

        <NavbarLinks
          className="hidden xl:flex justify-center place-self-center"
          variant="desktop"
        />

        <div className="flex flex-row align-middle gap-2 place-self-end">
          {user && <NotificationsPopover user={user} />}
          <NavbarUserControls user={user} className="" />
        </div>
      </Navbar>

      <OnboardingDialog isOpen={user && !user.isOnboardingCompleted} />

      <main className="max-w-[88rem] m-auto px-4">{children}</main>

      <Footer />
    </>
  );
}
