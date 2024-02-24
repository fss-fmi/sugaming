'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FaSteamSymbol } from 'react-icons/fa6';
import React from 'react';
import * as process from 'process';
import { DialogFooter } from '../../../common/client';
import { Button } from '../../../common/server';

interface DiscordStepProps {
  previousStep: () => void;
  nextStep: () => void;
}

export function SteamStep({ previousStep, nextStep }: DiscordStepProps) {
  const t = useTranslations('site.onboarding-dialog.steam-step');
  return (
    <>
      Steam
      <DialogFooter>
        <Button onClick={previousStep} variant="secondary">
          {t('previous')}
        </Button>
        <Button onClick={nextStep} variant="secondary">
          {t('skip')}
        </Button>
        <Button type="button" asChild>
          <Link
            href={`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/auth/login/steam`}
            target="_blank"
          >
            <FaSteamSymbol className="mr-2 h-4 w-4" />
            {t('continue-with-steam')}
          </Link>
        </Button>
      </DialogFooter>
    </>
  );
}
