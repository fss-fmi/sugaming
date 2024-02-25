'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FaSteamSymbol } from 'react-icons/fa6';
import React, { useEffect, useState } from 'react';
import { getUser } from '@sugaming/sugaming-api-client/next';
import { DialogFooter } from '../../../common/client';
import { Button } from '../../../common/server';

interface SteamStepProps {
  previousStep: () => void;
  nextStep: () => void;
}

export function SteamStep({ previousStep, nextStep }: SteamStepProps) {
  const [isSteamAccountLinked, setIsSteamAccountLinked] = useState<
    object | undefined
  >();

  useEffect(() => {
    async function updateSteamAccountStatus() {
      // Check if the Steam account has been connected
      const user = await getUser();
      setIsSteamAccountLinked(user?.steam);
    }

    updateSteamAccountStatus();
    window.addEventListener('focus', updateSteamAccountStatus);

    return () => {
      window.removeEventListener('focus', updateSteamAccountStatus);
    };
  }, []);

  const t = useTranslations('site.onboarding-dialog.steam-step');

  return (
    <>
      Steam
      <DialogFooter>
        <Button onClick={previousStep} variant="secondary">
          {t('previous')}
        </Button>
        {isSteamAccountLinked ? (
          <Button onClick={nextStep}>{t('continue')}</Button>
        ) : (
          <>
            <Button onClick={nextStep} variant="secondary">
              {t('skip')}
            </Button>
            <Button type="button" asChild>
              <Link
                href={`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/auth/login/steam`}
                target="_blank"
                rel="opener" // Required, so that the new tab can go back to this window
              >
                <FaSteamSymbol className="mr-2 h-4 w-4" />
                {t('continue-with-steam')}
              </Link>
            </Button>
          </>
        )}
      </DialogFooter>
    </>
  );
}
