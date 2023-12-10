'use client';

import React from 'react';
import { GearIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '../../../utils';
import { Button, Label, ThemeSwitcher } from '../../common/server';
import { Popover, PopoverContent, PopoverTrigger } from '../../common/client';

interface NavbarUserControlsProps {
  className: string;
}

export function NavbarUserControls({
  className = '',
}: NavbarUserControlsProps) {
  const locale = useLocale();
  const t = useTranslations('site.navbar-user-controls');

  return (
    <div className={cn('flex space-x-1 justify-end', className)}>
      {/* Preferences popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <GearIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-screen sm:w-80">
          <Label>{t('preferences-popover.theme')}</Label>
          <div className="flex w-full justify-center p-2">
            <ThemeSwitcher />
          </div>
        </PopoverContent>
      </Popover>

      {/* Login/Registration buttons */}
      <Button variant="outline" asChild>
        <Link href={`/${locale}/login`}>{t('login')}</Link>
      </Button>
      <Button variant="default" asChild>
        <Link href={`/${locale}/signup`}>{t('signup')}</Link>
      </Button>
    </div>
  );
}
