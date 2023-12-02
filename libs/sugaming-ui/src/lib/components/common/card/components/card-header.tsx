import * as React from 'react';
import { cn } from '../../../../utils';

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  ),
);

CardHeader.displayName = 'CardHeader';
CardHeader.defaultProps = {
  className: '',
};
