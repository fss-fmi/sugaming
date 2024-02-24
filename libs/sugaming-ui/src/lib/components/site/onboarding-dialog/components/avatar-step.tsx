'use client';

import { useTranslations } from 'next-intl';
import { Button } from '../../../common/server';
import { DialogFooter } from '../../../common/client';

interface AvatarStepProps {
  nextStep: () => void;
}

export function AvatarStep({ nextStep }: AvatarStepProps) {
  const t = useTranslations('site.onboarding-dialog.avatar-step');
  return (
    <>
      Avatar
      <DialogFooter>
        <Button onClick={nextStep}>{t('continue')}</Button>
      </DialogFooter>
    </>
  );
}
