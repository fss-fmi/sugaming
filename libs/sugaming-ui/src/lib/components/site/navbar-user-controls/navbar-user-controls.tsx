'use client';

import React from 'react';
import { GearIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { cn } from '../../../utils';
import { Button, Label, ThemeSwitcher } from '../../common/server';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../common/client';

interface NavbarUserControlsProps {
  user: ApiClient.UserDto | undefined;
  className: string;
}

export function NavbarUserControls({
  user,
  className = '',
}: NavbarUserControlsProps) {
  const t = useTranslations('site.navbar-user-controls');

  return (
    <div className={cn('flex space-x-1 justify-end', className)}>
      {/* Preferences popover */}
      <Popover>
        <PopoverTrigger asChild>
          {user ? (
            <Avatar className="cursor-pointer">
              <AvatarImage
                src="https://github.com/fss-fmi.png"
                alt={`@${user.nickname}`}
              />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button variant="ghost" size="icon">
              <PersonIcon className="block xl:hidden" />
              <GearIcon className="hidden xl:block" />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-screen sm:w-80">
          {!user && (
            <Label className="block xl:hidden">
              {t('preferences-popover.get-started')}
              <div className="flex w-full justify-center p-2">
                <LoginButtons t={t} />
              </div>
            </Label>
          )}

          <Label>
            {t('preferences-popover.theme')}
            <div className="flex w-full justify-center p-2">
              <ThemeSwitcher />
            </div>
          </Label>
        </PopoverContent>
      </Popover>

      {/* Login/Registration buttons */}
      {!user && (
        <div className="hidden xl:block">
          <LoginButtons t={t} />
        </div>
      )}
    </div>
  );
}

function LoginButtons({ t }: { t: (key: string) => string }) {
  const locale = useLocale();

  return (
    <div className="flex gap-x-1 w-full">
      <Button className="w-full xl:w-auto" variant="outline" asChild>
        <Link href={`/${locale}/login`}>{t('login')}</Link>
      </Button>
      <Button className="w-full xl:w-auto" variant="default" asChild>
        <Link href={`/${locale}/signup`}>{t('signup')}</Link>
      </Button>
    </div>
  );
}
