import * as React from 'react';
import { cn } from '../../../../utils';

type CardDescriptionProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-zinc-500 dark:text-zinc-400', className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';
CardDescription.defaultProps = {
  className: '',
};
