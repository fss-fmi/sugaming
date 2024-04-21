'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { LuPartyPopper } from 'react-icons/lu';
import { Confetti } from '../../confetti/confetti';
import { DialogFooter } from '../../../common/client';
import { Button } from '../../../common/server';

interface CompletedStepProps {
  previousStep: () => void;
  close: () => void;
}

export function CompletedStep({ previousStep, close }: CompletedStepProps) {
  const t = useTranslations('site.onboarding-dialog.completed-step');
  return (
    <>
      <Confetti />

      <div className="flex flex-col items-center text-center w-full">
        <LuPartyPopper className="w-52 h-52" />
        <h1 className="text-lg font-semibold">{t('title')}</h1>
        <p>{t('description')}</p>
      </div>
      <DialogFooter className="flex mt-2 gap-y-1 sm:gap-y-0 content-center">
        <Button type="button" onClick={previousStep} variant="secondary">
          {t('previous')}
        </Button>
        <Button type="button" onClick={close}>
          <LuPartyPopper className="mr-2 h-4 w-4" />
          {t('lets-go')}
        </Button>
      </DialogFooter>
    </>
  );
}
