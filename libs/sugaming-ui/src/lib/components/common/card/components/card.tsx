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
        'rounded-lg border bg-card text-card-foreground shadow-sm',
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
