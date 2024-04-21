import React from 'react';
import {
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

const titleFont = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  weight: '900',
});

export default async function Index() {
  const t = await getTranslations('Index');

  return (
    <Card className="p-8 w-fit m-auto mx-auto">
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

        <p className="text-center">
          Connecting the gaming community of Sofia University
        </p>
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t('also-find-us')}
            </span>
          </div>
        </div>
        <SocialMediaButtons />
      </CardContent>
    </Card>
  );
}
