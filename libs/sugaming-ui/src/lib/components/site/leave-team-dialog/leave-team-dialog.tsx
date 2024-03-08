'use client';

import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { removeMemberRequest } from '@sugaming/sugaming-api-client/next';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
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
import { Button } from '../../common/server';

interface LeaveTeamDialogProps {
  team: ApiClient.Cs2TeamResponseBodyDto;
  user: ApiClient.UserResponseBodyDto;
  children: React.ReactNode;
}

export function LeaveTeamDialog({
  team,
  user,
  children,
}: LeaveTeamDialogProps) {
  const { toast } = useToast();
  const t = useTranslations('site.leave-team-dialog');
  const [open, setOpen] = useState(false);

  return (
    <>
      <Toaster />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('title')}</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <DialogDescription>{t('description')}</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">{t('cancel')}</Button>
            </DialogClose>
            <Button
              onClick={async () => {
                const response = await removeMemberRequest(team, user);
                if (response?.error) {
                  toast({
                    variant: 'destructive',
                    title: response.error,
                    description: t('try-again'),
                  });
                } else {
                  toast({
                    variant: 'default',
                    title: t('left-team'),
                  });
                  setOpen(false);
                }
              }}
            >
              {t('leave')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
