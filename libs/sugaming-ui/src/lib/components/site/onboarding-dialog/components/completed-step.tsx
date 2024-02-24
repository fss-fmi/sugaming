'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { LuPartyPopper } from 'react-icons/lu';
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
      Completed
      <DialogFooter>
        <Button type="button" onClick={previousStep} variant="secondary">
          {t('previous')}
        </Button>
        <Button type="button" onClick={close}>
          <LuPartyPopper className="mr-2 h-4 w-4" />
          {t('lets-start')}
        </Button>
      </DialogFooter>
    </>
  );
}
