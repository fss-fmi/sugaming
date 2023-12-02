import * as React from 'react';
import { cn } from '../../../../utils';

type CardFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  ),
);

CardFooter.displayName = 'CardFooter';
CardFooter.defaultProps = {
  className: '',
};
