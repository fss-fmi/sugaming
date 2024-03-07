'use client';

import React, { useState } from 'react';
import { getBearerToken } from '@sugaming/sugaming-api-client/next';
import { useLocale, useTranslations } from 'next-intl';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { Button } from '../../../common/server';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Toaster,
  useToast,
} from '../../../common/client';

interface InviteButtonProps {
  user: ApiClient.UserResponseBodyDto;
  teamId: string;
  completeSuccessfulInviteConfirmation: () => void;
}

export function InviteConfirmationDialog({
  user,
  teamId,
  completeSuccessfulInviteConfirmation,
}: InviteButtonProps) {
  const { toast } = useToast();
  const t = useTranslations('site.users-search.invite-confirmation-dialog');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(true);

  async function inviteUser() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/users/${user.id}/cs2-team-invites`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await getBearerToken(),
          'Accept-Language': locale,
        },
        body: JSON.stringify({ id: teamId }),
      },
    );

    setIsOpen(false);

    // Handle success
    if (response.ok) {
      toast({
        variant: 'default',
        title: t('invite-sent'),
      });
      completeSuccessfulInviteConfirmation();
      return;
    }

    // Handle errors
    const json = await response.json();
    toast({
      variant: 'destructive',
      title: json.message || t('error-occurred'),
      description: t('try-again'),
    });
  }

  return (
    <>
      <Toaster />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('title')}</DialogTitle>
            <DialogDescription>
              {t('description', { name: `${user.firstName} ${user.lastName}` })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>{t('cancel')}</DialogClose>
            <Button onClick={() => inviteUser()}>{t('invite')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
