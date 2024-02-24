'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../common/client';
import { Button } from '../../common/button/button';
import { Label } from '../../common/server';

interface OnboardingDialogProps {
  isOpen: boolean;
}
export function OnboardingDialog({ isOpen }: OnboardingDialogProps) {
  const [open, setOpen] = useState(false);
  // This is required in order to avoid hydration errors.
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(isOpen);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen]);
  const [open, setOpen] = useState(false);


  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
