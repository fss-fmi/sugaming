import * as React from 'react';
import { cn } from '../../../../utils';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50',
        className,
      )}
      {...props}
    />
  ),
);

Card.displayName = 'Card';
Card.defaultProps = {
  className: '',
};
