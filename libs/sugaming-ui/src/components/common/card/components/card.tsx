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
        'rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50',
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
