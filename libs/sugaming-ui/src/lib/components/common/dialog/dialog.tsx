'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { cn } from '../../../utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

type DialogOverlayProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
> & {
  className?: string;
};

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
DialogOverlay.defaultProps = {
  className: '',
};

type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  className?: string;
};

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;
DialogContent.defaultProps = {
  className: '',
};

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5 text-center sm:text-left',
        className,
      )}
      {...props}
    />
  );
}

DialogHeader.displayName = 'DialogHeader';

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className,
      )}
      {...props}
    />
  );
}

DialogFooter.displayName = 'DialogFooter';

type DialogTitleProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
> & {
  className?: string;
};

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
DialogTitle.defaultProps = {
  className: '',
};

type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
> & {
  className?: '';
};

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
DialogDescription.defaultProps = {
  className: '',
};

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
