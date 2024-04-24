'use client';

import React, { useState } from 'react';
import { getBearerToken, getUser } from '@sugaming/sugaming-api-client/next';
import { useLocale, useTranslations } from 'next-intl';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { redirect } from 'next/navigation';
import { Button } from '../../common/server';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Toaster,
  useToast,
} from '../../common/client';

interface JoinGameDevEventDialogProps {
  eventName: string;
}

export function JoinGameDevEventConfirmationDialog({
  eventName,
}: JoinGameDevEventDialogProps) {
  const { toast } = useToast();
  const t = useTranslations('site.join-game-dev-event-confirmation-dialog');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);

  async function joinEvent() {
    const user = await getUser();
    if (!user) {
      window.location.href = `/${locale}/login`;
      return;
    }

    try {
      await ApiClient.GameDevEventsApiService.gameDevEventsControllerJoinGameDevEventV1(
        {
          eventName,
          authorization: await getBearerToken(),
          acceptLanguage: locale,
        },
      );

      toast({
        variant: 'default',
        title: t('joined-successfully'),
      });
      setShowButton(false);
    } catch (e) {
      if (e instanceof ApiClient.ApiError) {
        toast({
          variant: 'destructive',
          title: e.message || t('error-occurred'),
          description: t('try-again'),
        });
      }
    }

    setIsOpen(false);
  }

  return (
    <>
      <Toaster />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {showButton && <Button className="w-full">{t('join')}</Button>}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('title', { eventName })}</DialogTitle>
            <DialogDescription>{t('description')}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>{t('cancel')}</DialogClose>
            <Button onClick={() => joinEvent()}>{t('join')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
