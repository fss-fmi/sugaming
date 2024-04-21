'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { Logo } from '../../logo/logo';
import { DialogFooter } from '../../../common/client';
import { Button } from '../../../common/server';

interface WelcomeStepProps {
  nextStep: () => void;
}

export function WelcomeStep({ nextStep }: WelcomeStepProps) {
  const t = useTranslations('site.onboarding-dialog.welcome-step');
  return (
    <>
      <div className="flex flex-col items-center text-center w-full">
        <Logo size={208} showText={false} />
        <h1 className="text-lg font-semibold">{t('title')}</h1>
        <p>{t('description')}</p>
      </div>
      <DialogFooter>
        <Button type="button" onClick={nextStep}>
          {t('continue')}
        </Button>
      </DialogFooter>
    </>
  );
}
