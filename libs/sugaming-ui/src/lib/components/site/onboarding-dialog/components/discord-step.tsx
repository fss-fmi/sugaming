'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa6';
import React from 'react';
import { DialogFooter } from '../../../common/client';
import { Button } from '../../../common/server';

interface DiscordStepProps {
  previousStep: () => void;
  nextStep: () => void;
}

export function DiscordStep({ previousStep, nextStep }: DiscordStepProps) {
  const t = useTranslations('site.onboarding-dialog.discord-step');
  return (
    <>
      Discord
      <DialogFooter>
        <Button onClick={previousStep} variant="secondary">
          {t('previous')}
        </Button>
        <Button onClick={nextStep} variant="secondary">
          {t('skip')}
        </Button>
        <Button type="button" asChild>
          <Link
            href={`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/auth/login/discord`}
            target="_blank"
            rel="opener" // Required, so that the new tab can go back to this window
          >
            <FaDiscord className="mr-2 h-4 w-4" />
            {t('continue-with-discord')}
          </Link>
        </Button>
      </DialogFooter>
    </>
  );
}
