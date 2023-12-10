import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../../../utils';

type SheetTitleProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Title
> & {
  className?: string;
};

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  SheetTitleProps
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold text-zinc-950 dark:text-zinc-50',
      className,
    )}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
SheetTitle.defaultProps = {
  className: '',
};
