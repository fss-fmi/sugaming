import React, { Suspense } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@sugaming/sugaming-ui/lib/components/common/server';
import { getTranslations } from 'next-intl/server';
import { SocialMediaButtons } from '@sugaming/sugaming-ui/lib/components/site/social-media-buttons/social-media-buttons';
import { Inter_Tight } from 'next/font/google';
import { cn } from '@sugaming/sugaming-ui/lib/utils';
import Image from 'next/image';
import { Logo } from '@sugaming/sugaming-ui/lib/components/site/client';
import { IoGameController, IoGameControllerOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { getUser } from '@sugaming/sugaming-api-client/next';
import { HeroActionButton } from '@sugaming/sugaming-ui/lib/components/site/hero-action-button/hero-action-button';

const titleFont = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  weight: '900',
});

export default async function HomePage() {
  const t = await getTranslations('home-page');
  const user = await getUser();

  return (
    <Card className="flex mx-auto mt-10 h-5/6 w-5/6 md:w-2/3 flex-col items-center p-4 md:p-8 space-y-4">
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="p-6">
          <Logo size={300} showText={false} />
        </div>
        <h1
          className={cn(
            titleFont.className,
            'text-4xl sm:text-5xl md:text-7xl',
          )}
        >
          SUGAMING
        </h1>

        <p className="text-center">{t('connecting-the-gaming-community')}</p>

        <Suspense>
          <HeroActionButton />
        </Suspense>

        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t('also-find-us-on')}
            </span>
          </div>
        </div>
        <SocialMediaButtons />
      </CardContent>
    </Card>
  );
}
