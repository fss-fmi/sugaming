'use client';

import React, { useState } from 'react';
import { getBearerToken } from '@sugaming/sugaming-api-client/next';
import { Button } from '../../../common/server';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Toaster,
  useToast,
} from '../../../common/client';

interface InviteButtonProps {
  userId: string;
  teamId: string;
  completeSuccessfulInviteConfirmation: () => void;
}

export function InviteConfirmationDialog({
  userId,
  teamId,
  completeSuccessfulInviteConfirmation,
}: InviteButtonProps) {
  const { toast } = useToast();
  // const t = useTranslations('');
  const [isOpen, setIsOpen] = useState(true);

  async function inviteUser() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/users/${userId}/cs2-team-invites`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await getBearerToken(),
        },
        body: JSON.stringify({ id: teamId }),
      },
    );

    setIsOpen(false);

    // Handle success
    if (response.ok) {
      toast({
        variant: 'default',
        title: 'User invited successfully',
      });
      completeSuccessfulInviteConfirmation();
      return;
    }

    // Handle errors
    const json = await response.json();
    toast({
      variant: 'destructive',
      title: json.message || "t('error-occurred')",
      description: "t('try-again')",
    });
  }

  return (
    <>
      <Toaster />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite user</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">gosho</div>
          <DialogFooter>
            <Button onClick={() => inviteUser()}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
