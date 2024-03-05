import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { cn } from '../../../utils';
import { Button } from '../../common/server';

interface LoginButtonsProps {
  // eslint-disable-next-line react/require-default-props
  className?: string;
}

export function LoginButtons({ className = '' }: LoginButtonsProps) {
  const t = useTranslations('site.login-buttons');
  const locale = useLocale();

  return (
    <div className={cn('flex gap-x-1', className)}>
      <Button className="w-full xl:w-auto" variant="outline" asChild>
        <Link href={`/${locale}/login`}>{t('login')}</Link>
      </Button>
      <Button className="w-full xl:w-auto" variant="default" asChild>
        <Link href={`/${locale}/signup`}>{t('signup')}</Link>
      </Button>
    </div>
  );
}
