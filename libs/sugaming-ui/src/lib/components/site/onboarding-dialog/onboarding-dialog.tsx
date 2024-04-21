'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  completeOnboarding,
  getBearerToken,
} from '@sugaming/sugaming-api-client/next';
import { WelcomeStep } from './components/welcome-step';
import { AvatarStep } from './components/avatar-step';
import { DiscordStep } from './components/discord-step';
import { SteamStep } from './components/steam-step';
import { CompletedStep } from './components/completed-step';
import { Dialog, DialogContent, toast, Toaster } from '../../common/client';

interface OnboardingDialogProps {
  isOpen: boolean;
}

enum OnboardingDialogSteps {
  Welcome,
  Avatar,
  Discord,
  Steam,
  Completed,
}

export function OnboardingDialog({ isOpen }: OnboardingDialogProps) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(OnboardingDialogSteps.Welcome);

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

  async function setAvatar(avatar: File) {
    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/users/current/avatar`,
        {
          method: 'PATCH',
          body: formData,
          headers: {
            'Accept-Language': locale,
            Authorization: await getBearerToken(),
          },
        },
      );
      const json = await response.json();

      if (response.ok) {
        // Handle success
        setStep(OnboardingDialogSteps.Discord);
      } else {
        // Handle errors
        toast({
          variant: 'destructive',
          title: json.message || t('error-occurred'),
          description: t('try-again'),
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('error-occurred'),
        description: t('try-again'),
      });
    }
  }

  const t = useTranslations('site.onboarding-dialog');

  const renderStep = () => {
    switch (step) {
      case OnboardingDialogSteps.Welcome:
        return (
          <WelcomeStep nextStep={() => setStep(OnboardingDialogSteps.Avatar)} />
        );
      case OnboardingDialogSteps.Avatar:
        return (
          <AvatarStep
            previousStep={() => setStep(OnboardingDialogSteps.Welcome)}
            nextStep={(avatar) => setAvatar(avatar)}
          />
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
    <>
      <Toaster />
      <Dialog open={open}>
        <DialogContent className="max-w-2xl">{renderStep()}</DialogContent>
      </Dialog>
    </>
  );
}
