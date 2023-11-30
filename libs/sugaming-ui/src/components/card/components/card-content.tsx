import * as React from 'react';
import { cn } from '../../../utils';

type CardContentDescription = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const CardContent = React.forwardRef<
  HTMLDivElement,
  CardContentDescription
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';
CardContent.defaultProps = {
  className: '',
};
