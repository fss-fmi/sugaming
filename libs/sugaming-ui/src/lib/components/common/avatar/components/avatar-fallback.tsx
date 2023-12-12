import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../../../../utils';

type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
> & {
  className?: string;
};

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
AvatarFallback.defaultProps = {
  className: '',
};
