'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { completeOnboarding } from '@sugaming/sugaming-api-client/next';
import { AvatarStep } from './components/avatar-step';
import { DiscordStep } from './components/discord-step';
import { SteamStep } from './components/steam-step';
import { CompletedStep } from './components/completed-step';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  toast,
} from '../../common/client';

interface OnboardingDialogProps {
  isOpen: boolean;
}

enum OnboardingDialogSteps {
  Avatar,
  Discord,
  Steam,
  Completed,
}

export function OnboardingDialog({ isOpen }: OnboardingDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(OnboardingDialogSteps.Avatar);

  // This is required in order to avoid hydration errors.
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(isOpen);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  async function close() {
    // Mark onboarding as complete
    const response = await completeOnboarding();
    if (response?.error) {
      toast({
        variant: 'destructive',
        title: response.error,
        description: t('try-again'),
      });
    } else {
      setOpen(false);
    }
  }

  const t = useTranslations('site.onboarding-dialog');

  const renderStep = () => {
    switch (step) {
      case OnboardingDialogSteps.Avatar:
        return (
          <AvatarStep nextStep={() => setStep(OnboardingDialogSteps.Discord)} />
        );
      case OnboardingDialogSteps.Discord:
        return (
          <DiscordStep
            previousStep={() => setStep(OnboardingDialogSteps.Avatar)}
            nextStep={() => setStep(OnboardingDialogSteps.Steam)}
          />
        );
      case OnboardingDialogSteps.Steam:
        return (
          <SteamStep
            previousStep={() => setStep(OnboardingDialogSteps.Discord)}
            nextStep={() => setStep(OnboardingDialogSteps.Completed)}
          />
        );
      case OnboardingDialogSteps.Completed:
        return (
          <CompletedStep
            previousStep={() => setStep(OnboardingDialogSteps.Steam)}
            close={() => close()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}
